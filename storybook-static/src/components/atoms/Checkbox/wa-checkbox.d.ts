import { LitElement } from 'lit';

export declare class WaCheckbox extends LitElement {
    currentId?: string;
    name?: string;
    checked?: boolean;
    focused: boolean;
    label?: string;
    private handleChange;
    private handleFocus;
    createRenderRoot(): this;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-checkbox': WaCheckbox;
    }
}
