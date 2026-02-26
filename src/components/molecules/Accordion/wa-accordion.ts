import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { DynamicStyleMixin } from '../../../mixins/DynamicStyleMixin';

export interface WaAccordionProps extends HTMLElement {
  collapseOthers?: boolean;
  openIndex?: number;
}

const ACCORDION_CLASS: string = 'accordion';
const ACCORDION_ITEM_HEADER_CLASS: string = 'accordionItem__header';
const ACCORDION_ITEM_BUTTON_CLASS: string = 'accordionItem__button';
const ACCORDION_ITEM_PANEL_CLASS: string = 'accordionItem__panel';
const ACCORDION_ITEM_ADDON_CLASS: string = 'accordionItem__addon';
const ACCORDION_ITEM_CLASS: string = 'accordionItem';
const ACCORDION_ITEM_ACTIVE_CLASS: string = 'accordionItem--active';

@customElement('wa-accordion')
export class WaAccordion
  extends DynamicStyleMixin(LitElement)
  implements WaAccordionProps
{
  private _uid = Math.random().toString(36).slice(2);

  @property({ type: Boolean, reflect: true }) collapseOthers = false;
  @property({ type: Number, reflect: true }) openIndex = -1;

  @query(`.${ACCORDION_CLASS}`) accordion!: HTMLDivElement;
  @query(`.${ACCORDION_ITEM_CLASS}`) accordionItem!: HTMLDivElement;
  @query(`.${ACCORDION_ITEM_HEADER_CLASS}`)
  accordionItemHeader!: HTMLHeadingElement;
  @query(`.${ACCORDION_ITEM_BUTTON_CLASS}`)
  accordionItemButton!: HTMLHeadingElement;
  @query(`.${ACCORDION_ITEM_PANEL_CLASS}`) accordionItemPanel!: HTMLDivElement;
  @query(`.${ACCORDION_ITEM_ADDON_CLASS}`) accordionItemAddon!: HTMLDivElement;

  // Add base + mapped class (do not replace).
  private applyDefaultAndMappedClass(
    el: HTMLElement,
    baseClass: string,
    mapKey: string
  ) {
    if (!el) return;
    try {
      el.classList.add(baseClass);
      const mapped = this.applyClassMap?.(mapKey);
      if (typeof mapped === 'string' && mapped.trim()) {
        // allow mapped to be a space-separated list
        mapped
          .trim()
          .split(/\s+/)
          .forEach((c) => el.classList.add(c));
      }
    } catch {
      /* no-op */
    }
  }

  // Render into the light DOM instead of a shadow root, so user-provided children remain accessible
  createRenderRoot() {
    return this;
  }

  // Required by LitElement, but unused — all DOM setup happens manually in firstUpdated()
  render() {
    return html``;
  }

  firstUpdated() {
    // Snapshot the current children
    const childrenSnapshot = Array.from(this.children) as HTMLElement[];
    if (childrenSnapshot.length === 0) return;

    const addOnTemplate = this.querySelector(
      ':scope > template[data-addon]'
    ) as HTMLTemplateElement | null;

    const filtered = (
      addOnTemplate
        ? childrenSnapshot.filter((el) => el !== addOnTemplate)
        : childrenSnapshot
    ) as HTMLElement[];

    const outerContainer = document.createElement('div') as HTMLDivElement;
    this.applyDefaultAndMappedClass(
      outerContainer,
      ACCORDION_CLASS,
      'accordion'
    );
    this.insertBefore(outerContainer, childrenSnapshot[0] ?? null);

    filtered.forEach((el) => outerContainer.appendChild(el));

    const childrenElements = Array.from(
      outerContainer.children
    ) as HTMLElement[];

    for (let i = 0; i < childrenElements.length; i += 2) {
      const headerElement = childrenElements[i] as HTMLElement;
      const panelElement = childrenElements[i + 1] as HTMLElement;

      if (!headerElement || !panelElement) {
        console.error(`[wa-accordion] header or panel missing`);
        break;
      }

      let headerButtonElement = headerElement.querySelector(
        'button'
      ) as HTMLButtonElement;

      if (!headerButtonElement) {
        headerButtonElement = document.createElement('button');
        headerButtonElement.type = 'button';
        headerButtonElement.innerHTML = headerElement.innerHTML;
        headerElement.innerHTML = '';
        headerElement.appendChild(headerButtonElement);
      }

      const itemContainer = document.createElement('div') as HTMLDivElement;
      this.applyDefaultAndMappedClass(
        itemContainer,
        ACCORDION_ITEM_CLASS,
        'accordionItem'
      );
      // Insert the wrapper before the current header, then move nodes inside it
      outerContainer.insertBefore(itemContainer, headerElement);
      itemContainer.appendChild(headerElement);
      itemContainer.appendChild(panelElement);

      this.applyDefaultAndMappedClass(
        headerElement,
        ACCORDION_ITEM_HEADER_CLASS,
        'accordionItem__header'
      );
      this.applyDefaultAndMappedClass(
        headerButtonElement,
        ACCORDION_ITEM_BUTTON_CLASS,
        'accordionItem__button'
      );
      this.applyDefaultAndMappedClass(
        panelElement,
        ACCORDION_ITEM_PANEL_CLASS,
        'accordionItem__panel'
      );

      const idx = Math.floor(i / 2) as number;

      const id = `${this.id || this._uid}-${idx}` as string;
      const btnId = `accordionItem__button-${id}` as string;
      const panelId = `accordionItem__panel-${id}` as string;

      headerButtonElement.id = btnId;
      headerButtonElement.setAttribute('aria-controls', panelId);
      headerButtonElement.setAttribute('aria-expanded', 'false');

      panelElement.id = panelId;
      panelElement.setAttribute('role', 'region');
      panelElement.setAttribute('aria-labelledby', btnId);
      panelElement.setAttribute('aria-hidden', 'true');
      panelElement.setAttribute('role', 'region');
      panelElement.hidden = true;

      if (addOnTemplate) {
        const fragment = addOnTemplate.content.cloneNode(
          true
        ) as DocumentFragment;
        const addonElement = document.createElement('div') as HTMLDivElement;
        this.applyDefaultAndMappedClass(
          addonElement,
          ACCORDION_ITEM_ADDON_CLASS,
          'accordionItem__addon'
        );
        addonElement.appendChild(fragment);
        itemContainer.appendChild(addonElement);
      }

      if (idx === this.openIndex) {
        headerButtonElement.setAttribute('aria-expanded', 'true');
        panelElement.hidden = false;
        panelElement.setAttribute('aria-hidden', 'false');
        itemContainer.classList.add(ACCORDION_ITEM_ACTIVE_CLASS);
      }

      headerButtonElement.addEventListener('click', () => {
        const isOpen = (headerButtonElement.getAttribute('aria-expanded') ===
          'true') as boolean;
        const nextOpen = !isOpen as boolean;

        if (this.collapseOthers && nextOpen) {
          // Close all other items
          outerContainer
            .querySelectorAll<HTMLButtonElement>('button[aria-controls]')
            .forEach((button) => {
              if (button !== headerButtonElement)
                button.setAttribute('aria-expanded', 'false');
            });

          outerContainer
            .querySelectorAll<HTMLElement>('[role="region"]')
            .forEach((panel) => {
              if (panel !== panelElement) {
                panel.hidden = true;
                panel.setAttribute('aria-hidden', 'true');
              }
            });

          outerContainer
            .querySelectorAll<HTMLElement>(`.${ACCORDION_ITEM_CLASS}`)
            .forEach((item) => {
              if (item !== itemContainer)
                item.classList.remove(ACCORDION_ITEM_ACTIVE_CLASS);
            });
        }

        headerButtonElement.setAttribute('aria-expanded', String(nextOpen));
        panelElement.hidden = !nextOpen;
        panelElement.setAttribute('aria-hidden', String(!nextOpen));

        itemContainer.classList.toggle(ACCORDION_ITEM_ACTIVE_CLASS, nextOpen);
      });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-accordion': WaAccordion;
  }
}
