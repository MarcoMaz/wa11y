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
  decorators: [
    (story) => html`
      <style>
        wa-radio {
          align-items: center;
          display: flex;
          height: 2rem;
          width: 100%;
        }

        wa-radio::part(input) {
          left: 0;
          opacity: 0;
          position: absolute;
          width: 0;
        }

        wa-radio::part(label) {
          align-items: center;
          display: flex;
          font-family: arial;
          font-size: 1rem;
          position: absolute;
          width: 100%;
        }

        wa-radio[focused]::part(label)::before {
          box-shadow: 0 0 0 2px var(--chrome-box-shadow);
          outline: 1px solid var(--chrome-outline);
        }

        wa-radio::part(label):hover {
          cursor: pointer;
        }

        wa-radio::part(label)::before,
        wa-radio[checked]::part(label)::after {
          border-radius: 50%;
          content: '';
          display: flex;
        }

        wa-radio::part(label)::before {
          border: 2px solid var(--radio--border-default-default);
          height: 1.5rem;
          position: relative;
          width: 1.5rem;
        }

        wa-radio::part(label):hover::before {
          border-color: var(--radio--border-default-hover);
        }

        wa-radio::part(label):active::before {
          border-color: var(--radio--border-default-active);
        }

        wa-radio[checked]::part(label)::after {
          background-color: var(--radio--border-selected-default);
          height: 1rem;
          left: 0.375rem;
          position: absolute;
          top: 0.375rem;
          width: 1rem;
        }

        wa-radio[checked]::part(label):hover::after {
          background-color: var(--radio--border-selected-hover);
        }

        wa-radio[checked]::part(label):active::after {
          background-color: var(--radio--border-default-active);
        }

        wa-radio::part(span) {
          padding-left: 0.25rem;
        }
      </style>
      ${story()}
    `,
  ],
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
