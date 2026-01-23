// impaye-card-by-payeur.js - Composant Lit-HTML pour la carte d'impayé en vue par payeur
import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

export class ImpayeCardByPayeur extends LitElement {
  createRenderRoot() {
    return this; // Désactive le shadow DOM pour une intégration facile avec Alpine.js
  }

  render() {
    return html`
      <div class="bg-gray-50 rounded-lg p-3 border border-gray-200">
        <div class="flex justify-between items-start mb-2">
          <div>
            <h4 class="text-lg font-bold flex items-center">
              <svg class="h-4 w-4 mr-2 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <span>Facture #<span x-text="impaye.nfacture"></span></span>
            </h4>
            <div class="flex items-center space-x-3">
              <p class="text-sm text-gray-500 flex items-center">
                <svg class="h-3 w-3 mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 12.75h.008v.008H12v-.008z" />
                </svg>
                <span x-text="formatDate(impaye.datepiece)"></span>
              </p>
              <template x-if="!impaye.facturesoldee">
                <p class="text-sm flex items-center" :class="calculateDaysOverdue(impaye) > 30 ? 'text-red-500' : 'text-yellow-500'">
                  <svg class="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span x-text="calculateDaysOverdue(impaye) + ' jours de retard'"></span>
                </p>
              </template>
            </div>
          </div>
          <span class="px-2 py-1 text-xs rounded-full flex items-center" 
                :class="impaye.facturesoldee ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
            <svg class="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span x-text="impaye.facturesoldee ? 'Payé' : 'Impayé'"></span>
          </span>
        </div>
        
        <!-- Section financière compacte pour la vue par payeur -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
          <div class="text-center">
            <p class="text-xs text-gray-600">Total HT</p>
            <p class="font-bold text-sm"><span x-text="impaye.totalhtnet"></span> €</p>
          </div>
          <div class="text-center">
            <p class="text-xs text-gray-600">Total TTC</p>
            <p class="font-bold text-sm"><span x-text="impaye.totalttcnet"></span> €</p>
          </div>
          <div class="text-center">
            <p class="text-xs text-gray-600">Reste à payer</p>
            <p class="font-bold text-sm" :class="impaye.resteapayer > 0 ? 'text-red-600' : 'text-green-600'">
              <span x-text="impaye.resteapayer"></span> €
            </p>
          </div>
          <div class="text-center">
            <p class="text-xs text-gray-600">Statut</p>
            <p class="font-bold text-sm" x-text="impaye.statut_intitule || 'N/A'"></p>
          </div>
        </div>
        
        <!-- Informations sur le bien -->
        <div class="mt-3 p-2 bg-white rounded-lg border border-gray-100">
          <h5 class="font-semibold text-sm mb-2 flex items-center">
            <svg class="h-4 w-4 mr-1 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9.75h1.5m18 0h-18M2.25 6.75h1.5m18 0h-18m-10.5 10.5h.75m.75.75h.75m.75.75h.75m.75.75h.75m.75.75h.75m.75.75h.75m.75.75h.75m.75.75h.75" />
            </svg>
            Informations sur le bien
          </h5>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div class="flex items-center">
              <svg class="h-4 w-4 mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span class="font-medium">Adresse:</span>
              <span x-text="impaye.adresse || 'N/A'"></span>
            </div>
            <div class="flex items-center">
              <svg class="h-4 w-4 mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 6.75V8.25M4.5 6.75V8.25M6 6.75V8.25M18 6.75V8.25M19.5 6.75V8.25M21 6.75V8.25M3 18.75V20.25M4.5 18.75V20.25M6 18.75V20.25M18 18.75V20.25M19.5 18.75V20.25M21 18.75V20.25M12 12a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
              <span class="font-medium">Localisation:</span>
              <span x-text="(impaye.codepostal || '') + ' ' + (impaye.ville || '')"></span>
            </div>
            <div class="flex items-center">
              <svg class="h-4 w-4 mr-1 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75l.75-.75h18l.75.75M12 21a9 9 0 110-18 9 9 0 010 18z" />
              </svg>
              <span class="font-medium">Propriétaire:</span>
              <span x-text="impaye.proprietaire_nom || 'N/A'"></span>
            </div>
            <div class="flex items-center">
              <svg class="h-4 w-4 mr-1 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3.75h9m-9 3.75h9m-9-3.75h9m-9 3.75h9" />
              </svg>
              <span class="font-medium">Référence:</span>
              <span x-text="impaye.reference || 'N/A'"></span>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end">
          <button @click="viewImpaye(impaye.objectId)" class="text-blue-500 hover:underline text-sm">Voir</button>
        </div>
      </div>
    `;
  }
}

customElements.define('impaye-card-by-payeur', ImpayeCardByPayeur);