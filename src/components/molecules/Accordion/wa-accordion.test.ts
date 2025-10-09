import { describe, it, expect, beforeEach } from 'vitest';
import './wa-accordion'; // defines the element
import type { WaAccordionProps } from './wa-accordion';

type WaAccordionTestEl = WaAccordionProps & {
  updateComplete: Promise<boolean>;
};

const DEFAULT_ACCORDION_MARKUP = `
  <h3>Item 1</h3><div>Panel 1</div>
  <h3>Item 2</h3><div>Panel 2</div>
  <h3>Item 3</h3><div>Panel 3</div>
`;

const ACCORDION_WITH_ADDON = `
  <template data-addon>
    <svg data-testid="addon" viewBox="0 0 8 8" width="8" height="8" aria-hidden="true">
      <circle cx="4" cy="4" r="4" />
    </svg>
  </template>

  <h3>Item 1</h3><div>Panel 1</div>
  <h3>Item 2</h3><div>Panel 2</div>
  <h3>Item 3</h3><div>Panel 3</div>
`;

describe('wa-accordion', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders correctly', async () => {
    const el = document.createElement('wa-accordion') as WaAccordionTestEl;
    el.innerHTML = DEFAULT_ACCORDION_MARKUP;
    document.body.appendChild(el);
    await el.updateComplete;

    const outerContainer = el.firstElementChild as HTMLElement | null;
    expect(outerContainer).toBeTruthy();
    expect(outerContainer!.tagName).toBe('DIV');

    // Sequence per item: H3 (with <button> inside), DIV[role=region]
    // 3 items => 3 * (header, panel) = 6 children
    const children = Array.from(outerContainer!.children) as HTMLElement[];
    expect(children.length).toBe(6);

    for (let i = 0; i < children.length; i += 2) {
      const headerElement = children[i];
      const panelElement = children[i + 1];

      expect(headerElement.matches('h2,h3,h4,h5,h6')).toBe(true);

      const buttonElement = headerElement.querySelector(
        'button'
      ) as HTMLButtonElement | null;
      const panelId = panelElement.id;

      expect(buttonElement).toBeTruthy();
      expect(panelElement.tagName).toBe('DIV');
      expect(panelElement.getAttribute('role')).toBe('region');
      expect(panelElement.hidden).toBe(true);
      expect(panelElement.getAttribute('aria-hidden')).toBe('true');

      if (buttonElement) {
        expect(buttonElement.type).toBe('button');
        expect(buttonElement.id).toBeTruthy();
        expect(buttonElement.getAttribute('aria-controls')).toBeTruthy();
        expect(buttonElement.getAttribute('aria-expanded')).toBe('false');
        expect(panelId).toBe(buttonElement.getAttribute('aria-controls'));
        expect(panelElement.getAttribute('aria-labelledby')).toBe(
          buttonElement.id
        );
      }
    }
  });

  it('collapseOthers ABSENT (default false): allows multiple open', async () => {
    const el = document.createElement('wa-accordion') as WaAccordionTestEl;
    el.innerHTML = ACCORDION_WITH_ADDON; // static markup BEFORE attach
    document.body.appendChild(el);
    await el.updateComplete;

    const buttons = Array.from(
      el.querySelectorAll('button[aria-controls]')
    ) as HTMLButtonElement[];

    const panelOf = (b: HTMLButtonElement) =>
      el.querySelector<HTMLElement>(`#${b.getAttribute('aria-controls')}`)!;

    // open first, stays open
    buttons[0].click();
    expect(buttons[0].getAttribute('aria-expanded')).toBe('true');
    expect(panelOf(buttons[0]).hidden).toBe(false);

    // open second, first should STILL be open (collapseOthers is false)
    buttons[1].click();
    expect(buttons[1].getAttribute('aria-expanded')).toBe('true');
    expect(panelOf(buttons[1]).hidden).toBe(false);

    expect(buttons[0].getAttribute('aria-expanded')).toBe('true');
    expect(panelOf(buttons[0]).hidden).toBe(false);
  });

  it('collapseOthers PRESENT (true): opening one closes others', async () => {
    const el = document.createElement('wa-accordion') as WaAccordionTestEl;
    el.collapseOthers = true; // use the boolean prop directly
    el.innerHTML = ACCORDION_WITH_ADDON;
    document.body.appendChild(el);
    await el.updateComplete;

    const buttons = Array.from(
      el.querySelectorAll('button[aria-controls]')
    ) as HTMLButtonElement[];

    const panelOf = (b: HTMLButtonElement) =>
      el.querySelector<HTMLElement>(`#${b.getAttribute('aria-controls')}`)!;

    // open first
    buttons[0].click();
    expect(buttons[0].getAttribute('aria-expanded')).toBe('true');
    expect(panelOf(buttons[0]).hidden).toBe(false);

    // open second → first closes
    buttons[1].click();
    expect(buttons[1].getAttribute('aria-expanded')).toBe('true');
    expect(panelOf(buttons[1]).hidden).toBe(false);

    expect(buttons[0].getAttribute('aria-expanded')).toBe('false');
    expect(panelOf(buttons[0]).hidden).toBe(true);
  });

  it('addon template is cloned AFTER each panel', async () => {
    const el = document.createElement('wa-accordion') as WaAccordionTestEl;
    el.innerHTML = ACCORDION_WITH_ADDON;
    document.body.appendChild(el);
    await el.updateComplete;

    const panels = Array.from(
      el.querySelectorAll<HTMLElement>('[role="region"]')
    );
    expect(panels.length).toBe(3);

    // For each panel, the next sibling should be the wrapper containing the cloned addon
    panels.forEach((panel) => {
      const after = panel.nextElementSibling as HTMLElement | null;
      expect(after).toBeTruthy();
      // Don’t rely on classes in tests—just assert the addon content exists
      expect(after!.querySelector('[data-testid="addon"]')).toBeTruthy();
    });

    // Exactly one addon per panel
    expect(el.querySelectorAll('[data-testid="addon"]').length).toBe(
      panels.length
    );
  });

  it('no addon is created when the template is missing', async () => {
    const el = document.createElement('wa-accordion') as WaAccordionTestEl;
    el.innerHTML = DEFAULT_ACCORDION_MARKUP;
    document.body.appendChild(el);
    await el.updateComplete;

    const panels = Array.from(
      el.querySelectorAll<HTMLElement>('[role="region"]')
    );
    expect(panels.length).toBe(2);

    // There should be no cloned addon markers
    expect(el.querySelector('[data-testid="addon"]')).toBeNull();

    // And next siblings of panels should NOT contain the addon marker
    panels.forEach((panel) => {
      const after = panel.nextElementSibling as HTMLElement | null;
      expect(
        after?.querySelector?.('[data-testid="addon"]') ?? null
      ).toBeNull();
    });
  });
});
