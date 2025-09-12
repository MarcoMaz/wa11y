import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import './wa-input-radio';

export default {
  title: 'Atoms/InputRadio',
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
    contentText: {
      control: 'text',
    },
    focused: {
      control: 'boolean',
    },
  },
  render: ({ currentId, name, checked, contentText, focused }) =>
    html`<wa-input-radio
      .currentId=${currentId}
      .name="${name}"
      .checked="${checked}"
      .focused="${focused}"
      .contentText="${contentText}"
    ></wa-input-radio>`,
} as Meta;

export const InputRadioWithDefaultIdNameAndLabel: StoryObj = {
  name: 'InputRadio with default id, name and label',
  args: {
    checked: false,
    focused: false
  }
};

export const InputRadioWithCustomId: StoryObj = {
  name: 'InputRadio with custom id',
  args: {
    currentId: 'custom-id',
  },
};

export const InputRadioWithCustomName: StoryObj = {
  name: 'InputRadio with custom name',
  args: {
    name: 'custom-name',
  },
};

export const InputRadioWithCustomContentText: StoryObj = {
  name: 'InputRadio with custom content text',
  args: {
    contentText: 'Custom Content Text',
  },
};

export const InputRadioWithFocusedInput: StoryObj = {
  name: 'InputRadio with focused input',
  args: {
    focused: true,
  },
};

export const InputRadioWithSelectedInput: StoryObj = {
  name: 'InputRadio with selected input',
  args: {
    checked: true,
    focused: true,
  },
};
