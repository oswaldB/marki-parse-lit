// Utilisation du CDN de Lit pour éviter les problèmes d'importation
const { LitElement, html } = lit;

// Import du composant check-auth avec chemin absolu
const checkAuthScript = document.createElement('script');
checkAuthScript.type = 'module';
checkAuthScript.src = '/components/check-auth.js';
document.head.appendChild(checkAuthScript);

export class RelanceSidebar extends LitElement {
  static properties = {
    currentPage: { type: String }
  };

  constructor() {
    super();
    this.currentPage = '';
    this.checkAuthLoaded = false;
    
    // Attendre que le composant check-auth soit chargé
    this.waitForCheckAuth();
  }
  
  waitForCheckAuth() {
    if (customElements.get('check-auth')) {
      this.checkAuthLoaded = true;
      this.requestUpdate();
    } else {
      setTimeout(() => this.waitForCheckAuth(), 100);
    }
  }

  createRenderRoot() {
    return this; // Désactive le shadow DOM
  }

  render() {
    return html`
      <check-auth></check-auth> 

      <!-- Sidebar -->
      <aside id="default-sidebar" class="fixed bg-white top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div class="h-full px-3 py-4 overflow-y-auto border-e border-default">
          <div class="logo mb-6">
            <img src="/assets/marki-logo.png" alt="Marki Logo" class="w-16 h-16">
          </div>
          <h2 class="text-xl font-bold mb-4 text-heading">Relances</h2>
          <ul class="space-y-2 font-medium">
            <li>
              <a href="/app/relances/" class="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group ${this.currentPage === 'dashboard' ? 'bg-neutral-tertiary text-fg-brand' : ''}">
                <i data-lucide="home" class="w-5 h-5 transition duration-75 group-hover:text-fg-brand"></i>
                <span class="ms-3">Dashboard</span>
              </a>
            </li>
             <li>
              <a href="/app/relances/impayes/" class="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group ${this.currentPage === 'impayes' ? 'bg-neutral-tertiary text-fg-brand' : ''}">
                <i data-lucide="file-text" class="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand"></i>
                <span class="flex-1 ms-3 whitespace-nowrap">Impayés</span>
              </a>
            </li>
            <li>
              <a href="/app/relances/sequences/" class="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group ${this.currentPage === 'sequences' ? 'bg-neutral-tertiary text-fg-brand' : ''}">
                <i data-lucide="clock" class="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand"></i>
                <span class="flex-1 ms-3 whitespace-nowrap">Séquences</span>
              </a>
            </li>
            <li>
              <a href="/app/settings/" class="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group ${this.currentPage === 'settings' ? 'bg-neutral-tertiary text-fg-brand' : ''}">
                <i data-lucide="settings" class="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand"></i>
                <span class="flex-1 ms-3 whitespace-nowrap">Paramètres</span>
              </a>
            </li>

          </ul>
        </div>
      </aside>
      
      <!-- Mobile Dock Menu - Visible only on mobile and tablet -->
      <div id="mobile-dock" class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-default">
        <div class="flex justify-around items-center h-16 px-4">
          <a href="/app/relances/" class="flex flex-col items-center justify-center px-4 py-2 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group ${this.currentPage === 'dashboard' ? 'bg-neutral-tertiary text-fg-brand' : ''}">
            <i data-lucide="home" class="w-6 h-6 mb-1 transition duration-75 group-hover:text-fg-brand"></i>
            <span class="text-xs">Dashboard</span>
          </a>
          <a href="/app/relances/impayes/" class="flex flex-col items-center justify-center px-4 py-2 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group ${this.currentPage === 'impayes' ? 'bg-neutral-tertiary text-fg-brand' : ''}">
            <i data-lucide="file-text" class="w-6 h-6 mb-1 transition duration-75 group-hover:text-fg-brand"></i>
            <span class="text-xs">Impayés</span>
          </a>
          <a href="/app/relances/sequences/" class="flex flex-col items-center justify-center px-4 py-2 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group ${this.currentPage === 'sequences' ? 'bg-neutral-tertiary text-fg-brand' : ''}">
            <i data-lucide="clock" class="w-6 h-6 mb-1 transition duration-75 group-hover:text-fg-brand"></i>
            <span class="text-xs">Séquences</span>
          </a>
          <a href="/app/settings/" class="flex flex-col items-center justify-center px-4 py-2 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group ${this.currentPage === 'settings' ? 'bg-neutral-tertiary text-fg-brand' : ''}">
            <i data-lucide="settings" class="w-6 h-6 mb-1 transition duration-75 group-hover:text-fg-brand"></i>
            <span class="text-xs">Paramètres</span>
          </a>

        </div>
      </div>
    `;
  }
}

customElements.define('relance-sidebar', RelanceSidebar);
