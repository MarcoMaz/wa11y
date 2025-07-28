import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import './wa-checkbox';

export default {
  title: 'Atoms/Checkbox',
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
    label: {
      control: "text"
    }
  },
  render: ({ currentId, name, checked, focused, label }) =>
    html` <wa-checkbox
      .currentId="${currentId}"
      .name="${name}"
      .checked="${checked}"
      .focused="${focused}"
      .label="${label}"
    ></wa-checkbox>`,
} as Meta;

export const CheckboxWithDefaultIdNameAndLabel: StoryObj = {
  name: 'Checkbox with default id, name and label',
  args: {
    checked: false,
    focused: false
  }
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
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            selector: '*:not(span)',
          },
        ],
      },
    },
  },
};
