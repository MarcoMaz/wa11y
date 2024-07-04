import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement('wa-radio')
export class WaRadio extends LitElement {
  @property({ type: String, reflect: true }) currentId?: string;
  @property({ type: String, reflect: true }) name?: string;
  @property({ type: Boolean, reflect: true }) checked?: boolean;
  @property({ type: Boolean, reflect: true }) focused = false;

  private handleChange() {
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('change', { detail: this.checked }));
  }

  private handleFocus() {
    this.focused = !this.focused;
  }

  render() {
    const currentId = this.currentId || 'default-id';
    const currentName = this.name || 'default-name';
    const checked = this.checked || false;

    return html`
      <label id="${currentId}" part="label">
        <input
          type="radio"
          id="${ifDefined(currentId)}"
          value="${ifDefined(currentId)}"
          name="${ifDefined(currentName)}"
          ?checked="${checked}"
          @change="${this.handleChange}"
          @focus="${this.handleFocus}"
          aria-checked="${checked}"
          part="input"
        />
        <span part="span">
          <slot>default text</slot>
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-radio': WaRadio;
  }
}
