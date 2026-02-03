import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
// Import the sidebar component
import './sidebar.js';

// Import the simple pebbles background component
import '../pebbles/marki-pebbles-simple.js';

class AdminLayout extends LitElement {
  static properties = {
    pageTitle: { type: String }
  };

  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="flex min-h-screen relative">
        <marki-pebbles-simple></marki-pebbles-simple>
        <admin-sidebar></admin-sidebar>
        <div class="ml-[250px] w-[calc(100%-250px)] min-h-screen transition-all duration-300 ease-in-out">
            <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('admin-layout', AdminLayout);