# Admin Layout Components

Ce dossier contient des composants Lit pour créer un layout d'administration SaaS inspiré de Flowbite.

## Composants disponibles

### 1. `is-auth` - Vérification d'authentification

### 4. `marki-pebbles-background` - Arrière-plan animé avec pebbles

Composant décoratif qui ajoute des éléments pebbles animés en arrière-plan.

**Utilisation :**
```html
<marki-pebbles-background density="medium" animationSpeed="normal"></marki-pebbles-background>
```

**Propriétés :**
- `density` (String) : Densité des pebbles ('low', 'medium', 'high') - par défaut : 'medium'
- `animationSpeed` (String) : Vitesse d'animation ('slow', 'normal', 'fast') - par défaut : 'normal'

**Caractéristiques :**
- Pebbles générés aléatoirement avec différentes tailles et positions
- Animation de flottement douce
- Trois types de pebbles (bleu, gris, foncé)
- Responsive : réduit le nombre de pebbles sur mobile
- Z-index négatif pour rester en arrière-plan
- Pointer-events: none pour ne pas interférer avec les interactions

## Composants disponibles

### 1. `is-auth` - Vérification d'authentification

Ce composant vérifie la présence d'un token Parse dans le localStorage ou sessionStorage. Si aucun token n'est trouvé, il redirige vers la page de login avec un paramètre de redirection.

**Utilisation :**
```html
<is-auth redirect-url="/login">
    <!-- Contenu protégé -->
    <admin-layout>
        <!-- Votre contenu ici -->
    </admin-layout>
</is-auth>
```

**Propriétés :**
- `redirect-url` (String) : URL de redirection pour la page de login (par défaut : "/login")

### 2. `admin-sidebar` - Barre latérale de navigation

Une sidebar responsive avec des liens de navigation, utilisant des icônes Lucid SVG.

**Utilisation :**
```html
<admin-sidebar></admin-sidebar>
```

**Propriétés :**
- `items` (Array) : Liste des éléments de menu (par défaut : dashboard, users, settings, analytics)
- `activeItem` (String) : ID de l'élément actif

**Structure des items :**
```javascript
{
    id: 'dashboard',
    text: 'Dashboard',
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>',
    path: '/dashboard'
}
```

### 3. `admin-layout` - Layout complet

Un layout complet qui combine la sidebar et le contenu principal avec un en-tête, utilisant des icônes Lucid SVG.

**Utilisation :**
```html
<admin-layout page-title="Dashboard">
    <!-- Votre contenu principal ici -->
    <div>Welcome to your dashboard!</div>
</admin-layout>

<!-- Avec les pebbles en arrière-plan -->
<admin-layout page-title="Dashboard" show-pebbles>
    <!-- Votre contenu ici -->
</admin-layout>
```

**Propriétés :**
- `page-title` (String) : Titre de la page affiché dans l'en-tête
- `show-pebbles` (Boolean) : Active l'arrière-plan animé avec des pebbles (désactivé par défaut)

## Exemple complet

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <script type="module" src="./components/admin-layout/is-auth.js"></script>
    <script type="module" src="./components/admin-layout/sidebar.js"></script>
    <script type="module" src="./components/admin-layout/admin-layout.js"></script>
</head>
<body>
    <is-auth redirect-url="/login">
        <admin-layout page-title="Dashboard">
            <div>
                <h2>Welcome to your Admin Dashboard</h2>
                <p>This content is protected and only visible to authenticated users.</p>
            </div>
        </admin-layout>
    </is-auth>
</body>
</html>
```

## Gestion de l'authentification

Le composant `is-auth` vérifie la présence d'un token dans :
- `localStorage.getItem('parseToken')`
- `sessionStorage.getItem('parseToken')`

Pour authentifier un utilisateur, stockez un token après la connexion :
```javascript
// Après une connexion réussie
localStorage.setItem('parseToken', 'votre-token-parse');
// ou
sessionStorage.setItem('parseToken', 'votre-token-parse');
```

Pour déconnecter un utilisateur :
```javascript
localStorage.removeItem('parseToken');
sessionStorage.removeItem('parseToken');
```

## Personnalisation

Vous pouvez personnaliser les couleurs, les icônes et les éléments de menu en modifiant les propriétés CSS et les paramètres des composants.

## Dépendances

Ces composants utilisent LitElement et nécessitent l'importation depuis le CDN :
```javascript
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
```

## Styles et couleurs

Les composants suivent le style guide Marki avec :
- Couleur principale : #007ace (Bleu Marki)
- Couleur secondaire : #005a9e (Bleu Marki foncé)
- Couleur claire : #4da6ff (Bleu Marki clair)
- Couleur de texte principal : #1f2937
- Couleur de texte secondaire : #6b7280
- Fond application : #f3f4f6
- Fond des cartes : #ffffff
- Bordures : #d1d5db et #e5e7eb
- Ombres modernes et bordures arrondies (0.75rem)
- Typographie avec la police Inter
- Animations de transition fluides

## Inspiration

Les styles et la structure sont inspirés de [Flowbite](https://flowbite.com/), une bibliothèque de composants Tailwind CSS.