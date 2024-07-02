import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query, queryAll } from 'lit/decorators.js';

import '../../atoms/Button/wa-button';

@customElement('wa-form')
export class WaForm extends LitElement {
  @property({ type: String, reflect: true }) buttonLabel =
    'default submit button';
  @query('wa-button') submitButton!: HTMLElement | null;
  @queryAll('wa-text-field') textFields!: NodeListOf<HTMLElement>;

  connectedCallback(): void {
    super.connectedCallback();
    this.updateComplete.then(() => {
      this.setupTextFields();
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

  private setupTextFields() {
    if (this.textFields.length === 0) {
      const defaultTextField = document.createElement(
        'wa-text-field'
      ) as HTMLElement;
      this.appendChild(defaultTextField);
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

  private handleSubmit(event: Event) {
    event.preventDefault();
    const values = Array.from(this.textFields).map((field) => {
      const input = field.shadowRoot?.querySelector('input');
      return input ? input.value : '';
    });
    const submitEvent = new CustomEvent('formSubmit', {
      detail: { values },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(submitEvent);
  }

  private updateButtonLabelState(label: string) {
    if (this.submitButton) {
      this.submitButton.setAttribute('label', label);
    }
  }

  render() {
    return html`
      <form part="form">
        <slot></slot>
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
