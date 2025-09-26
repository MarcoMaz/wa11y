import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DynamicStyleMixin } from '../../../mixins/DynamicStyleMixin';
import { ifDefined } from 'lit/directives/if-defined.js';

export interface WaAccordionProps extends HTMLElement {
  currentHeaderHeading?: string;
  isActive?: boolean;
  itemPanelId?: string;
  itemPanelLabel?: string;
}

@customElement('wa-accordion')
export class WaAccordion
  extends DynamicStyleMixin(LitElement)
  implements WaAccordionProps
{
  @property({ type: String, reflect: true }) currentHeaderHeading?: string;
  @property({ type: Boolean, reflect: true }) isActive?: boolean;
  @property({ type: String, reflect: true }) itemPanelId?: string;
  @property({ type: String, reflect: true }) itemPanelLabel?: string;

  createRenderRoot() {
    return this;
  }

  render() {
    const currentHeaderHeading =
      this.currentHeaderHeading || 'default-header-heading';
    const itemPanelId = this.itemPanelId || 'default-accordion-item-panel-id';
    const itemPanelLabel = this.itemPanelLabel || 'default-item-panel-label';

    return html`
      <div class="${ifDefined(this.applyClassMap('accordion'))}">
        <!-- maps of elements here -->
        <div
          class="${ifDefined(
            this.applyClassMap(
              `accordionItem${this.isActive ? ' -active' : ''}`
            )
          )}"
        >
          <h3 class="${ifDefined(this.applyClassMap('accordionItem__header'))}">
            <button
              class="${ifDefined(this.applyClassMap('accordionItem__button'))}"
              id=${itemPanelLabel}
              type="button"
              aria-expanded=${this.isActive ? 'true' : 'false'}
              aria-controls=${itemPanelId}
            >
              ${currentHeaderHeading}
            </button>
          </h3>
          <div
            class="${ifDefined(this.applyClassMap('accordionItem__panel'))}"
            id=${itemPanelId}
            aria-hidden=${this.isActive ? 'false' : 'true'}
            aria-labelledby=${itemPanelLabel}
          >
            <!-- missing role "region" here?          -->
            <!-- Here goes the children               -->
            <p>children</p>
          </div>
          <div class="${ifDefined(this.applyClassMap('accordionItem__dot'))}">
            <!-- Circle Svg Inside -->
            dot svg
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-accordion': WaAccordion;
  }
}

// Notes:
//
// - string interpolation for id, aria-controls
// - use wa-button
// - aria-expanded --> 'isExpanded'
// - 'children'
// - general approach for optional ornamental dot
// - it's a map of elements
// - h3 is arbitrary, it depends where it is inserted
// - needs a props to decide if only the active element stays open or all the elements
