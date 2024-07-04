import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

const WHEEL_PICKER_CLASS = 'WheelPicker';
const WHEEL_PICKER_INPUT_CLASS = "WheelPicker__input";
const WHEEL_PICKER_ITEMS_CLASS = 'WheelPicker__items';
const WHEEL_PICKER_ITEM_CLASS = 'WheelPicker__item';
const WHEEL_PICKER_AIM_CLASS = 'WheelPicker__aim';
const WHEEL_PICKER_WARNING_CLASS = 'WheelPicker__warning';
const WHEEL_PICKER_CENTER_CLASS = '-center';

@customElement('wa-wheel-picker')
export class WaWheelPicker extends LitElement {
  @property({ type: String, reflect: true }) currentId?: string;
  @property({ type: String, reflect: true }) label?: string;
  @property({ type: String, reflect: true }) name?: string;
  @property({ type: String, reflect: true }) warningId?: string;
  @property({ type: String, reflect: true }) warningText?: string;
  @property({ type: Number, reflect: true }) min?: number;
  @property({ type: Number, reflect: true }) max?: number;

  @query(`.${WHEEL_PICKER_CLASS}`) wheelPicker!: HTMLDivElement;
  @query(`.${WHEEL_PICKER_INPUT_CLASS}`) wheelPickerInput!: HTMLInputElement;
  @query(`.${WHEEL_PICKER_ITEMS_CLASS}`) wheelPickerItems!: HTMLDivElement;
  @query(`.${WHEEL_PICKER_WARNING_CLASS}`) wheelPickerWarning!: HTMLSpanElement;

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
      .map((beat) => `<span class="${WHEEL_PICKER_ITEM_CLASS}">${beat}</span>`)
      .join('');

    if (this.wheelPickerItems) {
      this.wheelPickerItems.innerHTML = spans;
    }

    const beatPickerAimElement = document.createElement('span');
    beatPickerAimElement.classList.add(WHEEL_PICKER_AIM_CLASS);

    if (this.wheelPickerItems) {
      this.wheelPickerItems.appendChild(beatPickerAimElement);
    }
  }

  private highlightCenterItem(element: HTMLElement): void {
    const pickerBounds = element.getBoundingClientRect();
    const centerLineY =
      window.scrollY + pickerBounds.top + pickerBounds.height / 2;

    const centerItem = Array.from(
      element.querySelectorAll(`.${WHEEL_PICKER_ITEM_CLASS}`)
    ).find((item) => {
      const itemBounds = item.getBoundingClientRect();
      const itemTopY = window.scrollY + itemBounds.top;
      const itemBottomY = window.scrollY + itemBounds.bottom;
      return itemTopY <= centerLineY && itemBottomY >= centerLineY;
    });

    element
      .querySelectorAll(`.${WHEEL_PICKER_ITEM_CLASS}`)
      .forEach((item) => item.classList.remove(WHEEL_PICKER_CENTER_CLASS));

    if (centerItem) centerItem.classList.add(WHEEL_PICKER_CENTER_CLASS);
  }

  private centerBeatOnLoad(): void {
    const min = this.min !== undefined ? this.min : 1;
    const max = this.max !== undefined ? this.max : 10;

    const defaultAimNumber = Math.floor((max - min) / 2) + 1;

    const verticalCenterItem = this.wheelPickerItems.querySelector(
      `.${WHEEL_PICKER_ITEM_CLASS}:nth-of-type(${defaultAimNumber})`
    ) as HTMLElement | null;

    if (verticalCenterItem) {
      const centerItemPositionY =
        verticalCenterItem.offsetTop -
        this.wheelPickerItems.offsetHeight / 2 +
        verticalCenterItem.offsetHeight / 2;

      requestAnimationFrame(() => {
        this.wheelPickerItems.scrollTop = centerItemPositionY;
        this.highlightCenterItem(this.wheelPickerItems);
      });
    }
  }

  private handleScroll(): void {
    this.highlightCenterItem(this.wheelPicker);

    const centerItem = this.wheelPicker.querySelector(
      `.${WHEEL_PICKER_ITEM_CLASS}.${WHEEL_PICKER_CENTER_CLASS}`
    );
    if (centerItem) {
      const value = centerItem.textContent;

      if (this.wheelPickerInput && value) {
        this.wheelPickerInput.value = value;
        this.validateInput();
      }
    }
  }

  private onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    const centerItem = this.wheelPickerItems.querySelector(
      `.${WHEEL_PICKER_ITEM_CLASS}:nth-of-type(${value})`
    ) as HTMLElement | null;

    if (centerItem) {
      const centerItemPositionY =
        centerItem.offsetTop -
        this.wheelPickerItems.offsetHeight / 2 +
        centerItem.offsetHeight / 2;

      requestAnimationFrame(() => {
        this.wheelPickerItems.scrollTop = centerItemPositionY;
        this.highlightCenterItem(this.wheelPickerItems);
        this.validateInput();
      });
    }
  }

  private validateInput() {
    if (this.wheelPickerInput && this.wheelPickerWarning) {
      const value = this.wheelPickerInput.valueAsNumber;
      const min = this.min !== undefined ? this.min : 1;
      const max = this.max !== undefined ? this.max : 10;

      if (isNaN(value) || value < min || value > max) {
        this.wheelPickerWarning.style.display = 'inline';
      } else {
        this.wheelPickerWarning.style.display = 'none';
      }
    }
  }

  createRenderRoot() {
    return this;
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
        class="${WHEEL_PICKER_INPUT_CLASS}"
        min="${min}"
        max="${max}"
        type="number"
        id="${ifDefined(currentId)}"
        name="${currentName}"
        @input="${this.onInputChange}"
        aria-describedby="${currentWarningId}"
      />
      <div class="${WHEEL_PICKER_CLASS}">
        <div
          tabindex="0"
          class="${WHEEL_PICKER_ITEMS_CLASS}"
          @scroll="${this.handleScroll}"
        ></div>
      </div>
      <span class="${WHEEL_PICKER_WARNING_CLASS}" id="${currentWarningId}"
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
