import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DynamicStyleMixin } from '../../../mixins/DynamicStyleMixin';
import { ifDefined } from 'lit/directives/if-defined.js';

export interface WaAccordionProps extends HTMLElement {
  currentHeaderHeading?: string;
}

@customElement('wa-accordion')
export class WaAccordion
  extends DynamicStyleMixin(LitElement)
  implements WaAccordionProps
{
  @property({ type: String, reflect: true }) currentHeaderHeading?: string;

  createRenderRoot() {
    return this;
  }

  render() {
    const currentHeaderHeading =
      this.currentHeaderHeading || 'default-header-heading';

    return html`
      <div class="${ifDefined(this.applyClassMap('accordion'))}">
        <!-- maps of elements here -->
        <div
          class="${ifDefined(
            this.applyClassMap(`accordionItem${true ? ' -active' : ''}`)
          )}"
        >
          <h3 class="${ifDefined(this.applyClassMap('accordionItem__header'))}">
            <button
              class="${ifDefined(this.applyClassMap('accordionItem__button'))}"
              id="accordionItem__button-1"
              type="button"
              aria-expanded="true"
              aria-controls="accordionItem__panel-1"
            >
              ${currentHeaderHeading}
            </button>
          </h3>
          <div
            class="${ifDefined(this.applyClassMap('accordionItem__panel'))}"
            id="accordionItem__panel-1"
            aria-hidden="false"
          >
            <!-- missing role "region" here?          -->
            <!-- aria-labelledby="accordion-button-1" -->
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
// - active class is a toggle --> 'isActive'
// - string interpolation for id, aria-controls
// - use wa-button
// - aria-expanded --> 'isExpanded'
// - 'children'
// - general approach for optional ornamental dot
// - it's a map of elements
// - h3 is arbitrary, it depends where it is inserted
// - needs a props to decide if only the active element stays open or all the elements
//
// go through this: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
