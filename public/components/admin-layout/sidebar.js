// Admin Sidebar Component using Lit - Specific for Impayés Management
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { unsafeSVG } from 'https://unpkg.com/lit-html@3.3.2/directives/unsafe-svg.js';

class AdminSidebar extends LitElement {
  static properties = {
    currentPage: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      font-family: 'Inter', sans-serif;
    }

    .sidebar {
      width: 250px;
      background-color: #ffffff;
      border-right: 1px solid #e5e7eb;
      height: 100vh;
      position: fixed;
      transition: all 0.3s ease;
      box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
      z-index: 40;
    }

    .logo-container {
      padding: 2rem 1.5rem;
      border-bottom: 1px solid #f3f4f6;
      text-align: center;
    }

    .logo {
      width: 120px;
      height: auto;
      object-fit: contain;
    }

    .nav-menu {
      padding: 1rem 0;
    }

    .nav-item {
      padding: 0.75rem 1.5rem;
      display: flex;
      align-items: center;
      color: #4b5563;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.2s ease;
      border-left: 3px solid transparent;
    }

    .nav-item:hover {
      background-color: #f9fafb;
      color: #007ACE;
    }

    .nav-item.active {
      background-color: #eff6ff;
      color: #007ACE;
      border-left: 3px solid #007ACE;
    }

    .nav-icon {
      margin-right: 0.75rem;
      width: 1.25rem;
      height: 1.25rem;
    }

    .nav-text {
      font-size: 0.9375rem;
    }

    .nav-icon {
      margin-right: 0.75rem;
      width: 1.25rem;
      height: 1.25rem;
      flex-shrink: 0;
    }

    .nav-icon svg {
      width: 100%;
      height: 100%;
      stroke: currentColor;
      fill: none;
    }

    .sidebar-header {
      padding: 0 1.5rem 1rem;
      font-size: 0.875rem;
      color: #6b7280;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .user-profile {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 1.5rem;
      border-top: 1px solid #f3f4f6;
      background-color: #f9fafb;
    }

    .user-info {
      display: flex;
      align-items: center;
    }

    .user-avatar {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      background-color: #007ACE;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      margin-right: 0.75rem;
    }

    .user-details {
      flex: 1;
    }

    .user-name {
      font-size: 0.875rem;
      font-weight: 600;
      color: #1f2937;
    }

    .user-role {
      font-size: 0.75rem;
      color: #6b7280;
    }
  `;

  constructor() {
    super();
    this.currentPage = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this._setActivePageFromUrl();
  }

  _setActivePageFromUrl() {
    const path = window.location.pathname;
    if (path.startsWith('/impayes')) {
      this.currentPage = 'impayes';
    } else if (path.startsWith('/sequences')) {
      this.currentPage = 'sequences';
    } else if (path.startsWith('/relances')) {
      this.currentPage = 'relances';
    } else if (path.startsWith('/superadmin')) {
      this.currentPage = 'superadmin';
    }
  }

  render() {
    return html`
      <div class="sidebar">
        <!-- Logo Section -->
        <div class="logo-container">
          <img src="/assets/marki-logo.png" alt="Marki Logo" class="logo">
        </div>

        <!-- Navigation Menu -->
        <div class="nav-menu">
          <div class="sidebar-header">Impayés</div>
          
          <a 
            href="/impayes" 
            class="nav-item ${this.currentPage === 'impayes' ? 'active' : ''}"
            @click=${this._handleNavigation}
          >
            <span class="nav-icon">
            
              ${unsafeSVG(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-banknote-x-icon lucide-banknote-x"><path d="M13 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"/><path d="m17 17 5 5"/><path d="M18 12h.01"/><path d="m22 17-5 5"/><path d="M6 12h.01"/><circle cx="12" cy="12" r="2"/></svg>`)}
            </span>
            <span class="nav-text">Impayés</span>
          </a>

          <a 
            href="/sequences" 
            class="nav-item ${this.currentPage === 'sequences' ? 'active' : ''}"
            @click=${this._handleNavigation}
          >
            <span class="nav-icon">
              ${unsafeSVG(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mails-icon lucide-mails"><path d="M17 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 1-1.732"/><path d="m22 5.5-6.419 4.179a2 2 0 0 1-2.162 0L7 5.5"/><rect x="7" y="3" width="15" height="12" rx="2"/></svg>`)}
            </span>
            <span class="nav-text">Séquences</span>
          </a>

          <a 
            href="/relances" 
            class="nav-item ${this.currentPage === 'relances' ? 'active' : ''}"
            @click=${this._handleNavigation}
          >
            <span class="nav-icon">
              ${unsafeSVG(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-icon lucide-send"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>`)}
            </span>
            <span class="nav-text">Relances</span>
          </a>

         
          
          <a 
            href="/settings" 
            class="nav-item ${this.currentPage === 'settings' ? 'active' : ''}"
            @click=${this._handleNavigation}
          >
            <span class="nav-icon">
              ${unsafeSVG(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings2-icon lucide-settings-2"><path d="M14 17H5"/><path d="M19 7h-9"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>`)}
            </span>
            <span class="nav-text">Paramètres</span>
          </a>
        </div>

        <!-- User Profile -->
        <div class="user-profile">
          <div class="user-info">
            <div class="user-avatar">
              <span>U</span>
            </div>
            <div class="user-details">
              <div class="user-name">Utilisateur</div>
              <div class="user-role">Administrateur</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _handleNavigation(e) {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    window.location.href = href;
  }

  updated(changedProperties) {
    if (changedProperties.has('currentPage')) {
      this._updateActiveLink();
    }
  }

  _updateActiveLink() {
    const links = this.shadowRoot.querySelectorAll('.nav-item');
    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `/${this.currentPage}`) {
        link.classList.add('active');
      }
    });
  }
}

customElements.define('admin-sidebar', AdminSidebar);

export { AdminSidebar };