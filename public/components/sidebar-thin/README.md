# Thin Sidebar Component

Un composant Lit pour une sidebar compacte de 40px avec effet de survol.

## Installation

```html
<script type="module" src="/components/sidebar-thin.js"></script>
```

## Utilisation

```html
<thin-sidebar></thin-sidebar>
```

## Fonctionnalités

- **Largeur compacte** : 40px par défaut
- **Effet de survol** : S'élargit à 200px au survol
- **Navigation par icônes** : Utilise Feather Icons
- **Personnalisable** : Tableau d'éléments configurable
- **Responsive** : Adapté à tous les écrans

## Props

| Prop | Type | Description | Défaut |
|------|------|-------------|---------|
| items | Array | Tableau d'objets de navigation | Voir ci-dessous |

### Structure des items

```javascript
{
  name: "Nom de l'élément",
  icon: "nom-de-l-icone",  // Nom de l'icône Feather
  url: "/chemin/vers/page"  // URL de destination
}
```

## Exemple de personnalisation

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
  },
  {
    name: 'Paramètres',
    icon: 'settings',
    url: '/settings'
  }
];
```

## Dépendances

- [Lit](https://lit.dev/) 2.0+
- [Feather Icons](https://feathericons.com/)

## Styles

Le composant inclut des styles intégrés pour :
- Transitions fluides
- Effets de survol
- Animations d'icônes
- Responsive design

## Événements

- `featherLoaded` : Déclenché lorsque les icônes Feather sont prêtes

## Compatibilité

- Chrome 60+
- Firefox 60+
- Safari 11+
- Edge 79+

## Licence

MIT
