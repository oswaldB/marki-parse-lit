import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

export class ListImpayes extends LitElement {
  createRenderRoot() {
    return this; // Désactive le shadow DOM
  }

  render() {
    return html`
      <div class="mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h2 class="text-xl font-bold mb-4">Impayés de cette liste</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr>
                <th class="py-2 px-4 border-b text-left">Payeur</th>
                <th class="py-2 px-4 border-b text-left">Facture</th>
                <th class="py-2 px-4 border-b text-left">Montant restant</th>
                <th class="py-2 px-4 border-b text-left">Jours de retard</th>
                <th class="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <template x-if="filteredImpayes.length === 0">
                <tr>
                  <td colspan="5" class="py-4 px-4 text-center text-gray-500">
                    Aucun impayé trouvé dans cette liste.
                  </td>
                </tr>
              </template>
              <template x-for="impaye in filteredImpayes" :key="impaye.objectId">
                <tr>
                  <td class="py-2 px-4 border-b" x-text="impaye.payeur_nom"></td>
                  <td class="py-2 px-4 border-b" x-text="impaye.nfacture"></td>
                  <td class="py-2 px-4 border-b" x-text="impaye.resteapayer + ' €'"></td>
                  <td class="py-2 px-4 border-b" x-text="calculateDaysOverdue(impaye)"></td>
                  <td class="py-2 px-4 border-b">
                    <button @click="removeFromList(impaye.objectId)" class="text-red-500 hover:underline">Retirer</button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

customElements.define('list-impayes', ListImpayes);
