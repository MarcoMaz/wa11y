import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import './wa-checkbox';

export default {
  title: 'Checkbox',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    currentId: {
      control: 'text',
    },
    name: {
      control: 'text',
    },
    checked: {
      control: 'boolean',
    },
    focused: {
      control: 'boolean',
    },
  },
  decorators: [
    (story) => html`
      <style>
        wa-checkbox {
          display: inline-flex;
        }

        wa-checkbox::part(label) {
          align-items: center;
          display: flex;
          height: var(--checkbox--square-size);
          min-width: 10rem;
          position: relative;
          width: var(--checkbox--square-size);
        }

        wa-checkbox::part(input) {
          position: absolute;
          left: 0;
          opacity: 0;
          width: 0;
        }

        wa-checkbox::part(label):before {
          border-radius: var(--checkbox--square-radius);
          content: '';
          display: flex;
          height: calc(
            var(--checkbox--square-size) - var(--checkbox--checkmark-size) * 2
          );
          border: var(--checkbox--square-border) solid
            var(--checkbox--square--border-default-default);
          position: absolute;
          width: calc(
            var(--checkbox--square-size) - var(--checkbox--checkmark-size) * 2
          );
        }

        wa-checkbox[focused]::part(label)::before {
          outline: 1px solid var(--chrome-outline);
          box-shadow: 0 0 0 2px var(--chrome-box-shadow);
        }

        wa-checkbox label {
          background: red;
        }

        wa-checkbox::part(label):hover {
          cursor: pointer;
        }

        wa-checkbox::part(label):hover:before {
          border-color: var(--checkbox--square--border-default-hover);
        }

        wa-checkbox::part(label):active:before {
          border-color: var(--checkbox--square--border-default-active);
        }

        wa-checkbox[checked]::part(label):before {
          background-color: var(--checkbox--square-border-selected-default);
          border: var(--checkbox--square-border) solid
            var(--checkbox--square-border-selected-default);
        }

        wa-checkbox[checked]::part(label):hover::before {
          background-color: var(--checkbox--square-border-selected-hover);
          border: var(--checkbox--square-border) solid
            var(--checkbox--square-border-selected-hover);
        }

        wa-checkbox[checked]::part(label):active:before {
          background-color: var(--checkbox--square-border-selected-active);
          border: var(--checkbox--square-border) solid
            var(--checkbox--square-border-selected-active);
        }

        wa-checkbox::part(label):after {
          border-bottom: var(--checkbox--checkmark-size) solid
            var(--checkbox--checkmark-color);
          border-left: var(--checkbox--checkmark-size) solid
            var(--checkbox--checkmark-color);
          display: none;
          height: var(--checkbox--checkmark-H);
          left: var(--checkbox--checkmark-X);
          position: absolute;
          top: var(--checkbox--checkmark-Y);
          transform: rotate(315deg);
          width: var(--checkbox--checkmark-W);
        }

        wa-checkbox[checked]::part(label):after {
          content: '';
          display: flex;
        }

        wa-checkbox::part(span) {
          left: 2.25rem;
          position: relative;
          font-size: 1rem;
          font-family: arial;
        }
      </style>
      ${story()}
    `,
  ],

  render: ({ currentId, name, checked, focused }) =>
    html` <wa-checkbox
      .currentId=${currentId}
      .name="${name}"
      .checked="${checked}"
      .focused="${focused}"
    ></wa-checkbox>`,
} as Meta;

export const CheckboxWithDefaultIdNameAndLabel: StoryObj = {
  name: 'Checkbox with default id, name and label',
};

export const CheckboxWithCustomId: StoryObj = {
  name: 'Checkbox with custom id',
  args: {
    currentId: 'custom-id',
  },
};

export const CheckboxWithCustomName: StoryObj = {
  name: 'Checkbox with custom name',
  args: {
    name: 'custom-name',
  },
};

export const CheckboxWithCustomLabel: StoryObj = {
  name: 'Checkbox with custom label',
  args: {
    label: 'Custom Label',
  },
  argTypes: {
    label: { control: 'text' },
  },
  render: ({ label }) => html`<wa-checkbox>${label}</wa-checkbox>`,
};

export const CheckboxWithFocusedInput: StoryObj = {
  name: 'Checkbox with focused input',
  args: {
    focused: true,
  },
};

export const CheckboxWithSelectedInput: StoryObj = {
  name: 'Checkbox with selected input',
  args: {
    checked: true,
    focused: true,
  },
};
