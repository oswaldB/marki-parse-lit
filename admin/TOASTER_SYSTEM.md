# Système de Notifications Toaster

Le système de notifications toaster est un composant de feedback utilisateur qui permet d'afficher des messages temporaires pour informer les utilisateurs des actions, succès, erreurs ou avertissements.

## Fonctionnement

### 1. Composants Principaux

#### `toaster.js` - Composant Lit pour l'affichage
```javascript
import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

export class Toaster extends LitElement {
  createRenderRoot() {
    return this; // Désactive le shadow DOM
  }

  render() {
    return html`
      <div id="toast-container" class="fixed top-4 right-4 z-50 space-y-2 w-full max-w-xs">
        <!-- Les toasts seront ajoutés ici dynamiquement -->
      </div>
    `;
  }
}

if (!customElements.get('toaster-component')) {
  customElements.define('toaster-component', Toaster);
}
```

#### `toaster-store.js` - Gestionnaire d'état des toasts
```javascript
// Store global pour gérer les toasts
window.toasterStore = {
  toasts: [],

  // Ajouter un toast
  addToast: function(toast) {
    this.toasts.push(toast);
    this.renderToasts();
    this.autoDismiss(toast);
  },

  // Supprimer un toast
  removeToast: function(id) {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    this.renderToasts();
  },

  // Rendre les toasts dans le DOM
  renderToasts: function() {
    const container = document.getElementById('toast-container');
    if (!container) return;

    container.innerHTML = this.toasts.map(toast => `
      <div id="toast-${toast.id}" class="toast ${toast.type}" role="alert">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            ${this.getIcon(toast.type)}
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium text-gray-900">${toast.title}</p>
            <p class="mt-1 text-sm text-gray-500">${toast.message}</p>
          </div>
          <div class="ml-4 flex flex-shrink-0">
            <button onclick="window.toasterStore.removeToast('${toast.id}')" class="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none">
              <span class="sr-only">Fermer</span>
              <!-- Icône de fermeture -->
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  },

  // Fermeture automatique des toasts
  autoDismiss: function(toast) {
    if (toast.autoDismiss) {
      setTimeout(() => {
        this.removeToast(toast.id);
      }, toast.duration || 5000);
    }
  },

  // Obtenir l'icône en fonction du type
  getIcon: function(type) {
    const icons = {
      success: '<svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>',
      error: '<svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>',
      warning: '<svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.01-1.742 3.01H4.42c-1.532 0-2.493-1.676-1.742-3.01l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>',
      info: '<svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg>'
    };
    return icons[type] || icons.info;
  }
};
```

### 2. Utilisation

#### Afficher un toast
```javascript
// Toast de succès
window.toasterStore.addToast({
  id: 'success-' + Date.now(),
  type: 'success',
  title: 'Succès',
  message: 'Votre action a été effectuée avec succès!',
  autoDismiss: true,
  duration: 5000
});

// Toast d'erreur
window.toasterStore.addToast({
  id: 'error-' + Date.now(),
  type: 'error',
  title: 'Erreur',
  message: 'Une erreur est survenue lors de l\'opération.',
  autoDismiss: true
});

// Toast d'avertissement
window.toasterStore.addToast({
  id: 'warning-' + Date.now(),
  type: 'warning',
  title: 'Attention',
  message: 'Cette action est irréversible.',
  autoDismiss: false // Ne se ferme pas automatiquement
});

// Toast d'information
window.toasterStore.addToast({
  id: 'info-' + Date.now(),
  type: 'info',
  title: 'Information',
  message: 'Votre demande est en cours de traitement.',
  autoDismiss: true
});
```

### 3. Intégration dans les Pages

Pour utiliser le système de toaster dans une page:

1. **Ajouter le composant toaster** dans le HTML:
```html
<!-- Composant Toaster -->
<toaster-component></toaster-component>
```

2. **Importer les scripts nécessaires**:
```html
<!-- Composant Toaster -->
<script type="module" src="/components/toaster.js"></script>
<script src="/components/toaster-store.js"></script>
```

3. **Utiliser le store** pour afficher des notifications:
```javascript
// Exemple dans un gestionnaire d'événements
async function saveUser() {
  try {
    await someAsyncOperation();
    window.toasterStore.addToast({
      id: 'save-success-' + Date.now(),
      type: 'success',
      title: 'Utilisateur enregistré',
      message: 'L\'utilisateur a été enregistré avec succès.',
      autoDismiss: true
    });
  } catch (error) {
    window.toasterStore.addToast({
      id: 'save-error-' + Date.now(),
      type: 'error',
      title: 'Erreur d\'enregistrement',
      message: 'Une erreur est survenue: ' + error.message,
      autoDismiss: true
    });
  }
}
```

### 4. Types de Toasts

Le système supporte 4 types de toasts:

- **Success** (vert) - Pour les opérations réussies
- **Error** (rouge) - Pour les erreurs et échecs
- **Warning** (jaune) - Pour les avertissements et actions sensibles
- **Info** (bleu) - Pour les informations générales

### 5. Personnalisation

Les toasts peuvent être personnalisés avec les propriétés suivantes:

- `id` (requis): Identifiant unique du toast
- `type` (requis): Type de toast ('success', 'error', 'warning', 'info')
- `title` (requis): Titre du toast
- `message` (requis): Message du toast
- `autoDismiss` (optionnel): Si vrai, le toast se ferme automatiquement (défaut: true)
- `duration` (optionnel): Durée en millisecondes avant fermeture automatique (défaut: 5000)

### 6. Styles CSS

Les toasts utilisent les classes Tailwind CSS suivantes:

```css
/* Conteneur des toasts */
#toast-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 50;
  width: 100%;
  max-width: 16rem;
}

/* Toast individuel */
.toast {
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-bottom: 0.5rem;
}

/* Types de toast */
.toast.success {
  background-color: #D1FAE5;
  border-left: 4px solid #059669;
}

.toast.error {
  background-color: #FEE2E2;
  border-left: 4px solid #DC2626;
}

.toast.warning {
  background-color: #FEF3C7;
  border-left: 4px solid #D97706;
}

.toast.info {
  background-color: #DBEAFE;
  border-left: 4px solid #2563EB;
}
```

## Bonnes Pratiques

1. **Identifiants uniques**: Toujours utiliser des identifiants uniques pour chaque toast (par exemple avec `Date.now()`)
2. **Messages clairs**: Garder les messages courts et informatifs
3. **Durée appropriée**: Utiliser des durées plus longues pour les messages importants
4. **Ne pas surcharger**: Éviter d'afficher trop de toasts en même temps
5. **Fermeture manuelle**: Utiliser `autoDismiss: false` pour les messages critiques qui nécessitent une action utilisateur

Ce système de notifications toaster offre une manière cohérente et esthétique d'informer les utilisateurs des actions et états du système à travers l'application.