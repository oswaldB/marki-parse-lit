import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class ImpayeCard extends LitElement {
    static properties = {
        facture: { type: Object }
    };

    createRenderRoot() {
        return this;
    }

    constructor() {
        super();
        this.facture = null;
    }

    render() {
        if (!this.facture) return html``;
        
        return html`
            <div class="facture-card border border-gray-100 rounded-lg p-3 hover:bg-gray-50">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <div class="flex items-center space-x-2">
                            <span class="font-medium text-blue-600">#${this.facture.nfacture}</span>
                            <span class="text-sm text-gray-500">${this.facture.reference}</span>
                            <span 
                                class="inline-block px-2 py-1 text-xs font-medium rounded-full ${this.facture.facturesoldee ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}"
                            >
                                ${this.facture.facturesoldee ? 'Payé' : 'Impayé'}
                            </span>
                        </div>
                        <div class="mt-1 text-sm text-gray-600">
                            <p>
                                ${this.formatDate(this.facture.datepiece)} • 
                                ${this.facture.adresse}, ${this.facture.codepostal} ${this.facture.ville}
                            </p>
                        </div>
                    </div>
                    <div class="ml-4 flex flex-col items-end">
                        <div class="font-medium text-gray-900">${this.formatCurrency(this.facture.resteapayer)}</div>
                        <div 
                            class="text-sm mt-1 px-2 py-1 rounded-full delay-badge ${this.getDelayClass(this.facture)}"
                        >
                            ${this.calculateDaysOverdue(this.facture) > 0 
                                ? this.calculateDaysOverdue(this.facture) + 'j de retard' 
                                : 'À jour'}
                        </div>
                        <button 
                            @click="${this.viewDetails}" 
                            class="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Voir détails
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    viewDetails() {
        this.dispatchEvent(new CustomEvent('view-details', {
            detail: { facture: this.facture },
            bubbles: true,
            composed: true
        }));
    }

    calculateDaysOverdue(facture) {
        const today = new Date();
        const dueDate = new Date(facture.datepiece);
        const diffTime = Math.abs(today - dueDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    getDelayClass(facture) {
        const delay = this.calculateDaysOverdue(facture);
        if (delay > 30) return 'bg-red-100 text-red-800';
        if (delay <= 30 && delay > 0) return 'bg-yellow-100 text-yellow-800';
        return 'bg-green-100 text-green-800';
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('fr-FR', { 
            style: 'currency', 
            currency: 'EUR' 
        }).format(amount);
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    }
}

customElements.define('impaye-card', ImpayeCard);
