import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { DynamicStyleMixin } from '../../../mixins/DynamicStyleMixin';

@customElement('wa-checkbox')
export class WaCheckbox extends DynamicStyleMixin(LitElement) {
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
    const contentText = this.label || 'default checkbox content';

    return html`
      <label
        for="${currentId}"
        class="${ifDefined(this.applyClassMap('label'))}"
      >
        <input
          type="checkbox"
          id="${ifDefined(currentId)}"
          name="${ifDefined(currentName)}"
          ?checked="${checked}"
          @change="${this.handleChange}"
          @focus="${this.handleFocus}"
          class="${ifDefined(this.applyClassMap('input'))}"
        />
        <span class="${ifDefined(this.applyClassMap('span'))}"
          >${contentText}</span
        >
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-checkbox': WaCheckbox;
  }
}
