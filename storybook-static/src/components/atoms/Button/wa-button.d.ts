import { LitElement } from 'lit';

export declare class WaButton extends LitElement {
    disabled: boolean;
    type: 'button' | 'submit' | 'reset';
    label?: string;
    private handleClick;
    createRenderRoot(): this;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-button': WaButton;
    }
}
