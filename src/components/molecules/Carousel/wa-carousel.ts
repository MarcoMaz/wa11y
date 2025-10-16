import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { DynamicStyleMixin } from '../../../mixins/DynamicStyleMixin';

export interface WaCarouselProps extends HTMLElement {}

const CAROUSEL_CLASS: string = 'carousel';
const CAROUSEL_CARDS_CLASS: string = 'carousel__cards';
const CAROUSEL_CARD_CLASS: string = 'carousel__card';
const CAROUSEL_CONTROLS_CLASS: string = 'carousel__controls';
const CAROUSEL_ARROWS_CLASS: string = 'arrows';
const CAROUSEL_NAV_CLASS: string = 'carousel__navigation';

@customElement('wa-carousel')
export class WaCarousel
  extends DynamicStyleMixin(LitElement)
  implements WaCarouselProps
{
  @property({ type: String, reflect: true }) ariaLabel: string | null =
    'Carousel';

  @query(`.${CAROUSEL_CLASS}`) carousel!: HTMLDivElement;
  @query(`.${CAROUSEL_CARDS_CLASS}`) carouselCards!: HTMLDivElement;
  @query(`.${CAROUSEL_CARD_CLASS}`) carouselCard!: HTMLDivElement;
  @query(`.${CAROUSEL_CONTROLS_CLASS}`) carouselControls!: HTMLDivElement;
  @query(`.${CAROUSEL_ARROWS_CLASS}`) carouselArrows!: HTMLDivElement;
  @query(`.${CAROUSEL_NAV_CLASS}`) carouselNav!: HTMLDivElement;

  // Add base + mapped class (do not replace).
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

    // Root <section>
    const section = document.createElement('section');
    this.applyDefaultAndMappedClass(section, CAROUSEL_CLASS, 'carousel');
    section.setAttribute('aria-roledescription', 'carousel');
    section.setAttribute('aria-label', this.ariaLabel || 'Carousel');
    this.insertBefore(section, childrenSnapshot[0] ?? null);

    // Controls wrapper vuoto
    const controls = document.createElement('div');
    this.applyDefaultAndMappedClass(
      controls,
      CAROUSEL_CONTROLS_CLASS,
      'carousel__controls'
    );
    section.appendChild(controls);

    // ---- ARROWS WRAPPER + BUTTONS (SVG via template) ----
    const arrows = document.createElement('div');
    this.applyDefaultAndMappedClass(arrows, CAROUSEL_ARROWS_CLASS, 'arrows');
    controls.appendChild(arrows);

    // Prev button
    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.setAttribute('aria-label', 'Previous slide');
    arrows.appendChild(prevBtn);

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.setAttribute('aria-label', 'Next slide');
    arrows.appendChild(nextBtn);

    // Inject user-provided SVGs via templates (accordion-style)
    const tplPrev = this.querySelector(
      ':scope > template[data-prev]'
    ) as HTMLTemplateElement | null;
    const tplNext = this.querySelector(
      ':scope > template[data-next]'
    ) as HTMLTemplateElement | null;

    if (tplPrev) {
      prevBtn.appendChild(tplPrev.content.cloneNode(true));
      tplPrev.remove();
    } else {
      // HTML fallback (accessible): ←
      prevBtn.innerHTML = '<span aria-hidden="true">←</span>';
    }

    if (tplNext) {
      nextBtn.appendChild(tplNext.content.cloneNode(true));
      tplNext.remove();
    } else {
      // HTML fallback (accessible): →
      nextBtn.innerHTML = '<span aria-hidden="true">→</span>';
    }

    // Navigation wrapper (tablist)
    const nav = document.createElement('div');
    this.applyDefaultAndMappedClass(
      nav,
      CAROUSEL_NAV_CLASS,
      'carousel__navigation'
    );
    nav.setAttribute('role', 'tablist');
    nav.setAttribute('aria-label', 'Slides');
    controls.appendChild(nav);

    // card container
    const cardContainer = document.createElement('div');
    this.applyDefaultAndMappedClass(
      cardContainer,
      CAROUSEL_CARDS_CLASS,
      'carousel__cards'
    );
    cardContainer.setAttribute('aria-atomic', 'false');
    cardContainer.setAttribute('aria-live', 'polite');

    section.append(cardContainer);

    cardContainer.append(...childrenSnapshot);

    const total = Math.floor(childrenSnapshot.length / 2);

    for (let i = 0, idx = 0; i < childrenSnapshot.length; i += 2, idx++) {
      const headerElement = childrenSnapshot[i] as HTMLElement;
      const panelElement = childrenSnapshot[i + 1] as HTMLElement;

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

      // Crea il wrapper card e inseriscilo PRIMA dell’header corrente
      const slide = document.createElement('div');
      this.applyDefaultAndMappedClass(
        slide,
        CAROUSEL_CARD_CLASS,
        'carousel__card'
      );
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.id = `carousel-item-${this.id || 'wa'}-${idx}`;
      slide.setAttribute('aria-label', `${idx + 1} of ${total}`);

      cardContainer.insertBefore(slide, headerElement);

      // Muovi i nodi nel wrapper (appendChild li SPOSTA)
      slide.appendChild(headerElement);
      slide.appendChild(panelElement);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-carousel': WaCarousel;
  }
}

// test - custom ariaLabel
