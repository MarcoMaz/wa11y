import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import './wa-radio';

export default {
  title: 'Atoms/Radio',
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
      control: 'text',
    },
  },
  render: ({ currentId, name, checked, focused, label }) =>
    html`<wa-radio
      .currentId=${currentId}
      .name="${name}"
      .checked="${checked}"
      .focused="${focused}"
      .label="${label}"
    ></wa-radio>`,
} as Meta;

export const RadioWithDefaultIdNameAndLabel: StoryObj = {
  name: 'Radio with default id, name and label',
  args: {
    checked: false,
    focused: false
  }
};

export const RadioWithCustomId: StoryObj = {
  name: 'Radio with custom id',
  args: {
    currentId: 'custom-id',
  },
};

export const RadioWithCustomName: StoryObj = {
  name: 'Radio with custom name',
  args: {
    name: 'custom-name',
  },
};

export const RadioWithCustomLabel: StoryObj = {
  name: 'Radio with custom label',
  args: {
    label: 'Custom Label',
  },
};

export const RadioWithFocusedInput: StoryObj = {
  name: 'Radio with focused input',
  args: {
    focused: true,
  },
};

export const RadioWithSelectedInput: StoryObj = {
  name: 'Radio with selected input',
  args: {
    checked: true,
    focused: true,
  },
};
