import { LitElement } from 'lit';

export declare class WaRadio extends LitElement {
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
        'wa-radio': WaRadio;
    }
}
