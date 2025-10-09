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
    const accordion = document.createElement(
      'wa-accordion'
    ) as WaAccordionTestEl;
    accordion.innerHTML = DEFAULT_ACCORDION_MARKUP;
    document.body.appendChild(accordion);
    await accordion.updateComplete;

    const outerContainer = accordion.firstElementChild as HTMLElement | null;
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

  it('allows multiple panels open', async () => {
    const accordion = document.createElement(
      'wa-accordion'
    ) as WaAccordionTestEl;
    accordion.innerHTML = DEFAULT_ACCORDION_MARKUP;
    document.body.appendChild(accordion);
    await accordion.updateComplete;

    const buttons = Array.from(
      accordion.querySelectorAll('button[aria-controls]')
    ) as HTMLButtonElement[];

    const panelOf = (button: HTMLButtonElement) =>
      accordion.querySelector<HTMLElement>(
        `#${button.getAttribute('aria-controls')}`
      )!;

    const firstButton = buttons[0] as HTMLButtonElement;
    const secondButton = buttons[1] as HTMLButtonElement;

    // open first, stays open
    firstButton.click();
    expect(firstButton.getAttribute('aria-expanded')).toBe('true');
    expect(panelOf(firstButton).hidden).toBe(false);

    // open second, first is still open
    secondButton.click();
    expect(secondButton.getAttribute('aria-expanded')).toBe('true');
    expect(panelOf(secondButton).hidden).toBe(false);

    expect(firstButton.getAttribute('aria-expanded')).toBe('true');
    expect(panelOf(firstButton).hidden).toBe(false);
  });

  it('it closes others when opening one', async () => {
    const el = document.createElement('wa-accordion') as WaAccordionTestEl;
    el.collapseOthers = true;
    el.innerHTML = DEFAULT_ACCORDION_MARKUP;
    document.body.appendChild(el);
    await el.updateComplete;

    const buttons = Array.from(
      el.querySelectorAll('button[aria-controls]')
    ) as HTMLButtonElement[];

    const panelOf = (button: HTMLButtonElement) =>
      el.querySelector<HTMLElement>(
        `#${button.getAttribute('aria-controls')}`
      )!;

    const firstButton = buttons[0] as HTMLButtonElement;
    const secondButton = buttons[1] as HTMLButtonElement;

    // open first
    firstButton.click();
    expect(firstButton.getAttribute('aria-expanded')).toBe('true');
    expect(panelOf(firstButton).hidden).toBe(false);

    // open second → first closes
    secondButton.click();
    expect(secondButton.getAttribute('aria-expanded')).toBe('true');
    expect(panelOf(secondButton).hidden).toBe(false);

    expect(firstButton.getAttribute('aria-expanded')).toBe('false');
    expect(panelOf(firstButton).hidden).toBe(true);
  });

  // it('addon template is cloned AFTER each panel', async () => {
  //   const el = document.createElement('wa-accordion') as WaAccordionTestEl;
  //   el.innerHTML = ACCORDION_WITH_ADDON;
  //   document.body.appendChild(el);
  //   await el.updateComplete;

  //   const panels = Array.from(
  //     el.querySelectorAll<HTMLElement>('[role="region"]')
  //   );
  //   expect(panels.length).toBe(3);

  //   // For each panel, the next sibling should be the wrapper containing the cloned addon
  //   panels.forEach((panel) => {
  //     const after = panel.nextElementSibling as HTMLElement | null;
  //     expect(after).toBeTruthy();
  //     // Don’t rely on classes in tests—just assert the addon content exists
  //     expect(after!.querySelector('[data-testid="addon"]')).toBeTruthy();
  //   });

  //   // Exactly one addon per panel
  //   expect(el.querySelectorAll('[data-testid="addon"]').length).toBe(
  //     panels.length
  //   );
  // });

  // it('no addon is created when the template is missing', async () => {
  //   const el = document.createElement('wa-accordion') as WaAccordionTestEl;
  //   el.innerHTML = DEFAULT_ACCORDION_MARKUP;
  //   document.body.appendChild(el);
  //   await el.updateComplete;

  //   const panels = Array.from(
  //     el.querySelectorAll<HTMLElement>('[role="region"]')
  //   );
  //   expect(panels.length).toBe(3);

  //   // There should be no cloned addon markers
  //   expect(el.querySelector('[data-testid="addon"]')).toBeNull();

  //   // And next siblings of panels should NOT contain the addon marker
  //   panels.forEach((panel) => {
  //     const after = panel.nextElementSibling as HTMLElement | null;
  //     expect(
  //       after?.querySelector?.('[data-testid="addon"]') ?? null
  //     ).toBeNull();
  //   });
  // });
});
