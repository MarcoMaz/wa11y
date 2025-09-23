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
            <!-- Here goes the children -->
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
