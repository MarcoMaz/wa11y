import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('wa-button')
export class WaButton extends LitElement {
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) type: 'button' | 'submit' | 'reset' = 'button';
  @property({ type: String, reflect: true }) label?: string;

  private handleClick() {
    this.dispatchEvent(new CustomEvent('onClick'));
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('onClick', this.handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener('onClick', this.handleClick);
    super.disconnectedCallback();
  }


  render() {    
    const labelText = this.label || 'default button label';

    return html`
      <button
        ?disabled="${this.disabled}"
        type="${this.type}"
        .label=${labelText}
        @click="${this.handleClick}"
        part="button"
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