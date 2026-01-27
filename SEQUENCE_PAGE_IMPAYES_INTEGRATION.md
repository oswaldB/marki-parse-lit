# Intégration des Colonnes Impayés dans la Page de Séquence

Ce document décrit les modifications apportées à la page de détails des séquences pour intégrer dynamiquement les colonnes de la classe impayés.

## Modifications Apportées

### 1. Fichier `sequenceState.js`

#### Nouveaux États Ajoutés

```javascript
// Données du schéma des impayés
impayesSchema: null,
impayesColumns: [],
impayesFields: {},
```

Ces états stockent les informations du schéma récupéré depuis la fonction cloud.

#### Nouvelle Méthode: `loadImpayesSchema()`

```javascript
async loadImpayesSchema() {
  try {
    console.log('🔍 Récupération du schéma des impayés...');
    
    // Appeler la fonction cloud pour récupérer le schéma
    const schema = await Parse.Cloud.run('getImpayesSchema');
    
    if (schema && schema.fields) {
      this.impayesSchema = schema;
      this.impayesColumns = Object.keys(schema.fields);
      this.impayesFields = schema.fields;
      
      console.log('✅ Schéma des impayés récupéré:', this.impayesColumns.length, 'colonnes');
      console.log('Colonnes disponibles:', this.impayesColumns);
      
      return true;
    } else {
      console.log('⚠️ Aucune donnée de schéma reçue ou classe impayés non trouvée');
      this.impayesSchema = null;
      this.impayesColumns = [];
      this.impayesFields = {};
      return false;
    }
  } catch (error) {
    console.error('❌ Erreur lors de la récupération du schéma des impayés:', error);
    this.impayesSchema = null;
    this.impayesColumns = [];
    this.impayesFields = {};
    return false;
  }
}
```

Cette méthode appelle la fonction cloud `getImpayesSchema` pour récupérer toutes les colonnes disponibles.

#### Modification de `fetchSequence()`

La méthode `fetchSequence()` a été modifiée pour charger le schéma des impayés en parallèle avec les profils SMTP :

```javascript
// Charger les profils SMTP et le schéma des impayés en parallèle
await Promise.all([
  this.loadSmtpProfiles(),
  this.loadImpayesSchema()
]);
```

#### Nouvelle Méthode: `generatePromptText()`

```javascript
generatePromptText() {
  if (this.impayesColumns.length === 0) {
    return 'Aucune variable disponible pour générer le prompt.';
  }

  // Générer la liste des variables
  const variablesList = this.impayesColumns.map(col => {
    return `- ${col}: {{{{{ ${col} }}}}}`;
  }).join('\n');

  // Générer un exemple de message avec quelques variables courantes
  const commonVariables = ['nom', 'prenom', 'montant', 'dateEcheance', 'lienPaiement'];
  const availableCommonVars = this.impayesColumns.filter(col => commonVariables.includes(col));

  // ... logique pour générer un exemple de message dynamique
}
```

Cette méthode génère dynamiquement le texte du prompt en fonction des colonnes disponibles.

#### Modification de `copyPrompt()`

La méthode `copyPrompt()` utilise maintenant `generatePromptText()` pour obtenir le texte dynamique :

```javascript
copyPrompt() {
  const promptText = this.generatePromptText();
  
  navigator.clipboard.writeText(promptText).then(() => {
    alert('Prompt copié dans le presse-papiers !');
  }).catch(err => {
    console.error('Erreur lors de la copie du prompt:', err);
    alert('Erreur lors de la copie du prompt.');
  });
}
```

### 2. Fichier `index.html`

#### Affichage des Variables Disponibles (En-tête)

Une nouvelle section a été ajoutée après la description de la séquence pour afficher toutes les colonnes disponibles :

```html
<!-- Affichage des colonnes des impayés -->
<template x-if="impayesColumns.length > 0">
  <div class="mb-6">
    <h4 class="font-semibold text-gray-700 mb-4">Variables des impayés disponibles</h4>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      <template x-for="column in impayesColumns" :key="column">
        <div class="bg-blue-100 text-blue-800 px-3 py-2 rounded-md text-sm flex items-center gap-2">
          <span class="font-mono">{{{{{ column }}}}}</span>
          <span x-text="column"></span>
          <span class="text-xs bg-blue-200 px-1 rounded" 
                x-text="impayesFields[column]?.type || 'inconnu'">
          </span>
        </div>
      </template>
    </div>
    <p class="text-xs text-gray-500 mt-2">
      Ces variables peuvent être utilisées dans vos messages de relance.
    </p>
  </div>
</template>
```

#### Variables Disponibles (Colonne de Droite)

La section "Variables disponibles" dans la colonne de droite a été mise à jour pour utiliser les colonnes dynamiques :

```html
<!-- Variables disponibles (dynamique) -->
<div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
  <h4 class="font-semibold text-gray-700 mb-3">Variables disponibles</h4>
  <p class="text-xs text-gray-600 mb-3">Utilisez ces variables dans vos messages :</p>
  <template x-if="impayesColumns.length > 0">
    <div class="flex flex-wrap gap-2">
      <template x-for="column in impayesColumns" :key="column">
        <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
          {{{{{ column }}}}}
        </span>
      </template>
    </div>
  </template>
  <template x-if="impayesColumns.length === 0">
    <p class="text-sm text-gray-500">Aucune variable disponible.</p>
  </template>
</div>
```

#### Prompt Dynamique

Le prompt pour rédiger des emails a été mis à jour pour utiliser le texte généré dynamiquement :

```html
<!-- Prompt à copier (dynamique) -->
<div class="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
  <h4 class="font-semibold text-gray-700 mb-3">Prompt pour rédiger des emails</h4>
  <div class="bg-white p-3 rounded-md border border-gray-200">
    <textarea class="w-full p-2 border border-gray-300 rounded-md text-sm resize-none" rows="6" readonly x-text="generatePromptText()"></textarea>
    <button @click="copyPrompt()" class="mt-3 w-full bg-gray-200 text-gray-700 py-2 rounded text-sm hover:bg-gray-300">
      Copier le prompt
    </button>
  </div>
</div>
```

## Fonctionnement

### Processus de Chargement

1. **Initialisation** : Lorsque la page se charge, `init()` est appelée
2. **Récupération de la Séquence** : `fetchSequence()` récupère les détails de la séquence
3. **Chargement Parallèle** : Deux opérations sont exécutées en parallèle :
   - `loadSmtpProfiles()` : Charge les profils SMTP
   - `loadImpayesSchema()` : Charge le schéma des impayés via la fonction cloud
4. **Affichage Dynamique** : Les colonnes sont affichées dans l'interface

### Appel à la Fonction Cloud

La fonction `Parse.Cloud.run('getImpayesSchema')` appelle la fonction cloud définie dans :
```
parse-server/cloud/getSchema.js
```

Cette fonction cloud utilise la master key pour récupérer le schéma complet de la classe impayés.

### Génération du Prompt

Le prompt est généré dynamiquement en fonction des colonnes disponibles :

1. **Liste des Variables** : Toutes les colonnes sont listées avec leur syntaxe `{{variable}}`
2. **Exemple de Message** : Un message d'exemple est généré en utilisant les variables courantes si elles existent
3. **Personnalisation** : Le prompt s'adapte automatiquement aux colonnes disponibles

## Avantages

### 1. Dynamique et Flexible

- **Adaptation Automatique** : L'interface s'adapte automatiquement aux colonnes disponibles dans la base de données
- **Pas de Modification Manuelle** : Plus besoin de modifier le code lorsque de nouvelles colonnes sont ajoutées
- **Maintenance Facile** : Les modifications du schéma sont automatiquement reflétées dans l'interface

### 2. Expérience Utilisateur Améliorée

- **Visibilité Complète** : Les utilisateurs voient toutes les variables disponibles
- **Prompt Personnalisé** : Le prompt s'adapte aux données réelles
- **Aide Contextuelle** : Les utilisateurs savent exactement quelles variables ils peuvent utiliser

### 3. Robustesse

- **Gestion des Erreurs** : Si la classe impayés n'existe pas ou si la récupération échoue, l'interface continue de fonctionner
- **Chargement Asynchrone** : Le chargement des données ne bloque pas l'interface
- **Fallback Graceful** : Si aucune colonne n'est disponible, des messages appropriés sont affichés

## Utilisation

### Variables Disponibles dans les Templates

Les variables suivantes sont disponibles dans les templates Alpine.js :

- `impayesSchema` : Le schéma complet de la classe impayés
- `impayesColumns` : Tableau des noms de colonnes
- `impayesFields` : Objet avec les détails des champs (type, required, etc.)

### Exemples d'Utilisation

#### Afficher toutes les colonnes

```html
<template x-for="column in impayesColumns" :key="column">
  <div>
    <span x-text="column"></span>
    <span x-text="impayesFields[column]?.type"></span>
  </div>
</template>
```

#### Filtrer par type

```html
<template x-for="column in impayesColumns.filter(col => impayesFields[col]?.type === 'String')" :key="column">
  <div>
    <span x-text="column"></span>
  </div>
</template>
```

#### Utiliser dans les messages

```html
<input type="text" 
       x-model="newNodeMessage" 
       placeholder="Utilisez {{{{{ nom }}}}}, {{{{{ montant }}}}} dans votre message">
```

## Résolution des Problèmes

### Fonction Cloud Non Trouvée

Si vous obtenez une erreur "Function not found" :

1. Vérifiez que le fichier `parse-server/cloud/getSchema.js` existe
2. Assurez-vous que le fichier est correctement requis dans `parse-server/cloud/main.js`
3. Redémarrez le serveur Parse pour déployer les modifications
4. Vérifiez que la fonction cloud est correctement définie :
   ```javascript
   Parse.Cloud.define('getImpayesSchema', async (request) => {
     return await getSchema();
   });
   ```

### Aucune Colonne Affichée

Si aucune colonne n'est affichée :

1. Vérifiez que la classe "impayes" existe dans votre base de données Parse
2. Assurez-vous que vous avez les droits d'accès appropriés
3. Vérifiez les logs du serveur Parse pour les erreurs
4. Testez la fonction cloud directement avec curl ou Postman

### Erreurs de Connexion

Si des erreurs de connexion se produisent :

1. Vérifiez que Parse est correctement initialisé
2. Assurez-vous que les clés API sont valides
3. Vérifiez que le serveur Parse est accessible
4. Testez la connexion avec un simple appel Parse.Query

## Prochaines Étapes

### 1. Test et Validation

- Testez la page avec différentes séquences
- Vérifiez que toutes les colonnes sont correctement affichées
- Assurez-vous que le prompt est généré correctement
- Testez la copie du prompt dans le presse-papiers

### 2. Améliorations Possibles

- **Filtrage des Colonnes** : Ajouter un filtre pour afficher uniquement certaines colonnes
- **Recherche** : Ajouter une fonction de recherche parmi les colonnes
- **Documentation** : Ajouter des infobulles pour expliquer chaque colonne
- **Groupement** : Regrouper les colonnes par catégorie ou type

### 3. Intégration Complète

- **Formulaires Dynamiques** : Générer des formulaires basés sur le schéma
- **Validation** : Utiliser les informations de schéma pour valider les données
- **Édition** : Permettre l'édition des valeurs des colonnes directement dans l'interface

## Conclusion

Cette intégration permet à la page de détails des séquences de s'adapter dynamiquement au schéma de la classe impayés, offrant une expérience utilisateur plus riche et plus flexible. Les utilisateurs peuvent maintenant voir toutes les variables disponibles et les utiliser dans leurs messages de relance, tout en bénéficiant d'un prompt personnalisé qui s'adapte automatiquement aux données réelles.