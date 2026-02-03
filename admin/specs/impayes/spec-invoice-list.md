# Specification: Vue Factures (Invoice List View)

## Vue d'ensemble
Cette spécification décrit la vue "Vue Factures" pour la page des impayés. Cette vue permet aux utilisateurs de visualiser les factures impayées sous forme de liste, facilitant ainsi la gestion individuelle des factures.

## Structure de la Vue

### 1. Grille de Cartes de Factures
- **Disposition** : Grille de cartes de factures
- **Chaque Carte Affiche** :
  - Numéro de facture et référence
  - Badge de statut de paiement
  - Informations de liste
  - Date, adresse et code postal
  - Statut de retard
  - Section financière (HT, TTC, Restant, Statut)
  - Parties prenantes (Payeur, Propriétaire, Fournisseur)
  - Boutons d'action (Voir détails, Changer de liste)

## Fonctionnalités

### 1. Affichage des Factures
- Les factures sont affichées sous forme de cartes dans une grille
- Chaque carte contient toutes les informations essentielles sur la facture
- Les cartes sont disposées de manière réactive pour s'adapter à différentes tailles d'écran

### 2. Tri et Filtrage
- **Tri par défaut** : Les factures sont triées par jours de retard décroissants
- **Filtrage** : Utilise la barre de recherche globale pour filtrer les factures

### 3. Actions sur les Factures
- **Voir Détails** : Ouvre un tiroir avec les détails complets de la facture
- **Changer de Liste** : Permet de changer la liste associée à la facture

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

## Composants

### 1. ImpayeCardList.js
- **Emplacement** : `/public/components/impayes/ImpayeCardList.js`
- **Type** : Composant Lit
- **État** : Géré par Alpine.js
- **Fonctionnalités** :
  - Affichage des cartes de factures dans une grille
  - Gestion des interactions locales des cartes
  - Intégration avec `ImpayeInfoDisplay` pour l'affichage des détails des factures

### 2. ImpayeInfoDisplay.js
- **Emplacement** : `/public/components/impayes/ImpayeInfoDisplay.js`
- **Type** : Composant Lit
- **État** : Géré par Alpine.js
- **Fonctionnalités** :
  - Affichage standardisé des informations de facture
  - Formatage cohérent des dates, montants et statuts
  - Disposition réactive

## Flux Utilisateur

### 1. Visualisation des Factures
1. L'utilisateur accède à la page des impayés
2. L'utilisateur sélectionne la vue "Vue Factures"
3. Les factures sont affichées sous forme de cartes dans une grille
4. L'utilisateur peut faire défiler la liste pour voir toutes les factures
5. L'utilisateur peut cliquer sur "Voir détails" pour afficher les informations complètes d'une facture

### 2. Changer de Liste
1. L'utilisateur clique sur "Changer de liste" dans les détails d'une facture
2. Un tiroir de sélection de liste s'ouvre
3. L'utilisateur peut choisir une nouvelle liste
4. La liste est mise à jour pour la facture

## Maquettes

### Maquette de la Vue Factures
```
+---------------------------------------------------+
| 📄 Facture #12345 • DUP-2024-001                  |
| 🏷️ Statut: Impayé                                 |
| 📅 Date: 15/01/2024                               |
| 🏠 123 Rue de Paris, 75001 Paris                 |
| 💰 Total TTC: 1200 € • Reste: 1200 €              |
| 👤 Payeur: Jean Dupont                            |
| 👤 Propriétaire: Marie Martin                     |
| 👤 Fournisseur: Paul Durand                       |
| [Voir détails] [Changer de liste]                |
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
