// Ultra-Simple Marki Pebbles Component
// Uses static PNG images for maximum simplicity
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class MarkiPebblesSimple extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
      pointer-events: none;
      z-index: -1;
    }

    .pebble-container {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .pebble {
      position: absolute;
      pointer-events: none;
    }

    .pebble:nth-child(1) { top: -4%; right: 15%; width: 400px; }
    .pebble:nth-child(2) { top: 60%; left: 80%; width: 350px; }
    .pebble:nth-child(3) { top: 85%; left: 20%; width: 300px; }
  `;

  render() {
    return html`
      <div class="pebble-container">
        <img src="/assets/pebbles/1.png" alt="Blue Pebble" class="pebble">
        <img src="/assets/pebbles/2.png" alt="Dark Pebble" class="pebble">
        <img src="/assets/pebbles/3.png" alt="Gray Pebble" class="pebble">
      </div>
    `;
  }
}

customElements.define('marki-pebbles-simple', MarkiPebblesSimple);

export { MarkiPebblesSimple };