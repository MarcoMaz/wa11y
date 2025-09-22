import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import './wa-form';

export default {
  title: 'Molecules/Form',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    buttonLabel: {
      control: "text"
    },
  },
  render: ({ buttonLabel }) => html`<wa-form .buttonLabel="${buttonLabel}"></wa-form>`,
} as Meta;

export const FormDefault: StoryObj = {
  name: 'Form default',
};

export const FormWithCustomButton: StoryObj = {
  name: "Form with custom button",
  args: {
    buttonLabel: "custom button label"
  }
}

export const FormWithMoreInputText: StoryObj = {
  name: 'Form with more input text',
  render: (args) => html`
    <wa-form .buttonLabel=${args.buttonLabel}>
      <wa-input-text label="Input Text 1" currentId="label-1" name="label-1"></wa-input-text>
      <wa-input-text label="Input Text 2" currentId="label-2" name="label-2"></wa-input-text>
      <wa-input-text label="Input Text 3" currentId="label-3" name="label-3"></wa-input-text>
    </wa-form>
  `,
};