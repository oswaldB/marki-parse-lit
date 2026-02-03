/**
 * Script principal pour l'exemple de panier
 * Ce fichier pourrait contenir du code JavaScript supplémentaire
 * si nécessaire pour l'application
 */

// Fonction pour initialiser l'application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Exemple de panier chargé avec succès !');
    
    // Vous pouvez ajouter ici du code d'initialisation supplémentaire
    // Par exemple :
    // - Chargement de données depuis une API
    // - Configuration d'événements globaux
    // - Initialisation d'analytiques
    
    // L'application utilise principalement Alpine.js et Lit,
    // donc ce fichier peut rester minimal
});

// Fonction utilitaire pour formater les prix
export function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(price);
}

// Fonction utilitaire pour générer des IDs uniques
export function generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
}