import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class ImpayeDetailsDrawer extends LitElement {
    static properties = {
        impaye: { type: Object },
        showPdf: { type: Boolean }
    };

    createRenderRoot() {
        return this;
    }

    constructor() {
        super();
        this.impaye = null;
        this.showPdf = false;
    }

    render() {
        if (!this.impaye) return html``;
        
        return html`
            <div class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="${this.close}"></div>
            
            <div class="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex justify-between items-center">
                        <h2 class="text-xl font-bold text-gray-900">Détails de la facture</h2>
                    <button @click="${this.close}" class="text-gray-400 hover:text-gray-600">
                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div class="drawer-body">
                    <div class="space-y-4">
                        <div>
                            <h3 class="font-medium text-gray-900">Facture #${this.impaye.nfacture}</h3>
                            <p class="text-sm text-gray-500">${this.impaye.reference}</p>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-600">
                                    <span class="font-medium">Date:</span> 
                                    ${this.formatDate(this.impaye.datepiece)}
                                </p>
                                <p class="text-sm text-gray-600">
                                    <span class="font-medium">Adresse:</span> 
                                    ${this.impaye.adresse}, ${this.impaye.codepostal} ${this.impaye.ville}
                                </p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-600">
                                    <span class="font-medium">HT:</span> 
                                    ${this.formatCurrency(this.impaye.totalhtnet)}
                                </p>
                                <p class="text-sm text-gray-600">
                                    <span class="font-medium">TTC:</span> 
                                    ${this.formatCurrency(this.impaye.totalttcnet)}
                                </p>
                                <p class="text-sm text-gray-600">
                                    <span class="font-medium">Reste:</span> 
                                    ${this.formatCurrency(this.impaye.resteapayer)}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h4 class="font-medium text-gray-900 mb-2">Parties prenantes</h4>
                            <div class="space-y-2">
                                <div>
                                    <p class="text-sm font-medium text-gray-700">Payeur</p>
                                    <p class="text-sm text-gray-600">${this.impaye.payeur_nom}</p>
                                    <p class="text-sm text-gray-600">${this.impaye.payeur_email}</p>
                                    <p class="text-sm text-gray-600">${this.impaye.payeur_telephone}</p>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-700">Propriétaire</p>
                                    <p class="text-sm text-gray-600">${this.impaye.proprietaire_nom}</p>
                                    <p class="text-sm text-gray-600">${this.impaye.proprietaire_email}</p>
                                    <p class="text-sm text-gray-600">${this.impaye.proprietaire_telephone}</p>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-700">Fournisseur</p>
                                    <p class="text-sm text-gray-600">${this.impaye.apporteur_nom}</p>
                                    <p class="text-sm text-gray-600">${this.impaye.apporteur_email}</p>
                                    <p class="text-sm text-gray-600">${this.impaye.apporteur_telephone}</p>
                                </div>
                            </div>
                        </div>

                        <div class="flex space-x-2">
                            <button 
                                @click="${this.viewPdf}" 
                                class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                            >
                                Voir PDF
                            </button>
                            <button 
                                @click="${this.changeSequence}" 
                                class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Modifier séquence
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            ${this.showPdf ? html`
                <div class="pdf-viewer">
                    <div class="pdf-content">
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-xl font-bold text-gray-900">Visualisateur PDF</h2>
                            <button @click="${() => this.showPdf = false}" class="text-gray-400 hover:text-gray-600">
                                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div class="bg-gray-100 rounded-lg overflow-hidden" style="height: 70vh;">
                            <iframe 
                                src="${this.getPdfUrl()}" 
                                class="w-full h-full border-none"
                                frameborder="0"
                            ></iframe>
                        </div>
                    </div>
                </div>
            ` : ''}
        `;
    }

    close() {
        this.dispatchEvent(new CustomEvent('close', {
            bubbles: true,
            composed: true
        }));
    }

    viewPdf() {
        this.showPdf = true;
    }

    changeSequence() {
        // TODO: Implement sequence change logic
        console.log('Change sequence for:', this.impaye);
    }

    getPdfUrl() {
        // TODO: Implement actual PDF URL generation
        return '';
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

customElements.define('impaye-details-drawer', ImpayeDetailsDrawer);
