import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import './wa-text-field';

export default {
  title: 'Atoms/TextField',
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
  args: {
    required: false
  }
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
