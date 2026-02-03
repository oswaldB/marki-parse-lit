# Specification: Vue À Réparer (To Fix View)

## Vue d'ensemble
Cette spécification décrit la vue "À Réparer" pour la page des impayés. Cette vue permet aux utilisateurs de visualiser et de corriger les factures qui ont des problèmes, tels que des emails manquants ou des problèmes de fournisseur.

## Structure de la Vue

### 1. Liste des Factures à Réparer
- **Disposition** : Liste de cartes de factures avec des indicateurs de problème
- **Chaque Carte Affiche** :
  - Numéro de facture et référence
  - Indicateur de problème (email manquant)
  - Informations de liste
  - Date, adresse et code postal
  - Statut de retard
  - Section financière (HT, TTC, Restant, Statut)
  - Parties prenantes (Payeur, Propriétaire, Fournisseur)
  - Boutons d'action (Vérifier, Voir détails)

### 2. Indicateur de Problème
- **Email Manquant** : Fond jaune pour les champs d'email manquants
- **Message d'Avertissement** : "Allez sur ADN, corrigez l'email du contact et cliquez sur le bouton Vérifier"

## Fonctionnalités

### 1. Affichage des Factures à Réparer
- Les factures sont affichées sous forme de cartes dans une liste
- Chaque carte contient des indicateurs visuels pour les problèmes
- Les cartes sont disposées de manière réactive pour s'adapter à différentes tailles d'écran

### 2. Tri et Filtrage
- **Tri par défaut** : Les factures sont triées par jours de retard décroissants
- **Filtrage** : Utilise la barre de recherche globale pour filtrer les factures

### 3. Actions sur les Factures
- **Vérifier** : Appelle une fonction cloud pour forcer la synchronisation PostgreSQL et exécuter syncImpayes
- **Voir Détails** : Ouvre un tiroir avec les détails complets de la facture

### 4. Export des Données
- **Export CSV** : Permet d'exporter la liste des factures à réparer au format CSV

## Exigences de Données

### Structure des Données
```javascript
{
  objectId: string,          // Identifiant unique
  nfacture: number,          // Numéro de facture
  reference: string,         // Référence
  datepiece: Date,           // Date de la facture
  adresse: string,           // Adresse
  codepostal: string,        // Code postal
  ville: string,             // Ville
  totalhtnet: number,        // Total HT
  totalttcnet: number,       // Total TTC
  resteapayer: number,       // Restant à payer
  facturesoldee: boolean,    // Statut de paiement
  statut_intitule: string,   // Titre du statut
  liste: string,             // Liste
  sequence: Parse.Pointer,   // Séquence assignée
  sequence_is_automatic: boolean, // Indicateur de séquence automatique
  sequence_name: string,     // Nom de la séquence
  numero: string,            // Numéro de dossier
  
  // Parties prenantes
  payeur_nom: string,        // Nom du payeur
  payeur_email: string,      // Email du payeur
  payeur_telephone: string,  // Téléphone du payeur
  
  proprietaire_nom: string, // Nom du propriétaire
  proprietaire_email: string,
  proprietaire_telephone: string,
  
  apporteur_nom: string,     // Nom du fournisseur
  apporteur_email: string,
  apporteur_telephone: string
}
```

### Filtres de Données
- **Email Manquant** : `payeur_email` est null ou vide
- **Problème de Fournisseur** : `apporteur_nom` n'est pas vide mais `apporteur_email` est manquant

## Composants

### 1. ToFixCard.js
- **Emplacement** : `/public/components/impayes/ToFixCard.js`
- **Type** : Composant Lit
- **État** : Géré par Alpine.js
- **Fonctionnalités** :
  - Affichage des cartes de factures à réparer
  - Gestion des interactions locales des cartes
  - Intégration avec `ImpayeInfoDisplay` pour l'affichage des détails des factures
  - Mise en évidence des champs d'email manquants

### 2. ImpayeInfoDisplay.js
- **Emplacement** : `/public/components/impayes/ImpayeInfoDisplay.js`
- **Type** : Composant Lit
- **État** : Géré par Alpine.js
- **Fonctionnalités** :
  - Affichage standardisé des informations de facture
  - Formatage cohérent des dates, montants et statuts
  - Disposition réactive

## Flux Utilisateur

### 1. Visualisation des Factures à Réparer
1. L'utilisateur accède à la page des impayés
2. L'utilisateur sélectionne la vue "À Réparer"
3. Les factures à réparer sont affichées sous forme de cartes dans une liste
4. L'utilisateur peut faire défiler la liste pour voir toutes les factures
5. L'utilisateur peut cliquer sur "Voir détails" pour afficher les informations complètes d'une facture

### 2. Correction des Problèmes
1. L'utilisateur identifie une facture avec un email manquant
2. L'utilisateur corrige l'email du contact dans ADN
3. L'utilisateur clique sur "Vérifier" pour forcer la synchronisation
4. La fonction cloud est appelée pour synchroniser les données
5. La facture est mise à jour et disparaît de la liste si le problème est résolu

## Maquettes

### Maquette de la Vue À Réparer
```
+---------------------------------------------------+
| ⚠️ Facture #12345 • Email manquant               |
| [_____________________________________________] |
|                                                   |
| Payeur: Jean Dupont                              |
| Email: MANQUANT 🟡                                |
| Merci de mettre à jour ce contact dans ADN      |
|                                                   |
| [Vérifier]                                       |
+---------------------------------------------------+
```

## Notes de Conception

### Principes Clés
- **Simplicité** : Interface intuitive et directe
- **Consistance** : Respect des patterns établis
- **Feedback** : Retours visuels pour toutes les actions
- **Performance** : Chargement rapide et réactif

### Décisions de Conception
- **Drawers vs Modales** : Utilisation exclusive de drawers
- **Édition en ligne** : Modification directe des champs
- **Variables dynamiques** : Génération automatique de prompt
- **Tri automatique** : Actions toujours triées par délai

## Documentation Connexe
- `admin/styleguide.md` : Styleguide du projet
- Parse Server Documentation : SDK JavaScript
- Appel direct au serveur parse depuis le frontend.
