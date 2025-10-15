import { html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { DynamicStyleMixin } from '../../../mixins/DynamicStyleMixin';

export interface WaCarouselProps extends HTMLElement {}

const CAROUSEL_CLASS: string = 'carousel';

@customElement('wa-carousel')
export class WaCarousel
  extends DynamicStyleMixin(LitElement)
  implements WaCarouselProps
{
  @property({ type: String, reflect: true }) ariaLabel: string | null =
    'Carousel';

  @query(`.${CAROUSEL_CLASS}`) carousel!: HTMLDivElement;

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
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-carousel': WaCarousel;
  }
}

// test - custom ariaLabel