// impaye-card-list.js - Composant Lit-HTML pour la carte d'impayé en vue liste
import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

export class ImpayeCardList extends LitElement {
  createRenderRoot() {
    return this; // Désactive le shadow DOM pour une intégration facile avec Alpine.js
  }

  render() {
    return html`
      <div class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <!-- En-tête -->
        <div class="border-b border-gray-200 p-4">
          <div class="flex justify-between items-center mb-2">
            <div class="flex items-center space-x-4">
              <div class="flex items-center">
                <svg class="h-5 w-5 mr-2 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                <span class="font-bold">Facture #<span x-text="impaye.nfacture"></span></span>
              </div>
              <div class="flex items-center">
                <svg class="h-4 w-4 mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75l.75-.75h18l.75.75M12 21a9 9 0 110-18 9 9 0 010 18z" />
                </svg>
                <span class="text-sm text-gray-600">Dossier: <span x-text="impaye.reference || 'N/A'"></span></span>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span class="px-2 py-1 text-xs rounded-full flex items-center" 
                    :class="impaye.facturesoldee ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                <svg class="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span x-text="impaye.facturesoldee ? 'Payé' : 'Impayé'"></span>
              </span>
              <span class="text-sm text-gray-600">Liste: <span x-text="impaye.liste || 'N/A'"></span></span>

            </div>
          </div>
          
          <!-- Ligne supplémentaire pour la date, l'adresse et la date d'intervention -->
          <div class="flex justify-between items-center">
            <div class="flex items-center space-x-4">
              <div class="flex items-center">
                <svg class="h-4 w-4 mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 12.75h.008v.008H12v-.008z" />
                </svg>
                <span class="text-sm text-gray-600" x-text="formatDate(impaye.datepiece)"></span>
              </div>
              <div class="flex items-center">
                <svg class="h-4 w-4 mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span class="text-sm text-gray-600" x-text="impaye.adresse || 'N/A'"></span>
              </div>
              <div class="flex items-center">
                <svg class="h-4 w-4 mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 6.75V8.25M4.5 6.75V8.25M6 6.75V8.25M18 6.75V8.25M19.5 6.75V8.25M21 6.75V8.25M3 18.75V20.25M4.5 18.75V20.25M6 18.75V20.25M18 18.75V20.25M19.5 18.75V20.25M21 18.75V20.25M12 12a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
                <span class="text-sm text-gray-600" x-text="impaye.codepostal || ''"></span>
                <span class="text-sm text-gray-600" x-text="impaye.ville || ''"></span>
              </div>
            </div>
            <div class="flex items-center">
              <svg class="h-4 w-4 mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm" :class="calculateDaysOverdue(impaye) > 30 ? 'text-red-500' : 'text-yellow-500'" 
                    x-text="calculateDaysOverdue(impaye) + ' jours de retard'"></span>
            </div>
          </div>
        </div>
        
        <!-- Section financière -->
        <div class="p-4 border-b border-gray-200">
          <div class="grid grid-cols-4 gap-4">
            <div class="text-center">
              <p class="text-xs text-gray-600 mb-1">Total HT</p>
              <p class="font-bold" :class="impaye.totalhtnet > 0 ? 'text-red-600' : 'text-gray-800'">
                <span x-text="impaye.totalhtnet"></span> €
              </p>
            </div>
            <div class="text-center">
              <p class="text-xs text-gray-600 mb-1">Total TTC</p>
              <p class="font-bold text-gray-800">
                <span x-text="impaye.totalttcnet"></span> €
              </p>
            </div>
            <div class="text-center">
              <p class="text-xs text-gray-600 mb-1">Reste à payer</p>
              <p class="font-bold" :class="impaye.resteapayer > 0 ? 'text-red-600' : 'text-green-600'">
                <span x-text="impaye.resteapayer"></span> €
              </p>
            </div>
            <div class="text-center">
              <p class="text-xs text-gray-600 mb-1">Statut</p>
              <p class="font-bold text-gray-800" x-text="impaye.statut_intitule || 'N/A'"></p>
            </div>
          </div>
        </div>
        
        <!-- Parties prenantes -->
        <div class="p-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Payeur -->
            <div class="text-center">
              <div class="flex justify-center mb-2">
                <svg class="h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 class="font-bold text-sm mb-1">Payeur</h4>
              <p class="text-sm font-semibold" x-text="impaye.payeur_nom || 'N/A'"></p>
              <p class="text-xs text-gray-500" x-text="impaye.payeur_email || 'N/A'"></p>
              <p class="text-xs text-gray-500" x-text="impaye.payeur_telephone || 'N/A'"></p>
            </div>
            
            <!-- Propriétaire -->
            <div class="text-center">
              <div class="flex justify-center mb-2">
                <svg class="h-6 w-6 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h4 class="font-bold text-sm mb-1">Propriétaire</h4>
              <p class="text-sm font-semibold" x-text="impaye.proprietaire_nom || 'N/A'"></p>
              <p class="text-xs text-gray-500" x-text="impaye.proprietaire_email || 'N/A'"></p>
              <p class="text-xs text-gray-500" x-text="impaye.proprietaire_telephone || 'N/A'"></p>
            </div>
            
            <!-- Apporteur -->
            <div class="text-center">
              <div class="flex justify-center mb-2">
                <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75l.75-.75h18l.75.75M12 21a9 9 0 110-18 9 9 0 010 18z" />
                </svg>
              </div>
              <h4 class="font-bold text-sm mb-1">Apporteur</h4>
              <p class="text-sm font-semibold" x-text="impaye.apporteur_nom || 'N/A'"></p>
              <p class="text-xs text-gray-500" x-text="impaye.apporteur_email || 'N/A'"></p>
              <p class="text-xs text-gray-500" x-text="impaye.apporteur_telephone || 'N/A'"></p>
            </div>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="p-4 border-t border-gray-200 bg-gray-50">
          <div class="flex justify-end space-x-3">
            <button @click="viewImpaye(impaye.objectId)" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Voir détails
            </button>
            <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
              Changer de liste
            </button>

          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('impaye-card-list', ImpayeCardList);