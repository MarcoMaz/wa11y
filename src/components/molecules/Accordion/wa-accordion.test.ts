import { describe, it, expect, beforeEach } from 'vitest';
import './wa-accordion';
import type { WaAccordionProps } from './wa-accordion';

type WaAccordionTestEl = WaAccordionProps & {
  updateComplete: Promise<boolean>;
};

const DEFAULT_ACCORDION_MARKUP = `
  <h3>Item 1</h3><div>Panel 1</div>
  <h3>Item 2</h3><div>Panel 2</div>
  <h3>Item 3</h3><div>Panel 3</div>
`;

const ACCORDION_WITH_ADDON_MARKUP = `
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

  describe('Default', () => {
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

      const itemWrappers = Array.from(
        outerContainer!.querySelectorAll<HTMLElement>(':scope > .accordionItem')
      );
      expect(itemWrappers.length).toBe(3);

      for (const item of itemWrappers) {
        const headerElement = item.querySelector(
          'h2,h3,h4,h5,h6'
        ) as HTMLHeadingElement | null;
        const buttonElement = item.querySelector(
          'h2 button,h3 button,h4 button,h5 button,h6 button'
        ) as HTMLButtonElement | null;
        const panelElement = item.querySelector<HTMLElement>(
          '.accordionItem__panel'
        );

        const panelId = panelElement!.id;

        expect(headerElement).toBeTruthy();
        expect(buttonElement).toBeTruthy();
        expect(panelElement).toBeTruthy();

        // Panel basics
        expect(panelElement!.tagName).toBe('DIV');
        expect(panelElement!.getAttribute('role')).toBe('region');
        expect(panelElement!.hidden).toBe(true);
        expect(panelElement!.getAttribute('aria-hidden')).toBe('true');

        // Button ↔ panel wiring
        expect(buttonElement!.type).toBe('button');
        expect(buttonElement!.id).toBeTruthy();
        expect(buttonElement!.getAttribute('aria-controls')).toBeTruthy();
        expect(buttonElement!.getAttribute('aria-expanded')).toBe('false');
        expect(panelId).toBe(buttonElement!.getAttribute('aria-controls'));
        expect(panelElement!.getAttribute('aria-labelledby')).toBe(
          buttonElement!.id
        );
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
  });

  describe('openIndex', () => {
    it('opens the specified item by default', async () => {
      const accordion = document.createElement(
        'wa-accordion'
      ) as WaAccordionTestEl;
      (accordion as unknown as { openIndex: number }).openIndex = 1;
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

      expect(buttons[0].getAttribute('aria-expanded')).toBe('false');
      expect(panelOf(buttons[0]).hidden).toBe(true);

      expect(buttons[1].getAttribute('aria-expanded')).toBe('true');
      expect(panelOf(buttons[1]).hidden).toBe(false);

      expect(buttons[2].getAttribute('aria-expanded')).toBe('false');
      expect(panelOf(buttons[2]).hidden).toBe(true);
    });

    it('keeps all panels closed when openIndex is -1', async () => {
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

      for (const button of buttons) {
        expect(button.getAttribute('aria-expanded')).toBe('false');
        expect(panelOf(button).hidden).toBe(true);
      }
    });
  });

  describe('with Addon', () => {
    it('renders correctly', async () => {
      const accordion = document.createElement(
        'wa-accordion'
      ) as WaAccordionTestEl;
      accordion.innerHTML = ACCORDION_WITH_ADDON_MARKUP;
      document.body.appendChild(accordion);
      await accordion.updateComplete;

      const outerContainer = accordion.firstElementChild as HTMLElement | null;
      expect(outerContainer).toBeTruthy();
      expect(outerContainer!.tagName).toBe('DIV');

      const itemWrappers = Array.from(
        outerContainer!.querySelectorAll<HTMLElement>(':scope > .accordionItem')
      );
      expect(itemWrappers.length).toBe(3);

      for (const item of itemWrappers) {
        const headerElement = item.querySelector(
          'h2,h3,h4,h5,h6'
        ) as HTMLHeadingElement | null;
        const buttonElement = item.querySelector(
          'h2 button,h3 button,h4 button,h5 button,h6 button'
        ) as HTMLButtonElement | null;
        const panelElement = item.querySelector<HTMLElement>(
          '.accordionItem__panel'
        );
        const addonWrapper = item.querySelector<HTMLElement>(
          '.accordionItem__addon'
        );
        const panelId = panelElement!.id;

        expect(headerElement).toBeTruthy();
        expect(buttonElement).toBeTruthy();
        expect(panelElement).toBeTruthy();
        expect(addonWrapper).toBeTruthy();

        // Panel basics
        expect(panelElement!.tagName).toBe('DIV');
        expect(panelElement!.getAttribute('role')).toBe('region');
        expect(panelElement!.hidden).toBe(true);
        expect(panelElement!.getAttribute('aria-hidden')).toBe('true');

        // Button ↔ panel wiring
        expect(buttonElement!.type).toBe('button');
        expect(buttonElement!.id).toBeTruthy();
        expect(buttonElement!.getAttribute('aria-controls')).toBeTruthy();
        expect(buttonElement!.getAttribute('aria-expanded')).toBe('false');
        expect(panelId).toBe(buttonElement!.getAttribute('aria-controls'));
        expect(panelElement!.getAttribute('aria-labelledby')).toBe(
          buttonElement!.id
        );
        expect(
          addonWrapper!.querySelector('[data-testid="addon"]')
        ).toBeTruthy();
      }
    });

    it('allows multiple panels open', async () => {
      const accordion = document.createElement(
        'wa-accordion'
      ) as WaAccordionTestEl;
      accordion.innerHTML = ACCORDION_WITH_ADDON_MARKUP;
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
      el.innerHTML = ACCORDION_WITH_ADDON_MARKUP;
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
  });
});
