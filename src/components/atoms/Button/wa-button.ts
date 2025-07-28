import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DynamicStyleMixin } from '../../../mixins/DynamicStyleMixin.ts';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement('wa-button')
export class WaButton extends DynamicStyleMixin(LitElement) {
  @property({ type: Boolean, reflect: true }) isDisabled = false;
  @property({ type: String }) type: 'button' | 'submit' | 'reset' = 'button';
  @property({ type: String, reflect: true }) label?: string;

  private handleClick() {
    this.dispatchEvent(new CustomEvent('onClick'));
  }

  createRenderRoot() {
    return this;
  }

  render() {
    const labelText = this.label || 'default button label';
    const isDisabled = this.isDisabled || false;

    return html`
      <button
        class="${ifDefined(this.applyClassMap('button'))}"
        aria-disabled=${isDisabled}
        type="${this.type}"
        .label=${labelText}
        @click="${this.handleClick}"
      >
        ${labelText}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-button': WaButton;
  }
}
