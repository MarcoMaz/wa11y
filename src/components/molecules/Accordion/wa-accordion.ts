import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DynamicStyleMixin } from '../../../mixins/DynamicStyleMixin';

export interface WaAccordionProps extends HTMLElement {}

@customElement('wa-accordion')
export class WaAccordion
  extends DynamicStyleMixin(LitElement)
  implements WaAccordionProps
{
  @property({ type: String, reflect: true }) contentText?: string;

  render() {
    return html`
      <div class="accordion">
        <!-- maps of elements here -->
        <div class="accordionItem -active">
          <h3 class="accordionItem__header">
            <button
              id="accordionItem__button-1"
              class="accordionItem__button"
              type="button"
              aria-expanded="true"
              aria-controls="accordionItem__panel-1"
            >
              <!-- here goes the title -->
              Title
            </button>
          </h3>
          <div
            id="accordionItem__panel-1"
            class="accordionItem__panel"
            aria-hidden="false"
          >
            <!-- missing role "region" here?          -->
            <!-- aria-labelledby="accordion-button-1" -->
            <!-- Here goes the children               -->
            <p>children</p>
          </div>
          <div class="accordionItem__dot">
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
// - 'accordionItemTitle'
// - 'children'
// - general approach for optional ornamental dot
// - it's a map of elements
// - h3 is arbitrary, it depends where it is inserted
// - needs a props to decide if only the active element stays open or all the elements
//
// go through this: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
