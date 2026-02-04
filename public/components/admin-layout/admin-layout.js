// Import the simple pebbles background component
import '../pebbles/marki-pebbles-simple.js';

// Import Alpine.js components
import './sidebar-component.js';
import './auth-store.js';
import './is-auth-alpine.js';

class AdminLayout extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="flex min-h-screen relative" x-data="adminSidebar()">
        <marki-pebbles-simple></marki-pebbles-simple>
        <!-- Sidebar - Self-contained component -->
        <div x-html="template" x-data="adminSidebar()"></div>
        <div class="ml-[250px] w-[calc(100%-250px)] min-h-screen transition-all duration-300 ease-in-out">
            <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('admin-layout', AdminLayout);