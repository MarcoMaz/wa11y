import { LitElement } from 'lit';

export declare class WaCheckbox extends LitElement {
    currentId?: string;
    name?: string;
    checked?: boolean;
    focused: boolean;
    private handleChange;
    private handleFocus;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-checkbox': WaCheckbox;
    }
}
