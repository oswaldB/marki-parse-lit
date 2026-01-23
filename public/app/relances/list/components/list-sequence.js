import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

export class ListSequence extends LitElement {
  createRenderRoot() {
    return this; // Désactive le shadow DOM
  }

  render() {
    return html`
      <div class="mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h2 class="text-xl font-bold mb-4">Création de séquence</h2>
        <div class="space-y-4">
          <div>
            <label for="sequenceName" class="block text-sm font-medium text-gray-700">Nom de la séquence</label>
            <input type="text" id="sequenceName" x-model="sequenceName" 
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
          </div>
          <div>
            <label for="sequenceType" class="block text-sm font-medium text-gray-700">Type de séquence</label>
            <select id="sequenceType" x-model="sequenceType" 
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="both">Email et SMS</option>
            </select>
          </div>
          <div>
            <label for="sequenceDelay" class="block text-sm font-medium text-gray-700">Délai entre les étapes (en jours)</label>
            <input type="number" id="sequenceDelay" x-model="sequenceDelay" 
                   class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Étapes de la séquence</label>
            <div class="space-y-2">
              <template x-for="(step, index) in sequenceSteps" :key="index">
                <div class="flex space-x-2">
                  <input type="text" x-model="step.subject" placeholder="Sujet" 
                         class="block w-1/3 border border-gray-300 rounded-md shadow-sm p-2">
                  <textarea x-model="step.message" placeholder="Message" 
                            class="block w-2/3 border border-gray-300 rounded-md shadow-sm p-2"></textarea>
                  <button @click="removeStep(index)" class="text-red-500 hover:underline">Retirer</button>
                </div>
              </template>
              <button @click="addStep()" class="text-blue-500 hover:underline">Ajouter une étape</button>
            </div>
          </div>
          <button @click="createSequence()" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Créer la séquence
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('list-sequence', ListSequence);
