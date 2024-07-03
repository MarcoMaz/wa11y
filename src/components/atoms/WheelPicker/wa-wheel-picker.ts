import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { wheelPickerStyles } from './wa-wheel-picker.styles';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement('wa-wheel-picker')
export class WaWheelPicker extends LitElement {
  @property({ type: String, reflect: true }) currentId?: string;
  @property({ type: String, reflect: true }) label?: string;
  @property({ type: String, reflect: true }) name?: string;
  @property({ type: String, reflect: true }) warningId?: string;
  @property({ type: String, reflect: true }) warningText?: string;
  @property({ type: Number, reflect: true }) min: number = 1;
  @property({ type: Number, reflect: true }) max: number = 10;

  @query('.BeatPicker') picker!: HTMLDivElement;
  @query('.BeatPicker__beats') pickerBeats!: HTMLDivElement;

  static styles = wheelPickerStyles;

  firstUpdated(): void {
    this.createElements();
    this.centerBeatOnLoad();
  }

  private createElements(): void {
    const missingNumbers = Array.from(
      { length: this.max - this.min + 1 },
      (_, i) => i + this.min
    );

    const spans = missingNumbers
      .map((beat) => `<span class="BeatPicker__item">${beat}</span>`)
      .join('');

    if (this.pickerBeats) {
      this.pickerBeats.innerHTML = spans;
    }

    const beatPickerAimElement = document.createElement('span');
    beatPickerAimElement.classList.add('BeatPicker__aim');

    if (this.pickerBeats) {
      this.pickerBeats.appendChild(beatPickerAimElement);
    }
  }

  private highlightCenterItem(element: HTMLElement): void {
    const pickerBounds = element.getBoundingClientRect();
    const centerLineY =
      window.scrollY + pickerBounds.top + pickerBounds.height / 2;

    const centerItem = Array.from(
      element.querySelectorAll('.BeatPicker__item')
    ).find((item) => {
      const itemBounds = item.getBoundingClientRect();
      const itemTopY = window.scrollY + itemBounds.top;
      const itemBottomY = window.scrollY + itemBounds.bottom;
      return itemTopY <= centerLineY && itemBottomY >= centerLineY;
    });

    element
      .querySelectorAll('.BeatPicker__item')
      .forEach((item) => item.classList.remove('-center'));

    if (centerItem) centerItem.classList.add('-center');
  }

  private centerBeatOnLoad(): void {
    const defaultAimNumber = Math.floor((this.max - this.min) / 2) + 1;

    const verticalCenterItem = this.pickerBeats.querySelector(
      `.BeatPicker__item:nth-of-type(${defaultAimNumber})`
    ) as HTMLElement | null;

    if (verticalCenterItem) {
      const centerItemPositionY =
        verticalCenterItem.offsetTop -
        this.pickerBeats.offsetHeight / 2 +
        verticalCenterItem.offsetHeight / 2;

      requestAnimationFrame(() => {
        this.pickerBeats.scrollTop = centerItemPositionY;
        this.highlightCenterItem(this.pickerBeats);
      });
    }
  }

  private handleScroll(): void {
    this.highlightCenterItem(this.picker);

    const centerItem = this.picker.querySelector('.BeatPicker__item.-center');
    if (centerItem) {
      const value = centerItem.textContent;
      const inputElement = this.shadowRoot?.querySelector('input');
      if (inputElement && value) {
        inputElement.value = value;
        this.validateInput();
      }
    }
  }

  private onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    const centerItem = this.pickerBeats.querySelector(
      `.BeatPicker__item:nth-of-type(${value})`
    ) as HTMLElement | null;

    if (centerItem) {
      const centerItemPositionY =
        centerItem.offsetTop -
        this.pickerBeats.offsetHeight / 2 +
        centerItem.offsetHeight / 2;

      requestAnimationFrame(() => {
        this.pickerBeats.scrollTop = centerItemPositionY;
        this.highlightCenterItem(this.pickerBeats);
        this.validateInput();
      });
    }
  }

  private validateInput() {
    const inputElement = this.shadowRoot?.querySelector('input');
    const warningElement = this.shadowRoot?.querySelector(
      '.warning'
    ) as HTMLSpanElement;

    if (inputElement && warningElement) {
      const value = inputElement.valueAsNumber;
      const min = this.min;
      const max = this.max;

      if (isNaN(value) || value < min || value > max) {
        warningElement.style.display = 'inline';
      } else {
        warningElement.style.display = 'none';
      }
    }
  }

  render() {
    const currentId = this.currentId || 'default-id';
    const currentLabel = this.label || 'default label';
    const currentName = this.name || 'defaultName';
    const currentWarningId = this.warningId || 'default-warning-id';
    const currentWarningText = this.warningText || 'default warning text';

    return html`
      <label for="${ifDefined(currentId)}">${currentLabel}</label>
      <input
        min="${this.min}"
        max="${this.max}"
        type="number"
        id="${ifDefined(currentId)}"
        name="${currentName}"
        @input="${this.onInputChange}"
        aria-describedby="${currentWarningId}"
      />
      <div class="BeatPicker">
        <div class="BeatPicker__beats" @scroll="${this.handleScroll}"></div>
      </div>
      <span class="warning" id="${currentWarningId}"
        >${currentWarningText}</span
      >
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-wheel-picker': WaWheelPicker;
  }
}
