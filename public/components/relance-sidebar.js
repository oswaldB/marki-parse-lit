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
                <svg class="w-5 h-5 transition duration-75 group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z"/></svg>
                <span class="ms-3">Dashboard</span>
              </a>
            </li>
             <li>
              <a href="/app/relances/impayes/" class="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group ${this.currentPage === 'impayes' ? 'bg-neutral-tertiary text-fg-brand' : ''}">
                <svg class="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Impayés</span>
              </a>
            </li>
            <li>
              <a href="/app/relances/sequences/" class="flex items-center px-2 py-1.5 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group ${this.currentPage === 'sequences' ? 'bg-neutral-tertiary text-fg-brand' : ''}">
                <svg class="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h3v3H4V4Zm0 10h3v3H4v-3Zm0-10h3v3H4V4Zm10 0h3v3h-3V4Zm0 10h3v3h-3v-3Zm-5-5h3v3h-3v-3Z"/></svg>
                <span class="flex-1 ms-3 whitespace-nowrap">Séquences</span>
              </a>
            </li>

          </ul>
        </div>
      </aside>
      
      <!-- Mobile Dock Menu - Visible only on mobile and tablet -->
      <div id="mobile-dock" class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-default">
        <div class="flex justify-around items-center h-16 px-4">
          <a href="/app/relances/" class="flex flex-col items-center justify-center px-4 py-2 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group ${this.currentPage === 'dashboard' ? 'bg-neutral-tertiary text-fg-brand' : ''}">
            <svg class="w-6 h-6 mb-1 transition duration-75 group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6.025A7.5 7.5 0 1 0 17.975 14H10V6.025Z"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.5 3c-.169 0-.334.014-.5.025V11h7.975c.011-.166.025-.331.025-.5A7.5 7.5 0 0 0 13.5 3Z"/></svg>
            <span class="text-xs">Dashboard</span>
          </a>
          <a href="/app/relances/impayes/" class="flex flex-col items-center justify-center px-4 py-2 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group ${this.currentPage === 'impayes' ? 'bg-neutral-tertiary text-fg-brand' : ''}">
            <svg class="w-6 h-6 mb-1 transition duration-75 group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>
            <span class="text-xs">Impayés</span>
          </a>
          <a href="/app/relances/sequences/" class="flex flex-col items-center justify-center px-4 py-2 text-body rounded-base hover:bg-neutral-tertiary hover:text-fg-brand group ${this.currentPage === 'sequences' ? 'bg-neutral-tertiary text-fg-brand' : ''}">
            <svg class="w-6 h-6 mb-1 transition duration-75 group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h3v3H4V4Zm0 10h3v3H4v-3Zm0-10h3v3H4V4Zm10 0h3v3h-3V4Zm0 10h3v3h-3v-3Zm-5-5h3v3h-3v-3Z"/></svg>
            <span class="text-xs">Séquences</span>
          </a>

        </div>
      </div>
    `;
  }
}

customElements.define('relance-sidebar', RelanceSidebar);
