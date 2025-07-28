import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import './wa-button';

export default {
  title: 'Atoms/Button',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isDisabled: {
      control: 'boolean',
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
    },
    label: {
      control: 'text',
    },
  },
  render: ({ isDisabled, label, type }) =>
    html`<wa-button
      .isDisabled=${isDisabled}
      .type=${type}
      .label=${label}
      @onClick=${() => alert('Custom event fired')}
    ></wa-button>`,
} as Meta;

export const ButtonWithDefaultLabel: StoryObj = {
  name: 'Button with default label',
  args: {
    isDisabled: false,
    type: 'button',
  },
};

export const ButtonWithCustomLabel: StoryObj = {
  name: 'Button with custom label',
  args: {
    isDisabled: false,
    type: 'button',
    label: 'custom label',
  },
};

export const ButtonDisabled: StoryObj = {
  name: 'Button Disabled',
  args: {
    isDisabled: true,
    type: 'button',
    label: 'button disabled',
  },
};

export const ButtonWithTypeSubmit: StoryObj = {
  name: 'Button with type submit',
  args: {
    isDisabled: false,
    type: 'submit',
    label: 'button with type submit',
  },
};

export const ButtonWithTypeReset: StoryObj = {
  name: 'Button with type reset',
  args: {
    isDisabled: false,
    type: 'reset',
    label: 'button with type reset',
  },
};
