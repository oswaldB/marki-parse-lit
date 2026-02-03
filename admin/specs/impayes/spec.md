# Specification: Impayés Page

**Note**: Sequence information should be displayed on relevant screens. Components showing payers/invoices should indicate:
- Attached sequence name
- Automatic sequences marked with 🤖 emoji
- Different color for automatic sequences (e.g., purple background)
- Automatic sequence flag comes from the sequence pointer data

## Overview
This specification describes the requirements and design for the Impayés (Unpaid Invoices) page in the Marki application. The page allows users to view and manage unpaid invoices with two different view modes.

## Page Structure

### 1. App Layout Integration
The Impayés page uses the **app-layout** component for consistent navigation and structure across the application. This provides:
- **Navigation sidebar** with access to all application sections
- **Top navigation bar** with user profile and notifications
- **Breadcrumb navigation** showing current location
- **Responsive design** that adapts to different screen sizes

### 2. Header Section
- **Title**: "Impayés" (Unpaid Invoices)
- **Description**: "Gérez vos impayés ici." (Manage your unpaid invoices here)
- **Search Bar**: Full-width search input for filtering invoices

### 3. View Mode Toggle
Five view modes available:
- **Groupé par payeur** (Grouped by payer) - Default view
- **Vue Factures** (Invoice view) - List view
- **À réparer** (To fix) - Shows invoices missing email addresses
- **Vue Séquence** (Sequence view) - Kanban-style view grouped by sequence
- **Vue par Acteur** (By Actor view) - Shows two lists per actor: invoices to pay and brought-in invoices

### 4. Main Content Area

#### 4.1 Grouped by Payer View (Default)
- **Grouping**: Invoices are grouped by payer name
- **Group Header**: Shows:
  - Payer icon and name
  - Number of invoices in the group
  - Total amount due for the group
  - Maximum delay in days (color-coded: red >30 days, yellow ≤30 days)
  - Expand/collapse toggle

- **Group Content** (when expanded):
  - List of individual invoices for that payer
  - Each invoice shows:
    - Invoice number
    - Date
    - Delay status
    - Payment status (Paid/Unpaid)
    - Financial summary (HT, TTC, Remaining, Status)
    - Property information
    - View button

#### 4.2 Invoice List View
- **Layout**: Grid of invoice cards
- **Each Card Shows**:
  - Invoice number and reference
  - Payment status badge
  - List information
  - Date, address, and postal code
  - Delay status
  - Financial section (HT, TTC, Remaining, Status)
  - Stakeholders (Payer, Owner, Provider)
  - Action buttons (View details, Change list)

#### 4.3 To Fix View
- **Purpose**: Shows invoices that are missing email addresses or have provider issues
- **Filter**: Displays invoices where:
  - `payeur_email` is null or empty, OR
  - `apporteur_nom` is not empty but `apporteur_email` is missing
- **Layout**: Similar to list view but with prominent "Missing Email" indicators
- **Features**:
  - Highlight missing email fields with yellow background
  - Callout message: "Allez sur ADN, corrigez l'email du contact et cliquez sur le bouton Vérifier"
  - Vérifier button that calls cloud function to force PostgreSQL sync and run syncImpayes
  - Export option for missing email list (CSV format)

#### 4.4 Sequence View (Kanban)
- **Layout**: Horizontal kanban board
- **Columns**: Each column represents a sequence:
  - "Sans séquence" column first (for unassigned invoices)
  - Named sequences (e.g., Sequence 1, Sequence 2, etc.) in numerical order
- **Cards**: Cards represent payers, not individual invoices (les cartes ici sont par payeur pas par facture)
- **Features**:
  - Drag and drop to change sequence assignment
  - Visual progress indicators:
    - Color-coded sequence headers
    - Completion percentage for each sequence
    - Overdue indicators for late invoices
  - Sequence statistics (count, total amount, average delay)
  - Collapsible columns for better navigation
  - Quick sequence creation from column header menu
  - Dropdown in cards to see individual invoices (le dropdown permet de voir les factures en question)

#### 4.5 By Actor View
- **Layout**: Vertical actor-based organization
- **Structure**: For each actor, display two separate lists:
  - **Factures à régler**: Invoices where the actor is the payer (`payeur_nom`)
  - **Factures apportées**: Invoices where the actor is the provider (`apporteur_nom`)
- **Actor Card**: Shows:
  - Actor name and contact information
  - Two tabs or sections for the different invoice types
  - Statistics for each list (count, total amount)
  - Expand/collapse toggle for each section
- **Invoice Cards**: Compact display showing:
  - Invoice number and date
  - Amount and payment status
  - Delay indicator
  - Quick actions (view, change sequence)
- **Features**:
  - Clear visual distinction between "à régler" and "apportées" lists
  - Color coding: red/orange for "à régler", green/blue for "apportées"
  - Combined totals per actor
  - Filtering by actor type or name
  - Bulk actions per list type

### 5. Pagination
- **Controls**: Previous/Next buttons
- **Display**: Current page and total pages
- **Items per page**: 1000 (configurable)

## Data Requirements

### Invoice Object Structure
```javascript
{
  objectId: string,          // Unique identifier
  nfacture: number,          // Invoice number
  reference: string,         // Reference
  datepiece: Date,           // Invoice date
  adresse: string,           // Address
  codepostal: string,        // Postal code
  ville: string,             // City
  totalhtnet: number,        // Total HT
  totalttcnet: number,       // Total TTC
  resteapayer: number,       // Remaining to pay
  facturesoldee: boolean,    // Paid status
  statut_intitule: string,   // Status title
  liste: string,             // List
  sequence: Parse.Pointer,   // Sequence assignment (Parse pointer)
  sequence_is_automatic: boolean, // Automatic sequence flag
  sequence_name: string,     // Sequence display name
  numero: string,            // Dossier number
  
  // Stakeholders
  payeur_nom: string,        // Payer name
  payeur_email: string,      // Payer email
  payeur_telephone: string,  // Payer phone
  
  proprietaire_nom: string, // Owner name
  proprietaire_email: string,
  proprietaire_telephone: string,
  
  apporteur_nom: string,     // Provider name
  apporteur_email: string,
  apporteur_telephone: string
}
```

## Functional Requirements

### 1. Data Fetching
- Fetch all unpaid invoices from Parse server
- Filter: `resteapayer != 0` and `facturesoldee = false`
- Limit: 99999 records

### 2. Search Functionality
- Search across multiple fields:
  - Invoice number
  - Payer name
  - Payer email
  - Reference
  - Dossier number (numero)
- Normal case-sensitive search

### 3. Sorting
- **Grouped view**: Sort groups by total amount (descending)
- **List view**: Sort invoices by delay days (descending)

### 4. Calculations
- **Days overdue**: Calculate from invoice date to current date
- **Group totals**: Sum of remaining amounts for unique invoices per payer
- **Maximum delay**: Highest delay among invoices in a group

### 5. UI States
- **Loading**: Show loading indicator during data fetch
- **Empty state**: "Aucun impayé trouvé" (No unpaid invoices found)
- **Error handling**: Display error messages if data fetch fails


### Component Structure
**Architecture Decision**: Given the complexity and number of components, use a **state-based approach** rather than a global store. This provides better state management across multiple components and views.

**State Architecture**: We use Alpine.js state to manage all data and UI state directly on the page. Each component can have its own local state for component-specific interactions.

### Unified Invoice Information Component
**ImpayeInfoDisplay.astro** - A reusable component for displaying invoice information consistently across all views

**Location**: `src/components/pages/impayes/ImpayeInfoDisplay.astro`
**State**: `/public/js/components/pages/impayes/ImpayeInfoDisplayState.js`

**Features**:
- Standardized display of invoice data
- Consistent formatting for dates, amounts, and status
- Responsive layout that adapts to different view contexts
- Support for all invoice fields (number, date, amounts, stakeholders, etc.)
- Conditional display based on available data
- Integration with the style guide for consistent styling

**Usage**: This component will be used in all view modes to ensure consistent presentation of invoice information.

#### Alpine.js State Implementation
```javascript
{
  impayes: [],              // Raw invoice data
  searchQuery: '',          // Search text
  viewMode: 'byPayeur',     // Current view mode
  currentPage: 1,           // Current page
  itemsPerPage: 1000,       // Items per page
  isLoading: true,          // Loading state
  draggedImpaye: null,      // For drag and drop
  selectedImpaye: null,     // For detail view
  showPdfDrawer: false,     // PDF drawer state
  showSequenceDrawer: false,// Sequence drawer state
  
  // Computed properties
  impayesUnpaid: [],        // Filtered unpaid invoices
  filteredImpayes: [],      // Search-filtered invoices
  impayesByPayeur: {},      // Grouped by payer
  sortedImpayesByPayeur: {},// Sorted groups with totals
  paginatedImpayes: [],     // Paginated results
  totalPages: 0             // Total pages count
}
```

#### Astro Components
**Component Organization**: Each component has a path structure:
- Astro: `src/components/pages/impayes/ComponentName.astro`
- State: `/public/js/components/pages/impayes/ComponentNameState.js`

Based on the page structure, functionality, and ASCII screens, here are the updated components:
**Suggestion**: Move ASCII screens into their respective component documentation sections.

### View-Specific Components

#### 1. Grouped by Payer View
**ImpayeCardByPayeur.astro** (`src/components/pages/impayes/ImpayeCardByPayeur.astro`)
   - **Store Variables**: `sortedImpayesByPayeur`, `viewMode`
   - **Methods**: `calculateDaysOverdue()`, `viewImpaye()`
   - **State**: `ImpayeCardByPayeurState.js` - manages expand/collapse
   - Uses `ImpayeInfoDisplay` for consistent invoice presentation
   - Compact display for grouped by payer view

#### 2. Invoice List View
**ImpayeCardList.astro** (`src/components/pages/impayes/ImpayeCardList.astro`)
   - **Store Variables**: `filteredImpayes`, `viewMode`, `searchQuery`
   - **Methods**: `viewImpaye()`, `formatDate()`
   - **State**: `ImpayeCardListState.js` - handles local card interactions
   - Uses `ImpayeInfoDisplay` for consistent invoice presentation
   - Displays complete invoice details for list view

#### 3. To Fix View
**ToFixCard.astro** (`src/components/pages/impayes/ToFixCard.astro`)
   - **Store Variables**: `impayesToFix`, `viewMode`
   - **Methods**: `verifyEmail()` - calls cloud function
   - **State**: `ToFixCardState.js` - handles verification state
   - Uses `ImpayeInfoDisplay` with special highlighting for missing fields
   - Highlights missing email fields with yellow background
   - Callout message: "Allez sur ADN, corrigez l'email du contact et cliquez sur le bouton Vérifier"

#### 4. Sequence View (Kanban)
**ImpayeCardSequence.astro** (`src/components/pages/impayes/ImpayeCardSequence.astro`)
   - **Store Variables**: `impayesBySequence`, `draggedImpaye`
   - **Methods**: `startDrag()`, `onDrop()`, `allowDrop()`
   - **State**: `ImpayeCardSequenceState.js` - handles drag and drop state
   - Draggable card for kanban board with payer information
   - Uses `ImpayeInfoDisplay` for invoice details in dropdown

**SequenceColumn.astro** (`src/components/pages/impayes/SequenceColumn.astro`)
   - **Store Variables**: `impayesBySequence`, `viewMode`
   - **Methods**: `onDrop()`, `allowDrop()`
   - **State**: `SequenceColumnState.js` - manages column state
   - Header with sequence info and statistics, drop zone for payers

#### 5. By Actor View
**ActorCard.astro** (`src/components/pages/impayes/ActorCard.astro`)
   - **Store Variables**: `impayesByActor`, `viewMode`
   - **Methods**: `calculateActorTotals()`
   - **State**: `ActorCardState.js` - manages expand/collapse
   - Actor information with two invoice lists (à régler/apportées)
   - Uses `ImpayeInfoDisplay` for consistent invoice presentation in both lists

### Shared Components

6. **SequenceDrawer.astro** (`src/components/pages/impayes/SequenceDrawer.astro`)
   - **Store Variables**: `impayes`, `showSequenceDrawer`
   - **Methods**: `assignSequence()`, `createSequence()`
   - **State**: `SequenceDrawerState.js` - manages drawer state
   - Sequence selection interface with quick creation

7. **ImpayeSearch.astro** (`src/components/pages/impayes/ImpayeSearch.astro`)
   - **Store Variables**: `searchQuery`
   - **Methods**: `updateSearch()`
   - **State**: `ImpayeSearchState.js` - handles search input
   - Search input with real-time filtering

8. **ViewModeToggle.astro** (`src/components/pages/impayes/ViewModeToggle.astro`)
   - **Store Variables**: `viewMode`
   - **Methods**: `setViewMode()`
   - **State**: `ViewModeToggleState.js` - manages active state
   - Toggle buttons for different views with active indicators

9. **PdfViewerDrawer.astro** (`src/components/pages/impayes/PdfViewerDrawer.astro`)
    - **Store Variables**: `showPdfDrawer`, `currentInvoiceId`
    - **Methods**: `fetchPdf()`, `downloadPdf()`, `printPdf()`
    - **State**: `PdfViewerDrawerState.js` - manages PDF viewer state
    - Displays the PDF of the invoice in a resizable drawer with zoom, download, and print options

## User Flows

### 1. View Unpaid Invoices
1. User navigates to Impayés page
2. System fetches unpaid invoices from Parse
3. System displays grouped view by default
4. User can toggle between view modes
5. User can search for specific invoices
6. User can open a 50% width resizable drawer to view invoice PDF (retrieved via Parse SDK)

### 2. View Invoice Details
1. User clicks "Voir détails" (View details) button
2. System navigates to detailed invoice view
3. User can see complete invoice information

### 3. Change Sequence
1. User clicks "Ajouter à une séquence" or "Modifier la séquence" button
2. System shows sequence selection drawer with:
   - List of existing sequences
   - Quick sequence creation (name only)
   - Search/filter for sequences
3. User selects or creates a sequence
4. System updates the invoice sequence assignment
5. User can see the change reflected in the sequence view

### 4. View Invoice PDF
1. User clicks "Voir facture PDF" button in the invoice details drawer
2. System opens a PDF viewer drawer
3. System fetches the PDF from the server via Parse SDK
4. User can view the PDF with zoom in/out options
5. User can download or print the PDF if needed
6. User closes the PDF viewer drawer

## Design Guidelines
- utilise le styleguide.
  

## Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Stacked layout on small screens
- Horizontal layout on larger screens


## Performance Considerations
- Lazy loading for pagination
- Efficient data filtering and sorting
- Minimal DOM updates
- Debounce search input

## ASCII Screen Mockups

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
- **Functionality**: Allow users to view the PDF of an invoice.
- **Trigger**: Clicking on the "Voir facture PDF" button in the invoice details drawer.
- **Implementation**:
  - A drawer or modal will open to display the PDF.
  - The PDF is retrieved via a cloud function that fetches the invoice PDF from the server.
  - The PDF viewer should support zoom in/out, download, and print functionalities.
  - The drawer should be resizable and support full-screen mode.

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

## Notes de Conception

### Principes Clés
- **Simplicité**: Interface intuitive et directe
- **Consistance**: Respect des patterns établis
- **Feedback**: Retours visuels pour toutes les actions
- **Performance**: Chargement rapide et réactif

### Décisions de Conception
- **Drawers vs Modales**: Utilisation exclusive de drawers
- **Édition en ligne**: Modification directe des champs
- **Variables dynamiques**: Génération automatique de prompt
- **Tri automatique**: Actions toujours triées par délai


### Documentation Connexe
- `admin/styleguide.md`: Styleguide du projet
- Parse Server Documentation: SDK JavaScript
- Appel direct au serveur parse depuis le frontend.