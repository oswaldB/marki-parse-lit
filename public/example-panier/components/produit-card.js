import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

export class ProduitCard extends LitElement {
  static properties = {
    id: { type: Number },
    nom: { type: String },
    prix: { type: Number },
    image: { type: String }
  };

  static styles = css`
    .card {
      background-color: #f9fafb;
      border-radius: 0.5rem;
      padding: 1rem;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    
    .card:hover {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .emoji {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
    
    .nom {
      font-weight: 500;
      margin-bottom: 0.25rem;
      color: #1e293b;
    }
    
    .prix {
      color: #64748b;
      margin-bottom: 0.75rem;
    }
    
    button {
      width: 100%;
      background-color: #3b82f6;
      color: white;
      border: none;
      border-radius: 0.375rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    button:hover {
      background-color: #2563eb;
    }
  `;

  render() {
    return html`
      <div class="card">
        <div class="emoji">${this.image}</div>
        <h3 class="nom">${this.nom}</h3>
        <p class="prix">${this.prix} €</p>
        <button @click=${this.ajouterAuPanier}>
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