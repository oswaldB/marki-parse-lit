# Specification: Vue par Acteur (By Actor View)

## Vue d'ensemble
Cette spécification décrit la vue "Vue par Acteur" pour la page des impayés. Cette vue permet aux utilisateurs de visualiser les factures impayées regroupées par acteur, facilitant ainsi la gestion des impayés par acteur.

## Structure de la Vue

### 1. Carte d'Acteur
- **Nom de l'Acteur** : Nom de l'acteur avec icône
- **Informations de Contact** : Téléphone et email de l'acteur
- **Total à Régler** : Somme des montants restants à payer pour les factures où l'acteur est le payeur

### 2. Factures à Régler
- **Liste des Factures** : Liste des factures où l'acteur est le payeur
- **Détails de chaque Facture** :
  - Numéro de facture
  - Date
  - Montant
  - Statut de paiement
  - Statut de retard
  - Bouton "Voir détails"

### 3. Factures Apportées
- **Liste des Factures** : Liste des factures où l'acteur est le fournisseur
- **Détails de chaque Facture** :
  - Numéro de facture
  - Date
  - Montant
  - Statut de paiement
  - Statut de retard
  - Bouton "Voir détails"

## Fonctionnalités

### 1. Regroupement des Factures par Acteur
- Les factures sont regroupées par acteur
- Chaque acteur affiche deux listes distinctes : "Factures à régler" et "Factures apportées"
- Les listes peuvent être expandues ou réduites pour afficher ou masquer les détails

### 2. Tri et Filtrage
- **Tri par défaut** : Les acteurs sont triés par nom
- **Filtrage** : Utilise la barre de recherche globale pour filtrer les acteurs et les factures

### 3. Calculs
- **Total à Régler** : Somme des montants restants à payer pour les factures où l'acteur est le payeur
- **Total Apporté** : Somme des montants restants à payer pour les factures où l'acteur est le fournisseur

### 4. Actions
- **Voir Détails** : Ouvre un tiroir avec les détails complets de la facture
- **Ajouter à une Séquence** : Permet d'ajouter la facture à une séquence existante ou nouvelle

## Exigences de Données

### Structure des Données
```javascript
{
  acteurs: [
    {
      acteur_nom: string,        // Nom de l'acteur
      acteur_email: string,      // Email de l'acteur
      acteur_telephone: string,  // Téléphone de l'acteur
      factures_a_regler: [
        {
          objectId: string,          // Identifiant unique
          nfacture: number,          // Numéro de facture
          reference: string,         // Référence
          datepiece: Date,           // Date de la facture
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
        }
      ],
      factures_apportees: [
        {
          objectId: string,          // Identifiant unique
          nfacture: number,          // Numéro de facture
          reference: string,         // Référence
          datepiece: Date,           // Date de la facture
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
        }
      ]
    }
  ]
}
```

## Composants

### 1. ActorCard.js
- **Emplacement** : `/public/components/impayes/ActorCard.js`
- **Type** : Composant Lit
- **État** : Géré par Alpine.js
- **Fonctionnalités** :
  - Affichage des cartes d'acteurs avec deux listes de factures
  - Gestion de l'expansion/réduction des listes
  - Calcul des totaux pour chaque liste
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

### 1. Visualisation des Factures par Acteur
1. L'utilisateur accède à la page des impayés
2. L'utilisateur sélectionne la vue "Vue par Acteur"
3. Les acteurs sont affichés sous forme de cartes avec deux listes de factures
4. L'utilisateur peut expandre une liste pour voir les détails des factures
5. L'utilisateur peut cliquer sur "Voir détails" pour afficher les informations complètes d'une facture

### 2. Ajout à une Séquence
1. L'utilisateur clique sur "Ajouter à une séquence" dans les détails d'une facture
2. Un tiroir de sélection de séquence s'ouvre
3. L'utilisateur peut choisir une séquence existante ou en créer une nouvelle
4. La séquence est mise à jour pour la facture

## Maquettes

### Maquette de la Vue par Acteur
```
+---------------------------------------------------+
| 👤 Jean Dupont                                    |
| 📞 0612345678 | ✉️ jean@dupont.fr              |
| Total à régler: 3500€       |
+---------------------------------------------------+
| 🔴 FACTURES À RÉGLER (3)                          |
+---------------------------------------------------+
| #12345 • 1500€ • 30j • [Impayé]                  |
| #12346 • 2000€ • 15j • [Impayé]                  |
+---------------------------------------------------+
| 🟢 FACTURES APPORTÉES (2)                         |
+---------------------------------------------------+
| #12347 • 800€ • [Payé]                           |
| #12348 • 1000€ • [En attente]                    |
+---------------------------------------------------+
| [Ajouter séquence]                    |
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
