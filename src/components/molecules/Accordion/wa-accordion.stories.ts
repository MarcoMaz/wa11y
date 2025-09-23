import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import './wa-accordion';

export default {
  title: 'Molecules/Accordion',
  parameters: {
    layout: 'centered',
  },
  args: {},
  argTypes: {},
  render: () => html` <wa-accordion></wa-accordion> `,
} as Meta;

export const AccordionDefault: StoryObj = {
  name: 'Accordion Default',
};
