# Génération de Prompt Complet avec Toutes les Variables

Ce document décrit les modifications apportées à la génération du prompt pour inclure toutes les variables disponibles au lieu de seulement les variables courantes.

## Modifications Apportées

### 1. Méthode `generatePromptText()`

La méthode a été complètement réécrite pour générer un prompt plus complet et utile :

#### Ancienne Version
- Liste seulement quelques variables courantes
- Exemple de message basique
- Peu flexible

#### Nouvelle Version
- **Liste complète** de toutes les variables disponibles
- **Exemple de message enrichi** utilisant toutes les variables pertinentes
- **Adaptabilité** en fonction des variables réellement disponibles

### 2. Structure du Prompt

Le nouveau prompt est structuré en deux sections principales :

1. **Liste des Variables** : Toutes les variables avec leur syntaxe `{{variable}}`
2. **Exemple de Message** : Un message complet utilisant les variables disponibles

```
Rédigez un email de relance pour un impayé. Utilisez les variables suivantes :
- variable1: {{variable1}}
- variable2: {{variable2}}
- ... toutes les variables ...

Exemple de message avec toutes les variables disponibles :
Bonjour {{prenom}} {{nom}},

Nous vous rappelons que votre paiement de {{montant}} € est dû depuis le {{dateEcheance}}.
Veuillez régulariser votre situation en cliquant sur le lien suivant : {{lienPaiement}}.
Référence : {{reference}}
Adresse : {{adresse}}
Email : {{email}}
Téléphone : {{telephone}}

Cordialement,
L'équipe de relance.
```

## Avantages

### 1. Complétude
- **Toutes les variables** sont maintenant listées
- **Aucune variable oubliée** dans le prompt
- **Meilleure couverture** des cas d'utilisation

### 2. Flexibilité
- **Adaptation automatique** aux variables disponibles
- **Pas de code mort** pour les variables manquantes
- **Extensibilité** pour de nouvelles variables

### 3. Utilisabilité
- **Prompt prêt à l'emploi** pour les utilisateurs
- **Exemple réaliste** avec toutes les informations
- **Gain de temps** pour la rédaction des messages

## Implémentation Technique

### Logique de Génération

```javascript
generatePromptText() {
  if (this.impayesColumns.length === 0) {
    return 'Aucune variable disponible pour générer le prompt.';
  }

  // 1. Générer la liste complète des variables
  const variablesList = this.impayesColumns.map(col => {
    return `- ${col}: {{{{{ ${col} }}}}}`;
  }).join('\n');

  // 2. Générer un exemple de message avec toutes les variables disponibles
  let exampleMessage = 'Bonjour';
  
  // Ajouter prénom et nom si disponibles
  if (this.impayesColumns.includes('prenom') && this.impayesColumns.includes('nom')) {
    exampleMessage += ' {{{{{ prenom }}}}} {{{{{ nom }}}}}';
  } else if (this.impayesColumns.includes('nom')) {
    exampleMessage += ' {{{{{ nom }}}}}';
  }

  // Ajouter le montant si disponible
  if (this.impayesColumns.includes('montant')) {
    exampleMessage += ' de {{{{{ montant }}}}} €';
  }

  // Ajouter la date d'échéance si disponible
  if (this.impayesColumns.includes('dateEcheance')) {
    exampleMessage += ' depuis le {{{{{ dateEcheance }}}}}';
  }

  // Ajouter le lien de paiement si disponible
  if (this.impayesColumns.includes('lienPaiement')) {
    exampleMessage += ' en cliquant sur le lien suivant : {{{{{ lienPaiement }}}}}';
  }

  // Ajouter d'autres informations si disponibles
  if (this.impayesColumns.includes('reference')) {
    exampleMessage += '\nRéférence : {{{{{ reference }}}}}';
  }

  if (this.impayesColumns.includes('adresse')) {
    exampleMessage += '\nAdresse : {{{{{ adresse }}}}}';
  }

  if (this.impayesColumns.includes('email')) {
    exampleMessage += '\nEmail : {{{{{ email }}}}}';
  }

  if (this.impayesColumns.includes('telephone')) {
    exampleMessage += '\nTéléphone : {{{{{ telephone }}}}}';
  }

  exampleMessage += '\n\nCordialement,\nL\'équipe de relance.';

  return `Rédigez un email de relance pour un impayé. Utilisez les variables suivantes :
${variablesList}

Exemple de message avec toutes les variables disponibles :
${exampleMessage}`;
}
```

### Variables Supportées

Le code vérifie la présence de chaque variable avant de l'inclure dans l'exemple :

- **nom**, **prenom** : Pour la personnalisation
- **montant** : Pour le montant dû
- **dateEcheance** : Pour la date d'échéance
- **lienPaiement** : Pour le lien de paiement
- **reference** : Pour la référence
- **adresse** : Pour l'adresse
- **email** : Pour l'email
- **telephone** : Pour le téléphone
- **Toutes les autres variables** : Listées dans la section des variables

## Utilisation

### Pour les Utilisateurs

1. **Consulter le prompt** dans la section "Prompt pour rédiger des emails"
2. **Copier le prompt** en cliquant sur le bouton "Copier le prompt"
3. **Coller le prompt** dans votre outil d'IA préféré
4. **Utiliser les variables** dans vos messages de relance

### Pour les Développeurs

1. **Accéder à la méthode** : `sequenceState.generatePromptText()`
2. **Obtenir le texte** : Le texte est généré dynamiquement
3. **Utiliser dans d'autres composants** : Le texte peut être utilisé ailleurs

## Exemples

### Exemple 1: Peu de Variables

Si seulement `nom`, `montant` et `dateEcheance` sont disponibles :

```
Rédigez un email de relance pour un impayé. Utilisez les variables suivantes :
- nom: {{nom}}
- montant: {{montant}}
- dateEcheance: {{dateEcheance}}

Exemple de message avec toutes les variables disponibles :
Bonjour {{nom}},

Nous vous rappelons que votre paiement de {{montant}} € est dû depuis le {{dateEcheance}}.
Veuillez régulariser votre situation.

Cordialement,
L'équipe de relance.
```

### Exemple 2: Toutes les Variables

Si toutes les variables sont disponibles :

```
Rédigez un email de relance pour un impayé. Utilisez les variables suivantes :
- nom: {{nom}}
- prenom: {{prenom}}
- montant: {{montant}}
- dateEcheance: {{dateEcheance}}
- lienPaiement: {{lienPaiement}}
- reference: {{reference}}
- adresse: {{adresse}}
- email: {{email}}
- telephone: {{telephone}}

Exemple de message avec toutes les variables disponibles :
Bonjour {{prenom}} {{nom}},

Nous vous rappelons que votre paiement de {{montant}} € est dû depuis le {{dateEcheance}}.
Veuillez régulariser votre situation en cliquant sur le lien suivant : {{lienPaiement}}.
Référence : {{reference}}
Adresse : {{adresse}}
Email : {{email}}
Téléphone : {{telephone}}

Cordialement,
L'équipe de relance.
```

## Tests

### Test Manuel

1. Ouvrez la page de détails d'une séquence
2. Attendez que les variables soient chargées
3. Consultez le prompt généré
4. Vérifiez que toutes les variables sont listées
5. Vérifiez que l'exemple utilise les variables disponibles
6. Copiez le prompt et vérifiez le contenu

### Test Automatique

Utilisez le script `test-complete-prompt.js` :

```javascript
// Dans la console du navigateur
testCompletePrompt();
```

## Résolution des Problèmes

### Le prompt est vide
- Vérifiez que `impayesColumns` contient des données
- Assurez-vous que `loadImpayesSchema()` a été appelé
- Vérifiez les logs pour les erreurs

### Certaines variables sont manquantes
- Vérifiez que les variables existent dans `impayesColumns`
- Assurez-vous que les noms sont corrects (sensible à la casse)
- Vérifiez que la fonction cloud retourne bien toutes les variables

### Le prompt ne se met pas à jour
- Vérifiez que Alpine.js est correctement initialisé
- Assurez-vous que les données sont bien réactives
- Vérifiez que la méthode est bien appelée

## Prochaines Étapes

### Améliorations Possibles

1. **Personnalisation** : Permettre à l'utilisateur de choisir les variables
2. **Templates** : Plusieurs templates de messages prédéfinis
3. **Prévisualisation** : Voir le message avec des valeurs d'exemple
4. **Export** : Exporter le prompt dans différents formats

### Intégration Complète

1. **Documentation** : Ajouter des infobulles explicatives
2. **Internationalisation** : Traduire le prompt dans plusieurs langues
3. **Historique** : Garder un historique des prompts utilisés
4. **Partage** : Permettre de partager les prompts avec l'équipe

## Conclusion

La nouvelle génération de prompt offre une solution complète et flexible pour créer des messages de relance personnalisés. En incluant toutes les variables disponibles et en générant un exemple de message réaliste, cette fonctionnalité améliore considérablement l'expérience utilisateur et facilite la création de messages efficaces. Le prompt est maintenant prêt à l'emploi et peut être directement utilisé avec des outils d'IA pour générer des messages de relance professionnels et personnalisés.