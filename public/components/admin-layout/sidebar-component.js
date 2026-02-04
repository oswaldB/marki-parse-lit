// Admin Sidebar - Self-contained Alpine.js Component
// Fusion du template et de la logique en un seul fichier

document.addEventListener('alpine:init', () => {
  Alpine.data('adminSidebar', () => ({
    currentPage: '',
    
    // Navigation configuration - single source of truth
    navItems: [
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
    ],
    
    // Impayes section items
    impayesItems: [
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
    ],
    
    init() {
      this._setActivePageFromUrl();
    },
    
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
    },
    
    _isActive(path) {
      return this.currentPage === path.substring(1);
    },
    
    _getIconColor(path) {
      return this._isActive(path) ? 'text-blue-600' : 'text-gray-500';
    },
    
    _handleNavigation(e, path) {
      e.preventDefault();
      window.location.href = path;
    },
    
    // Template intégré directement dans le composant
    template: `
      <div class="flex h-screen fixed top-0 left-0 transition-all duration-300 ease-in-out z-40">
        <!-- First Column - Logo and Settings -->
        <div class="w-20 bg-white border-r border-gray-200 flex flex-col">
          <!-- Logo Section -->
          <div class="p-4 border-b border-gray-200 text-center">
            <img src="/assets/marki-logo.png" alt="Marki Logo" class="w-12 h-auto object-contain mx-auto">
          </div>

          <!-- Navigation Menu - First Column -->
          <div class="py-4 flex-1">
            <template x-for="item in navItems" :key="item.path">
              <a 
                :href="item.path"
                :class="_isActive(item.path) ? 'flex flex-col items-center px-2 py-3 text-xs font-medium text-blue-600 bg-blue-50' : 'flex flex-col items-center px-2 py-3 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200 ease-in-out'"
                @click="(e) => _handleNavigation(e, item.path)"
              >
                <span class="w-6 h-6 flex items-center justify-center flex-shrink-0 mb-1">
                  <i :data-lucide="item.icon" :class="_getIconColor(item.path)"></i>
                </span>
                <span class="text-xs" x-text="item.label"></span>
              </a>
            </template>
          </div>

          <!-- User Profile - First Column -->
          <div class="p-4 border-t border-gray-200 bg-gray-50">
            <div class="flex flex-col items-center">
              <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold mb-1">
                <i data-lucide="user-circle" class="text-white"></i>
              </div>
              <span class="text-xs text-gray-600" x-text="auth.user?.username || 'Utilisateur'"></span>
            </div>
          </div>
        </div>

        <!-- Second Column - Impayes Section -->
        <div class="w-48 bg-white border-r border-gray-200">
          <div class="py-4">
            <div class="px-4 pb-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">IMPAYES</div>
            
            <!-- Impayes Section Items -->
            <template x-for="item in impayesItems" :key="item.path">
              <a 
                :href="item.path"
                :class="_isActive(item.path) ? 'flex items-center px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 border-l-3 border-blue-600' : 'flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200 ease-in-out border-l-3 border-transparent'"
                @click="(e) => _handleNavigation(e, item.path)"
              >
                <span class="mr-3 w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <i :data-lucide="item.icon" :class="_getIconColor(item.path)"></i>
                </span>
                <span class="text-sm" x-text="item.label"></span>
              </a>
            </template>
          </div>
        </div>
      </div>
    `
  }));
});