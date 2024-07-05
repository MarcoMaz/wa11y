import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query, queryAll } from 'lit/decorators.js';

import '../../atoms/Button/wa-button';
import "../../atoms/TextField/wa-text-field";

@customElement('wa-form')
export class WaForm extends LitElement {
  @property({ type: String, reflect: true }) buttonLabel!: string;

  @query('form')
  formElement!: HTMLFormElement | null;
  @query('wa-button') submitButton!: HTMLElement | null;
  @queryAll('wa-text-field') textFields!: NodeListOf<HTMLElement>;

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
    const values = Array.from(this.textFields).map((field) => {
      const input = field.querySelector('input');
      return input ? input.value : '';
    });
    const submitEvent = new CustomEvent('formSubmit', {
      detail: { values },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(submitEvent);
  }

  private renderTextFields() {
    if (this.children.length === 0) {
      return html`<wa-text-field label="Default Field"></wa-text-field>`;
    }
    return html`${Array.from(this.children)}`;
  }


  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <form @submit="${this.handleSubmit}">
        ${this.renderTextFields()}
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
