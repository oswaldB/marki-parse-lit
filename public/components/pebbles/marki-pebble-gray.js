// Marki Pebble Gray Component
// Lit Element component for displaying the gray pebble

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

export class MarkiPebbleGray extends LitElement {
  static properties = {
    size: { type: String },
    position: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      position: absolute;
    }
    
    .pebble-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .pebble {
      width: var(--pebble-size, 100px);
      height: var(--pebble-size, 100px);
      object-fit: contain;
      transition: transform 0.3s ease;
    }
    
    .pebble:hover {
      transform: scale(1.1);
    }
  `;

  constructor() {
    super();
    this.size = '100px';
    this.position = 'absolute';
  }

  connectedCallback() {
    super.connectedCallback();
    this.style.setProperty('--pebble-size', this.size);
  }

  render() {
    return html`
      <div class="pebble-container">
        <img src="/assets/pebbles/3.png" alt="Gray Pebble" class="pebble">
      </div>
    `;
  }
}

customElements.define('marki-pebble-gray', MarkiPebbleGray);