import { Meta, StoryObj } from '@storybook/web-components';
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
  },
  render: ({ currentId, name, checked, focused }) =>
    html` <wa-checkbox
      .currentId="${currentId}"
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
