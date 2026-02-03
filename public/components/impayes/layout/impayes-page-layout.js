// impayes-page-layout.js - Composant Lit pour la mise en page principale de la page Impayés
import { LitElement, html, css } from 'https://unpkg.com/lit@2.0.0-rc.2/index.js?module';

export class ImpayesPageLayout extends LitElement {
  static properties = {
    title: { type: String },
    description: { type: String },
    currentView: { type: String },
    invoices: { type: Array },
    loading: { type: Boolean },
    error: { type: String }
  };

  constructor() {
    super();
    this.title = 'Impayés';
    this.description = 'Gérez vos impayés ici.';
    this.currentView = 'grouped-by-payer';
    this.invoices = [];
    this.loading = false;
    this.error = '';
    this.searchQuery = '';
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    .page-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      max-width: 1400px;
      margin: 0 auto;
      padding: 1.5rem;
    }

    .page-header {
      margin-bottom: 2rem;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .page-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: #1f2937;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .page-description {
      font-size: 0.875rem;
      color: #6b7280;
      margin-bottom: 1.5rem;
    }

    .search-container {
      margin-bottom: 1.5rem;
    }

    .view-toggle-container {
      margin-bottom: 1.5rem;
    }

    .content-area {
      flex: 1;
      overflow-y: auto;
      padding: 1rem 0;
    }

    .pagination-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #e5e7eb;
    }

    .page-info {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .pagination-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .pagination-button {
      padding: 0.5rem 1rem;
      background-color: #f3f4f6;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      color: #6b7280;
      transition: all 0.2s;
    }

    .pagination-button:hover:not(:disabled) {
      background-color: #e5e7eb;
    }

    .pagination-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .pagination-button.active {
      background-color: #1d4ed8; /* blue-70 */
      color: white;
    }

    .wa-icon {
      font-size: 1rem;
      vertical-align: middle;
      margin-right: 0.25rem;
    }

    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.8);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 100;
    }

    .loading-overlay.visible {
      display: flex;
    }

    .spinner {
      width: 2.5rem;
      height: 2.5rem;
      border: 4px solid #f3f4f6;
      border-top: 4px solid #1d4ed8; /* blue-70 */
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error-message {
      color: #ef4444;
      background-color: #fef2f2;
      padding: 1rem;
      border-radius: 0.375rem;
      margin: 1rem 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .grid-layout {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }

    .kanban-layout {
      display: flex;
      gap: 1rem;
      overflow-x: auto;
      padding-bottom: 1rem;
    }

    /* Blue-70 Color Scheme */
    .btn-primary {
      background-color: #1d4ed8; /* blue-70 */
      color: white;
    }

    .btn-primary:hover {
      background-color: #1e40af; /* blue-80 */
    }

    .bg-blue-70 {
      background-color: #1d4ed8;
    }

    .text-blue-70 {
      color: #1d4ed8;
    }

    .border-blue-70 {
      border-color: #1d4ed8;
    }
  `;

  render() {
    return html`
      <div class="page-container">
        <div class="page-header">
          <div class="header-content">
            <h1 class="page-title">
              <wa-icon name="file-invoice" class="text-blue-70"></wa-icon>
              <span>${this.title}</span>
            </h1>
          </div>
          <p class="page-description">${this.description}</p>

          <div class="search-container">
            <impaye-search 
              .searchQuery="${this.searchQuery}" 
              @search-updated="${this.handleSearch}"
            ></impaye-search>
          </div>

          <div class="view-toggle-container">
            <view-mode-toggle 
              .currentMode="${this.currentView}" 
              @view-mode-changed="${this.handleViewModeChange}"
            ></view-mode-toggle>
          </div>
        </div>

        ${this.error ? html`
          <div class="error-message">
            <wa-icon name="circle-exclamation" style="color: #ef4444;"></wa-icon>
            <span>${this.error}</span>
          </div>
        ` : ''}

        <div class="content-area">
          ${this.renderContent()}
        </div>

        <div class="pagination-container">
          <div class="page-info">Page 1 sur 5</div>
          <div class="pagination-buttons">
            <button class="pagination-button" disabled>
              <wa-icon name="chevron-left"></wa-icon>
              <span>Précédent</span>
            </button>
            <button class="pagination-button pagination-button active">
              <span>Suivant</span>
              <wa-icon name="chevron-right"></wa-icon>
            </button>
          </div>
        </div>

        <div class="loading-overlay ${this.loading ? 'visible' : ''}">
          <div class="spinner"></div>
        </div>
      </div>
    `;
  }

  renderContent() {
    switch (this.currentView) {
      case 'grouped-by-payer':
        return this.renderGroupedByPayer();
      case 'invoice-list':
        return this.renderInvoiceList();
      case 'to-fix':
        return this.renderToFix();
      case 'sequence':
        return this.renderSequence();
      case 'by-actor':
        return this.renderByActor();
      default:
        return this.renderGroupedByPayer();
    }
  }

  renderGroupedByPayer() {
    const groupedByPayer = this.groupInvoicesByPayer(this.invoices);
    
    if (Object.keys(groupedByPayer).length === 0) {
      return html`<empty-state visible message="Aucun impayé trouvé"></empty-state>`;
    }
    
    return html`
      <div class="grid-layout">
        ${Object.entries(groupedByPayer).map(([payerName, invoices]) => html`
          <impaye-card-by-payeur 
            .payer="${{ nom: payerName, telephone: '0612345678', email: 'contact@example.com' }}" 
            .invoices="${invoices}"
          ></impaye-card-by-payeur>
        `)}
      </div>
    `;
  }

  renderInvoiceList() {
    if (this.invoices.length === 0) {
      return html`<empty-state visible message="Aucune facture trouvée"></empty-state>`;
    }
    
    return html`
      <div class="grid-layout">
        ${this.invoices.map(invoice => html`
          <impaye-card-list .invoice="${invoice}"></impaye-card-list>
        `)}
      </div>
    `;
  }

  renderToFix() {
    const toFixInvoices = this.invoices.filter(invoice => 
      invoice.payeur_email === 'MANQUANT' || 
      invoice.apporteur_email === 'MANQUANT'
    );
    
    if (toFixInvoices.length === 0) {
      return html`<empty-state visible message="Aucune facture à réparer" icon="check-circle"></empty-state>`;
    }
    
    return html`
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <h3 style="font-size: 1.125rem; font-weight: 600; color: #1f2937;">
            <wa-icon name="triangle-exclamation" style="color: #f59e0b;"></wa-icon>
            <span>${toFixInvoices.length} factures à réparer</span>
          </h3>
          <button class="btn-primary" style="padding: 0.5rem 1rem; border: none; border-radius: 0.375rem; cursor: pointer;">
            <wa-icon name="download"></wa-icon>
            <span>Exporter la liste</span>
          </button>
        </div>
        
        <div class="grid-layout">
          ${toFixInvoices.map(invoice => html`
            <to-fix-card 
              .invoice="${invoice}" 
              .missingFields="${invoice.payeur_email === 'MANQUANT' ? ['payeur_email'] : ['apporteur_email']}"
            ></to-fix-card>
          `)}
        </div>
      </div>
    `;
  }

  renderSequence() {
    const sequences = [
      { id: 'none', nom: 'Sans séquence', isAutomatic: false, payeurs: [] },
      { id: 'seq1', nom: 'Sequence 1', isAutomatic: true, payeurs: [] },
      { id: 'seq2', nom: 'Sequence 2', isAutomatic: false, payeurs: [] }
    ];
    
    const groupedBySequence = this.groupInvoicesBySequence(this.invoices);
    
    return html`
      <div class="kanban-layout">
        ${sequences.map(sequence => html`
          <sequence-column 
            .sequence="${sequence}" 
            .payeurs="${groupedBySequence[sequence.id] || []}"
          ></sequence-column>
        `)}
      </div>
    `;
  }

  renderByActor() {
    const groupedByActor = this.groupInvoicesByActor(this.invoices);
    
    if (Object.keys(groupedByActor).length === 0) {
      return html`<empty-state visible message="Aucun acteur trouvé"></empty-state>`;
    }
    
    return html`
      <div class="grid-layout">
        ${Object.entries(groupedByActor).map(([actorName, actorData]) => html`
          <actor-card 
            .actor="${{ nom: actorName, telephone: '0612345678', email: 'contact@example.com' }}" 
            .invoicesToPay="${actorData.toPay}" 
            .broughtInInvoices="${actorData.broughtIn}"
          ></actor-card>
        `)}
      </div>
    `;
  }

  groupInvoicesByPayer(invoices) {
    const result = {};
    invoices.forEach(invoice => {
      const payerName = invoice.payeur_nom || 'Inconnu';
      if (!result[payerName]) {
        result[payerName] = [];
      }
      result[payerName].push(invoice);
    });
    return result;
  }

  groupInvoicesBySequence(invoices) {
    const result = {
      'none': [],
      'seq1': [],
      'seq2': []
    };
    
    invoices.forEach(invoice => {
      const sequenceId = invoice.sequenceId || 'none';
      if (!result[sequenceId]) {
        result[sequenceId] = [];
      }
      result[sequenceId].push({
        nom: invoice.payeur_nom,
        invoiceCount: 1,
        invoices: [invoice]
      });
    });
    
    return result;
  }

  groupInvoicesByActor(invoices) {
    const result = {};
    invoices.forEach(invoice => {
      const actorName = invoice.payeur_nom || 'Inconnu';
      if (!result[actorName]) {
        result[actorName] = { toPay: [], broughtIn: [] };
      }
      
      if (invoice.facturesoldee) {
        result[actorName].broughtIn.push(invoice);
      } else {
        result[actorName].toPay.push(invoice);
      }
    });
    return result;
  }

  handleSearch(e) {
    this.searchQuery = e.detail.searchQuery;
    this.dispatchEvent(new CustomEvent('search-invoices', {
      detail: { searchQuery: this.searchQuery }
    }));
  }

  handleViewModeChange(e) {
    this.currentView = e.detail.currentMode;
    this.dispatchEvent(new CustomEvent('view-mode-changed', {
      detail: { currentView: this.currentView }
    }));
  }
}

customElements.define('impayes-page-layout', ImpayesPageLayout);