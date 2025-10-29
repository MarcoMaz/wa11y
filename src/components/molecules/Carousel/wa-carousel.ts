import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { DynamicStyleMixin } from '../../../mixins/DynamicStyleMixin';

export interface WaCarouselProps extends HTMLElement {
  activeIndex?: number;
  ariaLabel: string | null;
  navigation?: boolean;
}

const CAROUSEL_CLASS: string = 'carousel';
const CAROUSEL_CONTROLS_CLASS: string = 'carousel__controls';
const CAROUSEL_ARROWS_BUTTONS_CLASS: string = 'carousel__arrows-buttons';
const CAROUSEL_NAVIGATION_CLASS: string = 'carousel__navigation';
const CAROUSEL_SLIDES_CLASS: string = 'carousel__slides';
const CAROUSEL_SLIDE_CLASS: string = 'carousel__slide';
const CAROUSEL_CAPTION_CLASS: string = 'carousel__caption';

@customElement('wa-carousel')
export class WaCarousel
  extends DynamicStyleMixin(LitElement)
  implements WaCarouselProps
{
  private _uid = Math.random().toString(36).slice(2);

  @property({ type: String, reflect: true }) ariaLabel: string | null =
    'carousel';
  @property({ type: Boolean, reflect: true })
  navigation = false;
  @property({ type: Number, reflect: true })
  activeIndex = 0;

  @query(`.${CAROUSEL_CLASS}`)
  carousel!: HTMLDivElement;
  @query(`.${CAROUSEL_CONTROLS_CLASS}`) carouselControls!: HTMLDivElement;
  @query(`.${CAROUSEL_ARROWS_BUTTONS_CLASS}`)
  carouselArrowsButtons!: HTMLDivElement;
  @query(`.${CAROUSEL_NAVIGATION_CLASS}`) carouselNavigation!: HTMLDivElement;
  @query(`.${CAROUSEL_SLIDES_CLASS}`) carouselSlides!: HTMLDivElement;
  @query(`.${CAROUSEL_SLIDE_CLASS}`) carouselSlide!: HTMLDivElement;
  @query(`.${CAROUSEL_CAPTION_CLASS}`) carouselCaption!: HTMLDivElement;

  private applyDefaultAndMappedClass(
    el: HTMLElement,
    baseClass: string,
    mapKey: string
  ) {
    if (!el) return;
    try {
      el.classList.add(baseClass);
      const mapped = this.applyClassMap?.(mapKey);
      if (typeof mapped === 'string' && mapped.trim()) {
        // allow mapped to be a space-separated list
        mapped
          .trim()
          .split(/\s+/)
          .forEach((c) => el.classList.add(c));
      }
    } catch {
      /* no-op */
    }
  }

  private scrollToActiveSlide() {
    const slides = this.carouselSlides?.querySelectorAll(
      `.${CAROUSEL_SLIDE_CLASS}`
    );
    if (!slides?.length) return;
    const target = slides[this.activeIndex];
    if (target && typeof target.scrollIntoView === 'function') {
      target.scrollIntoView({ behavior: 'smooth', inline: 'start' });
    }
  }

  // Render into the light DOM instead of a shadow root, so user-provided children remain accessible
  createRenderRoot() {
    return this;
  }

  // Required by LitElement, but unused — all DOM setup happens manually in firstUpdated()
  render() {
    return html``;
  }

  firstUpdated() {
    const baseId = this.id && this.id.trim() ? this.id : this._uid;

    // Snapshot original children (expect triples: heading + content + caption)
    const childrenSnapshot = Array.from(this.children) as HTMLElement[];
    if (childrenSnapshot.length === 0) return;
    const contentNodes = childrenSnapshot.filter(
      (el) => el.tagName !== 'TEMPLATE'
    ) as HTMLElement[];

    // Root
    const sectionRoot = document.createElement('section') as HTMLElement;
    this.applyDefaultAndMappedClass(sectionRoot, CAROUSEL_CLASS, 'carousel');
    sectionRoot.setAttribute('aria-roledescription', 'carousel');
    sectionRoot.setAttribute('aria-label', this.ariaLabel || 'carousel');
    this.insertBefore(sectionRoot, childrenSnapshot[0] ?? null);

    // Controls
    const controls = document.createElement('div') as HTMLDivElement;
    this.applyDefaultAndMappedClass(
      controls,
      CAROUSEL_CONTROLS_CLASS,
      'carousel__controls'
    );
    sectionRoot.appendChild(controls);

    // Arrows Buttons
    const arrowsButtons = document.createElement('div') as HTMLDivElement;
    this.applyDefaultAndMappedClass(
      arrowsButtons,
      CAROUSEL_ARROWS_BUTTONS_CLASS,
      'carousel__arrows-buttons'
    );
    controls.appendChild(arrowsButtons);

    // Prev button
    const prevButton = document.createElement('button') as HTMLButtonElement;
    prevButton.type = 'button';
    prevButton.setAttribute('aria-label', 'Previous slide');
    arrowsButtons.appendChild(prevButton);

    // Next button
    const nextButton = document.createElement('button') as HTMLButtonElement;
    nextButton.type = 'button';
    nextButton.setAttribute('aria-label', 'Next slide');
    arrowsButtons.appendChild(nextButton);

    const templatePrevButton = this.querySelector(
      ':scope > template[data-prev]'
    ) as HTMLTemplateElement | null;
    const templateNextButton = this.querySelector(
      ':scope > template[data-next]'
    ) as HTMLTemplateElement | null;

    if (templatePrevButton) {
      prevButton.appendChild(templatePrevButton.content.cloneNode(true));
      templatePrevButton.remove();
    } else {
      prevButton.innerHTML = '<span aria-hidden="true">&larr;</span>';
    }

    if (templateNextButton) {
      nextButton.appendChild(templateNextButton.content.cloneNode(true));
      templateNextButton.remove();
    } else {
      nextButton.innerHTML = '<span aria-hidden="true">&rarr;</span>';
    }

    // Navigation
    if (this.navigation) {
      const navigationElement = document.createElement('div') as HTMLDivElement;
      this.applyDefaultAndMappedClass(
        navigationElement,
        CAROUSEL_NAVIGATION_CLASS,
        'carousel__navigation'
      );
      navigationElement.setAttribute('role', 'tablist');
      navigationElement.setAttribute('aria-label', 'slides');
      controls.appendChild(navigationElement);
    }

    // Slides container
    const slidesContainer = document.createElement('div') as HTMLDivElement;
    this.applyDefaultAndMappedClass(
      slidesContainer,
      CAROUSEL_SLIDES_CLASS,
      'carousel__slides'
    );
    slidesContainer.setAttribute('aria-atomic', 'false');
    slidesContainer.setAttribute('aria-live', 'polite');

    const slidesContainerId = `slides-container-${baseId}` as string;
    slidesContainer.id = slidesContainerId;
    prevButton.setAttribute('aria-controls', slidesContainerId);
    nextButton.setAttribute('aria-controls', slidesContainerId);
    sectionRoot.append(slidesContainer);
    slidesContainer.append(...contentNodes);

    const totalSlides = Math.floor(contentNodes.length / 3) as number;

    const getDots = (): HTMLButtonElement[] => {
      const nav = controls.querySelector(
        `.${CAROUSEL_NAVIGATION_CLASS}`
      ) as HTMLDivElement | null;
      return nav
        ? (Array.from(
            nav.querySelectorAll('button[role="tab"]')
          ) as HTMLButtonElement[])
        : [];
    };

    const updateDotsSelection = (active: number) => {
      getDots().forEach((dot, i) => {
        dot.setAttribute('aria-selected', i === active ? 'true' : 'false');
      });
    };

    const setActiveIndex = (next: number) => {
      const max = Math.max(0, totalSlides - 1);
      this.activeIndex = Math.max(0, Math.min(next, max));
      updateDotsSelection(this.activeIndex);
      this.scrollToActiveSlide();
    };

    // Click delegation
    controls.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      // Arrows
      const arrowButton = target.closest(
        'button[aria-label]'
      ) as HTMLButtonElement | null;
      if (arrowButton) {
        const label = arrowButton.getAttribute('aria-label');
        if (label === 'Previous slide') setActiveIndex(this.activeIndex - 1);
        else if (label === 'Next slide') setActiveIndex(this.activeIndex + 1);
        return;
      }

      // Dots
      const dotButton = target.closest(
        'button[role="tab"]'
      ) as HTMLButtonElement | null;
      if (dotButton) {
        const navigation = dotButton.closest(`.${CAROUSEL_NAVIGATION_CLASS}`);
        if (navigation) {
          const allDots = Array.from(
            navigation.querySelectorAll('button[role="tab"]')
          ) as HTMLButtonElement[];
          const index = allDots.indexOf(dotButton);
          if (index >= 0) setActiveIndex(index);
        }
      }
    });

    for (let i = 0, idx = 0; i < contentNodes.length; i += 3, idx++) {
      const headerElement = contentNodes[i] as HTMLElement;
      const panelElement = contentNodes[i + 1] as HTMLElement;
      const captionElement = contentNodes[i + 2] as HTMLElement;

      if (!headerElement || !panelElement || !captionElement) {
        console.error(`[wa-accordion] header or panel missing`);
        break;
      }

      let headerButtonElement = headerElement.querySelector(
        'button'
      ) as HTMLButtonElement;

      if (!headerButtonElement) {
        headerButtonElement = document.createElement('button');
        headerButtonElement.type = 'button';
        headerButtonElement.innerHTML = headerElement.innerHTML;
        headerElement.innerHTML = '';
        headerElement.appendChild(headerButtonElement);
      }

      // Single Slide
      const slide = document.createElement('div') as HTMLDivElement;
      this.applyDefaultAndMappedClass(
        slide,
        CAROUSEL_SLIDE_CLASS,
        'carousel__slide'
      );
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.id = `slide-${baseId}-${idx}`;
      slide.setAttribute('aria-label', `${idx + 1} of ${totalSlides}`);

      this.applyDefaultAndMappedClass(
        captionElement,
        CAROUSEL_CAPTION_CLASS,
        'carousel__caption'
      );

      const captionId = `slide-caption-${baseId}-${idx}`;
      captionElement.id = captionId;

      const captionDescription =
        headerButtonElement.getAttribute('aria-describedby');
      headerButtonElement.setAttribute(
        'aria-describedby',
        captionDescription ? `${captionDescription} ${captionId}` : captionId
      );

      slidesContainer.insertBefore(slide, headerElement);
      slide.appendChild(headerElement);
      slide.appendChild(panelElement);
      slide.appendChild(captionElement);
    }

    if (this.navigation) {
      const navigationElement = controls.querySelector(
        `.${CAROUSEL_NAVIGATION_CLASS}`
      ) as HTMLDivElement | null;
      const templateDotElement = this.querySelector(
        ':scope > template[data-dot]'
      ) as HTMLTemplateElement | null;
      const templateDotActive = this.querySelector(
        ':scope > template[data-dot-active]'
      ) as HTMLTemplateElement | null;

      if (navigationElement) {
        for (let i = 0; i < totalSlides; i++) {
          const dot = document.createElement('button') as HTMLButtonElement;
          dot.type = 'button';
          dot.setAttribute('role', 'tab');
          dot.setAttribute('aria-controls', `slide-${baseId}-${i}`);
          dot.setAttribute(
            'aria-selected',
            i === this.activeIndex ? 'true' : 'false'
          );

          const templateDot: HTMLTemplateElement | null =
            i === 0 && templateDotActive
              ? templateDotActive
              : templateDotElement;
          if (templateDot) {
            dot.appendChild(templateDot.content.cloneNode(true));
          } else {
            dot.innerHTML = `<span aria-hidden="true">•</span>`;
          }

          navigationElement.appendChild(dot);
        }
      }
    }

    this.carouselSlides.addEventListener('scroll', () => {
      const scrollLeft = this.carouselSlides.scrollLeft;
      const slideWidth = this.carouselSlides.clientWidth;
      const index = Math.round(scrollLeft / slideWidth);
      if (index !== this.activeIndex) {
        this.activeIndex = index;
        updateDotsSelection(index);
      }
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-carousel': WaCarousel;
  }
}
