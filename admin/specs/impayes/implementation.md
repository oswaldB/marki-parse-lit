# Implementation: Impayés Page Components

This document outlines the Lit components to be created for the Impayés (Unpaid Invoices) page, using a pure Lit architecture without Alpine.js.

## Component Structure

```
public/components/impayes/
├── cards/
│   ├── impaye-card-list.js
│   ├── impaye-card-by-payeur.js
│   ├── impaye-card-sequence.js
│   ├── sequence-column.js
│   ├── to-fix-card.js
│   ├── actor-card.js
│   └── invoice-list-compact.js
├── ui/
│   ├── impaye-search.js
│   ├── view-mode-toggle.js
│   ├── sequence-drawer.js
│   └── pdf-viewer-drawer.js
├── layout/
│   └── impayes-page-layout.js
└── utils/
    ├── loading-indicator.js
    ├── empty-state.js
    └── error-message.js
```

## Component Specifications

### 1. Core Components

#### impaye-card-list.js
**Purpose**: Display individual invoice cards in list view

```
+---------------------------------------------------+
| 📄 Facture #12345 • DUP-2024-001                  |
+---------------------------------------------------+
| 📅 15/01/2024 | 💰 1200 € | 🔴 30j retard      |
| 🏠 123 Rue de Paris, 75001 Paris                 |
| 👤 Jean Dupont | ✉️ jean@dupont.fr              |
+---------------------------------------------------+
| [Voir détails] [Modifier séquence] [Voir PDF]     |
+---------------------------------------------------+
```

```javascript
// Properties
static properties = {
  invoice: { type: Object },
  showDetails: { type: Boolean }
}

// Methods
viewDetails() { /* Open detailed view */ }
formatDate() { /* Format invoice date */ }
calculateDelay() { /* Calculate days overdue */ }
```

#### impaye-card-by-payeur.js
**Purpose**: Display payer groups with expandable invoice lists

```
+---------------------------------------------------+
| ▼ Jean Dupont (5 factures) Total: 2500 €          |
| 📞 0612345678 | ✉️ jean@dupont.fr              |
| 🔴 Retard max: 45 jours                           |
+---------------------------------------------------+
| 📄 #12345 • 1200 € • 30j • [Impayé]              |
| 📄 #12346 • 800 € • 15j • [Impayé]               |
| 📄 #12347 • 500 € • 5j • [En attente]            |
+---------------------------------------------------+
| [Ajouter à séquence] [Voir tout] [Fermer]        |
+---------------------------------------------------+
```

```javascript
// Properties
static properties = {
  payer: { type: Object },
  invoices: { type: Array },
  expanded: { type: Boolean }
}

// Methods
toggleExpand() { /* Toggle group expansion */ }
calculateTotal() { /* Sum invoice amounts */ }
getMaxDelay() { /* Find maximum delay in group */ }
```

#### impaye-card-sequence.js
**Purpose**: Draggable payer cards for kanban sequence view

```
+---------------------------------------------------+
| 👤 Jean Dupont • 3 factures • 2500 €              |
| 🔗 Sequence 1 🤖                                  |
+---------------------------------------------------+
| ▼ Facture #12345 • 1500 € • 30j                  |
| ▼ Facture #12346 • 1000 € • 15j                  |
| ▼ Facture #12347 • 500 € • 5j                    |
+---------------------------------------------------+
| [Voir tout] [Modifier] [Fermer]                  |
+---------------------------------------------------+
```

```javascript
// Properties
static properties = {
  payer: { type: Object },
  invoices: { type: Array },
  sequence: { type: Object },
  draggable: { type: Boolean }
}

// Methods
startDrag() { /* Initiate drag operation */ }
onDrop() { /* Handle drop event */ }
showInvoiceDetails() { /* Show invoice dropdown */ }
```

#### sequence-column.js
**Purpose**: Kanban columns for sequence organization

```
+---------------------+
| Sequence 1 🤖       |
| 8 payeurs           |
| Total: 4500 €       |
| Complétion: 65%     |
+---------------------+
| ▼ Jean Dupont       |
| ▼ Marie Martin      |
| ▼ Paul Dubois       |
| [+ Ajouter payeur]  |
+---------------------+
```

```javascript
// Properties
static properties = {
  sequence: { type: Object },
  payeurs: { type: Array },
  droppable: { type: Boolean }
}

// Methods
allowDrop() { /* Allow drop operations */ }
onDrop() { /* Handle dropped items */ }
calculateStats() { /* Calculate sequence statistics */ }
```

#### to-fix-card.js
**Purpose**: Highlight invoices with missing information

```
+---------------------------------------------------+
| ⚠️ Facture #12345 • Email manquant               |
+---------------------------------------------------+
| 📄 Facture #12345 • 1200 €                        |
| 👤 Jean Dupont                                    |
| ✉️ Email: MANQUANT 🟡                             |
| 📞 0612345678                                     |
+---------------------------------------------------+
| ⚠️ Merci de mettre à jour ce contact dans ADN    |
| [Vérifier] [Ignorer]                             |
+---------------------------------------------------+
```

```javascript
// Properties
static properties = {
  invoice: { type: Object },
  missingFields: { type: Array }
}

// Methods
verifyEmail() { /* Call cloud function to verify */ }
highlightMissingFields() { /* Visual highlighting */ }
```

#### actor-card.js
**Purpose**: Display actor information with two invoice lists

```
+---------------------------------------------------+
| 👤 Jean Dupont                                    |
| 📞 0612345678 | ✉️ jean@dupont.fr              |
| Total à régler: 3500 €                           |
+---------------------------------------------------+
| 🔴 FACTURES À RÉGLER (3)                          |
| #12345 • 1500 € • 30j • [Impayé]                  |
| #12346 • 2000 € • 15j • [Impayé]                  |
+---------------------------------------------------+
| 🟢 FACTURES APPORTÉES (2)                         |
| #12347 • 800 € • [Payé]                           |
| #12348 • 1000 € • [En attente]                    |
+---------------------------------------------------+
| [Ajouter séquence] [Voir tout]                    |
+---------------------------------------------------+
```

```javascript
// Properties
static properties = {
  actor: { type: Object },
  invoicesToPay: { type: Array },
  broughtInInvoices: { type: Array },
  expanded: { type: Boolean }
}

// Methods
toggleExpand() { /* Toggle expansion */ }
calculateTotals() { /* Calculate totals */ }
getInvoiceList() { /* Get filtered invoice list */ }
```

#### invoice-list-compact.js
**Purpose**: Compact invoice display for dense layouts

```
+---------------------------------------------------+
| #12345 • 1200 € • 30j • 🔴                        |
| #12346 • 800 € • 15j • 🟡                         |
| #12347 • 500 € • 5j • 🟢                          |
| #12348 • 300 € • 0j • 🔵                          |
+---------------------------------------------------+
```

```javascript
// Properties
static properties = {
  invoices: { type: Array },
  compact: { type: Boolean }
}

// Methods
formatCompactDate() { /* Format date compactly */ }
showQuickActions() { /* Show action buttons */ }
```

### 2. UI Components

#### impaye-search.js
**Purpose**: Search functionality for filtering invoices

```
+---------------------------------------------------+
| 🔍 Rechercher... [_____________________________]  |
+---------------------------------------------------+
```

```javascript
// Properties
static properties = {
  searchQuery: { type: String },
  placeholder: { type: String }
}

// Methods
updateSearch() { /* Update search query */ }
clearSearch() { /* Clear search input */ }
```

#### view-mode-toggle.js
**Purpose**: Toggle between different view modes

```
+---------------------------------------------------+
| [Groupé par payeur] [Vue Factures] [À réparer]   |
| [Vue Séquence] [Vue par Acteur]                   |
+---------------------------------------------------+
```

```javascript
// Properties
static properties = {
  currentMode: { type: String },
  availableModes: { type: Array }
}

// Methods
setViewMode() { /* Change view mode */ }
getActiveMode() { /* Get current mode */ }
```

#### sequence-drawer.js
**Purpose**: Drawer for sequence management

```
+---------------------------------------------------+
| 🔗 Assigner une séquence                          |
+---------------------------------------------------+
| 🔍 Rechercher... [_____________________]          |
|                                                   |
| ☑️ Sans séquence                                  |
| ☐ Sequence 1 🤖                                    |
| ☐ Sequence 2                                      |
| ☐ Sequence 3                                      |
|                                                   |
| [Créer nouvelle séquence]                         |
| [Assigner] [Annuler]                              |
+---------------------------------------------------+
```

```javascript
// Properties
static properties = {
  visible: { type: Boolean },
  invoices: { type: Array },
  sequences: { type: Array }
}

// Methods
assignSequence() { /* Assign sequence to invoice */ }
createSequence() { /* Create new sequence */ }
closeDrawer() { /* Close drawer */ }
```

#### pdf-viewer-drawer.js
**Purpose**: PDF viewer with zoom and download options

```
+---------------------------------------------------+
| 📄 Facture #12345 • PDF Viewer                   |
+---------------------------------------------------+
| [🔍 Zoom In] [🔍 Zoom Out] [📥 Download] [🖨️ Print] |
| [🖥️ Plein écran] [✕ Fermer]                       |
+---------------------------------------------------+
|                                                   |
| [PDF Content Display Area]                        |
|                                                   |
| [Page 1/5] [Précédent] [Suivant]                  |
+---------------------------------------------------+
```

```javascript
// Properties
static properties = {
  visible: { type: Boolean },
  pdfUrl: { type: String },
  invoiceId: { type: String }
}

// Methods
fetchPdf() { /* Fetch PDF from server */ }
downloadPdf() { /* Download PDF */ }
printPdf() { /* Print PDF */ }
zoomIn() { /* Zoom in */ }
zoomOut() { /* Zoom out */ }
```

### 3. Layout Components

#### impayes-page-layout.js
**Purpose**: Main page layout container

```
+---------------------------------------------------+
| Impayés                                      [🔍] |
| Gérez vos impayés ici.                           |
| [_____________________________________________] |
|                                                   |
| [Groupé par payeur] [Vue Factures] [À réparer]   |
| [Vue Séquence] [Vue par Acteur]                   |
+---------------------------------------------------+
|                                                   |
| [Content Area - varies by view mode]              |
|                                                   |
+---------------------------------------------------+
| Page 1 sur 5          [Précédent] [Suivant]        |
+---------------------------------------------------+
```

```javascript
// Properties
static properties = {
  title: { type: String },
  description: { type: String },
  currentView: { type: String },
  invoices: { type: Array },
  loading: { type: Boolean },
  error: { type: String }
}

// Methods
changeView() { /* Change view mode */ }
searchInvoices() { /* Search invoices */ }
loadMore() { /* Load more invoices */ }
```

### 4. Utility Components

#### loading-indicator.js
**Purpose**: Show loading state

```
+---------------------------------------------------+
| 🔄 Chargement en cours...                         |
| [Barre de progression animée]                     |
+---------------------------------------------------+
```

```javascript
// Properties
static properties = {
  visible: { type: Boolean },
  message: { type: String }
}

// Methods
show() { /* Show indicator */ }
hide() { /* Hide indicator */ }
```

#### empty-state.js
**Purpose**: Display when no data is available

```
+---------------------------------------------------+
| 📄 Aucun impayé trouvé                             |
|                                                   |
| 🔍 Essayez de modifier vos critères de recherche  |
| [Rafraîchir]                                      |
+---------------------------------------------------+
```

```javascript
// Properties
static properties = {
  visible: { type: Boolean },
  message: { type: String },
  icon: { type: String }
}

// Methods
show() { /* Show empty state */ }
hide() { /* Hide empty state */ }
```

#### error-message.js
**Purpose**: Display error messages

```
+---------------------------------------------------+
| ❌ Erreur de chargement                            |
|                                                   |
| Une erreur est survenue lors du chargement.      |
| Veuillez réessayer plus tard.                     |
| [Réessayer] [Ignorer]                             |
+---------------------------------------------------+
```

```javascript
// Properties
static properties = {
  visible: { type: Boolean },
  message: { type: String },
  type: { type: String } // 'error', 'warning', 'info'
}

// Methods
show() { /* Show error */ }
hide() { /* Hide error */ }
```

## Implementation Recommendations

### 1. State Management
- Use Lit's reactive properties for component state
- Implement event-based communication between components
- Store global state in the main layout component

### 2. Parse Integration
- Initialize Parse SDK in the main layout component
- Use Parse queries directly in components where needed
- Implement proper error handling for Parse operations

### 3. Styling
- Use Lit's encapsulated styles to prevent CSS conflicts
- Follow the project styleguide for consistent visual appearance
- Implement responsive design using CSS Grid and Flexbox

### 4. Accessibility
- Ensure all interactive elements are keyboard navigable
- Provide proper ARIA attributes for screen readers
- Implement focus management for drawers and modals

### 5. Performance
- Implement lazy loading for pagination
- Use efficient data filtering and sorting algorithms
- Minimize DOM updates with Lit's reactive system
- Debounce search input to reduce unnecessary updates

## Data Flow

```
Parse Server
     ↓
Main Layout (impayes-page-layout)
     ↓
View Components (cards, lists, etc.)
     ↓
Utility Components (loading, errors, etc.)
```

## Event Communication

Components should communicate via custom events:
- `view-mode-changed`: When view mode is changed
- `search-updated`: When search query is updated
- `sequence-assigned`: When sequence is assigned to invoice
- `invoice-selected`: When invoice is selected for details
- `pdf-requested`: When PDF is requested for viewing

## Implementation Order

1. **Utility Components**: loading-indicator, empty-state, error-message
2. **Core Components**: impaye-card-list, impaye-card-by-payeur
3. **UI Components**: impaye-search, view-mode-toggle
4. **Specialized Components**: sequence-column, to-fix-card, actor-card
5. **Drawer Components**: sequence-drawer, pdf-viewer-drawer
6. **Main Layout**: impayes-page-layout

This order allows for incremental testing and integration.

## Component-Specific ASCII Mockups

### 1. impaye-card-list.js
```
+---------------------------------------------------+
| 📄 Facture #12345 • DUP-2024-001                  |
+---------------------------------------------------+
| 📅 15/01/2024 | 💰 1200 € | 🔴 30j retard      |
| 🏠 123 Rue de Paris, 75001 Paris                 |
| 👤 Jean Dupont | ✉️ jean@dupont.fr              |
+---------------------------------------------------+
| [Voir détails] [Modifier séquence] [Voir PDF]     |
+---------------------------------------------------+
```

### 2. impaye-card-by-payeur.js
```
+---------------------------------------------------+
| ▼ Jean Dupont (5 factures) Total: 2500 €          |
| 📞 0612345678 | ✉️ jean@dupont.fr              |
| 🔴 Retard max: 45 jours                           |
+---------------------------------------------------+
| 📄 #12345 • 1200 € • 30j • [Impayé]              |
| 📄 #12346 • 800 € • 15j • [Impayé]               |
| 📄 #12347 • 500 € • 5j • [En attente]            |
+---------------------------------------------------+
| [Ajouter à séquence] [Voir tout] [Fermer]        |
+---------------------------------------------------+
```

### 3. impaye-card-sequence.js
```
+---------------------------------------------------+
| 👤 Jean Dupont • 3 factures • 2500 €              |
| 🔗 Sequence 1 🤖                                  |
+---------------------------------------------------+
| ▼ Facture #12345 • 1500 € • 30j                  |
| ▼ Facture #12346 • 1000 € • 15j                  |
| ▼ Facture #12347 • 500 € • 5j                    |
+---------------------------------------------------+
| [Voir tout] [Modifier] [Fermer]                  |
+---------------------------------------------------+
```

### 4. sequence-column.js
```
+---------------------+
| Sequence 1 🤖       |
| 8 payeurs           |
| Total: 4500 €       |
| Complétion: 65%     |
+---------------------+
| ▼ Jean Dupont       |
| ▼ Marie Martin      |
| ▼ Paul Dubois       |
| [+ Ajouter payeur]  |
+---------------------+
```

### 5. to-fix-card.js
```
+---------------------------------------------------+
| ⚠️ Facture #12345 • Email manquant               |
+---------------------------------------------------+
| 📄 Facture #12345 • 1200 €                        |
| 👤 Jean Dupont                                    |
| ✉️ Email: MANQUANT 🟡                             |
| 📞 0612345678                                     |
+---------------------------------------------------+
| ⚠️ Merci de mettre à jour ce contact dans ADN    |
| [Vérifier] [Ignorer]                             |
+---------------------------------------------------+
```

### 6. actor-card.js
```
+---------------------------------------------------+
| 👤 Jean Dupont                                    |
| 📞 0612345678 | ✉️ jean@dupont.fr              |
| Total à régler: 3500 €                           |
+---------------------------------------------------+
| 🔴 FACTURES À RÉGLER (3)                          |
| #12345 • 1500 € • 30j • [Impayé]                  |
| #12346 • 2000 € • 15j • [Impayé]                  |
+---------------------------------------------------+
| 🟢 FACTURES APPORTÉES (2)                         |
| #12347 • 800 € • [Payé]                           |
| #12348 • 1000 € • [En attente]                    |
+---------------------------------------------------+
| [Ajouter séquence] [Voir tout]                    |
+---------------------------------------------------+
```

### 7. invoice-list-compact.js
```
+---------------------------------------------------+
| #12345 • 1200 € • 30j • 🔴                        |
| #12346 • 800 € • 15j • 🟡                         |
| #12347 • 500 € • 5j • 🟢                          |
| #12348 • 300 € • 0j • 🔵                          |
+---------------------------------------------------+
```

### 8. impaye-search.js
```
+---------------------------------------------------+
| 🔍 Rechercher... [_____________________________]  |
+---------------------------------------------------+
```

### 9. view-mode-toggle.js
```
+---------------------------------------------------+
| [Groupé par payeur] [Vue Factures] [À réparer]   |
| [Vue Séquence] [Vue par Acteur]                   |
+---------------------------------------------------+
```

### 10. sequence-drawer.js
```
+---------------------------------------------------+
| 🔗 Assigner une séquence                          |
+---------------------------------------------------+
| 🔍 Rechercher... [_____________________]          |
|                                                   |
| ☑️ Sans séquence                                  |
| ☐ Sequence 1 🤖                                    |
| ☐ Sequence 2                                      |
| ☐ Sequence 3                                      |
|                                                   |
| [Créer nouvelle séquence]                         |
| [Assigner] [Annuler]                              |
+---------------------------------------------------+
```

### 11. pdf-viewer-drawer.js
```
+---------------------------------------------------+
| 📄 Facture #12345 • PDF Viewer                   |
+---------------------------------------------------+
| [🔍 Zoom In] [🔍 Zoom Out] [📥 Download] [🖨️ Print] |
| [🖥️ Plein écran] [✕ Fermer]                       |
+---------------------------------------------------+
|                                                   |
| [PDF Content Display Area]                        |
|                                                   |
| [Page 1/5] [Précédent] [Suivant]                  |
+---------------------------------------------------+
```

### 12. impayes-page-layout.js
```
+---------------------------------------------------+
| Impayés                                      [🔍] |
| Gérez vos impayés ici.                           |
| [_____________________________________________] |
|                                                   |
| [Groupé par payeur] [Vue Factures] [À réparer]   |
| [Vue Séquence] [Vue par Acteur]                   |
+---------------------------------------------------+
|                                                   |
| [Content Area - varies by view mode]              |
|                                                   |
+---------------------------------------------------+
| Page 1 sur 5          [Précédent] [Suivant]        |
+---------------------------------------------------+
```

### 13. loading-indicator.js
```
+---------------------------------------------------+
| 🔄 Chargement en cours...                         |
| [Barre de progression animée]                     |
+---------------------------------------------------+
```

### 14. empty-state.js
```
+---------------------------------------------------+
| 📄 Aucun impayé trouvé                             |
|                                                   |
| 🔍 Essayez de modifier vos critères de recherche  |
| [Rafraîchir]                                      |
+---------------------------------------------------+
```

### 15. error-message.js
```
+---------------------------------------------------+
| ❌ Erreur de chargement                            |
|                                                   |
| Une erreur est survenue lors du chargement.      |
| Veuillez réessayer plus tard.                     |
| [Réessayer] [Ignorer]                             |
```
+---------------------------------------------------+
| Impayés                                      [🔍] |
| Gérez vos impayés ici.                           |
| [_____________________________________________] |
|                                                   |
| [Groupé par payeur] [Vue Factures] [À réparer]   |
| [Vue Séquence] [Vue par Acteur]                   |
+---------------------------------------------------+
|                                                   |
| [Content Area - varies by view mode]              |
|                                                   |
+---------------------------------------------------+
| Page 1 sur 5          [Précédent] [Suivant]        |
+---------------------------------------------------+
```
**Note**: La page est composée de blocs dans un grid. La content area a overflow-y et x pour permettre le défilement.
=======
+---------------------------------------------------+
```

## Complete View Layouts

### 1. Grouped by Payer View (Complete Layout)
```
+---------------------------------------------------+
| Impayés                                      [🔍] |
| Gérez vos impayés ici.                           |
| [🔍 Rechercher... _____________________________]  |
|                                                   |
| [📋 Groupé par payeur] [📄 Vue Factures] [⚠️ À réparer] |
| [🔗 Vue Séquence] [👤 Vue par Acteur]            |
+---------------------------------------------------+
|                                                   |
| +-----------------------------------------------+ |
| | ▼ Jean Dupont (5 factures) Total: 2500 €      | |
| | 📞 0612345678 | ✉️ jean@dupont.fr          | |
| | 🔴 Retard max: 45 jours                       | |
| +-----------------------------------------------+ |
| | 📄 #12345 • 1200 € • 30j • [Impayé]          | |
| | 📄 #12346 • 800 € • 15j • [Impayé]           | |
| | 📄 #12347 • 500 € • 5j • [En attente]        | |
| +-----------------------------------------------+ |
| | [Ajouter à séquence] [Voir tout] [Fermer]    | |
| +-----------------------------------------------+ |
|                                                   |
| +-----------------------------------------------+ |
| | ▼ Marie Martin (3 factures) Total: 1800 €    | |
| | 📞 0612345679 | ✉️ marie@martin.fr        | |
| | 🟡 Retard max: 28 jours                       | |
| +-----------------------------------------------+ |
| | 📄 #12348 • 1000 € • 28j • [Impayé]         | |
| | 📄 #12349 • 800 € • 10j • [Impayé]          | |
| +-----------------------------------------------+ |
| | [Ajouter à séquence] [Voir tout] [Fermer]    | |
| +-----------------------------------------------+ |
|                                                   |
+---------------------------------------------------+
| Page 1 sur 5          [Précédent] [Suivant]        |
+---------------------------------------------------+
```

### 2. Invoice List View (Complete Layout)
```
+---------------------------------------------------+
| Impayés                                      [🔍] |
| Gérez vos impayés ici.                           |
| [🔍 Rechercher... _____________________________]  |
|                                                   |
| [📋 Groupé par payeur] [📄 Vue Factures] [⚠️ À réparer] |
| [🔗 Vue Séquence] [👤 Vue par Acteur]            |
+---------------------------------------------------+
|                                                   |
| +-------------------+ +-------------------+       |
| | 📄 Facture #12345  | | 📄 Facture #12346  |       |
| | 📅 15/01/2024      | | 📅 10/01/2024      |       |
| | 💰 1200 €          | | 💰 800 €          |       |
| | 🔴 30j retard      | | 🟡 15j retard      |       |
| | 👤 Jean Dupont     | | 👤 Marie Martin    |       |
| | [Voir détails]    | | [Voir détails]    |       |
| +-------------------+ +-------------------+       |
|                                                   |
| +-------------------+ +-------------------+       |
| | 📄 Facture #12347  | | 📄 Facture #12348  |       |
| | 📅 05/01/2024      | | 📅 01/01/2024      |       |
| | 💰 500 €          | | 💰 300 €          |       |
| | 🟢 5j retard       | | 🔵 0j retard       |       |
| | 👤 Paul Dubois     | | 👤 Sophie Bernard  |       |
| | [Voir détails]    | | [Voir détails]    |       |
| +-------------------+ +-------------------+       |
|                                                   |
+---------------------------------------------------+
| Page 1 sur 5          [Précédent] [Suivant]        |
+---------------------------------------------------+
```

### 3. To Fix View (Complete Layout)
```
+---------------------------------------------------+
| Impayés                                      [🔍] |
| Gérez vos impayés ici.                           |
| [🔍 Rechercher... _____________________________]  |
|                                                   |
| [📋 Groupé par payeur] [📄 Vue Factures] [⚠️ À réparer] |
| [🔗 Vue Séquence] [👤 Vue par Acteur]            |
+---------------------------------------------------+
| ⚠️ 5 factures à réparer                          |
| [📥 Exporter la liste]                           |
+---------------------------------------------------+
|                                                   |
| +-----------------------------------------------+ |
| | ⚠️ Facture #12345 • Email manquant           | |
| +-----------------------------------------------+ |
| | 📄 Facture #12345 • 1200 €                    | |
| | 👤 Jean Dupont                                | |
| | ✉️ Email: MANQUANT 🟡                         | |
| | 📞 0612345678                                 | |
| +-----------------------------------------------+ |
| | ⚠️ Merci de mettre à jour ce contact dans ADN| |
| | [Vérifier] [Ignorer]                         | |
| +-----------------------------------------------+ |
|                                                   |
| +-----------------------------------------------+ |
| | ⚠️ Facture #12346 • Email apporteur manquant | |
| +-----------------------------------------------+ |
| | 📄 Facture #12346 • 800 €                     | |
| | 👤 Marie Martin                               | |
| | 🏢 Apporteur: MANQUANT 🟡                      | |
| +-----------------------------------------------+ |
| | ⚠️ Merci de mettre à jour ce contact dans ADN| |
| | [Vérifier] [Ignorer]                         | |
| +-----------------------------------------------+ |
|                                                   |
+---------------------------------------------------+
| Page 1 sur 5          [Précédent] [Suivant]        |
+---------------------------------------------------+
```

### 4. Sequence View (Kanban - Complete Layout)
```
+---------------------------------------------------+
| Impayés                                      [🔍] |
| Gérez vos impayés ici.                           |
| [🔍 Rechercher... _____________________________]  |
|                                                   |
| [📋 Groupé par payeur] [📄 Vue Factures] [⚠️ À réparer] |
| [🔗 Vue Séquence] [👤 Vue par Acteur]            |
+---------------------------------------------------+
|                                                   |
| +----------------+ +---------------------+       |
| | Sans séquence  | | Sequence 1 🤖      |       |
| | 5 payeurs      | | 8 payeurs           |       |
| | Total: 2300€   | | Total: 4500€        |       |
| +----------------+ +---------------------+       |
| | ▼ Jean Dupont  | | ▼ Marie M.          |       |
| | 3 factures     | | 5 factures          |       |
| | #12345,12346,..| | #12347,...          |       |
| +----------------+ +---------------------+       |
| | ▼ Paul D.      | | ▼ Sophie B.         |       |
| | 2 factures     | | 3 factures          |       |
| +----------------+ +---------------------+       |
|                                                   |
| +------------+ +---------------------+          |
| | Sequence 2  | | [+ Nouvelle séquence]       |
| | 12 payeurs  |                                     |
| | Total: 6700€  |                                     |
| +------------+                                       |
| | ▼ Pierre L. |                                     |
| | 8 factures  |                                     |
| +------------+                                       |
|                                                   |
+---------------------------------------------------+
| Page 1 sur 5          [Précédent] [Suivant]        |
+---------------------------------------------------+
```

### 5. By Actor View (Complete Layout)
```
+---------------------------------------------------+
| Impayés                                      [🔍] |
| Gérez vos impayés ici.                           |
| [🔍 Rechercher... _____________________________]  |
|                                                   |
| [📋 Groupé par payeur] [📄 Vue Factures] [⚠️ À réparer] |
| [🔗 Vue Séquence] [👤 Vue par Acteur]            |
+---------------------------------------------------+
|                                                   |
| +-----------------------------------------------+ |
| | 👤 Jean Dupont                                | |
| | 📞 0612345678 | ✉️ jean@dupont.fr          | |
| | Total à régler: 3500 €                       | |
| +-----------------------------------------------+ |
| | 🔴 FACTURES À RÉGLER (3)                      | |
| | #12345 • 1500 € • 30j • [Impayé]              | |
| | #12346 • 2000 € • 15j • [Impayé]              | |
| +-----------------------------------------------+ |
| | 🟢 FACTURES APPORTÉES (2)                     | |
| | #12347 • 800 € • [Payé]                       | |
| | #12348 • 1000 € • [En attente]                | |
| +-----------------------------------------------+ |
| | [Ajouter séquence] [Voir tout]                | |
| +-----------------------------------------------+ |
|                                                   |
| +-----------------------------------------------+ |
| | 👤 Marie Martin                               | |
| | 📞 0612345679 | ✉️ marie@martin.fr         | |
| | Total à régler: 1800 €                       | |
| +-----------------------------------------------+ |
| | 🔴 FACTURES À RÉGLER (2)                      | |
| | #12349 • 1000 € • 28j • [Impayé]             | |
| | #12350 • 800 € • 10j • [Impayé]              | |
| +-----------------------------------------------+ |
| | 🟢 FACTURES APPORTÉES (1)                     | |
| | #12351 • 500 € • [Payé]                       | |
| +-----------------------------------------------+ |
| | [Ajouter séquence] [Voir tout]                | |
| +-----------------------------------------------+ |
|                                                   |
+---------------------------------------------------+
| Page 1 sur 5          [Précédent] [Suivant]        |
+---------------------------------------------------+
```

## Component Integration Guide

### How Components Fit Together

#### Grouped by Payer View
```
impayes-page-layout
├── impaye-search
├── view-mode-toggle
├── impaye-card-by-payeur (multiple)
│   ├── impaye-card-list (when expanded)
│   └── sequence-drawer (when needed)
└── pagination
```

#### Invoice List View
```
impayes-page-layout
├── impaye-search
├── view-mode-toggle
├── impaye-card-list (multiple in grid)
│   └── sequence-drawer (when needed)
└── pagination
```

#### Sequence View (Kanban)
```
impayes-page-layout
├── impaye-search
├── view-mode-toggle
├── sequence-column (multiple)
│   └── impaye-card-sequence (multiple, draggable)
│       └── invoice-list-compact (in dropdown)
└── pagination
```

#### By Actor View
```
impayes-page-layout
├── impaye-search
├── view-mode-toggle
├── actor-card (multiple)
│   ├── invoice-list-compact (à régler)
│   ├── invoice-list-compact (apportées)
│   └── sequence-drawer (when needed)
└── pagination
```

#### To Fix View
```
impayes-page-layout
├── impaye-search
├── view-mode-toggle
├── to-fix-card (multiple)
│   └── [Vérifier button → cloud function]
└── pagination
```

## Page Layout Mockups

### 1. Main Page Layout
```
+---------------------------------------------------+
| Impayés                                      [🔍] |
| Gérez vos impayés ici.                           |
| [_____________________________________________] |
|                                                   |
| [Groupé par payeur] [Vue Factures] [À réparer]   |
| [Vue Séquence] [Vue par Acteur]                   |
+---------------------------------------------------+
|                                                   |
| [Content Area - varies by view mode]              |
|                                                   |
+---------------------------------------------------+
| Page 1 sur 5          [Précédent] [Suivant]        |
+---------------------------------------------------+
```
**Note**: La page est composée de blocs dans un grid. La content area a overflow-y et x pour permettre le défilement.
=======
```
+---------------------------------------------------+
| Impayés                                      [🔍] |
| Gérez vos impayés ici.                           |
| [_____________________________________________] |
|                                                   |
| [Groupé par payeur] [Vue Factures] [À réparer]   |
| [Vue Séquence] [Vue par Acteur]                   |
+---------------------------------------------------+
|                                                   |
| [Content Area - varies by view mode]              |
|                                                   |
+---------------------------------------------------+
| Page 1 sur 5          [Précédent] [Suivant]        |
+---------------------------------------------------+
```
**Note**: La page est composée de blocs dans un grid. La content area a overflow-y et x pour permettre le défilement.

### 2. Grouped by Payer View
```
+---------------------------------------------------+
| ▼ Jean Dupont (5 factures) Total: 2500 €          |
|   Retard max: 45 jours                            |
+---------------------------------------------------+
|           // ici 2.1 si on ouvre                  |
|            [Ajouter séquence]                     |
+---------------------------------------------------+
```
**Note**: Section 2 simplified as it will display the 2.1 details drawer content.

### 2.1 Details Drawer (when Voir détails clicked)
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
**Note**: Section 2 simplified as it will display the 2.1 details drawer content.

### 3. To Fix View
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

### 4. Sequence View (Kanban)
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
**Note**: Automatic sequences (like "Sequence 1 🤖") have purple background and robot emoji

### 4.1 Sequence Card Details (when card is opened)
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

### 5. PDF Viewer
```
+---------------------------------------------------+
| 📄 Facture #12345 • PDF Viewer                   |
+---------------------------------------------------+
| [🔍 Zoom In] [🔍 Zoom Out] [📥 Download] [🖨️ Print] |
+---------------------------------------------------+
|                                                   |
| [PDF Content Display Area]                        |
|                                                   |
+---------------------------------------------------+
| [Fermer]                                          |
+---------------------------------------------------+
```

### 6. By Actor View
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
