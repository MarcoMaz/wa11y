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
    <h3>Slide 1</h3>
    <div>Content inside slide 1</div>
    <h3>Slide 2</h3>
    <div>Content inside slide 2</div>
    <h3>Slide 3</h3>
    <div>Content inside slide 3</div>
  </wa-carousel>`,
} as Meta;

export const CarouselDefault: StoryObj = {
  name: 'Carousel Default',
};
