import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DynamicStyleMixin } from '../../../mixins/DynamicStyleMixin.ts';
import { ifDefined } from 'lit/directives/if-defined.js';

export interface WaInputRadioProps extends HTMLElement {
  contentText?: string;
  currentId?: string;
  name?: string;
}

@customElement('wa-input-radio')
export class WaInputRadio
  extends DynamicStyleMixin(LitElement)
  implements WaInputRadioProps
{
  @property({ type: String, reflect: true }) contentText?: string;
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

  createRenderRoot() {
    return this;
  }

  render() {
    const currentId = this.currentId || 'default-id';
    const currentName = this.name || 'default-name';
    const checked = this.checked || false;
    const currentContentText =
      this.contentText || 'default input radio content';

    return html`
      <label
        for="${currentId}"
        class="${ifDefined(this.applyClassMap('label'))}"
      >
        <input
          type="radio"
          id="${ifDefined(currentId)}"
          name="${ifDefined(currentName)}"
          ?checked="${checked}"
          @change="${this.handleChange}"
          @focus="${this.handleFocus}"
          class="${ifDefined(this.applyClassMap('input'))}"
        />
        <span class="${ifDefined(this.applyClassMap('span'))}"
          >${currentContentText}</span
        >
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-input-radio': WaInputRadio;
  }
}
