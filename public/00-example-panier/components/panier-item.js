import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

export class PanierItem extends LitElement {
  static properties = {
    id: { type: Number },
    nom: { type: String },
    prix: { type: Number },
    quantite: { type: Number }
  };
  
  createRenderRoot() {
    return this;
  }

  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`
      <div class="py-3 flex justify-between items-center border-b border-gray-200 last:border-b-0">
        <div class="flex items-center gap-2">
          <span class="font-medium text-gray-800">${this.nom}</span>
          <span class="text-sm text-gray-500">x${this.quantite}</span>
        </div>
        <div class="flex items-center gap-4">
          <span class="font-medium text-gray-800">${(this.prix * this.quantite).toFixed(2)} €</span>
          <button class="text-red-500 hover:bg-red-50 p-1 rounded transition" @click=${this.supprimerDuPanier}>✕</button>
        </div>
      </div>
    `;
  }

  supprimerDuPanier() {
    this.dispatchEvent(new CustomEvent('supprimer-du-panier', {
      detail: { id: this.id },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('panier-item', PanierItem);