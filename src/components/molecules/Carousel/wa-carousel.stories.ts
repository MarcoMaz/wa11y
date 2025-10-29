import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import './wa-carousel';

const slides = html`
  <h3>Slide 1</h3>
  <div>Content inside slide 1 <a href="#">i am link</a></div>
  <p>Caption 1</p>
  <h3>Slide 2</h3>
  <div>Content inside slide 2</div>
  <p>Caption 2</p>

  <h3>Slide 3</h3>
  <div>Content inside slide 3</div>
  <p>Caption 3</p>
`;

const ARROW_PREV = html`<template data-prev>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    aria-hidden="true"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
</template>`;

const ARROW_NEXT = html`<template data-next>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    aria-hidden="true"
  >
    <path d="M9 6l6 6-6 6" />
  </svg>
</template>`;

const DOT = html`<template data-dot>
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <circle cx="8" cy="8" r="8" />
  </svg>
</template>`;

const DOT_ACTIVE = html`<template data-dot-active>
  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
    <circle cx="5" cy="5" r="5" />
  </svg>
</template>`;

// Single factory to keep stories DRY
const makeCarousel = ({
  navigation = false,
  arrows = false,
  dots = false,
}: { navigation?: boolean; arrows?: boolean; dots?: boolean } = {}) => {
  return html`<wa-carousel ?navigation=${navigation}>
    ${arrows ? html`${ARROW_PREV}${ARROW_NEXT}` : ''}
    ${dots ? html`${DOT}${DOT_ACTIVE}` : ''} ${slides}
  </wa-carousel>`;
};

const OverflowHiddenDecorator = (Story: any) =>
  html`<div style="overflow:hidden;">${Story()}</div>`;

export default {
  title: 'Molecules/Carousel',
  parameters: {
    layout: 'centered',
  },
  args: {},
  argTypes: {},
} as Meta;

export const CarouselDefault: StoryObj = {
  name: 'Carousel Default',
  render: () => makeCarousel(),
  decorators: [OverflowHiddenDecorator],
};

export const CarouselWithNavigation: StoryObj = {
  name: 'Carousel With Navigation',
  render: () => makeCarousel({ navigation: true }),
  decorators: [OverflowHiddenDecorator],
};

export const CarouselWithCustomArrows: StoryObj = {
  name: 'Carousel With Custom Arrows',
  render: () => makeCarousel({ navigation: true, arrows: true }),
  decorators: [OverflowHiddenDecorator],
};

export const CarouselWithCustomDots: StoryObj = {
  name: 'Carousel With CustomDots',
  render: () => makeCarousel({ navigation: true, dots: true }),
  decorators: [OverflowHiddenDecorator],
};
