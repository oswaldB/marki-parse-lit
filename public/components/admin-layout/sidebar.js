// Admin Sidebar Component using Lit with Lucide Icons
// Dynamic generation from navigation configuration
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class AdminSidebar extends LitElement {
  static properties = {
    currentPage: { type: String }
  };

 createRenderRoot() {
    return this;
  }
  static styles = css`
    :host {
      display: block;
      font-family: 'Inter', sans-serif;
    }
  `;

  constructor() {
    super();
    this.currentPage = '';
    
    // Navigation configuration - single source of truth
    this.navItems = [
      {
        path: '/dashboard',
        icon: 'home',
        label: 'Tableau de bord',
        showFor: ['all']
      },
      {
        path: '/impayes',
        icon: 'receipt',
        label: 'Impayés',
        showFor: ['all']
      },
      {
        path: '/settings',
        icon: 'settings',
        label: 'Paramètres',
        showFor: ['all']
      }
    ];
    
    // Impayes section items
    this.impayesItems = [
      {
        path: '/impayes',
        icon: 'receipt',
        label: 'Impayés',
        showFor: ['all']
      },
      {
        path: '/sequences',
        icon: 'mail-open',
        label: 'Séquences',
        showFor: ['all']
      },
      {
        path: '/relances',
        icon: 'send',
        label: 'Relances',
        showFor: ['all']
      }
    ];
  }

  connectedCallback() {
    super.connectedCallback();
    this._setActivePageFromUrl();
  }

  _setActivePageFromUrl() {
    const path = window.location.pathname;
    
    // Find which nav item matches the current path
    for (const item of this.navItems) {
      if (path.startsWith(item.path)) {
        this.currentPage = item.path.substring(1); // Remove leading slash
        return;
      }
    }
    
    // Default to dashboard if no match found
    this.currentPage = 'dashboard';
  }

  _isActive(path) {
    return this.currentPage === path.substring(1);
  }

  _getLinkClasses(path) {
    return this._isActive(path) 
      ? 'flex items-center px-6 py-3 text-sm font-medium text-blue-600 bg-blue-50 border-l-3 border-blue-600' 
      : 'flex items-center px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200 ease-in-out border-l-3 border-transparent';
  }

  _getIconColor(path) {
    return this._isActive(path) ? 'text-blue-600' : 'text-gray-500';
  }


  _handleNavigation(e) {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    window.location.href = href;
  }

  render() {
    return html`
      <div class="flex h-screen fixed top-0 left-0 transition-all duration-300 ease-in-out z-40">
        <!-- First Column - Logo and Settings -->
        <div class="w-20 bg-white border-r border-gray-200 flex flex-col">
          <!-- Logo Section -->
          <div class="p-4 border-b border-gray-200 text-center">
            <img src="/assets/marki-logo.png" alt="Marki Logo" class="w-12 h-auto object-contain mx-auto">
          </div>

          <!-- Navigation Menu - First Column -->
          <div class="py-4 flex-1">
            ${this.navItems.map(item => html`
              <a 
                href=${item.path}
                class="flex flex-col items-center px-2 py-3 text-xs font-medium ${this._isActive(item.path) ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200 ease-in-out'}"
                @click=${this._handleNavigation}
              >
                <span class="w-6 h-6 flex items-center justify-center flex-shrink-0 mb-1">
                  <i data-lucide="${item.icon}" class="${this._getIconColor(item.path)}"></i>
                </span>
                <span class="text-xs">${item.label}</span>
              </a>
            `)}
          </div>

          <!-- User Profile - First Column -->
          <div class="p-4 border-t border-gray-200 bg-gray-50">
            <div class="flex flex-col items-center">
              <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold mb-1">
                <i data-lucide="user-circle" class="text-white"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Second Column - Impayes Section -->
        <div class="w-48 bg-white border-r border-gray-200">
          <div class="py-4">
            <div class="px-4 pb-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">IMPAYES</div>
            
            <!-- Impayes Section Items -->
            ${this.impayesItems.map(item => html`
              <a 
                href=${item.path}
                class="flex items-center px-4 py-3 text-sm font-medium ${this._isActive(item.path) ? 'text-blue-600 bg-blue-50 border-l-3 border-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200 ease-in-out border-l-3 border-transparent'}"
                @click=${this._handleNavigation}
              >
                <span class="mr-3 w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <i data-lucide="${item.icon}" class="${this._getIconColor(item.path)}"></i>
                </span>
                <span class="text-sm">${item.label}</span>
              </a>
            `)}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('admin-sidebar', AdminSidebar);

export { AdminSidebar };