import { LitElement } from 'lit';

export declare class WaWheelPicker extends LitElement {
    currentId?: string;
    label?: string;
    name?: string;
    warningId?: string;
    warningText?: string;
    min?: number;
    max?: number;
    wheelPicker: HTMLDivElement;
    wheelPickerInput: HTMLInputElement;
    wheelPickerItems: HTMLDivElement;
    wheelPickerWarning: HTMLSpanElement;
    firstUpdated(): void;
    private createElements;
    private highlightCenterItem;
    private centerBeatOnLoad;
    private handleScroll;
    private onInputChange;
    private validateInput;
    createRenderRoot(): this;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wa-wheel-picker': WaWheelPicker;
    }
}
