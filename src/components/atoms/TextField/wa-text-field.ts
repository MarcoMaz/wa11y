import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DynamicStyleMixin } from '../../../mixins/DynamicStyleMixin.ts';
import { ifDefined } from 'lit/directives/if-defined.js';

export interface WaTextFieldProps extends HTMLElement {
  contentText?: string;
  currentId?: string;
  isRequired: boolean;
  name?: string;
  placeholder?: string;
}

@customElement('wa-text-field')
export class WaTextField
  extends DynamicStyleMixin(LitElement)
  implements WaTextFieldProps
{
  @property({ type: String, reflect: true }) contentText?: string;
  @property({ type: String, reflect: true }) currentId?: string;
  @property({ type: Boolean, reflect: true }) isRequired = false;
  @property({ type: String, reflect: true }) name?: string;
  @property({ type: String, reflect: true }) placeholder?: string;

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
    const currentContentText = this.contentText || 'default text field content';
    const currentPlaceholder =
      this.placeholder || 'default text field placeholder';

    return html`
      <label
        for="${currentId}"
        class="${ifDefined(this.applyClassMap('label'))}"
        >${currentContentText}</label
      >
      <input
        type="text"
        placeholder="${ifDefined(currentPlaceholder)}"
        id="${ifDefined(currentId)}"
        name="${ifDefined(currentName)}"
        aria-required=${ifDefined(this.isRequired ? 'true' : undefined)}
        @change="${this.handleChange}"
        class="${ifDefined(this.applyClassMap('input'))}"
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-text-field': WaTextField;
  }
}
