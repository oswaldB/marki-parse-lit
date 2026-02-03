# Specification: Vue Groupé par Payeur

## Vue d'ensemble
Cette spécification décrit la vue "Groupé par Payeur" pour la page des impayés. Cette vue permet aux utilisateurs de visualiser les factures impayées regroupées par payeur, facilitant ainsi la gestion des impayés par client.

## Structure de la Vue

### 1. En-tête de Groupe
- **Nom du Payeur** : Nom du client avec une icône
- **Nombre de Factures** : Nombre total de factures pour ce payeur
- **Montant Total** : Somme des montants restants à payer
- **Retard Maximum** : Délai maximum en jours (codé en couleur : rouge >30 jours, jaune ≤30 jours)
- **Bouton d'Expansion/Réduction** : Permet d'afficher ou masquer les détails des factures

### 2. Contenu du Groupe (quand expanded)
- **Liste des Factures** : Liste des factures individuelles pour ce payeur
- **Détails de chaque Facture** :
  - Numéro de facture
  - Date
  - Statut de retard
  - Statut de paiement (Payé/Impayé)
  - Résumé financier (HT, TTC, Restant, Statut)
  - Informations sur la propriété
  - Bouton "Voir détails"

## Fonctionnalités

### 1. Regroupement des Factures
- Les factures sont regroupées par nom de payeur
- Chaque groupe affiche un en-tête avec des informations résumées
- Les groupes peuvent être expandus ou réduits pour afficher ou masquer les détails

### 2. Tri et Filtrage
- **Tri par défaut** : Les groupes sont triés par montant total décroissant
- **Filtrage** : Utilise la barre de recherche globale pour filtrer les factures

### 3. Calculs
- **Montant Total** : Somme des montants restants à payer pour les factures uniques par payeur
- **Retard Maximum** : Délai maximum parmi les factures du groupe

### 4. Actions
- **Voir Détails** : Ouvre un tiroir avec les détails complets de la facture
- **Ajouter à une Séquence** : Permet d'ajouter la facture à une séquence existante ou nouvelle

## Exigences de Données

### Structure des Données
```javascript
{
  payeur_nom: string,        // Nom du payeur
  payeur_email: string,      // Email du payeur
  payeur_telephone: string,  // Téléphone du payeur
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
```

## Composants

### 1. ImpayeCardByPayeur.js
- **Emplacement** : `/public/components/impayes/ImpayeCardByPayeur.js`
- **Type** : Composant Lit
- **État** : Géré par Alpine.js
- **Fonctionnalités** :
  - Affichage des groupes de factures par payeur
  - Gestion de l'expansion/réduction des groupes
  - Calcul des totaux et retards
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

### 1. Visualisation des Factures par Payeur
1. L'utilisateur accède à la page des impayés
2. La vue "Groupé par Payeur" est affichée par défaut
3. Les groupes de factures sont triés par montant total décroissant
4. L'utilisateur peut expandre un groupe pour voir les détails des factures
5. L'utilisateur peut cliquer sur "Voir détails" pour afficher les informations complètes d'une facture

### 2. Ajout à une Séquence
1. L'utilisateur clique sur "Ajouter à une séquence" dans les détails d'une facture
2. Un tiroir de sélection de séquence s'ouvre
3. L'utilisateur peut choisir une séquence existante ou en créer une nouvelle
4. La séquence est mise à jour pour la facture

## Maquettes

### Maquette de la Vue Groupé par Payeur
```
+---------------------------------------------------+
| ▼ Jean Dupont (5 factures) Total: 2500 €          |
|   Retard max: 45 jours                            |
+---------------------------------------------------+
|           // ici 2.1 si on ouvre                  |
|            [Ajouter séquence]                     |
+---------------------------------------------------+
```

### Maquette des Détails du Groupe (quand expanded)
```
+---------------------------------------------------+
| 👤 Jean Dupont                                    |
| 📞 0612345678 | ✉️ jean@dupont.fr              |
+---------------------------------------------------+
| 📄 Facture #12345 • DUP-2024-001                  |
| 📅 Date: 15/01/2024 • Intervention: 10/01/2024   |
| 💰 Total TTC: 1200 € • Reste: 1200 €              |
| 🏠 123 Rue de Paris, 75001 Paris                 |
+---------------------------------------------------+
| 🔴 Statut: Impayé • 30 jours de retard           |
| 🟡 Séquence: Sequence 1 🤖                         |
+---------------------------------------------------+
| [Voir facture PDF] [Modifier séquence] [Fermer]   |
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
