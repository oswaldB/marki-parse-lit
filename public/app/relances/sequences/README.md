# Gestion des Séquences de Relances

Ce module permet de gérer les séquences de relances pour les impayés. Une séquence est une série d'actions (emails ou SMS) qui sont envoyées à des intervalles spécifiques.

## Structure des données

### Collection Parse: `sequences`

- **nom** (String, requis): Nom de la séquence
- **description** (String): Description de la séquence
- **isActif** (Boolean, défaut: true): Indique si la séquence est active
- **actions** (Array, défaut: []): Liste des actions de la séquence

### Structure d'une action

Chaque action dans le tableau `actions` a la structure suivante:

```json
{
  "type": "email" | "sms",  // Type de l'action (email ou SMS)
  "message": "string",       // Contenu du message
  "delay": number            // Délai en jours avant l'envoi
}
```

## Fonctionnalités

### 1. Liste des séquences

- Affichage de toutes les séquences existantes
- Filtre par nom (recherche)
- Indication du statut (Actif/Inactif)
- Nombre d'actions par séquence
- Aperçu des actions (type, délai, extrait du message)

### 2. Création de séquence

- Formulaire de création avec:
  - Nom de la séquence (obligatoire)
  - Description (optionnelle)
  - Statut actif/inactif
  - Liste d'actions configurables
- Ajout multiple d'actions
- Validation des champs obligatoires
- Redirection vers la page de détail après création

### 3. Édition de séquence

- Modification du nom et du statut
- Ajout/suppression d'actions existantes
- Modification des messages et délais
- Sauvegarde des modifications

### 4. Gestion du statut

- Activation/désactivation rapide
- Mise à jour instantanée

### 5. Suppression

- Confirmation avant suppression
- Suppression définitive de la base de données

## Interface Utilisateur

### Page principale

- Barre de recherche pour filtrer les séquences
- Bouton "Créer une nouvelle séquence"
- Liste des séquences avec:
  - Nom et nombre d'actions
  - Boutons d'action (Activer/Désactiver, Modifier, Supprimer)
  - Détail des actions

### Drawer de création

- Formulaire simplifié avec:
  - Nom de la séquence (obligatoire)
  - Description (optionnelle)
  - Case à cocher pour le statut actif
- Boutons Annuler et Créer
- Redirection vers la page de détail après création

### Page de détail

- Informations de la séquence:
  - Nom, description, statut
  - Nombre d'actions
  - Boutons d'action (Retour, Activer/Désactiver, Modifier)
- Liste détaillée des actions avec:
  - Type, délai et message complet
  - Numérotation des actions
- Informations supplémentaires:
  - ID de la séquence
  - Dates de création et mise à jour

### Modal d'édition

- Formulaire complet avec:
  - Nom de la séquence
  - Description
  - Case à cocher pour le statut actif
  - Section des actions avec:
    - Liste des actions existantes
    - Formulaire d'ajout de nouvelle action
    - Boutons de suppression pour chaque action
- Boutons Annuler et Mettre à jour

## Intégration Parse

La page utilise le SDK Parse pour:

1. **Récupération des données**: `Parse.Query('sequences').find()`
2. **Création**: `new Parse.Object('sequences')` + `save()`
3. **Mise à jour**: Récupération par ID + `save()`
4. **Suppression**: `destroy()`

## Exemple d'utilisation

### Création d'une séquence de relance standard

1. Cliquer sur "Créer une nouvelle séquence"
2. Donner un nom: "Relance standard"
3. Ajouter des actions:
   - Email - Jour 0: "Rappel de votre facture impayée"
   - SMS - Jour 7: "Votre facture est toujours impayée"
   - Email - Jour 14: "Dernier rappel avant mesures"
4. Sauvegarder

### Activation/désactivation

- Cliquer sur le bouton "Actif" pour désactiver une séquence
- Cliquer sur "Inactif" pour réactiver

## Flux de travail

1. **Création**: L'utilisateur remplit le drawer avec le nom (obligatoire) et la description (optionnelle)
2. **Redirection**: Après création, l'utilisateur est redirigé vers la page de détail de la séquence
3. **Édition**: Sur la page de détail, l'utilisateur peut ajouter/modifier les actions
4. **Gestion**: Activation/désactivation et modification depuis la page de détail

## Bonnes pratiques

1. **Noms descriptifs**: Utiliser des noms clairs pour les séquences
2. **Messages courts**: Pour les SMS, limiter à 160 caractères
3. **Délais progressifs**: Espacer les actions (ex: 0, 7, 14, 30 jours)
4. **Test avant activation**: Vérifier les séquences avant de les activer
5. **Description claire**: Utiliser la description pour expliquer le but de la séquence

## Dépendances

- Parse SDK
- Alpine.js
- Tailwind CSS
- Lit HTML

## Fichiers

- `index.html`: Page principale avec liste des séquences
- `sequence-detail.html`: Page de détail d'une séquence
- `sequencesState.js`: Logique Alpine.js pour la page principale
- `README.md`: Documentation (ce fichier)
