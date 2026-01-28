// Configuration centralisée pour les sidebars

/**
 * Configuration par défaut pour la thin-sidebar
 * @type {Array<{name: string, icon: string, url: string}>}
 */
export const thinSidebarConfig = {
  defaultItems: [
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
  ],
  
  // Configuration pour différents rôles utilisateur
  roles: {
    admin: [
      {
        name: 'Admin',
        icon: 'shield',
        url: '/app/admin/'
      }
    ],
    user: [
      {
        name: 'Profil',
        icon: 'user',
        url: '/app/profile/'
      }
    ]
  }
};

/**
 * Configuration pour la relance-sidebar-thin
 * @type {Array<{name: string, icon: string, url: string}>}
 */
export const relanceSidebarConfig = {
  defaultItems: [
    {
      name: 'Dashboard',
      url: '/app/relances/'
    },
    {
      name: 'Impayés',
      url: '/app/relances/impayes/'
    },
    {
      name: 'Séquences',
      url: '/app/relances/sequences/'
    }
  ]
};

/**
 * Fonction pour obtenir la configuration de la sidebar en fonction du rôle
 * @param {string} role - Rôle de l'utilisateur
 * @returns {Array} Configuration fusionnée
 */
export function getSidebarConfigForRole(role) {
  const baseConfig = [...thinSidebarConfig.defaultItems];
  
  if (role && thinSidebarConfig.roles[role]) {
    return [...baseConfig, ...thinSidebarConfig.roles[role]];
  }
  
  return baseConfig;
}

/**
 * Fonction pour charger la configuration dynamiquement
 * @param {string} configName - Nom de la configuration à charger
 * @returns {Promise<any>} Configuration chargée
 */
export async function loadSidebarConfig(configName) {
  try {
    // Dans une application réelle, cela pourrait charger depuis une API
    // Pour l'instant, on retourne la configuration par défaut
    if (configName === 'thin') {
      return thinSidebarConfig;
    } else if (configName === 'relance') {
      return relanceSidebarConfig;
    }
    
    return null;
  } catch (error) {
    console.error('Erreur lors du chargement de la configuration:', error);
    return null;
  }
}

// Export par défaut pour la compatibilité
const sidebarConfig = {
  thinSidebarConfig,
  relanceSidebarConfig,
  getSidebarConfigForRole,
  loadSidebarConfig
};

export default sidebarConfig;
