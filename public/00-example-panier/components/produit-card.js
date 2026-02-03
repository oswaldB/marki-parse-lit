import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

export class ProduitCard extends LitElement {
  static properties = {
    id: { type: Number },
    nom: { type: String },
    prix: { type: Number },
    image: { type: String }
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
      <div class="bg-gray-50 rounded-lg p-4 transition hover:shadow-md cursor-pointer">
        <div class="text-4xl mb-2">${this.image}</div>
        <h3 class="font-medium mb-1 text-gray-800">${this.nom}</h3>
        <p class="text-gray-500 mb-3">${this.prix} €</p>
        <button class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition" @click=${this.ajouterAuPanier}>
          Ajouter au panier
        </button>
      </div>
    `;
  }

  ajouterAuPanier() {
    this.dispatchEvent(new CustomEvent('ajout-panier', {
      detail: {
        id: this.id,
        nom: this.nom,
        prix: this.prix,
        image: this.image
      },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('produit-card', ProduitCard);