# Guide d'Intégration Frontend pour les Colonnes Impayés

Ce guide explique comment utiliser les outils pour récupérer les colonnes de la classe impayés et les intégrer dans l'interface frontend.

## Fichiers disponibles

### 1. Outils de génération

- **`test-and-generate-frontend.html`** : Interface complète pour tester et générer le code HTML
  - Récupère les colonnes de la classe impayés
  - Affiche les colonnes avec leurs types
  - Génère automatiquement le code HTML adapté
  - Permet de copier le code généré
  - Fournit des instructions d'intégration

- **`get-columns-for-frontend.js`** : Script JavaScript pour la console
  - Récupère les colonnes et leurs propriétés
  - Génère du code HTML adapté aux types de données
  - Stocke les résultats dans des variables globales

### 2. Scripts de test

- **`console-test.js`** : Script complet pour tester la connexion et récupérer le schéma
- **`quick-schema-check.js`** : Version simplifiée pour un test rapide

## Comment utiliser

### Méthode 1: Utiliser l'interface HTML (recommandé)

1. Ouvrez le fichier `test-and-generate-frontend.html` dans votre navigateur
2. Cliquez sur "Exécuter le test et générer le code"
3. Attendez que les colonnes soient récupérées
4. Consultez la liste des colonnes disponibles
5. Copiez le code HTML généré
6. Suivez les instructions d'intégration

### Méthode 2: Utiliser la console du navigateur

1. Ouvrez n'importe quelle page qui charge le SDK Parse
2. Ouvrez les outils de développement (F12) et allez dans la console
3. Chargez le script:
   ```javascript
   const script = document.createElement('script');
   script.src = '/get-columns-for-frontend.js';
   document.body.appendChild(script);
   ```
4. Ou copiez-collez le contenu du script directement dans la console
5. Les résultats seront disponibles dans les variables globales

## Structure des données

### Variables globales disponibles

Après exécution, les variables suivantes sont disponibles:

- `window.impayesColumns` : Tableau des noms de colonnes
- `window.impayesFields` : Objet avec les détails des champs
- `window.impayesSchema` : Schéma complet de la classe
- `window.impayesFrontendData` : Données complètes pour le frontend
- `window.impayesHTMLCode` : Code HTML généré

### Structure des champs

Chaque champ contient les propriétés suivantes:

```javascript
{
  type: "String", // Type de données (String, Number, Boolean, Date, etc.)
  required: false, // Indique si le champ est requis
  defaultValue: null // Valeur par défaut si définie
}
```

## Génération de code HTML

Le code HTML est généré automatiquement en fonction du type de chaque colonne:

### Types supportés

1. **String** : Champ de texte
   ```html
   <input type="text" x-model="sequence.nom" 
          class="w-full p-2 border border-gray-300 rounded-md text-sm" 
          placeholder="Entrez nom">
   ```

2. **Number** : Champ numérique
   ```html
   <input type="number" x-model="sequence.montant" 
          class="w-full p-2 border border-gray-300 rounded-md text-sm" 
          placeholder="Entrez montant">
   ```

3. **Boolean** : Sélecteur Oui/Non
   ```html
   <select x-model="sequence.isActif" 
           class="w-full p-2 border border-gray-300 rounded-md text-sm">
       <option value="true">Oui</option>
       <option value="false">Non</option>
   </select>
   ```

4. **Date** : Sélecteur de date
   ```html
   <input type="date" x-model="sequence.dateEcheance" 
          class="w-full p-2 border border-gray-300 rounded-md text-sm">
   ```

## Intégration dans le frontend

### Fichier à modifier

Le fichier principal à modifier est:
```
/public/app/relances/sequence/index.html
```

### Étapes d'intégration

1. **Identifier la section cible** : Trouvez où vous voulez ajouter les colonnes dans l'interface
2. **Coller le code HTML** : Insérez le code généré à l'endroit approprié
3. **Vérifier les variables Alpine.js** : Assurez-vous que `sequence` est correctement défini
4. **Adapter le style** : Modifiez les classes Tailwind si nécessaire
5. **Tester l'interface** : Vérifiez que tout fonctionne correctement

### Exemple d'intégration

```html
<!-- Avant l'intégration -->
<div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
    <h4 class="font-semibold text-gray-700 mb-4">Informations de la séquence</h4>
    <!-- Ici seront ajoutées les colonnes -->
</div>

<!-- Après l'intégration -->
<div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
    <h4 class="font-semibold text-gray-700 mb-4">Informations de la séquence</h4>
    
    <!-- Colonnes de la classe impayes -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <!-- Colonne: nom -->
        <div class="bg-white border border-gray-200 rounded-lg p-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">nom</label>
            <input type="text" x-model="sequence.nom" 
                   class="w-full p-2 border border-gray-300 rounded-md text-sm" 
                   placeholder="Entrez nom">
        </div>
        
        <!-- Colonne: montant -->
        <div class="bg-white border border-gray-200 rounded-lg p-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">montant</label>
            <input type="number" x-model="sequence.montant" 
                   class="w-full p-2 border border-gray-300 rounded-md text-sm" 
                   placeholder="Entrez montant">
        </div>
        
        <!-- Autres colonnes... -->
    </div>
</div>
```

## Gestion des données avec Alpine.js

### Variables Alpine.js

Assurez-vous que votre état Alpine.js contient les propriétés nécessaires:

```javascript
// Dans votre état Alpine.js
sequenceState() {
    return {
        sequence: {
            nom: '',
            montant: 0,
            isActif: true,
            dateEcheance: '',
            // ... autres propriétés
        },
        // ... autres méthodes
    }
}
```

### Liaison des données

Le code généré utilise `x-model` pour la liaison bidirectionnelle:

```html
<input type="text" x-model="sequence.nom">
```

Cela signifie que:
- Les modifications de l'input mettent à jour `sequence.nom`
- Les modifications de `sequence.nom` mettent à jour l'input

## Personnalisation

### Modifier les styles

Vous pouvez personnaliser les styles en modifiant les classes Tailwind:

```html
<!-- Style par défaut -->
<input class="w-full p-2 border border-gray-300 rounded-md text-sm">

<!-- Style personnalisé -->
<input class="w-full p-3 border-2 border-blue-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500">
```

### Ajouter des validations

Vous pouvez ajouter des validations aux champs:

```html
<input type="text" x-model="sequence.nom" 
       required 
       minlength="3" 
       class="w-full p-2 border border-gray-300 rounded-md text-sm">
```

### Ajouter des événements

Vous pouvez ajouter des gestionnaires d'événements:

```html
<input type="text" x-model="sequence.nom" 
       @change="validateNom()" 
       class="w-full p-2 border border-gray-300 rounded-md text-sm">
```

## Bonnes pratiques

1. **Organisation** : Regroupez les colonnes par catégorie si nécessaire
2. **Responsivité** : Utilisez le système de grille pour une bonne adaptation mobile
3. **Accessibilité** : Ajoutez des attributs ARIA si nécessaire
4. **Performance** : Évitez de charger trop de colonnes en une fois
5. **Validation** : Ajoutez des validations côté client

## Résolution des problèmes

### Erreur de connexion
- Vérifiez que Parse est correctement initialisé
- Assurez-vous que les clés API sont valides
- Vérifiez que le serveur Parse est accessible

### Colonnes non récupérées
- Vérifiez que la classe impayés existe
- Assurez-vous que vous avez les droits d'accès
- Vérifiez l'orthographe de la classe

### Code HTML non généré
- Vérifiez que les colonnes ont été récupérées
- Assurez-vous que les types de données sont supportés
- Consultez la console pour les erreurs

### Problèmes de liaison de données
- Vérifiez que la variable `sequence` est correctement définie
- Assurez-vous que les noms de propriétés correspondent
- Vérifiez que Alpine.js est correctement initialisé

## Prochaines étapes

1. **Tester l'interface** : Vérifiez que toutes les colonnes s'affichent correctement
2. **Valider les données** : Ajoutez des validations appropriées
3. **Sauvegarder les données** : Implémentez la logique de sauvegarde
4. **Gérer les erreurs** : Ajoutez des messages d'erreur utilisateur
5. **Optimiser l'interface** : Améliorez l'expérience utilisateur