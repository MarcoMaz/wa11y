import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement('wa-text-field')
export class WaTextField extends LitElement {
  @property({ type: String, reflect: true }) currentId?: string;
  @property({ type: String, reflect: true }) name?: string;
  @property({ type: String, reflect: true }) label?: string;
  @property({ type: String, reflect: true }) placeholder?: string;
  @property({ type: Boolean, reflect: true }) required = false;

  private handleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dispatchEvent(
      new CustomEvent('change', { detail: { value: input.value } })
    );
  }

  createRenderRoot() {
    return this;
  }

  render() {
    const currentId = this.currentId || 'default-id';
    const currentName = this.name || 'default-name';
    const currentLabel = this.label || 'Default label';
    const currentPlaceholder = this.placeholder || 'Search for the docs...';
    const ariaLabel = this.label ? undefined : currentLabel;

    return html`
      <label for="${currentId}">${currentLabel}</label>
      <input
        type="text"
        placeholder="${ifDefined(currentPlaceholder)}"
        id="${ifDefined(currentId)}"
        name="${ifDefined(currentName)}"
        ?required="${this.required}"
        @change="${this.handleChange}"
        aria-label="${ifDefined(ariaLabel)}"
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-text-field': WaTextField;
  }
}
