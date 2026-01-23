import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

export class ListFilters extends LitElement {
  createRenderRoot() {
    return this; // Désactive le shadow DOM
  }

  render() {
    return html`
      <div x-show="list.is_auto" x-transition class="mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h2 class="text-xl font-bold mb-4">Filtres</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="minAmount" class="block text-sm font-medium text-gray-700">Montant minimum</label>
            <input type="number" id="minAmount" x-model="filters.minAmount" 
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
          </div>
          <div>
            <label for="maxAmount" class="block text-sm font-medium text-gray-700">Montant maximum</label>
            <input type="number" id="maxAmount" x-model="filters.maxAmount" 
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
          </div>
          <div>
            <label for="minDaysOverdue" class="block text-sm font-medium text-gray-700">Jours de retard minimum</label>
            <input type="number" id="minDaysOverdue" x-model="filters.minDaysOverdue" 
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
          </div>
          <div>
            <label for="maxDaysOverdue" class="block text-sm font-medium text-gray-700">Jours de retard maximum</label>
            <input type="number" id="maxDaysOverdue" x-model="filters.maxDaysOverdue" 
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('list-filters', ListFilters);
