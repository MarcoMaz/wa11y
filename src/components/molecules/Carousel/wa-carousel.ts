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
const CAROUSEL_BUTTONS_CLASS: string = 'carousel__buttons';
const CAROUSEL_NAVIGATION_CLASS: string = 'carousel__navigation';
const CAROUSEL_CARDS_CLASS: string = 'carousel__cards';
const CAROUSEL_CARD_CLASS: string = 'carousel__card';

@customElement('wa-carousel')
export class WaCarousel
  extends DynamicStyleMixin(LitElement)
  implements WaCarouselProps
{
  @property({ type: String, reflect: true }) ariaLabel: string | null =
    'Carousel';
  @property({ type: Boolean, reflect: true })
  navigation = false;
  @property({ type: Number, reflect: true })
  activeIndex = 0;

  @query(`.${CAROUSEL_CLASS}`)
  carousel!: HTMLDivElement;
  @query(`.${CAROUSEL_CONTROLS_CLASS}`) carouselControls!: HTMLDivElement;
  @query(`.${CAROUSEL_BUTTONS_CLASS}`) carouselButtons!: HTMLDivElement;
  @query(`.${CAROUSEL_NAVIGATION_CLASS}`) carouselNavigation!: HTMLDivElement;
  @query(`.${CAROUSEL_CARDS_CLASS}`) carouselCards!: HTMLDivElement;
  @query(`.${CAROUSEL_CARD_CLASS}`) carouselCard!: HTMLDivElement;

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

  // Render into the light DOM instead of a shadow root, so user-provided children remain accessible
  createRenderRoot() {
    return this;
  }

  // Required by LitElement, but unused — all DOM setup happens manually in firstUpdated()
  render() {
    return html``;
  }

  firstUpdated() {
    // Snapshot original children (expect pairs: heading + content)
    const childrenSnapshot = Array.from(this.children) as HTMLElement[];
    if (childrenSnapshot.length === 0) return;
    const contentNodes = childrenSnapshot.filter(
      (el) => el.tagName !== 'TEMPLATE'
    ) as HTMLElement[];

    // Root
    const sectionRoot = document.createElement('section') as HTMLElement;
    this.applyDefaultAndMappedClass(sectionRoot, CAROUSEL_CLASS, 'carousel');
    sectionRoot.setAttribute('aria-roledescription', 'carousel');
    sectionRoot.setAttribute('aria-label', this.ariaLabel || 'Carousel');
    this.insertBefore(sectionRoot, childrenSnapshot[0] ?? null);

    // Controls
    const controls = document.createElement('div') as HTMLDivElement;
    this.applyDefaultAndMappedClass(
      controls,
      CAROUSEL_CONTROLS_CLASS,
      'carousel__controls'
    );
    sectionRoot.appendChild(controls);

    // Buttons
    const buttons = document.createElement('div') as HTMLDivElement;
    this.applyDefaultAndMappedClass(
      buttons,
      CAROUSEL_BUTTONS_CLASS,
      'carousel_buttons'
    );
    controls.appendChild(buttons);

    // Prev button
    const prevButton = document.createElement('button') as HTMLButtonElement;
    prevButton.type = 'button';
    prevButton.setAttribute('aria-label', 'Previous slide');
    buttons.appendChild(prevButton);

    // Next button
    const nextButton = document.createElement('button') as HTMLButtonElement;
    nextButton.type = 'button';
    nextButton.setAttribute('aria-label', 'Next slide');
    buttons.appendChild(nextButton);

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
      prevButton.innerHTML = '<span aria-hidden="true">←</span>';
    }

    if (templateNextButton) {
      nextButton.appendChild(templateNextButton.content.cloneNode(true));
      templateNextButton.remove();
    } else {
      nextButton.innerHTML = '<span aria-hidden="true">→</span>';
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
      navigationElement.setAttribute('aria-label', 'Slides');
      controls.appendChild(navigationElement);
    }

    // Card container
    const cardsContainer = document.createElement('div') as HTMLDivElement;
    this.applyDefaultAndMappedClass(
      cardsContainer,
      CAROUSEL_CARDS_CLASS,
      'carousel__cards'
    );
    cardsContainer.setAttribute('aria-atomic', 'false');
    cardsContainer.setAttribute('aria-live', 'polite');
    const cardsContainerId = `carousel-cards-${this.id || 'wa'}` as string;
    cardsContainer.id = cardsContainerId;
    prevButton.setAttribute('aria-controls', cardsContainerId);
    nextButton.setAttribute('aria-controls', cardsContainerId);
    sectionRoot.append(cardsContainer);
    cardsContainer.append(...contentNodes);

    const totalSlides = Math.floor(contentNodes.length / 2) as number;

    prevButton.addEventListener('click', () => {
      this.activeIndex = Math.max(
        0,
        Math.min(this.activeIndex - 1, Math.max(0, totalSlides - 1))
      );

      const navigationElement = controls.querySelector(
        `.${CAROUSEL_NAVIGATION_CLASS}`
      ) as HTMLDivElement | null;
      if (navigationElement) {
        const dots = Array.from(
          navigationElement.querySelectorAll('button[role="tab"]')
        ) as HTMLButtonElement[];
        dots.forEach((dot, index) => {
          const isActive: boolean = index === this.activeIndex;
          dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
          dot.tabIndex = isActive ? 0 : -1;
        });
      }
    });

    nextButton.addEventListener('click', () => {
      this.activeIndex = Math.max(
        0,
        Math.min(this.activeIndex + 1, Math.max(0, totalSlides - 1))
      );

      const navigationElement = controls.querySelector(
        `.${CAROUSEL_NAVIGATION_CLASS}`
      ) as HTMLDivElement | null;
      if (navigationElement) {
        const dots = Array.from(
          navigationElement.querySelectorAll('button[role="tab"]')
        ) as HTMLButtonElement[];
        dots.forEach((dot, index) => {
          const isActive: boolean = index === this.activeIndex;
          dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
          dot.tabIndex = isActive ? 0 : -1;
        });
      }
    });

    for (let i = 0, idx = 0; i < contentNodes.length; i += 2, idx++) {
      const headerElement = contentNodes[i] as HTMLElement;
      const panelElement = contentNodes[i + 1] as HTMLElement;

      if (!headerElement || !panelElement) {
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

      // Single Card
      const card = document.createElement('div') as HTMLDivElement;
      this.applyDefaultAndMappedClass(
        card,
        CAROUSEL_CARD_CLASS,
        'carousel__card'
      );
      card.setAttribute('role', 'group');
      card.setAttribute('aria-roledescription', 'slide');
      card.id = `carousel-item-${this.id || 'wa'}-${idx}`;
      card.setAttribute('aria-label', `${idx + 1} of ${totalSlides}`);
      cardsContainer.insertBefore(card, headerElement);
      card.appendChild(headerElement);
      card.appendChild(panelElement);
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
          dot.setAttribute(
            'aria-controls',
            `carousel-item-${this.id || 'wa'}-${i}`
          );
          dot.setAttribute(
            'aria-selected',
            i === this.activeIndex ? 'true' : 'false'
          );
          dot.tabIndex = i === this.activeIndex ? 0 : -1;

          const templateDot: HTMLTemplateElement | null =
            i === 0 && templateDotActive
              ? templateDotActive
              : templateDotElement;
          if (templateDot) {
            dot.appendChild(templateDot.content.cloneNode(true));
          } else {
            dot.innerHTML = `<span class="dot" aria-hidden="true">•</span>`;
          }

          navigationElement.appendChild(dot);
        }

        const dots = Array.from(
          navigationElement.querySelectorAll('button[role="tab"]')
        ) as HTMLButtonElement[];

        dots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
            this.activeIndex = Math.max(
              0,
              Math.min(index, Math.max(0, totalSlides - 1))
            );
            dots.forEach((btn, j) => {
              const is: boolean = j === this.activeIndex;
              btn.setAttribute('aria-selected', is ? 'true' : 'false');
              btn.tabIndex = is ? 0 : -1;
            });
          });
        });
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-carousel': WaCarousel;
  }
}
