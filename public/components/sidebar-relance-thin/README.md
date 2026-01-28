# Relance Sidebar Thin Component

Un composant Lit pour une sidebar de relance conditionnelle qui s'affiche uniquement sur les pages de relances.

## Installation

```html
<script type="module" src="/components/sidebar-relance-thin.js"></script>
```

## Utilisation

```html
<relance-sidebar-thin></relance-sidebar-thin>
```

## Fonctionnalités

- **Affichage conditionnel** : S'affiche uniquement lorsque l'URL contient `/relances/`
- **Largeur fixe** : 200px de large
- **Positionnement automatique** : Se place à droite de la sidebar principale
- **Navigation spécifique** : Liens vers les sections de relances
- **Détection d'URL** : Écoute les changements d'URL pour mise à jour automatique

## Props

| Prop | Type | Description | Défaut |
|------|------|-------------|---------|
| isVisible | Boolean | Contrôle la visibilité | false (géré automatiquement) |

## Comportement

Le composant vérifie automatiquement l'URL actuelle et :
- **S'affiche** si l'URL contient `/relances/`
- **Se cache** sinon

## Exemple d'intégration

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Dépendances -->
  <script type="module">
    import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';
  </script>
</head>
<body>
  <!-- Sidebar principale -->
  <thin-sidebar></thin-sidebar>
  
  <!-- Sidebar relance conditionnelle -->
  <relance-sidebar-thin></relance-sidebar-thin>
  
  <!-- Contenu principal -->
  <div class="ml-[40px] md:ml-[240px]">
    <!-- Votre contenu -->
  </div>
  
  <!-- Scripts -->
  <script type="module" src="/components/sidebar-thin.js"></script>
  <script type="module" src="/components/sidebar-relance-thin.js"></script>
</body>
</html>
```

## Dépendances

- [Lit](https://lit.dev/) 2.0+

## Styles

Le composant inclut des styles intégrés pour :
- Positionnement fixe
- Transitions fluides
- Effets de survol sur les liens
- Responsive design

## Événements écoutés

- `popstate` : Pour détecter les changements d'historique
- `hashchange` : Pour détecter les changements de hash

## Compatibilité

- Chrome 60+
- Firefox 60+
- Safari 11+
- Edge 79+

## Notes techniques

- Utilise `window.location.pathname` pour la détection d'URL
- Se positionne automatiquement à `left: 40px` pour s'aligner avec la sidebar principale
- Z-index de 30 pour apparaître au-dessus du contenu mais sous d'autres éléments importants

## Licence

MIT
