# Documentation de la Sidebar Fine

## Introduction

Ce document explique comment utiliser les nouveaux composants de sidebar fine (40px) pour l'application Marki-parse. La sidebar fine offre une expérience utilisateur plus compacte tout en permettant un accès rapide aux fonctionnalités principales.

## Composants Disponibles

### 1. `thin-sidebar` - Sidebar principale fine

Un composant Lit qui affiche une sidebar compacte de 40px de large avec des icônes. La sidebar s'élargit au survol pour afficher le texte.

**Fonctionnalités :**
- Largeur compacte de 40px
- Effet de survol pour élargir à 200px
- Affichage des icônes avec texte au survol
- Intégration avec Feather Icons
- Espace réservé pour d'autres composants

**Utilisation :**
```html
<thin-sidebar></thin-sidebar>
```

**Propriétés :**
- `items` (Array) : Tableau d'objets définissant les éléments de navigation
  - `name` (String) : Nom de l'élément
  - `icon` (String) : Nom de l'icône Feather
  - `url` (String) : URL de destination

**Exemple de personnalisation :**
```javascript
const sidebar = document.querySelector('thin-sidebar');
sidebar.items = [
  {
    name: 'Accueil',
    icon: 'home',
    url: '/'
  },
  {
    name: 'Profil',
    icon: 'user',
    url: '/profile'
  }
];
```

### 2. `relance-sidebar-thin` - Sidebar relance conditionnelle

Un composant Lit qui s'affiche uniquement lorsque l'URL contient `/relances/`. Ce composant se positionne à droite de la sidebar principale.

**Fonctionnalités :**
- Affichage conditionnel basé sur l'URL
- Largeur de 200px
- Navigation spécifique aux relances
- Détection automatique des changements d'URL

**Utilisation :**
```html
<relance-sidebar-thin></relance-sidebar-thin>
```

**Propriétés :**
- `isVisible` (Boolean) : Contrôle la visibilité (géré automatiquement)

## Intégration dans une Page

### Exemple complet

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page avec Sidebar Fine</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
  <script type="module">
    import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';
    window.lit = { LitElement, html };
  </script>
</head>
<body class="bg-gray-100">
  <!-- Sidebar fine principale -->
  <thin-sidebar></thin-sidebar>
  
  <!-- Sidebar relance conditionnelle -->
  <relance-sidebar-thin></relance-sidebar-thin>
  
  <!-- Import des composants -->
  <script type="module" src="/components/sidebar-thin.js"></script>
  <script type="module" src="/components/sidebar-relance-thin.js"></script>
  
  <!-- Contenu principal avec marge pour la sidebar -->
  <div class="main-content ml-[40px] md:ml-[240px] transition-all duration-300">
    <div class="p-6">
      <!-- Votre contenu ici -->
    </div>
  </div>
  
  <script>
    // Initialiser les icônes Feather
    document.addEventListener('DOMContentLoaded', function() {
      if (typeof feather !== 'undefined') {
        feather.replace();
        document.dispatchEvent(new Event('featherLoaded'));
      }
    });
  </script>
</body>
</html>
```

## Styles CSS

Les composants incluent des styles intégrés pour :

- **Effet de survol** : La sidebar s'élargit de 40px à 200px au survol
- **Transitions fluides** : Animations CSS pour les changements de taille
- **Effets d'icônes** : Les icônes s'épaississent légèrement au survol
- **Responsive** : Adaptation automatique à la taille de l'écran

## Personnalisation

### Changer les éléments par défaut

```javascript
const sidebar = document.querySelector('thin-sidebar');
sidebar.items = [
  {
    name: 'Nouvel élément',
    icon: 'plus',
    url: '/nouveau'
  }
  // ... autres éléments
];
```

### Ajouter des composants supplémentaires

Le composant `thin-sidebar` inclut un conteneur avec l'ID `thin-sidebar-components` où vous pouvez ajouter dynamiquement d'autres composants :

```javascript
const container = document.getElementById('thin-sidebar-components');
container.innerHTML = '<mon-autre-composant></mon-autre-composant>';
```

## Compatibilité

- **Navigateurs** : Tous les navigateurs modernes (Chrome, Firefox, Safari, Edge)
- **Frameworks** : Compatible avec Lit, Alpine.js, et autres frameworks modernes
- **Responsive** : Fonctionne sur mobile, tablette et desktop

## Bonnes Pratiques

1. **Positionnement** : Toujours placer la sidebar en position `fixed` pour éviter les problèmes de défilement
2. **Margins** : Ajouter une marge gauche au contenu principal pour éviter le chevauchement
3. **Z-index** : Assurez-vous que la sidebar a un z-index suffisant pour apparaître au-dessus des autres éléments
4. **Performance** : Les icônes Feather sont chargées dynamiquement pour optimiser les performances

## Exemple de Page Complète

Voir `/public/app/relances/index-thin-sidebar.html` pour un exemple complet d'intégration.

## Dépendances

- [Lit](https://lit.dev/) : Pour les composants web
- [Feather Icons](https://feathericons.com/) : Pour les icônes
- [Tailwind CSS](https://tailwindcss.com/) : Pour les styles (optionnel mais recommandé)

## Notes Techniques

- Les composants utilisent le shadow DOM désactivé pour une meilleure intégration avec le style global
- Les icônes Feather sont initialisées automatiquement lorsque le composant est connecté au DOM
- La détection d'URL pour la sidebar relance utilise `window.location.pathname`
