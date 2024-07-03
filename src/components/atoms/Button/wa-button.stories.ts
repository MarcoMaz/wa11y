import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import './wa-button';

export default {
  title: 'Atoms/Button',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: {
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
  render: ({ disabled, label, type }) =>
    html`<wa-button
      .disabled=${disabled}
      .type=${type}
      .label=${label}
      @onClick=${() => alert('Custom event fired')}
      >${label}</wa-button
    >`,
} as Meta;

export const ButtonWithDefaultLabel: StoryObj = {
  name: 'Button with default label',
  args: {
    disabled: false,
    type: 'button'
  },
};

export const ButtonWithCustomLabel: StoryObj = {
  name: 'Button with custom label',
  args: {
    disabled: false,
    type: 'button',
    label: 'custom label',
  },
};

export const ButtonDisabled: StoryObj = {
  name: 'Button Disabled',
  args: {
    disabled: true,
    type: 'button',
    label: 'button disabled',
  },
};

export const ButtonWithTypeSubmit: StoryObj = {
  name: 'Button with type submit',
  args: {
    disabled: false,
    type: 'submit',
    label: 'button with type submit',
  },
};

export const ButtonWithTypeReset: StoryObj = {
  name: 'Button with type reset',
  args: {
    disabled: false,
    type: 'reset',
    label: 'button with type reset',
  },
};
