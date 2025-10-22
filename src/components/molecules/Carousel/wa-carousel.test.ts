import { describe, it, expect, beforeEach } from 'vitest';
import './wa-carousel';
import type { WaCarouselProps } from './wa-carousel';

type WaCarouselTestEl = WaCarouselProps & {
  updateComplete: Promise<boolean>;
};

const DEFAULT_CAROUSEL_MARKUP = `
  <h3>Slide 1</h3><div>Content 1 <a href="#">link</a></div><p>Caption 1</p>
  <h3>Slide 2</h3><div>Content 2</div><p>Caption 2</p>
  <h3>Slide 3</h3><div>Content 3</div><p>Caption 3</p>
`;

const CAROUSEL_WITH_CUSTOM_ARROWS_MARKUP = `
  <template data-prev>
    <svg data-testid="prev-ico" viewBox="0 0 8 8" width="8" height="8" aria-hidden="true">
      <circle cx="4" cy="4" r="4" />
    </svg>
  </template>
  <template data-next>
    <svg data-testid="next-ico" viewBox="0 0 8 8" width="8" height="8" aria-hidden="true">
      <circle cx="4" cy="4" r="4" />
    </svg>
  </template>
  <h3>Slide 1</h3><div>Content 1</div><p>Caption 1</p>
  <h3>Slide 2</h3><div>Content 2</div><p>Caption 2</p>
  <h3>Slide 3</h3><div>Content 3</div><p>Caption 3</p>
`;

const CAROUSEL_WITH_CUSTOM_DOTS_MARKUP = `
  <template data-prev>
    <svg data-testid="prev-ico" viewBox="0 0 8 8" width="8" height="8" aria-hidden="true">
      <circle cx="4" cy="4" r="4" />
    </svg>
  </template>
  <template data-next>
    <svg data-testid="next-ico" viewBox="0 0 8 8" width="8" height="8" aria-hidden="true">
      <circle cx="4" cy="4" r="4" />
    </svg>
  </template>
  <template data-dot>
    <svg data-testid="dot" viewBox="0 0 8 8" width="6" height="6" aria-hidden="true">
      <circle cx="4" cy="4" r="4" />
    </svg>
  </template>
  <template data-dot-active>
    <svg data-testid="dot-active" viewBox="0 0 8 8" width="8" height="8" aria-hidden="true">
      <circle cx="4" cy="4" r="4" />
    </svg>
  </template>

  <h3>Slide 1</h3><div>Content 1</div><p>Caption 1</p>
  <h3>Slide 2</h3><div>Content 2</div><p>Caption 2</p>
  <h3>Slide 3</h3><div>Content 3</div><p>Caption 3</p>
`;

describe('wa-carousel', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('Default', () => {
    it('renders correctly', async () => {
      const carousel = document.createElement(
        'wa-carousel'
      ) as WaCarouselTestEl;
      carousel.innerHTML = DEFAULT_CAROUSEL_MARKUP;
      document.body.appendChild(carousel);
      await carousel.updateComplete;

      // Root section.carousel
      const section = carousel.querySelector('.carousel') as HTMLElement | null;
      expect(section).toBeTruthy();

      expect(section!.tagName).toBe('SECTION');
      expect(section!.getAttribute('aria-roledescription')).toBe('carousel');
      expect(section!.getAttribute('aria-label')).toBe('carousel');

      // Controls
      const controls = section!.querySelector(
        '.carousel__controls'
      ) as HTMLDivElement | null;
      expect(controls).toBeTruthy();

      // Arrows buttons
      const arrowsButtonsWrap = section!.querySelector(
        '.carousel__arrows-buttons'
      ) as HTMLDivElement | null;
      expect(arrowsButtonsWrap).toBeTruthy();

      const previousArrowButton = arrowsButtonsWrap!.querySelector(
        'button[aria-label="Previous slide"]'
      ) as HTMLButtonElement | null;
      expect(previousArrowButton).toBeTruthy();
      expect(previousArrowButton!.getAttribute('aria-label')).toBe(
        'Previous slide'
      );

      const defaultPreviousArrowSpan = previousArrowButton!.querySelector(
        'span[aria-hidden="true"]'
      );
      expect(defaultPreviousArrowSpan).not.toBeNull();
      expect(defaultPreviousArrowSpan!.textContent).toBe('←');

      const nextArrowButton = arrowsButtonsWrap!.querySelector(
        'button[aria-label="Next slide"]'
      ) as HTMLButtonElement | null;
      expect(nextArrowButton).toBeTruthy();
      expect(nextArrowButton!.getAttribute('aria-label')).toBe('Next slide');

      const defaultNextArrowSpan = nextArrowButton!.querySelector(
        'span[aria-hidden="true"]'
      );
      expect(defaultNextArrowSpan).not.toBeNull();
      expect(defaultNextArrowSpan!.textContent).toBe('→');

      // Slides container
      const slidesContainer = section!.querySelector(
        '.carousel__slides'
      ) as HTMLDivElement | null;
      expect(slidesContainer).toBeTruthy();
      expect(slidesContainer!.id).toMatch(/^slides-container-/);
      expect(slidesContainer?.getAttribute('aria-atomic')).toBe('false');
      expect(slidesContainer?.getAttribute('aria-live')).toBe('polite');

      expect(previousArrowButton!.getAttribute('aria-controls')).toBe(
        slidesContainer!.id
      );
      expect(nextArrowButton!.getAttribute('aria-controls')).toBe(
        slidesContainer!.id
      );

      // Slides
      const slides = Array.from(
        slidesContainer!.querySelectorAll('.carousel__slide')
      ) as HTMLDivElement[];
      expect(slides.length).toBe(3);

      slides.forEach((slide, idx) => {
        expect(slide.getAttribute('role')).toBe('group');
        expect(slide.getAttribute('aria-roledescription')).toBe('slide');
        expect(slide.id).toMatch(/^slide-/);
        expect(slide.getAttribute('aria-label')).toBe(`${idx + 1} of 3`);

        const header = slide.querySelector(
          'h2,h3,h4,h5,h6'
        ) as HTMLHeadingElement | null;
        expect(header).toBeTruthy();

        const caption = slide.querySelector(
          ':scope > p.carousel__caption'
        ) as HTMLParagraphElement | null;
        expect(caption).toBeTruthy();

        const captionId = caption!.getAttribute('id');
        expect(captionId).toBeTruthy();
        expect(captionId).not.toBe('');

        const headerButton = header!.querySelector(
          'button'
        ) as HTMLButtonElement | null;
        expect(headerButton).toBeTruthy();
        expect(headerButton!.getAttribute('aria-describedby')).toContain(
          caption!.id
        );

        const contentDivs = Array.from(
          slide.querySelectorAll(':scope > div')
        ) as HTMLDivElement[];
        expect(contentDivs.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe('With Navigation', () => {
    it('renders correctly', async () => {
      const carousel = document.createElement(
        'wa-carousel'
      ) as WaCarouselTestEl;
      carousel.navigation = true;

      carousel.innerHTML = DEFAULT_CAROUSEL_MARKUP;
      document.body.appendChild(carousel);
      await carousel.updateComplete;

      // Root section.carousel
      const section = carousel.querySelector('.carousel') as HTMLElement | null;
      expect(section).toBeTruthy();

      expect(section!.tagName).toBe('SECTION');
      expect(section!.getAttribute('aria-roledescription')).toBe('carousel');
      expect(section!.getAttribute('aria-label')).toBe('carousel');

      // Controls
      const controls = section!.querySelector(
        '.carousel__controls'
      ) as HTMLDivElement | null;
      expect(controls).toBeTruthy();

      // Arrows buttons
      const arrowsButtonsWrap = section!.querySelector(
        '.carousel__arrows-buttons'
      ) as HTMLDivElement | null;
      expect(arrowsButtonsWrap).toBeTruthy();

      const previousArrowButton = arrowsButtonsWrap!.querySelector(
        'button[aria-label="Previous slide"]'
      ) as HTMLButtonElement | null;
      expect(previousArrowButton).toBeTruthy();
      expect(previousArrowButton!.getAttribute('aria-label')).toBe(
        'Previous slide'
      );

      const defaultPreviousArrowSpan = previousArrowButton!.querySelector(
        'span[aria-hidden="true"]'
      );
      expect(defaultPreviousArrowSpan).not.toBeNull();
      expect(defaultPreviousArrowSpan!.textContent).toBe('←');

      const nextArrowButton = arrowsButtonsWrap!.querySelector(
        'button[aria-label="Next slide"]'
      ) as HTMLButtonElement | null;
      expect(nextArrowButton).toBeTruthy();
      expect(nextArrowButton!.getAttribute('aria-label')).toBe('Next slide');

      const defaultNextArrowSpan = nextArrowButton!.querySelector(
        'span[aria-hidden="true"]'
      );
      expect(defaultNextArrowSpan).not.toBeNull();
      expect(defaultNextArrowSpan!.textContent).toBe('→');

      // Dots
      const navigation = controls!.querySelector(
        '.carousel__navigation'
      ) as HTMLDivElement | null;
      expect(navigation).toBeTruthy();
      expect(navigation!.getAttribute('role')).toBe('tablist');
      expect(navigation!.getAttribute('aria-label')).toBe('slides');

      const dots = Array.from(
        navigation!.querySelectorAll('button[role="tab"]')
      ) as HTMLButtonElement[];
      expect(dots.length).toBe(3);

      // Slides container
      const slidesContainer = section!.querySelector(
        '.carousel__slides'
      ) as HTMLDivElement | null;
      expect(slidesContainer).toBeTruthy();
      expect(slidesContainer!.id).toMatch(/^slides-container-/);
      expect(slidesContainer?.getAttribute('aria-atomic')).toBe('false');
      expect(slidesContainer?.getAttribute('aria-live')).toBe('polite');

      expect(previousArrowButton!.getAttribute('aria-controls')).toBe(
        slidesContainer!.id
      );
      expect(nextArrowButton!.getAttribute('aria-controls')).toBe(
        slidesContainer!.id
      );

      // Slides
      const slides = Array.from(
        slidesContainer!.querySelectorAll('.carousel__slide')
      ) as HTMLDivElement[];
      expect(slides.length).toBe(3);

      slides.forEach((slide, idx) => {
        expect(slide.getAttribute('role')).toBe('group');
        expect(slide.getAttribute('aria-roledescription')).toBe('slide');
        expect(slide.id).toMatch(/^slide-/);
        expect(slide.getAttribute('aria-label')).toBe(`${idx + 1} of 3`);

        const header = slide.querySelector(
          'h2,h3,h4,h5,h6'
        ) as HTMLHeadingElement | null;
        expect(header).toBeTruthy();

        const caption = slide.querySelector(
          ':scope > p.carousel__caption'
        ) as HTMLParagraphElement | null;
        expect(caption).toBeTruthy();

        const captionId = caption!.getAttribute('id');
        expect(captionId).toBeTruthy();
        expect(captionId).not.toBe('');

        const headerButton = header!.querySelector(
          'button'
        ) as HTMLButtonElement | null;
        expect(headerButton).toBeTruthy();
        expect(headerButton!.getAttribute('aria-describedby')).toContain(
          caption!.id
        );

        const contentDivs = Array.from(
          slide.querySelectorAll(':scope > div')
        ) as HTMLDivElement[];
        expect(contentDivs.length).toBeGreaterThanOrEqual(1);
      });

      dots.forEach((dot, index) => {
        expect(dot.tagName).toBe('BUTTON');
        expect(dot.type).toBe('button');
        expect(dot.role).toBe('tab');

        const controlsId = dot.getAttribute('aria-controls');
        expect(controlsId).toBe(slides[index].id);

        const targetSlide = section!.querySelector(`#${controlsId}`);
        expect(targetSlide).toBe(slides[index]);

        const innerSpan = dot.querySelector('span[aria-hidden="true"]');
        expect(innerSpan).toBeTruthy();
        expect(innerSpan!.textContent?.trim()).toBe('•');
      });
    });
  });

  describe('With Custom Arrows', () => {
    it('renders correctly', async () => {
      const carousel = document.createElement(
        'wa-carousel'
      ) as WaCarouselTestEl;
      carousel.navigation = true;

      carousel.innerHTML = CAROUSEL_WITH_CUSTOM_ARROWS_MARKUP;
      document.body.appendChild(carousel);
      await carousel.updateComplete;

      // Root section.carousel
      const section = carousel.querySelector('.carousel') as HTMLElement | null;
      expect(section).toBeTruthy();

      expect(section!.tagName).toBe('SECTION');
      expect(section!.getAttribute('aria-roledescription')).toBe('carousel');
      expect(section!.getAttribute('aria-label')).toBe('carousel');

      // Controls
      const controls = section!.querySelector(
        '.carousel__controls'
      ) as HTMLDivElement | null;
      expect(controls).toBeTruthy();

      // Arrows buttons
      const arrowsButtonsWrap = section!.querySelector(
        '.carousel__arrows-buttons'
      ) as HTMLDivElement | null;
      expect(arrowsButtonsWrap).toBeTruthy();

      const previousArrowButton = arrowsButtonsWrap!.querySelector(
        'button[aria-label="Previous slide"]'
      ) as HTMLButtonElement | null;
      expect(previousArrowButton).toBeTruthy();
      expect(previousArrowButton!.getAttribute('aria-label')).toBe(
        'Previous slide'
      );

      const customPrevArrowButton = previousArrowButton!.querySelector(
        '[data-testid="prev-ico"]'
      );
      expect(customPrevArrowButton).toBeTruthy();

      const nextArrowButton = arrowsButtonsWrap!.querySelector(
        'button[aria-label="Next slide"]'
      ) as HTMLButtonElement | null;
      expect(nextArrowButton).toBeTruthy();
      expect(nextArrowButton!.getAttribute('aria-label')).toBe('Next slide');

      const customNextArrowButton = nextArrowButton!.querySelector(
        '[data-testid="next-ico"]'
      );
      expect(customNextArrowButton).toBeTruthy();

      // Dots
      const navigation = controls!.querySelector(
        '.carousel__navigation'
      ) as HTMLDivElement | null;
      expect(navigation).toBeTruthy();
      expect(navigation!.getAttribute('role')).toBe('tablist');
      expect(navigation!.getAttribute('aria-label')).toBe('slides');

      const dots = Array.from(
        navigation!.querySelectorAll('button[role="tab"]')
      ) as HTMLButtonElement[];
      expect(dots.length).toBe(3);

      // Slides container
      const slidesContainer = section!.querySelector(
        '.carousel__slides'
      ) as HTMLDivElement | null;
      expect(slidesContainer).toBeTruthy();
      expect(slidesContainer!.id).toMatch(/^slides-container-/);
      expect(slidesContainer?.getAttribute('aria-atomic')).toBe('false');
      expect(slidesContainer?.getAttribute('aria-live')).toBe('polite');

      expect(previousArrowButton!.getAttribute('aria-controls')).toBe(
        slidesContainer!.id
      );
      expect(nextArrowButton!.getAttribute('aria-controls')).toBe(
        slidesContainer!.id
      );

      // Slides
      const slides = Array.from(
        slidesContainer!.querySelectorAll('.carousel__slide')
      ) as HTMLDivElement[];
      expect(slides.length).toBe(3);

      slides.forEach((slide, idx) => {
        expect(slide.getAttribute('role')).toBe('group');
        expect(slide.getAttribute('aria-roledescription')).toBe('slide');
        expect(slide.id).toMatch(/^slide-/);
        expect(slide.getAttribute('aria-label')).toBe(`${idx + 1} of 3`);

        const header = slide.querySelector(
          'h2,h3,h4,h5,h6'
        ) as HTMLHeadingElement | null;
        expect(header).toBeTruthy();

        const caption = slide.querySelector(
          ':scope > p.carousel__caption'
        ) as HTMLParagraphElement | null;
        expect(caption).toBeTruthy();

        const captionId = caption!.getAttribute('id');
        expect(captionId).toBeTruthy();
        expect(captionId).not.toBe('');

        const headerButton = header!.querySelector(
          'button'
        ) as HTMLButtonElement | null;
        expect(headerButton).toBeTruthy();
        expect(headerButton!.getAttribute('aria-describedby')).toContain(
          caption!.id
        );

        const contentDivs = Array.from(
          slide.querySelectorAll(':scope > div')
        ) as HTMLDivElement[];
        expect(contentDivs.length).toBeGreaterThanOrEqual(1);
      });

      dots.forEach((dot, index) => {
        expect(dot.tagName).toBe('BUTTON');
        expect(dot.type).toBe('button');
        expect(dot.role).toBe('tab');

        const controlsId = dot.getAttribute('aria-controls');
        expect(controlsId).toBe(slides[index].id);

        const targetSlide = section!.querySelector(`#${controlsId}`);
        expect(targetSlide).toBe(slides[index]);

        const innerSpan = dot.querySelector('span[aria-hidden="true"]');
        expect(innerSpan).toBeTruthy();
        expect(innerSpan!.textContent?.trim()).toBe('•');
      });
    });
  });

  describe('With Custom Dots', () => {
    it('renders correctly', async () => {
      const carousel = document.createElement(
        'wa-carousel'
      ) as WaCarouselTestEl;
      carousel.navigation = true;

      carousel.innerHTML = CAROUSEL_WITH_CUSTOM_DOTS_MARKUP;
      document.body.appendChild(carousel);
      await carousel.updateComplete;

      // Root section.carousel
      const section = carousel.querySelector('.carousel') as HTMLElement | null;
      expect(section).toBeTruthy();

      expect(section!.tagName).toBe('SECTION');
      expect(section!.getAttribute('aria-roledescription')).toBe('carousel');
      expect(section!.getAttribute('aria-label')).toBe('carousel');

      // Controls
      const controls = section!.querySelector(
        '.carousel__controls'
      ) as HTMLDivElement | null;
      expect(controls).toBeTruthy();

      // Arrows buttons
      const arrowsButtonsWrap = section!.querySelector(
        '.carousel__arrows-buttons'
      ) as HTMLDivElement | null;
      expect(arrowsButtonsWrap).toBeTruthy();

      const previousArrowButton = arrowsButtonsWrap!.querySelector(
        'button[aria-label="Previous slide"]'
      ) as HTMLButtonElement | null;
      expect(previousArrowButton).toBeTruthy();
      expect(previousArrowButton!.getAttribute('aria-label')).toBe(
        'Previous slide'
      );

      const customPrevArrowButton = previousArrowButton!.querySelector(
        '[data-testid="prev-ico"]'
      );
      expect(customPrevArrowButton).toBeTruthy();

      const nextArrowButton = arrowsButtonsWrap!.querySelector(
        'button[aria-label="Next slide"]'
      ) as HTMLButtonElement | null;
      expect(nextArrowButton).toBeTruthy();
      expect(nextArrowButton!.getAttribute('aria-label')).toBe('Next slide');

      const customNextArrowButton = nextArrowButton!.querySelector(
        '[data-testid="next-ico"]'
      );
      expect(customNextArrowButton).toBeTruthy();

      // Dots
      const navigation = controls!.querySelector(
        '.carousel__navigation'
      ) as HTMLDivElement | null;
      expect(navigation).toBeTruthy();
      expect(navigation!.getAttribute('role')).toBe('tablist');
      expect(navigation!.getAttribute('aria-label')).toBe('slides');

      const dots = Array.from(
        navigation!.querySelectorAll('button[role="tab"]')
      ) as HTMLButtonElement[];
      expect(dots.length).toBe(3);

      // Slides container
      const slidesContainer = section!.querySelector(
        '.carousel__slides'
      ) as HTMLDivElement | null;
      expect(slidesContainer).toBeTruthy();
      expect(slidesContainer!.id).toMatch(/^slides-container-/);
      expect(slidesContainer?.getAttribute('aria-atomic')).toBe('false');
      expect(slidesContainer?.getAttribute('aria-live')).toBe('polite');

      expect(previousArrowButton!.getAttribute('aria-controls')).toBe(
        slidesContainer!.id
      );
      expect(nextArrowButton!.getAttribute('aria-controls')).toBe(
        slidesContainer!.id
      );

      // Slides
      const slides = Array.from(
        slidesContainer!.querySelectorAll('.carousel__slide')
      ) as HTMLDivElement[];
      expect(slides.length).toBe(3);

      slides.forEach((slide, idx) => {
        expect(slide.getAttribute('role')).toBe('group');
        expect(slide.getAttribute('aria-roledescription')).toBe('slide');
        expect(slide.id).toMatch(/^slide-/);
        expect(slide.getAttribute('aria-label')).toBe(`${idx + 1} of 3`);

        const header = slide.querySelector(
          'h2,h3,h4,h5,h6'
        ) as HTMLHeadingElement | null;
        expect(header).toBeTruthy();

        const caption = slide.querySelector(
          ':scope > p.carousel__caption'
        ) as HTMLParagraphElement | null;
        expect(caption).toBeTruthy();

        const captionId = caption!.getAttribute('id');
        expect(captionId).toBeTruthy();
        expect(captionId).not.toBe('');

        const headerButton = header!.querySelector(
          'button'
        ) as HTMLButtonElement | null;
        expect(headerButton).toBeTruthy();
        expect(headerButton!.getAttribute('aria-describedby')).toContain(
          caption!.id
        );

        const contentDivs = Array.from(
          slide.querySelectorAll(':scope > div')
        ) as HTMLDivElement[];
        expect(contentDivs.length).toBeGreaterThanOrEqual(1);
      });

      dots.forEach((dot, index) => {
        expect(dot.tagName).toBe('BUTTON');
        expect(dot.type).toBe('button');
        expect(dot.role).toBe('tab');

        const controlsId = dot.getAttribute('aria-controls');
        expect(controlsId).toBe(slides[index].id);

        const targetSlide = section!.querySelector(`#${controlsId}`);
        expect(targetSlide).toBe(slides[index]);

        if (index === 0) {
          expect(dot.querySelector('[data-testid="dot-active"]')).toBeTruthy();
          expect(dot.querySelector('[data-testid="dot"]')).toBeFalsy();
        } else {
          expect(dot.querySelector('[data-testid="dot"]')).toBeTruthy();
          expect(dot.querySelector('[data-testid="dot-active"]')).toBeFalsy();
        }
      });
    });
  });
});

/*
const CAROUSEL_WITH_TEMPLATES = `
  <template data-prev>
    <svg data-testid="prev-ico" viewBox="0 0 8 8" width="8" height="8" aria-hidden="true">
      <circle cx="4" cy="4" r="4" />
    </svg>
  </template>
  <template data-next>
    <svg data-testid="next-ico" viewBox="0 0 8 8" width="8" height="8" aria-hidden="true">
      <circle cx="4" cy="4" r="4" />
    </svg>
  </template>
  <template data-dot>
    <svg data-testid="dot" viewBox="0 0 8 8" width="6" height="6" aria-hidden="true">
      <circle cx="4" cy="4" r="4" />
    </svg>
  </template>
  <template data-dot-active>
    <svg data-testid="dot-active" viewBox="0 0 8 8" width="8" height="8" aria-hidden="true">
      <circle cx="4" cy="4" r="4" />
    </svg>
  </template>

  <h3>Slide 1</h3><div>Content 1</div><p>Caption 1</p>
  <h3>Slide 2</h3><div>Content 2</div><p>Caption 2</p>
  <h3>Slide 3</h3><div>Content 3</div><p>Caption 3</p>
`;

describe('wa-carousel', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('Default', () => {
    });

    it('does NOT render navigation dots by default', async () => {
      const el = document.createElement('wa-carousel') as WaCarouselTestEl;
      el.innerHTML = DEFAULT_CAROUSEL_MARKUP;
      document.body.appendChild(el);
      await el.updateComplete;

      const nav = el.querySelector('.carousel__navigation');
      expect(nav).toBeFalsy();
    });
  });

  describe('With navigation + templates', () => {
    it('renders tablist dots with correct selection and uses templates', async () => {
      const el = document.createElement('wa-carousel') as WaCarouselTestEl;
      el.navigation = true;
      el.innerHTML = CAROUSEL_WITH_TEMPLATES;
      document.body.appendChild(el);
      await el.updateComplete;

      const section = el.querySelector('.carousel') as HTMLElement;
      const controls = section.querySelector('.carousel__controls')!;
      const nav = controls.querySelector('.carousel__navigation') as HTMLDivElement | null;
      expect(nav).toBeTruthy();
      expect(nav!.getAttribute('role')).toBe('tablist');

      const dots = Array.from(nav!.querySelectorAll('button[role="tab"]')) as HTMLButtonElement[];
      expect(dots.length).toBe(3);

      // first is selected by default (activeIndex=0)
      expect(dots[0].getAttribute('aria-selected')).toBe('true');
      expect(dots[1].getAttribute('aria-selected')).toBe('false');
      expect(dots[2].getAttribute('aria-selected')).toBe('false');

      // dot content comes from template(s)
      const hasTemplateDot =
        !!dots[0].querySelector('[data-testid="dot-active"]') ||
        !!dots[0].querySelector('[data-testid="dot"]');
      expect(hasTemplateDot).toBeTruthy();

      // prev/next buttons use templates too
      const prevIco = controls.querySelector('[data-testid="prev-ico"]');
      const nextIco = controls.querySelector('[data-testid="next-ico"]');
      expect(prevIco).toBeTruthy();
      expect(nextIco).toBeTruthy();

      // clicking next updates selection
      const nextBtn = controls.querySelector('button[aria-label="Next slide"]') as HTMLButtonElement;
      nextBtn.click();
      expect(dots[0].getAttribute('aria-selected')).toBe('false');
      expect(dots[1].getAttribute('aria-selected')).toBe('true');
      expect(dots[2].getAttribute('aria-selected')).toBe('false');

      nextBtn.click();
      expect(dots[0].getAttribute('aria-selected')).toBe('false');
      expect(dots[1].getAttribute('aria-selected')).toBe('false');
      expect(dots[2].getAttribute('aria-selected')).toBe('true');

      // clicking a dot selects it
      dots[0].click();
      expect(dots[0].getAttribute('aria-selected')).toBe('true');
      expect(dots[1].getAttribute('aria-selected')).toBe('false');
      expect(dots[2].getAttribute('aria-selected')).toBe('false');
    });
  });

  describe('A11y linking', () => {
    it('links header button to its caption via aria-describedby only for its slide', async () => {
      const el = document.createElement('wa-carousel') as WaCarouselTestEl;
      el.innerHTML = DEFAULT_CAROUSEL_MARKUP;
      document.body.appendChild(el);
      await el.updateComplete;

      const slides = Array.from(
        el.querySelectorAll('.carousel__slide')
      ) as HTMLDivElement[];

      slides.forEach((slide, idx) => {
        const headerBtn = slide.querySelector('h2,h3,h4,h5,h6 > button') as HTMLButtonElement | null;
        const caption = slide.querySelector(':scope > p.carousel__caption') as HTMLParagraphElement | null;
        expect(headerBtn).toBeTruthy();
        expect(caption).toBeTruthy();

        const desc = headerBtn!.getAttribute('aria-describedby') || '';
        expect(desc.split(/\s+/).includes(caption!.id)).toBe(true);

        // ensure it does NOT erroneously include other captions
        slides.forEach((other, j) => {
          if (j === idx) return;
          const otherCaption = other.querySelector(':scope > p.carousel__caption') as HTMLParagraphElement | null;
          if (otherCaption) {
            expect(desc.split(/\s+/).includes(otherCaption.id)).toBe(false);
          }
        });
      });
    });
  });
});

*/
