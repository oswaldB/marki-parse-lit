import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

// Import the sidebar component
import './sidebar.js';

// Import the simple pebbles background component
import '../pebbles/marki-pebbles-simple.js';

class AdminLayout extends LitElement {
  static properties = {
    pageTitle: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      font-family: 'Inter', sans-serif;
    }

    .layout-container {
      display: flex;
      min-height: 100vh;
    }

    .main-content {
      margin-left: 250px;
      width: calc(100% - 250px);
      min-height: 100vh;
      transition: all 0.3s ease;
    }



    .content-wrapper {
      padding: 2rem;
    }

    .content-header {
      margin-bottom: 1.5rem;
    }

    .content-header h1 {
      font-size: 1.75rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0;
    }

    .content-header p {
      color: #6b7280;
      margin: 0.5rem 0 0 0;
    }

    .content-body {
      background-color: white;
      border-radius: 0.75rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
      border: 1px solid #e5e7eb;
    }
  `;

  constructor() {
    super();
    this.pageTitle = 'Dashboard';
  }

  render() {
    return html`
      <div class="layout-container" style="position: relative;">
        <marki-pebbles-simple></marki-pebbles-simple>
        <admin-sidebar></admin-sidebar>
        
        <div class="main-content">
          <div class="content-wrapper">
            <div class="content-header">
              <h1>${this.pageTitle}</h1>
            </div>
            
            <div class="content-body">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('admin-layout', AdminLayout);