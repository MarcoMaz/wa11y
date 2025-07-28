import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import './wa-wheel-picker';

export default {
  title: 'Atoms/Wheel Picker',
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: false
          },
        ],
      },
      options: {},
    },
  },
  argTypes: {
    currentId: {
      control: 'text',
    },
    label: {
      control: 'text',
    },
    name: {
      control: 'text',
    },
    warningId: {
      control: 'text',
    },
    warningText: {
      control: 'text',
    },
    min: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
  },
  render: ({ currentId, label, name, warningId, warningText, min, max }) =>
    html`<wa-wheel-picker
      .currentId="${currentId}"
      .label="${label}"
      .name="${name}"
      .warningId="${warningId}"
      .warningText="${warningText}"
      .min="${min}"
      .max="${max}"
    ></wa-wheel-picker>`,
} as Meta;

export const WheelPickerDefault: StoryObj = {
  name: 'Wheel Picker Default',
  args: {
    min: 1,
    max: 10
  }
};

export const WheelPickerWithCustomId: StoryObj = {
  name: 'Wheel Picker with custom id',
  args: {
    currentId: 'custom-id',
  },
};

export const WheelPickerWithCustomLabel: StoryObj = {
  name: 'Wheel Picker with custom label',
  args: {
    label: 'custom label',
  },
};

export const WheelPickerWithCustomName: StoryObj = {
  name: 'Wheel Picker with custom name',
  args: {
    name: 'custom-name',
  },
};

export const WheelPickerWithCustomWarningId: StoryObj = {
  name: 'Wheel Picker with custom warning id',
  args: {
    warningId: 'custom-warning-id',
  },
};

export const WheelPickerWithCustomWarningText: StoryObj = {
  name: 'Wheel Picker with custom warning text',
  args: {
    warningText: 'custom warning text',
  },
};

export const WheelPickerFrom1to50: StoryObj = {
  name: 'Wheel Picker from 1 to 50',
  args: {
    max: 50,
  },
};

export const WheelPickerFrom10to50: StoryObj = {
  name: 'Wheel Picker from 10 to 50',
  args: {
    min: 10,
    max: 50,
  },
};
