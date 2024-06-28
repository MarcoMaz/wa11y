import { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'

import './wa-button'

export default {
  title: 'Wa Button',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onOpen: { action: 'onClick' },
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

        wa-button::part(button):hover {
          background: var(--button--background-hover);
          cursor: pointer;
        }

        wa-button::part(button):active {
          background: var(--button--background-active);
        }
      </style>
      ${story()}
    `,
  ],

  render: () => html`<wa-button></wa-button>`,
} as Meta

export const Default: StoryObj = {
  name: 'Default',
  args: {
    name: 'Lit',
  },
}