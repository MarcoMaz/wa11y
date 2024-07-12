import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DynamicStyleMixin } from '../../../mixins/DynamicStyleMixin.ts';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement('wa-radio')
export class WaRadio extends DynamicStyleMixin(LitElement) {
  @property({ type: String, reflect: true }) currentId?: string;
  @property({ type: String, reflect: true }) name?: string;
  @property({ type: Boolean, reflect: true }) checked?: boolean;
  @property({ type: Boolean, reflect: true }) focused = false;
  @property({ type: String, reflect: true }) label?: string;

  private handleChange() {
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('change', { detail: this.checked }));
  }

  private handleFocus() {
    this.focused = !this.focused;
  }

  createRenderRoot() {
    return this;
  }

  render() {
    const currentId = this.currentId || 'default-id';
    const currentName = this.name || 'default-name';
    const checked = this.checked || false;
    const labelText = this.label || 'default radio label';

    return html`
      <label
        id="${currentId}"
        class="${ifDefined(this.applyClassMap('label'))}"
      >
        <input
          type="radio"
          id="${ifDefined(currentId)}"
          value="${ifDefined(currentId)}"
          name="${ifDefined(currentName)}"
          ?checked="${checked}"
          @change="${this.handleChange}"
          @focus="${this.handleFocus}"
          aria-checked="${checked}"
          class="${ifDefined(this.applyClassMap('input'))}"
        />
        <span class="${ifDefined(this.applyClassMap('span'))}"
          >${labelText}</span
        >
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-radio': WaRadio;
  }
}
