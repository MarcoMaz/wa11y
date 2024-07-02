import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import './wa-text-field';

export default {
  title: 'Atoms/Text Field',
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
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    required: {
      control: 'boolean',
    },
  },
  decorators: [
    (story) => html`
      <style>
        wa-text-field {
          display: grid;
        }

        wa-text-field::part(label) {
          display: flex;
          font-family: arial;
          font-size: var(--text-field--font-default);
          margin-bottom: 0.25rem;
        }

        wa-text-field::part(input) {
          border: 0.125rem solid var(--text-field--border-default-default);
          border-radius: 0.375rem;
          font-size: var(--text-field--font-default);
          padding: 0.5rem;
        }

        wa-text-field::part(input):hover {
          border-color: var(--text-field--border-default-hover);
        }

        wa-text-field::part(input)::placeholder {
          color: var(--text-field--border-default-hover);
        }
      </style>
      ${story()}
    `,
  ],

  render: ({ currentId, name, label, placeholder, required }) =>
    html`<wa-text-field
      .currentId="${currentId}"
      .name="${name}"
      .label="${label}"
      .placeholder="${placeholder}"
      .required="${required}"
    ></wa-text-field>`,
} as Meta;

export const TextFieldDefault: StoryObj = {
  name: 'Text Field Default',
};

export const TextFieldWithCustomId: StoryObj = {
  name: 'Text Field with custom id',
  args: {
    currentId: 'custom-id',
  },
};

export const TextFieldWithCustomName: StoryObj = {
  name: 'Text Field with custom name',
  args: {
    name: 'custom-name',
  },
};

export const TextFieldWithCustomLabel: StoryObj = {
  name: 'Text Field with custom label',
  args: {
    label: 'Custom label',
  },
};

export const TextFieldWithCustomPlaceholder: StoryObj = {
  name: 'Text Field with custom placeholder',
  args: {
    placeholder: 'Custom placeholder',
  },
};

export const TextFieldRequired: StoryObj = {
  name: 'Text Field required',
  args: {
    required: true,
  },
};
