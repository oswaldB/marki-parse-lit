// Utilisation du CDN de Lit pour éviter les problèmes d'importation
const { LitElement, html } = lit;

export class SettingsSidebar extends LitElement {
  static properties = {
    sidebarOpen: { type: Boolean },
    currentUser: { type: Object }
  };

  constructor() {
    super();
    this.sidebarOpen = false;
    this.currentUser = null;
  }

  createRenderRoot() {
    return this; // Désactive le shadow DOM
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.dispatchEvent(new CustomEvent('sidebar-toggled', { detail: this.sidebarOpen }));
  }

  render() {
    return html`
      <!-- Overlay pour mobile -->
      <div 
        class="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
        style="display: ${this.sidebarOpen ? 'block' : 'none'}"
        @click="${this.toggleSidebar}"
      ></div>

      <!-- Sidebar -->
      <div 
        class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg md:relative md:translate-x-0 transform transition-transform duration-200 ${this.sidebarOpen ? '' : '-translate-x-full'}"
      >
        <div class="flex items-center justify-between p-4 border-b">
          <h1 class="text-xl font-bold text-gray-800">Marki Parse</h1>
          <button @click="${this.toggleSidebar}" class="md:hidden">
            <i data-feather="x" class="w-6 h-6 feather-icon"></i>
          </button>
        </div>
        <nav class="p-4">
          <a href="/dashboard" class="flex items-center p-2 text-gray-700 rounded hover:bg-gray-100 transition-colors">
            <i data-feather="home" class="w-5 h-5 mr-3 feather-icon"></i>
            <span>Tableau de bord</span>
          </a>
          <a href="/app/relances" class="flex items-center p-2 text-gray-700 rounded hover:bg-gray-100 mt-2 transition-colors">
            <i data-feather="mail" class="w-5 h-5 mr-3 feather-icon"></i>
            <span>Relances</span>
          </a>
          ${this.currentUser?.is_admin ? html`
            <div class="mt-4">
              <h3 class="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Administration</h3>
              <a href="/app/settings/team" class="flex items-center p-2 text-blue-600 bg-blue-50 rounded mt-2 transition-colors">
                <i data-feather="users" class="w-5 h-5 mr-3 feather-icon"></i>
                <span>Équipe</span>
              </a>
            </div>
          ` : ''}
        </nav>
      </div>
    `;
  }

  // Méthode pour mettre à jour l'utilisateur courant
  updateCurrentUser(user) {
    this.currentUser = user;
  }

  // Initialiser Feather Icons
  initializeFeatherIcons() {
    if (typeof feather !== 'undefined') {
      setTimeout(() => {
        feather.replace({ class: 'feather-icon' });
      }, 50);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.initializeFeatherIcons();
    
    // Écouter l'événement de chargement de Feather
    document.addEventListener('featherLoaded', () => {
      this.initializeFeatherIcons();
    });
  }
}

customElements.define('settings-sidebar', SettingsSidebar);