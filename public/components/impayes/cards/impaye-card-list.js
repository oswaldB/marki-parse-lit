// impaye-card-list.js - Composant Lit pour afficher une carte d'impayé avec WebAwesome
import { LitElement, html, css } from 'https://unpkg.com/lit@2.0.0-rc.2/index.js?module';

export class ImpayeCardList extends LitElement {
  static properties = {
    invoice: { type: Object },
    showDetails: { type: Boolean }
  };

  constructor() {
    super();
    this.invoice = {
      nfacture: 12345,
      reference: 'DUP-2024-001',
      datepiece: new Date('2024-01-15'),
      totalttcnet: 1200,
      resteapayer: 1200,
      facturesoldee: false,
      payeur_nom: 'Jean Dupont',
      payeur_email: 'jean@dupont.fr',
      payeur_telephone: '0612345678'
    };
    this.showDetails = false;
  }

  static styles = css`
    :host {
      display: block;
      margin-bottom: 1rem;
    }

    .card {
      background-color: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: all 0.2s;
    }

    .card:hover {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .invoice-number {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1f2937;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .status-unpaid {
      background-color: #fef2f2;
      color: #ef4444;
    }

    .status-paid {
      background-color: #f0fdf4;
      color: #10b981;
    }

    .card-body {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .info-label {
      font-size: 0.875rem;
      color: #6b7280;
      min-width: 100px;
    }

    .info-value {
      font-size: 0.875rem;
      font-weight: 500;
      color: #1f2937;
    }

    .card-footer {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    button {
      padding: 0.5rem 1rem;
      background-color: #1d4ed8; /* blue-70 */
      color: white;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: background-color 0.2s;
    }

    button:hover {
      background-color: #1e40af; /* blue-80 */
    }

    button.secondary {
      background-color: #6b7280;
    }

    button.secondary:hover {
      background-color: #4b5563;
    }

    .wa-icon {
      font-size: 1rem;
      vertical-align: middle;
      margin-right: 0.25rem;
    }

    .amount {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
    }

    .delay {
      font-size: 0.875rem;
      font-weight: 500;
    }

    .delay-overdue {
      color: #ef4444;
    }

    .delay-soon {
      color: #f59e0b;
    }

    .delay-ok {
      color: #10b981;
    }
  `;

  render() {
    if (!this.invoice) {
      return html`<div class="card">Aucune facture sélectionnée</div>`;
    }

    const delayDays = this.calculateDelay();
    const delayClass = delayDays > 30 ? 'delay-overdue' : delayDays > 7 ? 'delay-soon' : 'delay-ok';
    const statusClass = this.invoice.facturesoldee ? 'status-paid' : 'status-unpaid';

    return html`
      <div class="card">
        <div class="card-header">
          <div class="invoice-number">
            <wa-icon name="file-invoice"></wa-icon>
            <span>Facture #${this.invoice.nfacture} • ${this.invoice.reference}</span>
          </div>
          <span class="status-badge ${statusClass}">
            ${this.invoice.facturesoldee ? 'Payé' : 'Impayé'}
          </span>
        </div>

        <div class="card-body">
          <div class="info-item">
            <span class="info-label">Date:</span>
            <span class="info-value">${this.formatDate(this.invoice.datepiece)}</span>
          </div>

          <div class="info-item">
            <span class="info-label">Montant:</span>
            <span class="info-value amount">${this.invoice.totalttcnet} €</span>
          </div>

          <div class="info-item">
            <span class="info-label">Reste:</span>
            <span class="info-value amount">${this.invoice.resteapayer} €</span>
          </div>

          <div class="info-item">
            <span class="info-label">Retard:</span>
            <span class="info-value delay ${delayClass}">
              ${delayDays} jours ${delayDays > 0 ? 'de retard' : ''}
            </span>
          </div>

          <div class="info-item">
            <span class="info-label">Payeur:</span>
            <span class="info-value">${this.invoice.payeur_nom}</span>
          </div>

          <div class="info-item">
            <span class="info-label">Email:</span>
            <span class="info-value">${this.invoice.payeur_email}</span>
          </div>
        </div>

        <div class="card-footer">
          <button @click="${this.viewDetails}">
            <wa-icon name="eye"></wa-icon>
            <span>Voir détails</span>
          </button>
          <button class="secondary" @click="${this.changeSequence}">
            <wa-icon name="link"></wa-icon>
            <span>Modifier séquence</span>
          </button>
          <button class="secondary" @click="${this.viewPdf}">
            <wa-icon name="file-pdf"></wa-icon>
            <span>Voir PDF</span>
          </button>
        </div>
      </div>
    `;
  }

  formatDate(date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    
    if (isNaN(date.getTime())) {
      return 'Date invalide';
    }
    
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  calculateDelay() {
    const today = new Date();
    let invoiceDate;
    
    if (typeof this.invoice.datepiece === 'string') {
      invoiceDate = new Date(this.invoice.datepiece);
    } else if (this.invoice.datepiece instanceof Date) {
      invoiceDate = this.invoice.datepiece;
    } else {
      return 'N/A';
    }
    
    if (isNaN(invoiceDate.getTime())) {
      return 'N/A';
    }
    
    const diffTime = Math.abs(today - invoiceDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  viewDetails() {
    this.showDetails = !this.showDetails;
    this.dispatchEvent(new CustomEvent('invoice-details-toggled', {
      detail: { invoice: this.invoice, showDetails: this.showDetails }
    }));
  }

  changeSequence() {
    this.dispatchEvent(new CustomEvent('change-sequence-requested', {
      detail: { invoice: this.invoice }
    }));
  }

  viewPdf() {
    this.dispatchEvent(new CustomEvent('view-pdf-requested', {
      detail: { invoiceId: this.invoice.objectId || this.invoice.nfacture }
    }));
  }
}

customElements.define('impaye-card-list', ImpayeCardList);