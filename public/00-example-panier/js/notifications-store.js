/**
 * Store Alpine.js pour la gestion des notifications
 * Approche centralisée pour une meilleure organisation du code
 */

document.addEventListener('alpine:init', () => {
    Alpine.store('notifications', {
        // État initial
        notifications: [],
        
        // Ajouter une notification
        add(message, type = 'info') {
            const id = Date.now();
            this.notifications.push({ id, message, type });
            
            // Suppression automatique après 3 secondes
            setTimeout(() => {
                this.remove(id);
            }, 3000);
        },
        
        // Supprimer une notification spécifique
        remove(id) {
            this.notifications = this.notifications.filter(n => n.id !== id);
        },
        
        // Supprimer toutes les notifications
        clear() {
            this.notifications = [];
        },
        
        // Vider les notifications après un délai
        clearAfterDelay(delay = 3000) {
            setTimeout(() => {
                this.clear();
            }, delay);
        }
    });
});

// Fonction utilitaire pour faciliter l'utilisation
export function useNotifications() {
    return {
        showNotification: function(message, type = 'info') {
            Alpine.store('notifications').add(message, type);
        },
        clearNotifications: function() {
            Alpine.store('notifications').clear();
        }
    };
}