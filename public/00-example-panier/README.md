# Exemple de Panier d'Achat - Alpine.js + Lit

Ce dossier contient un exemple complet d'application de panier d'achat utilisant Alpine.js pour la logique et Lit pour les composants web.

## Structure du Projet

```
public/example-panier/
├── index.html              # Page principale de l'application
├── assets/                 # Ressources statiques (images, données, etc.)
│   └── README.md           # Documentation pour les assets
├── css/
│   └── styles.css          # Styles personnalisés (en complément d'UnoCSS)
├── js/
│   └── main.js             # Script principal et fonctions utilitaires
├── components/
│   ├── panier-layout.js    # Composant Lit pour la mise en page
│   ├── produit-card.js     # Composant Lit pour les cartes de produits
│   ├── panier-item.js      # Composant Lit pour les éléments du panier
│   └── notification-toast.js # Composant Lit pour les notifications
├── .gitignore              # Fichiers à ignorer pour git
├── package.json            # Configuration du projet et dépendances
└── README.md               # Ce fichier
```

## Fonctionnalités

- **Affichage des produits** : Liste de produits avec images, noms et prix
- **Gestion du panier** : Ajout/suppression de produits au panier
- **Calcul automatique** : Calcul du total en temps réel
- **Notifications** : Notifications visuelles pour les actions utilisateur
- **Interface responsive** : Adapté aux mobiles et écrans larges

## Composants Lit

### 1. `panier-layout.js`
Composant de mise en page complet avec header intégré et propriétés personnalisables.

**Propriétés** :
- `title` (String) : Titre de l'application (défaut: "Mon Application Panier")
- `welcomeMessage` (String) : Message de bienvenue (défaut: "Bienvenue!")
- `showCartIcon` (Boolean) : Affiche/masque l'icône de panier (défaut: true)

**Slots** :
- Slot par défaut : Contenu principal
- Slot `footer` : Pied de page personnalisable

**Fonctionnalités** :
- Header intégré avec titre et section de bienvenue
- Icône de panier stylisée
- Container centré pour le contenu principal
- Footer avec copyright automatique
- Responsive design avec max-width

### 2. `produit-card.js`
Composant pour afficher un produit avec :
- Image du produit
- Nom et prix
- Bouton "Ajouter au panier"

### 3. `panier-item.js`
Composant pour afficher un élément dans le panier avec :
- Nom et prix
- Quantité
- Bouton de suppression

### 4. `notification-toast.js`
Composant Lit pour afficher des notifications individuelles :
- Messages personnalisés
- Types de notification (info, succès, erreur, avertissement)
- Animations d'apparition/disparition intégrées
- Fermeture automatique après 3 secondes

### 4. `notification-toast.js`
Composant Lit pour afficher des notifications avec :
- Messages personnalisés
- Types de notification (info, succès, erreur, avertissement)
- **Icônes Font Awesome** pour chaque type
- Animations d'apparition/disparition intégrées
- Fermeture automatique après 3 secondes
- Positionnement fixe en bas à droite

**Utilisation dans le template Alpine.js** :
```html
<template x-for="notification in $store.notifications.notifications">
    <notification-toast 
        :message="notification.message" 
        :type="notification.type"
    ></notification-toast>
</template>
```

**Propriétés** :
- `message` (String) : Le message à afficher
- `type` (String) : Type de notification ('info', 'success', 'error', 'warning')
- `duration` (Number) : Durée d'affichage en ms (défaut: 3000)

**Icônes par type** (Lucide) :
- ✅ Success : `check-circle` <i class="lucide lucide-check-circle" style="color: #10b981;"></i>
- ❌ Error : `alert-circle` <i class="lucide lucide-alert-circle" style="color: #ef4444;"></i>
- ℹ️ Info : `info` <i class="lucide lucide-info" style="color: #3b82f6;"></i>
- ⚠️ Warning : `alert-triangle` <i class="lucide lucide-alert-triangle" style="color: #f59e0b;"></i>

**Note** : Les icônes utilisent des SVG Lucide inline pour une compatibilité parfaite avec les Web Components. Les SVG sont directement intégrés dans le composant et utilisent `stroke="currentColor"` pour s'adapter automatiquement à la couleur du texte. Cette approche est plus fiable que de dépendre de l'API JavaScript de Lucide.

## Logique Alpine.js

La page `index.html` utilise Alpine.js pour gérer :

- **État du panier** : Tableau des produits dans le panier
- **Calcul du total** : Somme des prix multipliés par les quantités
- **Gestion des événements** : Écoute des événements personnalisés
- **Affichage conditionnel** : Affichage différent selon si le panier est vide ou non

## Système de Notifications (Architecture Avancée)

L'application utilise une **architecture avancée** combinant :
- **Alpine.js Store** : Gestion centralisée de l'état
- **Composant Lit** : Affichage et animations
- **Approche réactive** : Mises à jour automatiques

Cette architecture offre une meilleure organisation, réutilisabilité et maintenabilité.

### Intégration dans l'application (Approche Finale) :

**Template HTML avec Alpine.js x-for et composant Lit** :
```html
<div x-data class="fixed bottom-4 right-4 z-50 space-y-2">
    <template x-for="notification in $store.notifications.notifications" :key="notification.id">
        <notification-toast 
            :message="notification.message" 
            :type="notification.type"
        ></notification-toast>
    </template>
</div>
```

**Utilisation dans le code** :
```javascript
// Dans n'importe quel composant Alpine.js
showNotification(message) {
    Alpine.store('notifications').add(message, 'info');
}
```

**Avantages de cette approche** :
- ✅ Utilisation directe du composant Lit dans le template Alpine.js
- ✅ Réactivité complète grâce à Alpine.js
- ✅ Animations et styles gérés par le composant Lit
- ✅ Approche hybride optimale
- ✅ Code clair et maintenable

### Avantages de l'architecture avec Store :

1. **Gestion centralisée** : Toutes les notifications dans un seul store
2. **Accès global** : Disponible partout dans l'application
3. **Code plus propre** : Pas de duplication de logique
4. **Réutilisable** : Le store peut être utilisé dans n'importe quel composant
5. **Maintenable** : Modification facile du comportement
6. **Testable** : Logique isolée et testable
7. **Extensible** : Facile à ajouter de nouvelles fonctionnalités
8. **Performant** : Réactivité Alpine.js + optimisations Lit

### Quand les notifications sont utilisées :

1. **Ajout au panier** :
   - Message : "[Nom du produit] ajouté au panier!"
   - Type : info

2. **Suppression du panier** :
   - Message : "[Nom du produit] supprimé du panier"
   - Type : info

## Comment ça marche

1. **Ajout au panier** :
   - L'utilisateur clique sur "Ajouter au panier" dans une carte de produit
   - Le composant `produit-card` émet un événement `ajout-panier`
   - Alpine.js écoute cet événement et ajoute le produit au panier
   - Une notification est affichée via le composant Lit `notification-toast`

2. **Suppression du panier** :
   - L'utilisateur clique sur le bouton de suppression dans un élément du panier
   - Le composant `panier-item` émet un événement `supprimer-du-panier`
   - Alpine.js écoute cet événement et supprime le produit du panier
   - Une notification est affichée

3. **Calcul du total** :
   - À chaque modification du panier, la méthode `calculerTotal()` est appelée
   - Le total est mis à jour et affiché dans l'interface

## Organisation du Projet

Ce projet suit une structure de dossier standard pour les applications web modernes :

- **`index.html`** : Point d'entrée de l'application
- **`assets/`** : Ressources statiques (images, données JSON, etc.)
- **`css/`** : Feuilles de style personnalisées
- **`js/`** : Scripts JavaScript et fonctions utilitaires
- **`components/`** : Composants Lit réutilisables

## Utilisation du Layout

Le composant `panier-layout` peut être utilisé de plusieurs manières :

### Utilisation basique (avec valeurs par défaut) :
```html
<panier-layout>
  <!-- Votre contenu ici -->
  <div>Contenu de l'application</div>
</panier-layout>
```

### Utilisation avec personnalisation :
```html
<panier-layout 
  title="Ma Boutique En Ligne"
  welcome-message="Bonjour, visiteur!"
  show-cart-icon
>
  <!-- Votre contenu ici -->
  <div>Contenu personnalisé</div>
</panier-layout>
```

### Avec footer personnalisé :
```html
<panier-layout title="Mon App">
  <!-- Contenu principal -->
  <div>Contenu principal</div>
  
  <!-- Footer personnalisé -->
  <div slot="footer">
    <p>© 2023 Mon Entreprise | <a href="/contact">Contact</a></p>
  </div>
</panier-layout>
```

## Alpine.js Store pour les Notifications

### Fichier : `js/notifications-store.js`

Ce store centralise toute la logique de gestion des notifications :

**Fonctionnalités** :
- Ajout de notifications avec ID unique
- Suppression automatique après 3 secondes
- Suppression manuelle par ID
- Vidage complet du store
- Méthodes utilitaires

**Utilisation** :
```javascript
// Ajouter une notification
Alpine.store('notifications').add('Message', 'info');

// Supprimer une notification
Alpine.store('notifications').remove(id);

// Tout supprimer
Alpine.store('notifications').clear();
```

**Avantages** :
- Code réutilisable dans toute l'application
- État global accessible partout
- Meilleure organisation du code
- Facile à tester et maintenir

## Intégration des Composants Lit

Les composants Lit sont intégrés directement dans le HTML :

```html
<!-- Import des composants Lit -->
<script type="module" src="./components/panier-layout.js"></script>
<script type="module" src="./components/produit-card.js"></script>
<script type="module" src="./components/panier-item.js"></script>
<script type="module" src="./components/notification-toast.js"></script>

<!-- Import du store -->
<script type="module" src="./js/notifications-store.js"></script>
```

## Styles et Scripts

En plus des composants Lit, le projet utilise :

- **UnoCSS** (via CDN) pour les styles utilitaires
- **Styles personnalisés** (`css/styles.css`) pour les animations et styles spécifiques
- **Script principal** (`js/main.js`) pour l'initialisation et les fonctions utilitaires

## Personnalisation

Vous pouvez facilement personnaliser :

- **Les produits** : Modifiez le tableau `produits` dans le code Alpine.js
- **Les styles** : Utilisez UnoCSS pour modifier l'apparence
- **Les notifications** : Changez les types et durées dans le composant Lit
- **La mise en page** : Modifiez le composant `panier-layout.js`

## Développement et Extension

### Ajouter de nouveaux composants

Pour ajouter un nouveau composant Lit :

1. Créez un nouveau fichier dans `components/` (ex: `mon-composant.js`)
2. Implémentez votre composant en étendant `LitElement`
3. Importé-le dans `index.html`

### Ajouter des styles

- **Styles globaux** : Ajoutez-les dans `css/styles.css`
- **Styles spécifiques** : Utilisez les styles encapsulés dans vos composants Lit

### Ajouter des fonctionnalités JavaScript

- **Fonctions utilitaires** : Ajoutez-les dans `js/main.js`
- **Logique d'application** : Utilisez Alpine.js dans `index.html`

### Gestion des assets

Placez vos ressources statiques dans le dossier `assets/` :
- Images : `assets/images/`
- Données JSON : `assets/data/`
- Icônes : `assets/icons/`

## Exécution

Pour utiliser cet exemple :

1. Copiez ce dossier dans votre projet
2. Assurez-vous d'avoir accès à :
   - UnoCSS (via CDN)
   - Alpine.js (via CDN)
   - Lit (via CDN, importé dans les composants)
3. Ouvrez `index.html` dans un navigateur

### Pour un développement local :

```bash
# Si vous voulez utiliser un serveur local
python3 -m http.server 8000
# Puis accédez à http://localhost:8000
```

## Configuration du Projet

### package.json

Le fichier `package.json` contient la configuration du projet :

- **Nom** : `example-panier`
- **Version** : `1.0.0`
- **Scripts** : Commandes utiles pour le développement
- **Dépendances** : Alpine.js, Lit, UnoCSS

### Scripts disponibles

```bash
# Démarrer le projet (affiche les instructions)
npm start

# Lancer un serveur de développement
npm run dev

# Build du projet
npm run build

# Exécuter les tests
npm test
```

### .gitignore

Le fichier `.gitignore` est configuré pour ignorer :
- Les dépendances (`node_modules/`)
- Les fichiers de cache et de build
- Les fichiers temporaires et IDE-specific
- Les fichiers de configuration locale

## Dépendances

- [Alpine.js](https://alpinejs.dev/) - Framework JavaScript léger pour la logique
- [Lit](https://lit.dev/) - Bibliothèque pour créer des composants web réutilisables
- [UnoCSS](https://unocss.dev/) - Framework CSS utilitaire moderne pour le styling
- [Lucide](https://lucide.dev/) - Bibliothèque d'icônes modernes via CDN

Toutes les dépendances sont chargées via CDN, donc aucune installation npm n'est requise pour exécuter l'exemple de base.
