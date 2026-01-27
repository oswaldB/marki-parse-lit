# Fonctionnalités Avancées des Variables

Ce document décrit les nouvelles fonctionnalités ajoutées à la section "Variables disponibles" dans la page de détails des séquences.

## Nouvelles Fonctionnalités

### 1. Barre de Recherche

Une barre de recherche a été ajoutée pour filtrer les variables disponibles :

- **Fonctionnement** : Filtre les variables en temps réel lors de la saisie
- **Sensibilité** : Recherche insensible à la casse
- **Affichage** : Affiche le nombre de variables correspondant au filtre
- **Placeholders** : "Rechercher une variable..." pour guider l'utilisateur

### 2. Icônes de Copie Individuelle

Chaque variable dispose maintenant d'une icône de copie :

- **Icône** : Petit icône de copie à droite de chaque variable
- **Fonctionnement** : Copie la variable au format `{{nomVariable}}`
- **Feedback** : Notification visuelle de succès
- **Accessibilité** : Bouton cliquable avec feedback visuel au survol

### 3. Notifications de Copie

Lorsqu'une variable est copiée :

- **Notification** : Message temporaire en bas à droite de l'écran
- **Contenu** : "Variable {{nomVariable}} copiée !"
- **Style** : Fond vert avec texte blanc
- **Durée** : Disparaît automatiquement après 3 secondes

### 4. Affichage Amélioré

- **Défilement** : Zone de défilement si trop de variables
- **Compteur** : Affiche le nombre de variables (filtrées ou totales)
- **Style** : Variables en format monospace pour meilleure lisibilité
- **Responsivité** : Adaptation à différentes tailles d'écran

## Implémentation Technique

### Modifications dans `sequenceState.js`

#### Nouveaux États

```javascript
// Filtre pour les variables
variableSearch: '',
```

#### Nouvelles Méthodes

1. **`filteredVariables`** (propriété calculée) :
   ```javascript
   get filteredVariables() {
     if (!this.variableSearch) {
       return this.impayesColumns;
     }
     
     const searchTerm = this.variableSearch.toLowerCase();
     return this.impayesColumns.filter(column => 
       column.toLowerCase().includes(searchTerm)
     );
   }
   ```

2. **`copyVariable(columnName)`** :
   ```javascript
   copyVariable(columnName) {
     const variableText = `{{${columnName}}}`;
     
     navigator.clipboard.writeText(variableText).then(() => {
       // Afficher une notification
       const notification = document.createElement('div');
       notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
       notification.textContent = `Variable {{${columnName}}} copiée !`;
       
       document.body.appendChild(notification);
       
       // Supprimer la notification après 3 secondes
       setTimeout(() => {
         notification.remove();
       }, 3000);
       
       console.log(`✅ Variable {{${columnName}}} copiée dans le presse-papiers`);
     }).catch(err => {
       console.error('❌ Erreur lors de la copie de la variable:', err);
       alert('Erreur lors de la copie de la variable.');
     });
   }
   ```

### Modifications dans `index.html`

#### Structure HTML

```html
<!-- Barre de recherche -->
<div class="mb-4">
  <div class="relative">
    <input type="text" 
           x-model="variableSearch" 
           placeholder="Rechercher une variable..." 
           class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
    <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
  </div>
</div>

<!-- Message de résultats filtrés -->
<div class="mb-3 text-xs text-gray-500">
  <span x-text="filteredVariables.length"></span> variable(s) 
  <template x-if="variableSearch">
    correspondant à "<span x-text="variableSearch"></span>"
  </template>
  <template x-if="!variableSearch">
    disponibles
  </template>
</div>

<!-- Liste des variables avec icônes de copie -->
<div class="flex flex-wrap gap-2 max-h-64 overflow-y-auto pr-2">
  <template x-for="column in filteredVariables" :key="column">
    <div class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1 hover:bg-blue-200 transition-colors">
      <span class="font-mono" x-text="'{{' + column + '}}'"></span>
      <button @click="copyVariable(column)" 
              class="text-blue-600 hover:text-blue-800 focus:outline-none">
        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
        </svg>
      </button>
    </div>
  </template>
</div>
```

## Utilisation

### Recherche de Variables

1. **Saisir du texte** dans la barre de recherche
2. **Résultats instantanés** : La liste se met à jour automatiquement
3. **Compteur mis à jour** : Le nombre de variables correspondantes est affiché
4. **Réinitialisation** : Effacer le champ de recherche pour voir toutes les variables

### Copie de Variables

1. **Cliquer sur l'icône de copie** à côté de la variable souhaitée
2. **Notification** : Une confirmation s'affiche en bas à droite
3. **Coller** : La variable est prête à être collée dans votre message

### Exemples d'Utilisation

#### Recherche
- Taper "nom" pour trouver toutes les variables contenant "nom"
- Taper "email" pour trouver les variables d'email
- Taper "montant" pour trouver les variables financières

#### Copie
- Cliquer sur l'icône à côté de `{{nom}}` pour copier `{{nom}}`
- Cliquer sur l'icône à côté de `{{montant}}` pour copier `{{montant}}`
- Utiliser les variables copiées dans les messages de relance

## Avantages

### 1. Productivité Améliorée
- **Gain de temps** : Plus besoin de taper manuellement les variables
- **Précision** : Évite les erreurs de syntaxe
- **Efficacité** : Trouvez rapidement les variables dont vous avez besoin

### 2. Expérience Utilisateur
- **Intuitive** : Interface familière et facile à utiliser
- **Feedback immédiat** : Notifications visuelles pour les actions
- **Accessible** : Fonctionne au clavier et à la souris

### 3. Flexibilité
- **Recherche puissante** : Trouvez rapidement ce dont vous avez besoin
- **Adaptable** : Fonctionne avec n'importe quel nombre de variables
- **Extensible** : Facile à étendre avec de nouvelles fonctionnalités

## Résolution des Problèmes

### La recherche ne fonctionne pas
- Vérifiez que `variableSearch` est bien défini dans l'état
- Assurez-vous que `filteredVariables` est une propriété calculée
- Vérifiez que les données sont bien chargées (`impayesColumns`)

### La copie ne fonctionne pas
- Vérifiez les permissions du navigateur pour l'accès au presse-papiers
- Testez avec un navigateur moderne (Chrome, Firefox, Edge, Safari)
- Vérifiez que la méthode `copyVariable` est correctement définie

### Les notifications ne s'affichent pas
- Vérifiez qu'il n'y a pas d'erreurs dans la console
- Assurez-vous que le CSS est correctement appliqué
- Vérifiez que l'élément est bien ajouté au DOM

## Tests

### Test Manuel

1. Ouvrez la page de détails d'une séquence
2. Attendez que les variables soient chargées
3. Tapez "nom" dans la barre de recherche
4. Vérifiez que les variables contenant "nom" s'affichent
5. Cliquez sur l'icône de copie d'une variable
6. Vérifiez que la notification s'affiche
7. Collez dans un éditeur de texte pour vérifier que la variable est correcte

### Test Automatique

Utilisez le script `test-variable-features.js` pour tester automatiquement :

```javascript
// Dans la console du navigateur
testVariableFeatures();
```

## Prochaines Étapes

### Améliorations Possibles

1. **Catégorisation** : Regrouper les variables par catégorie
2. **Favoris** : Permettre de marquer des variables comme favorites
3. **Historique** : Garder un historique des variables récemment utilisées
4. **Documentation** : Ajouter des infobulles avec des exemples d'utilisation

### Intégration Complète

1. **Formulaires** : Utiliser ces variables dans des formulaires dynamiques
2. **Prévisualisation** : Montrer un aperçu des messages avec les variables
3. **Validation** : Vérifier que toutes les variables utilisées existent
4. **Suggestions** : Suggérer des variables lors de la rédaction des messages

## Conclusion

Ces nouvelles fonctionnalités améliorent considérablement l'expérience utilisateur en rendant la recherche et l'utilisation des variables plus intuitives et efficaces. Les utilisateurs peuvent maintenant trouver rapidement les variables dont ils ont besoin et les copier d'un simple clic, ce qui améliore la productivité et réduit les erreurs.