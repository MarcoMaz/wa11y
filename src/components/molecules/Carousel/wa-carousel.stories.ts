import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import './wa-carousel';

export default {
  title: 'Molecules/Carousel',
  parameters: {
    layout: 'centered',
  },
  args: {},
  argTypes: {},
  render: () => html`<wa-carousel>
    <h3>El 1</h3>
    <div>Slide 1</div>
    <h3>El 2</h3>
    <div>Slide 2</div>
    <h3>El 3</h3>
    <div>Slide 3</div>
  </wa-carousel>`,
} as Meta;

export const CarouselDefault: StoryObj = {
  name: 'Carousel Default',
};
