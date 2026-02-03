# Specification: Vue Séquence (Sequence View - Kanban)

## Vue d'ensemble
Cette spécification décrit la vue "Vue Séquence" pour la page des impayés. Cette vue permet aux utilisateurs de visualiser et de gérer les factures impayées sous forme de tableau Kanban, regroupées par séquence.

## Structure de la Vue

### 1. Tableau Kanban
- **Disposition** : Tableau horizontal avec des colonnes représentant des séquences
- **Colonnes** :
  - "Sans séquence" : Première colonne pour les factures non assignées
  - Séquences nommées (par exemple, Sequence 1, Sequence 2, etc.) dans l'ordre numérique
- **Cartes** : Représentent les payeurs, pas les factures individuelles

### 2. En-tête de Colonne
- **Nom de la Séquence** : Nom de la séquence avec indicateur automatique (🤖)
- **Nombre de Payeurs** : Nombre de payeurs dans la séquence
- **Montant Total** : Somme des montants restants à payer pour la séquence
- **Statistiques** : Pourcentage de complétion, indicateurs de retard

### 3. Carte de Payeur
- **Nom du Payeur** : Nom du payeur avec icône
- **Nombre de Factures** : Nombre de factures pour ce payeur
- **Montant Total** : Somme des montants restants à payer pour ce payeur
- **Menu Déroulant** : Permet de voir les factures individuelles

## Fonctionnalités

### 1. Affichage des Séquences
- Les séquences sont affichées sous forme de colonnes dans un tableau Kanban
- Les colonnes sont triées par ordre numérique
- Les séquences automatiques sont marquées avec un emoji 🤖 et un fond violet

### 2. Glisser-Déposer
- **Glisser** : L'utilisateur peut glisser une carte de payeur d'une colonne à une autre
- **Déposer** : La carte est assignée à la nouvelle séquence
- **Indicateurs Visuels** : Feedback visuel pendant le glisser-déposer

### 3. Actions sur les Cartes
- **Voir Détails** : Ouvre un tiroir avec les détails complets du payeur et de ses factures
- **Modifier la Séquence** : Permet de changer la séquence assignée au payeur

### 4. Gestion des Séquences
- **Création Rapide** : Permet de créer une nouvelle séquence directement depuis l'en-tête de colonne
- **Collapsible** : Les colonnes peuvent être réduites ou expandues pour une meilleure navigation

## Exigences de Données

### Structure des Données
```javascript
{
  sequences: [
    {
      id: string,                     // Identifiant unique de la séquence
      name: string,                   // Nom de la séquence
      is_automatic: boolean,          // Indicateur de séquence automatique
      payeurs: [
        {
          payeur_nom: string,          // Nom du payeur
          payeur_email: string,        // Email du payeur
          payeur_telephone: string,    // Téléphone du payeur
          factures: [
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
  ]
}
```

## Composants

### 1. ImpayeCardSequence.js
- **Emplacement** : `/public/components/impayes/ImpayeCardSequence.js`
- **Type** : Composant Lit
- **État** : Géré par Alpine.js
- **Fonctionnalités** :
  - Affichage des cartes de payeurs dans le tableau Kanban
  - Gestion du glisser-déposer
  - Intégration avec `ImpayeInfoDisplay` pour l'affichage des détails des factures

### 2. SequenceColumn.js
- **Emplacement** : `/public/components/impayes/SequenceColumn.js`
- **Type** : Composant Lit
- **État** : Géré par Alpine.js
- **Fonctionnalités** :
  - Affichage des colonnes de séquence
  - Gestion des zones de dépôt pour le glisser-déposer
  - Calcul des statistiques de séquence

### 3. ImpayeInfoDisplay.js
- **Emplacement** : `/public/components/impayes/ImpayeInfoDisplay.js`
- **Type** : Composant Lit
- **État** : Géré par Alpine.js
- **Fonctionnalités** :
  - Affichage standardisé des informations de facture
  - Formatage cohérent des dates, montants et statuts
  - Disposition réactive

## Flux Utilisateur

### 1. Visualisation des Séquences
1. L'utilisateur accède à la page des impayés
2. L'utilisateur sélectionne la vue "Vue Séquence"
3. Les séquences sont affichées sous forme de colonnes dans un tableau Kanban
4. L'utilisateur peut faire défiler le tableau pour voir toutes les séquences
5. L'utilisateur peut expandre une colonne pour voir les détails des payeurs

### 2. Glisser-Déposer des Cartes
1. L'utilisateur clique et maintient une carte de payeur
2. L'utilisateur fait glisser la carte vers une nouvelle colonne
3. La carte est assignée à la nouvelle séquence
4. Les données sont mises à jour dans la base de données

### 3. Création de Séquence
1. L'utilisateur clique sur le bouton de création de séquence dans l'en-tête de colonne
2. Un formulaire de création de séquence s'ouvre
3. L'utilisateur saisit le nom de la nouvelle séquence
4. La nouvelle séquence est créée et ajoutée au tableau

## Maquettes

### Maquette de la Vue Séquence
```
+----------------+ +---------------------+ +------------+
| Sans séquence  | | Sequence 1 🤖      | | Sequence 2  |
| 5 payeurs      | | 8 payeurs           | | 12 payeurs  |
| Total: 2300€   | | Total: 4500€        | | Total: 6700€  |
+----------------+ +---------------------+ +------------+
| ▼ Jean Dupont  | | ▼ Marie M.          | | ▼ Paul P.   |
| 3 factures     | | 5 factures          | | 8 factures  |
| #12345,12346,..| | #12347,...          | | #12348,...  |
+----------------+ +---------------------+ +------------+
```

### Maquette des Détails de la Carte de Séquence (quand la carte est ouverte)
```
+---------------------------------------------------+
| 👤 Jean Dupont • 3 factures • 2500 €              |
| 🔗 Séquence: Sequence 1 🤖                         |
+---------------------------------------------------+
| ▼ Facture #12345 • 1500 € • 30j • [Impayé]        |
| ▼ Facture #12346 • 1000 € • 15j • [Impayé]        |
|                                                   |
| [Voir tout] [Modifier séquence] [Fermer]          |
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
