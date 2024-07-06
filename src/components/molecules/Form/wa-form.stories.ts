import { Meta, StoryObj } from '@storybook/web-components';
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

export const FormWithMoreTextFields: StoryObj = {
  name: 'Form with more textfields',
  render: (args) => html`
    <wa-form .buttonLabel=${args.buttonLabel}>
      <wa-text-field label="Field 1" currentId="label-1" name="label-1"></wa-text-field>
      <wa-text-field label="Field 2" currentId="label-2" name="label-2"></wa-text-field>
      <wa-text-field label="Field 3" currentId="label-3" name="label-3"></wa-text-field>
    </wa-form>
  `,
};