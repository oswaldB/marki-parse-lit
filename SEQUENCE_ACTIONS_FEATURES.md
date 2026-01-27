# Fonctionnalités des Actions de Séquence

Ce document décrit les nouvelles fonctionnalités implémentées pour la gestion des actions de séquence dans l'application Marki-parse.

## Table des matières

- [Aperçu](#aperçu)
- [Fonctionnalités implémentées](#fonctionnalités-implémentées)
- [Technologies utilisées](#technologies-utilisées)
- [Structure du code](#structure-du-code)
- [Guide d'utilisation](#guide-dutilisation)
- [Tests](#tests)
- [Problèmes connus](#problèmes-connus)
- [Améliorations futures](#améliorations-futures)

## Aperçu

Les actions de séquence permettent aux utilisateurs de créer, modifier et organiser des messages (emails et SMS) qui seront envoyés selon un calendrier spécifique pour les relances de paiement.

## Fonctionnalités implémentées

### 1. Glisser-déposer pour réorganiser les actions

- **Description** : Les utilisateurs peuvent réorganiser les actions en les faisant glisser et en les déposant à la position souhaitée.
- **Implémentation** : Utilisation de la bibliothèque SortableJS intégrée avec Alpine.js.
- **Fonctionnalités clés** :
  - Animation fluide lors du déplacement
  - Indicateurs visuels pendant le glisser-déposer
  - Sauvegarde automatique de la nouvelle organisation
  - Persistance des changements après actualisation

### 2. Drawer d'édition (50% de la largeur de l'écran)

- **Description** : Un panneau latéral qui s'ouvre pour l'édition et la création d'actions.
- **Caractéristiques** :
  - Largeur de 50% de l'écran (responsive pour mobile)
  - Animation d'ouverture/fermeture
  - Formulaire complet pour l'édition des actions
  - Prise en charge des types Email et SMS
  - Champs spécifiques pour les emails (objet, émetteur)

### 3. Boutons d'action pour chaque élément

- **Bouton Éditer** : Ouvre le drawer d'édition avec les informations de l'action
- **Bouton Supprimer** : Supprime l'action après confirmation
- **Icônes** : Utilisation d'icônes Lucide pour une interface cohérente

### 4. Intégration avec le système existant

- **Compatibilité** : Les nouvelles fonctionnalités s'intègrent parfaitement avec :
  - Le système d'authentification existant
  - La gestion des séquences
  - Les profils SMTP
  - Les variables de template

## Technologies utilisées

- **SortableJS** : Bibliothèque légère pour le glisser-déposer
- **Alpine.js** : Framework réactif pour la gestion d'état
- **Tailwind CSS** : Framework CSS pour le style
- **Lucide Icons** : Icônes vectorielles
- **Parse SDK** : Pour la persistance des données

## Structure du code

### Fichiers modifiés

1. **`/public/app/relances/sequence/index.html`**
   - Ajout de SortableJS
   - Modification du HTML pour le glisser-déposer
   - Ajout des boutons d'édition/suppression
   - Ajout du drawer d'édition
   - Styles CSS pour les nouvelles fonctionnalités

2. **`/public/app/relances/sequence/sequenceState.js`**
   - Nouvelle méthode `initSortable()` pour initialiser le glisser-déposer
   - Méthode `onSortEnd()` pour gérer la réorganisation
   - Méthodes d'édition : `editAction()`, `saveEditedAction()`, `cancelEditAction()`
   - Méthode de suppression : `deleteAction()`
   - Nouveaux états pour le drawer et l'édition

### Nouveaux fichiers

1. **`test-sequence-actions.js`**
   - Script de test Playwright pour les fonctionnalités
   - Tests automatisés du glisser-déposer, édition et suppression

2. **`test-manual-sequence-actions.html`**
   - Guide de test manuel avec instructions détaillées
   - Interface conviviale pour les tests manuels

## Guide d'utilisation

### Réorganiser les actions

1. Assurez-vous qu'il y a au moins 2 actions dans la séquence
2. Cliquez et maintenez sur une action
3. Faites glisser l'action vers la nouvelle position
4. Relâchez le bouton de la souris
5. Les changements sont sauvegardés automatiquement

### Éditer une action

1. Cliquez sur le bouton « Éditer » (icône de crayon) d'une action
2. Le drawer d'édition s'ouvre à droite
3. Modifiez les champs souhaités (type, délai, message, etc.)
4. Cliquez sur « Enregistrer » pour sauvegarder les modifications
5. Cliquez sur « Annuler » pour abandonner les changements

### Supprimer une action

1. Cliquez sur le bouton « Supprimer » (icône de poubelle)
2. Confirmez la suppression dans la boîte de dialogue
3. L'action est supprimée et les changements sont sauvegardés

### Créer une nouvelle action

1. Faites défiler vers le bas jusqu'au formulaire « Ajouter un nouveau message »
2. Remplissez les informations de l'action
3. Cliquez sur « Ajouter le message »
4. La nouvelle action apparaît dans la liste

## Tests

### Tests automatisés

Le fichier `test-sequence-actions.js` contient des tests Playwright pour :

- Connexion et navigation
- Glisser-déposer des actions
- Édition des actions
- Suppression des actions
- Création de nouvelles actions

Pour exécuter les tests :

```bash
node test-sequence-actions.js
```

### Tests manuels

Le fichier `test-manual-sequence-actions.html` fournit un guide détaillé pour les tests manuels avec :

- Instructions étape par étape
- Résultats attendus
- Interface conviviale

## Problèmes connus

1. **Problème de timing** : Dans certains cas, SortableJS peut ne pas s'initialiser correctement si le DOM n'est pas complètement chargé. Une solution de repli avec réessai a été implémentée.

2. **Responsive sur mobile** : Le glisser-déposer peut être moins précis sur les appareils mobiles en raison des limitations des événements tactiles.

3. **Performance avec de nombreuses actions** : Avec un grand nombre d'actions (> 20), le glisser-déposer peut devenir moins fluide.

## Améliorations futures

1. **Undo/Redo** : Ajouter la possibilité d'annuler/rétablir les changements de position
2. **Duplication d'actions** : Bouton pour dupliquer une action existante
3. **Prévisualisation** : Aperçu du message avec les variables remplacées
4. **Historique des versions** : Suivi des modifications des actions
5. **Collaboration en temps réel** : Voir les modifications des autres utilisateurs
6. **Export/Import** : Exporter ou importer des séquences d'actions

## Bonnes pratiques

1. **Sauvegarde automatique** : Les modifications sont sauvegardées automatiquement, mais il est recommandé de vérifier que les changements sont persistants après actualisation.

2. **Organisation logique** : Organisez les actions dans un ordre logique pour les relances (du premier contact au dernier rappel).

3. **Messages clairs** : Utilisez des messages clairs et professionnels pour les relances.

4. **Variables** : Utilisez les variables disponibles pour personnaliser les messages.

## Support

Pour toute question ou problème, veuillez consulter la documentation ou contacter l'équipe de support.

© 2023 Marki-parse. Tous droits réservés.