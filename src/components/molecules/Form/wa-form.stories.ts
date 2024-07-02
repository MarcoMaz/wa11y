import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import './wa-form';

export default {
  title: 'Molecules/Form',
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
  decorators: [
    (story) => html`
      <style></style>
      ${story()}
    `,
  ],

  render: () => html` <wa-form></wa-form>`,
} as Meta;

export const FormDefault: StoryObj = {
  name: 'Form default',
};
