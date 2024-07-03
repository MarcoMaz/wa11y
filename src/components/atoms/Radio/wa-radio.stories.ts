import { Meta, StoryObj } from '@storybook/web-components';
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
  },
  render: ({ currentId, name, checked, focused }) =>
    html`<wa-radio
      .currentId=${currentId}
      .name="${name}"
      .checked="${checked}"
      .focused="${focused}"
    ></wa-radio>`,
} as Meta;

export const RadioWithDefaultIdNameAndLabel: StoryObj = {
  name: 'Radio with default id, name and label',
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
  argTypes: {
    label: { control: 'text' },
  },
  render: ({ label }) => html`<wa-radio>${label}</wa-radio>`,
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
