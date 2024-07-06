import { LitElement } from 'lit';

export declare class WaTextField extends LitElement {
    currentId?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    required: boolean;
    private handleChange;
    createRenderRoot(): this;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-text-field': WaTextField;
    }
}
