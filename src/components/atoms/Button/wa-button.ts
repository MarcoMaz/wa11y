import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DynamicStyleMixin } from '../../../mixins/DynamicStyleMixin.ts';
import { ifDefined } from 'lit/directives/if-defined.js';

export interface WaButtonProps extends HTMLElement {
  isDisabled: boolean;
  type: 'button' | 'submit' | 'reset';
  label?: string;
}

@customElement('wa-button')
export class WaButton extends DynamicStyleMixin(LitElement) implements WaButtonProps {
  @property({ type: Boolean, reflect: true }) isDisabled = false;
  @property({ type: String, reflect: true }) type: 'button' | 'submit' | 'reset' = 'button';
  @property({ type: String, reflect: true }) label?: string;

private handleClick(event: Event) {
  if (this.isDisabled) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  }

    this.dispatchEvent(new CustomEvent('onClick'));
  }

  createRenderRoot() {
    return this;
  }

  render() {
    const labelText = this.label || 'default button label';

    return html`
      <button
        class="${ifDefined(this.applyClassMap('button'))}"
        aria-disabled=${ifDefined(this.isDisabled ? 'true' : undefined)}
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
