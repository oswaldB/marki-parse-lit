// Utilisation du CDN de Lit pour éviter les problèmes d'importation
import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

export class RelanceSidebarThin extends LitElement {
  createRenderRoot() {
    return this; // Désactive le shadow DOM
  }

  static properties = {
    isVisible: { type: Boolean }
  };

  constructor() {
    super();
    this.isVisible = false;
  }

  connectedCallback() {
    super.connectedCallback();
    // Vérifier si l'URL contient /relances/ pour déterminer la visibilité
    this.checkUrl();
    
    // Écouter les changements d'URL (pour les applications SPA)
    window.addEventListener('popstate', () => this.checkUrl());
    window.addEventListener('hashchange', () => this.checkUrl());
  }

  checkUrl() {
    // Vérifier si l'URL actuelle contient /relances/
    this.isVisible = window.location.pathname.includes('/relances/');
    this.requestUpdate(); // Forcer la mise à jour du composant
  }

  render() {
    if (!this.isVisible) {
      return html``; // Ne rien rendre si non visible
    }

    return html`
      <div class="fixed top-0 left-[40px] z-30 w-[200px] h-full bg-gray-50 border-r border-gray-200 py-4">
        <!-- Contenu spécifique aux relances -->
        <h3 class="px-4 text-sm font-medium text-gray-700 mb-4">Relances</h3>
        
        <nav class="space-y-1">
          <a 
            href="/app/relances/"
            class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-r-lg transition-colors"
          >
            Dashboard
          </a>
          
          <a 
            href="/app/relances/impayes/"
            class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-r-lg transition-colors"
          >
            Impayés
          </a>
          
          <a 
            href="/app/relances/sequences/"
            class="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-r-lg transition-colors"
          >
            Séquences
          </a>
        </nav>
      </div>
    `;
  }
}

if (!customElements.get('relance-sidebar-thin')) {
  customElements.define('relance-sidebar-thin', RelanceSidebarThin);
}
