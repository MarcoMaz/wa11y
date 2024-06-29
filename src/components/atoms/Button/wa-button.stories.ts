import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import './wa-button';

export default {
  title: 'Button',
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
  decorators: [
    (story) => html`
      <style>
        wa-button::part(button) {
          display: inline-flex;
        }

        wa-button:hover {
          cursor: pointer;
        }

        wa-button[disabled]::part(button) {
          background: var(--button--background-disabled);
          color: var(--button--text-disabled);
          cursor: initial;
        }

        wa-button::part(button) {
          align-items: center;
          background: var(--button--background-default);
          border: 0;
          border-radius: 1rem;
          color: var(--button--text-default);
          display: inline-flex;
          font-size: 1rem;
          height: 2rem;
          padding: 0.5rem 0.75rem;
        }

        wa-button:not([disabled])::part(button):hover {
          background: var(--button--background-hover);
          cursor: pointer;
        }

        wa-button:not([disabled])::part(button):active {
          background: var(--button--background-active);
        }
      </style>
      ${story()}
    `,
  ],

  render: ({ disabled, label, type }) =>
    html`<wa-button
      ?disabled=${disabled}
      type=${type}
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
