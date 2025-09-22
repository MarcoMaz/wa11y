import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import './wa-input-text';

export default {
  title: 'Atoms/InputText',
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
    html`<wa-input-text
      .currentId="${currentId}"
      .name="${name}"
      .label="${label}"
      .placeholder="${placeholder}"
      .required="${required}"
    ></wa-input-text>`,
} as Meta;

export const InputTextDefault: StoryObj = {
  name: 'Input Text Default',
  args: {
    required: false,
  },
};

export const InputTextWithCustomId: StoryObj = {
  name: 'Input Text with custom id',
  args: {
    currentId: 'custom-id',
  },
};

export const InputTextWithCustomName: StoryObj = {
  name: 'Input Text with custom name',
  args: {
    name: 'custom-name',
  },
};

export const InputTextWithCustomLabel: StoryObj = {
  name: 'Input Text with custom label',
  args: {
    label: 'Custom label',
  },
};

export const InputTextWithCustomPlaceholder: StoryObj = {
  name: 'Input Text with custom placeholder',
  args: {
    placeholder: 'Custom placeholder',
  },
};

export const InputTextRequired: StoryObj = {
  name: 'Input Text required',
  args: {
    required: true,
  },
};
