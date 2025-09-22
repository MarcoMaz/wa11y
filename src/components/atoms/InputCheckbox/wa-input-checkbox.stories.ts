import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import './wa-input-checkbox';

export default {
  title: 'Atoms/InputCheckbox',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    contentText: {
      control: "text"
    },
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
  render: ({ currentId, name, checked, focused, contentText }) =>
    html` <wa-input-checkbox
      .currentId="${currentId}"
      .name="${name}"
      .checked="${checked}"
      .focused="${focused}"
      .contentText="${contentText}"
    ></wa-input-checkbox>`,
} as Meta;

export const InputCheckboxWithDefaultIdNameAndLabel: StoryObj = {
  name: 'InputCheckbox with default id, name and label',
  args: {
    checked: false,
    focused: false
  }
};

export const InputCheckboxWithCustomId: StoryObj = {
  name: 'InputCheckbox with custom id',
  args: {
    currentId: 'custom-id',
  },
};

export const InputCheckboxWithCustomName: StoryObj = {
  name: 'InputCheckbox with custom name',
  args: {
    name: 'custom-name',
  },
};

export const InputCheckboxWithCustomContentText: StoryObj = {
  name: 'InputCheckbox with custom content',
  args: {
    contentText: 'Custom Content',
  },
};

export const InputCheckboxWithFocusedInput: StoryObj = {
  name: 'InputCheckbox with focused input',
  args: {
    focused: true,
  },
};

export const InputCheckboxWithSelectedInput: StoryObj = {
  name: 'InputCheckbox with selected input',
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
