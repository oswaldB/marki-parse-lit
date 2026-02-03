# Dossier des Assets

Ce dossier est destiné à contenir les ressources statiques de l'application :

- Images des produits
- Logos
- Icônes
- Fichiers JSON de configuration
- Autres ressources statiques

## Structure recommandée :

```
assets/
├── images/
│   ├── produits/
│   │   ├── pomme.jpg
│   │   ├── banane.jpg
│   │   └── ...
│   └── logo.png
├── icons/
│   ├── cart.svg
│   └── ...
└── data/
    └── produits.json
```

## Utilisation :

Pour utiliser ces assets dans votre application, référencez-les avec des chemins relatifs :

```html
<img src="./assets/images/produits/pomme.jpg" alt="Pomme">
```

```javascript
import produitsData from './assets/data/produits.json';
```