# Auth App Layout

Le composant `auth-app-layout` est un layout d'application avec authentification pour Marki-parse App2.

## Fonctionnalités

- **Vérification d'authentification** : Utilise le composant `check-auth` pour vérifier la présence d'un token Parse dans sessionStorage ou localStorage. Redirige vers la page de login si l'utilisateur n'est pas authentifié.

- **Initialisation Parse** : Utilise le composant `parse-init` pour initialiser le SDK Parse.

- **Double Sidebar** :
  - **Première sidebar** (80px) : Contient le logo Marki et une icône de paramètres en bas.
  - **Deuxième sidebar** (250px) : Contient le titre "IMPAYes" et les liens de navigation vers Impayés, Séquences et Relance.

- **Contenu principal** : Zone principale pour afficher le contenu de l'application.

## Utilisation

```html
<!DOCTYPE html>
<html>
<head>
    <title>Mon Application</title>
    <script type="module">
        import '/app2/components/layout/auth-app-layout.js';
    </script>
</head>
<body>
    <auth-app-layout page-title="Mon Titre">
        <!-- Votre contenu ici -->
        <div class="mon-contenu">
            <h2>Bienvenue</h2>
            <p>Ce contenu sera affiché dans la zone principale.</p>
        </div>
    </auth-app-layout>
</body>
</html>
```

## Propriétés

- `pageTitle` (String) : Le titre de la page affiché dans l'en-tête.

## Méthodes

- `setPageTitle(title)` : Met à jour le titre de la page.

## Composants utilisés

- `check-auth` : Vérifie l'authentification et redirige si nécessaire.
- `parse-init` : Initialise le SDK Parse.

## Navigation

La sidebar contient les liens suivants :
- **Impayés** : `/app/relances/impayes`
- **Séquences** : `/app/relances/sequence`
- **Relance** : `/app/relances/sequences`

## Authentification

Le layout utilise le composant `check-auth` qui vérifie la présence d'un token Parse dans :
1. `sessionStorage.getItem('parseSessionToken')`
2. `localStorage.getItem('parseSessionToken')`

Si aucun token n'est trouvé, l'utilisateur est redirigé vers `/login?url_redirect=chemin_actuel`.

## Styles

Le layout utilise Tailwind CSS pour les styles et suit la charte graphique Marki-parse.
