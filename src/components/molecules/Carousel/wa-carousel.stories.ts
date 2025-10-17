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
  render: () => html`<wa-carousel navigation>
    <!-- <template data-prev>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </template>
    <template data-next>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M9 6l6 6-6 6" />
      </svg>
    </template> -->
    <template data-dot>
      <!-- default dot svg/html -->
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="8" />
      </svg>
    </template>
    <template data-dot-active>
      <!-- active dot svg/html -->
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
        <circle cx="5" cy="5" r="5" />
      </svg>
    </template>
    <h3>Slide 1</h3>
    <div>Content inside slide 1 <a href="#">i am link</a></div>
    <h3>Slide 2</h3>
    <div>Content inside slide 2</div>
    <h3>Slide 3</h3>
    <div>Content inside slide 3</div>
  </wa-carousel>`,
} as Meta;

export const CarouselDefault: StoryObj = {
  name: 'Carousel Default',
};
