import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { DynamicStyleMixin } from '../../../mixins/DynamicStyleMixin';

@customElement('wa-accordion')
export class WaAccordion extends DynamicStyleMixin(LitElement) {
  private _uid = Math.random().toString(36).slice(2);

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

    const outerContainer = document.createElement('div') as HTMLDivElement;
    this.setClass(outerContainer, 'accordion');
    this.insertBefore(outerContainer, childrenSnapshot[0] ?? null);

    // Move the current children's snapshot into the outer container, preserving order
    childrenSnapshot.forEach((snapshot) =>
      outerContainer.appendChild(snapshot)
    );

    const childrenElements = Array.from(
      outerContainer.children
    ) as HTMLElement[];

    for (let i = 0; i < childrenElements.length; i += 2) {
      const headerElement = childrenElements[i] as HTMLElement;
      const panelElement = childrenElements[i + 1] as HTMLElement;

      if (!headerElement || !panelElement) break;

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

      const id = `${this.id || this._uid}`;
      const btnId = `accordionItem__button-${id}`;
      const panelId = `accordionItem__panel-${id}`;

      headerButtonElement.id = btnId;
      headerButtonElement.setAttribute('aria-controls', panelId);
      headerButtonElement.setAttribute('aria-expanded', 'false');

      panelElement.id = panelId;
      panelElement.setAttribute('role', 'region');
      panelElement.setAttribute('aria-labelledby', btnId);
      panelElement.setAttribute('aria-hidden', 'true');
      panelElement.hidden = true;

      headerButtonElement.addEventListener('click', () => {
        const open =
          headerButtonElement.getAttribute('aria-expanded') === 'true';
        headerButtonElement.setAttribute('aria-expanded', String(!open));
        panelElement.hidden = open;
        panelElement.setAttribute('aria-hidden', String(open));
      });
    }
  }
}

// render() {
//   const currentHeaderHeading =
//     this.currentHeaderHeading || 'default-header-heading';
//   const itemPanelId = this.itemPanelId || 'default-accordion-item-panel-id';
//   const itemPanelLabel = this.itemPanelLabel || 'default-item-panel-label';

//   return html`
//     <div class="${ifDefined(this.applyClassMap('accordion'))}">
//       <div
//         class="${ifDefined(
//           this.applyClassMap(
//             `accordionItem${this.isActive ? ' -active' : ''}`
//           )
//         )}"
//       >
//         <h3 class="${ifDefined(this.applyClassMap('accordionItem__header'))}">
//           <button
//             class="${ifDefined(this.applyClassMap('accordionItem__button'))}"
//             id=${itemPanelLabel}
//             type="button"
//             aria-expanded=${this.isActive ? 'true' : 'false'}
//             aria-controls=${itemPanelId}
//           >
//             ${currentHeaderHeading}
//           </button>
//         </h3>
//         <div
//           class="${ifDefined(this.applyClassMap('accordionItem__panel'))}"
//           id=${itemPanelId}
//           aria-hidden=${this.isActive ? 'false' : 'true'}
//           aria-labelledby=${itemPanelLabel}
//         >
//           <p>children</p>
//         </div>
//         <div class="${ifDefined(this.applyClassMap('accordionItem__dot'))}">
//           <!-- Circle Svg Inside -->
//           dot svg
//         </div>
//       </div>
//     </div>
//   `;
// }
// }

declare global {
  interface HTMLElementTagNameMap {
    'wa-accordion': WaAccordion;
  }
}

// Notes:
//
// - Handle the case something of the pair (heading or panel is not handed over) 
// - Do I need a role region in there?
// - use wa-button
// - general approach for optional ornamental dot
// - needs a props to decide if only the active element stays open or all the elements
// - add tests
// - clean up
