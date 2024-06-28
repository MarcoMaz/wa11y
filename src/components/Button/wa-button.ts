import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('wa-button')
export class WaButton extends LitElement {
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) type: 'button' | 'submit' | 'reset' = 'button';
  @property({ type: String }) label = 'Default label';

  render() {
    return html`
      <button ?disabled="${this.disabled}" type="${this.type}" part="button">
        ${this.label}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-button': WaButton;
  }
}
