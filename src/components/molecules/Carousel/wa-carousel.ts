import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { DynamicStyleMixin } from '../../../mixins/DynamicStyleMixin';

export interface WaCarouselProps extends HTMLElement {}

@customElement('wa-carousel')
export class WaCarousel
  extends DynamicStyleMixin(LitElement)
  implements WaCarouselProps
{
  // Render into the light DOM instead of a shadow root, so user-provided children remain accessible
  createRenderRoot() {
    return this;
  }

  // Required by LitElement, but unused — all DOM setup happens manually in firstUpdated()
  render() {
    return html``;
  }

  firstUpdated() {}
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-carousel': WaCarousel;
  }
}
