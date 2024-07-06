import { LitElement, PropertyValues } from 'lit';

export declare class WaForm extends LitElement {
    buttonLabel: string;
    formElement: HTMLFormElement | null;
    submitButton: HTMLElement | null;
    textFields: NodeListOf<HTMLElement>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changedProperties: PropertyValues): void;
    private setupButtonEvent;
    private tearDownButtonEvent;
    private updateButtonLabelState;
    private handleSubmit;
    private renderTextFields;
    createRenderRoot(): this;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-form': WaForm;
    }
}
