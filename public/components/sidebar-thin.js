// Utilisation du CDN de Lit pour éviter les problèmes d'importation
import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

// Configuration par défaut intégrée (peut être remplacée par une configuration externe)
const DEFAULT_CONFIG = [
  {
    name: 'Dashboard',
    icon: 'home',
    url: '/app/relances/'
  },
  {
    name: 'Impayés',
    icon: 'file-text',
    url: '/app/relances/impayes/'
  },
  {
    name: 'Séquences',
    icon: 'clock',
    url: '/app/relances/sequences/'
  },
  {
    name: 'Paramètres',
    icon: 'settings',
    url: '/app/settings/'
  }
];

export class ThinSidebar extends LitElement {
  createRenderRoot() {
    return this; // Désactive le shadow DOM
  }

  static properties = {
    items: { type: Array },
    configUrl: { type: String, attribute: 'config-url' }
  };

  constructor() {
    super();
    this.items = [...DEFAULT_CONFIG];
    this.configUrl = '';
  }

  async connectedCallback() {
    super.connectedCallback();
    
    // Charger la configuration si une URL est spécifiée
    if (this.configUrl) {
      await this.loadConfigFromUrl();
    }
    
    // Initialiser Feather Icons lorsque le composant est connecté au DOM
    this.initializeFeatherIcons();
    
    // Écouter l'événement de chargement de Feather pour réinitialiser si nécessaire
    document.addEventListener('featherLoaded', () => {
      this.initializeFeatherIcons();
    });
  }

  async loadConfigFromUrl() {
    try {
      // Dans une application réelle, cela chargerait depuis une API
      // Pour l'instant, on simule un chargement
      console.log('Chargement de la configuration depuis:', this.configUrl);
      
      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Pour l'exemple, on utilise la configuration par défaut
      // Dans une vraie implémentation, on ferait un fetch
      this.items = [...DEFAULT_CONFIG];
      this.requestUpdate();
      
    } catch (error) {
      console.error('Erreur lors du chargement de la configuration:', error);
      // Utiliser la configuration par défaut en cas d'erreur
      this.items = [...DEFAULT_CONFIG];
      this.requestUpdate();
    }
  }

  render() {
    return html`
      <style>
        /* Styles pour la sidebar fine */
        .thin-sidebar-container {
          width: 40px;
          transition: all 0.3s ease;
          height: 100vh;
        }
        
        .thin-sidebar-container:hover {
          width: 200px;
        }
        
        .sidebar-icon {
          transition: all 0.3s ease;
        }
        
        .sidebar-text {
          display: none;
          transition: all 0.3s ease;
          margin-left: 8px;
        }
        
        .thin-sidebar-container:hover .sidebar-text {
          display: inline;
        }
        
        .thin-sidebar-container:hover .sidebar-icon {
          margin-right: 8px;
        }
        
        .feather-icon {
          stroke-width: 1.5;
          transition: all 0.2s ease;
        }
        
        .feather-icon:hover {
          stroke-width: 2;
        }
      </style>
      
      <div class="fixed top-0 left-0 z-40 thin-sidebar-container bg-white border-r border-gray-200 flex flex-col items-start py-4 overflow-hidden">
        <!-- Logo -->
        <div class="mb-8 w-full flex justify-center">
          <img src="/assets/marki-logo.png" alt="Marki Logo" class="w-8 h-8">
        </div>

        <!-- Éléments de navigation -->
        <nav class="flex flex-col items-start space-y-2 flex-1 w-full px-2">
          ${this.items.map(item => html`
            <a 
              href="${item.url}" 
              class="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 w-full" 
              title="${item.name}"
            >
              <i data-feather="${item.icon}" class="w-6 h-6 text-gray-600 feather-icon sidebar-icon"></i>
              <span class="sidebar-text text-sm text-gray-600 whitespace-nowrap">${item.name}</span>
            </a>
          `)}
        </nav>

        <!-- Espace pour d'autres composants -->
        <div id="thin-sidebar-components" class="w-full px-2"></div>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    // Initialiser Feather Icons lorsque le composant est connecté au DOM
    this.initializeFeatherIcons();
    
    // Écouter l'événement de chargement de Feather pour réinitialiser si nécessaire
    document.addEventListener('featherLoaded', () => {
      this.initializeFeatherIcons();
    });
  }

  initializeFeatherIcons() {
    // Vérifier si Feather est disponible et initialiser les icônes
    if (typeof feather !== 'undefined') {
      // Attendre que le composant soit rendu avant d'initialiser les icônes
      setTimeout(() => {
        feather.replace({ class: 'feather-icon' });
      }, 50);
    } else {
      // Si Feather n'est pas encore chargé, attendre et réessayer
      console.log('Feather Icons non disponible, tentative de rechargement...');
      setTimeout(() => {
        this.initializeFeatherIcons();
      }, 200);
    }
  }
}

if (!customElements.get('thin-sidebar')) {
  customElements.define('thin-sidebar', ThinSidebar);
}
