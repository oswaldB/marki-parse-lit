import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class ImpayesGroupedView extends LitElement {
    static properties = {
        group: { type: Object },
        index: { type: Number },
        selectedImpaye: { type: Object }
    };

    createRenderRoot() {
        return this;
    }

    constructor() {
        super();
        this.impayes = [];
        this.selectedImpaye = null;
    }

    render() {
        if (!this.group) {
            console.warn('Group is undefined in impayes-grouped-view', {
                group: this.group,
                index: this.index,
                selectedImpaye: this.selectedImpaye
            });
            return html`<div class="p-4 bg-red-100 text-red-800 rounded">Erreur: Groupe non défini</div>`;
        }
        
        return html`
            <div class="border border-gray-200 rounded-lg overflow-hidden">
                <div 
                    class="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                    @click="${() => this.dispatchEvent(new CustomEvent('toggle', { bubbles: true }))}"
                >
                    <div class="flex items-center space-x-3">
                        <svg class="h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <div>
                            <h3 class="font-medium text-gray-900">${this.group.payeur_nom}</h3>
                            <p class="text-sm text-gray-500">
                                ${this.group.factures.length} facture${this.group.factures.length > 1 ? 's' : ''} • 
                                ${this.formatCurrency(this.group.total)} • 
                                Retard max: 
                                <span 
                                    class="inline-block px-2 py-1 text-xs font-medium rounded-full ${this.getDelayClass(this.group.maxDelay)}"
                                >${this.group.maxDelay} jours</span>
                            </p>
                        </div>
                    </div>
                    <button 
                        class="text-gray-400 hover:text-gray-600"
                        @click="${(e) => this.dispatchEvent(new CustomEvent('toggle', { bubbles: true }))}"
                    >
                        <svg 
                            class="h-5 w-5 transform transition-transform ${this.group.expanded ? 'rotate-180' : ''}"
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                ${this.group.expanded ? html`
                    <div class="p-4">
                        <div class="space-y-3">
                            ${this.group.factures.map(facture => html`
                                <impaye-card 
                                    .facture="${facture}" 
                                    @view-details="${(e) => this.dispatchEvent(new CustomEvent('view-details', { detail: { facture: e.detail.facture }, bubbles: true }))}"
                                ></impaye-card>
                            `)}
                        </div>
                    </div>
                ` : ''}
            </div>
            
            ${this.selectedImpaye ? html`
                <impaye-details-drawer 
                    .impaye="${this.selectedImpaye}" 
                    @close="${() => this.dispatchEvent(new CustomEvent('close', { bubbles: true }))}"
                ></impaye-details-drawer>
            ` : ''}
        `;
    }

    getDelayClass(delay) {
        if (delay > 30) return 'bg-red-100 text-red-800';
        if (delay <= 30 && delay > 0) return 'bg-yellow-100 text-yellow-800';
        return 'bg-green-100 text-green-800';
    }

    calculateDaysOverdue(facture) {
        const today = new Date();
        const dueDate = new Date(facture.datepiece);
        const diffTime = Math.abs(today - dueDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    getDelayClass(delay) {
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

customElements.define('impayes-grouped-view', ImpayesGroupedView);
