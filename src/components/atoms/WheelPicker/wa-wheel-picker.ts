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
  @property({ type: Number, reflect: true }) min?: number;
  @property({ type: Number, reflect: true }) max?: number;

  @query('.BeatPicker') picker!: HTMLDivElement;
  @query('.BeatPicker__beats') pickerBeats!: HTMLDivElement;

  static styles = wheelPickerStyles;

  firstUpdated(): void {
    this.createElements();
    this.centerBeatOnLoad();
  }

  private createElements(): void {
    const min = this.min !== undefined ? this.min : 1;
    const max = this.max !== undefined ? this.max : 10;
  
    const missingNumbers = Array.from(
      { length: max - min + 1 },
      (_, i) => i + min
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
    const min = this.min !== undefined ? this.min : 1;
    const max = this.max !== undefined ? this.max : 10;
  
    const defaultAimNumber = Math.floor((max - min) / 2) + 1;

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
      const min = this.min !== undefined ? this.min : 1;
      const max = this.max !== undefined ? this.max : 10;
  
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
    const min = this.min || 1;
    const max = this.max || 10;
  
    return html`
      <label for="${ifDefined(currentId)}">${currentLabel}</label>
      <input
        min="${min}"
        max="${max}"
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

/*
- Clean up the whole class
- Change the classnames of the component


RESOURCES:
- https://v10.carbondesignsystem.com/components/number-input/accessibility/
- https://designsystem.backbase.com/web-components/input-number/web#_interactive-demo
- https://carbondesignsystem.com/components/number-input/accessibility/ 

Future Feat: Aim is editable.
*/