import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DynamicStyleMixin } from '../../../mixins/DynamicStyleMixin';

export interface WaAccordionProps extends HTMLElement {
  collapseOthers?: boolean;
}

@customElement('wa-accordion')
export class WaAccordion
  extends DynamicStyleMixin(LitElement)
  implements WaAccordionProps
{
  private _uid = Math.random().toString(36).slice(2);

  @property({ type: Boolean, reflect: true }) collapseOthers = false;

  createRenderRoot() {
    return this;
  }

  render() {
    return html``;
  }

  private setClass(el: HTMLElement, key: string) {
    try {
      const v = this.applyClassMap?.(key);
      if (typeof v === 'string' && v) el.className = v;
    } catch {
      /* no-op */
    }
  }

  firstUpdated() {
    // Snapshot the current children
    const childrenSnapshot = Array.from(this.children) as HTMLElement[];
    if (childrenSnapshot.length === 0) return;

    const addOnTemplate = this.querySelector(
      ':scope > template[data-addon]'
    ) as HTMLTemplateElement | null;

    const filtered = addOnTemplate
      ? childrenSnapshot.filter((el) => el !== addOnTemplate)
      : childrenSnapshot;

    const outerContainer = document.createElement('div') as HTMLDivElement;
    this.setClass(outerContainer, 'accordion');
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

      this.setClass(headerElement, 'accordionItem__header');
      this.setClass(headerButtonElement, 'accordionItem__button');
      this.setClass(panelElement, 'accordionItem__panel');

      if (!headerButtonElement) {
        headerButtonElement = document.createElement('button');
        headerButtonElement.type = 'button';
        headerButtonElement.innerHTML = headerElement.innerHTML;
        headerElement.innerHTML = '';
        headerElement.appendChild(headerButtonElement);
      }

      const idx = Math.floor(i / 2);

      const id = `${this.id || this._uid}-${idx}`;
      const btnId = `accordionItem__button-${id}`;
      const panelId = `accordionItem__panel-${id}`;

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
        const addonElement = document.createElement('div');
        this.setClass(addonElement, 'accordionItem__addon');
        addonElement.appendChild(fragment);
        outerContainer.insertBefore(addonElement, panelElement.nextSibling);
      }

      headerButtonElement.addEventListener('click', () => {
        const isOpen =
          headerButtonElement.getAttribute('aria-expanded') === 'true';
        const nextOpen = !isOpen;

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
        }

        headerButtonElement.setAttribute('aria-expanded', String(nextOpen));
        panelElement.hidden = !nextOpen;
        panelElement.setAttribute('aria-hidden', String(!nextOpen));
      });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-accordion': WaAccordion;
  }
}

// Notes:
//
// - clean up
