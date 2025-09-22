import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query, queryAll } from 'lit/decorators.js';
import { DynamicStyleMixin } from '../../../mixins/DynamicStyleMixin.ts';
import { ifDefined } from 'lit/directives/if-defined.js';

import '../../atoms/Button/wa-button';
import '../../atoms/InputText/wa-input-text.ts';

@customElement('wa-form')
export class WaForm extends DynamicStyleMixin(LitElement) {
  @property({ type: String, reflect: true }) buttonLabel!: string;

  @query('form')
  formElement!: HTMLFormElement | null;
  @query('wa-button') submitButton!: HTMLElement | null;
  @queryAll('wa-input-text') inputTexts!: NodeListOf<HTMLElement>;

  connectedCallback(): void {
    super.connectedCallback();
    this.updateComplete.then(() => {
      this.setupButtonEvent();
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.tearDownButtonEvent();
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('buttonLabel')) {
      this.updateButtonLabelState(this.buttonLabel);
    }
  }

  private setupButtonEvent() {
    if (this.submitButton) {
      this.submitButton.addEventListener(
        'customClick',
        this.handleSubmit.bind(this)
      );
    }
  }

  private tearDownButtonEvent() {
    if (this.submitButton) {
      this.submitButton.removeEventListener(
        'customClick',
        this.handleSubmit.bind(this)
      );
    }
  }

  private updateButtonLabelState(label: string) {
    if (this.submitButton) {
      this.submitButton.setAttribute('label', label);
    }
  }

  private handleSubmit(event: Event) {
    event.preventDefault();
    const values = Array.from(this.inputTexts).map((inputText) => {
      const input = inputText.querySelector('input');
      return input ? input.value : '';
    });
    const submitEvent = new CustomEvent('formSubmit', {
      detail: { values },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(submitEvent);
  }

  private renderInputTexts() {
    if (this.children.length === 0) {
      return html`<wa-input-text label="Default Input Text"></wa-input-text>`;
    }
    return html`${Array.from(this.children)}`;
  }

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <form
        @submit="${this.handleSubmit}"
        class="${ifDefined(this.applyClassMap('form'))}"
      >
        ${this.renderInputTexts()}
        <wa-button type="submit"></wa-button>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-form': WaForm;
  }
}
