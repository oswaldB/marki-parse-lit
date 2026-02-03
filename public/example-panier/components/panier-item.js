import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

export class PanierItem extends LitElement {
  static properties = {
    id: { type: Number },
    nom: { type: String },
    prix: { type: Number },
    quantite: { type: Number }
  };

  static styles = css`
    :host {
      display: block;
    }
    
    .item {
      padding: 0.75rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .item:last-child {
      border-bottom: none;
    }
    
    .info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .nom {
      font-weight: 500;
      color: #1e293b;
    }
    
    .quantite {
      color: #64748b;
      font-size: 0.875rem;
    }
    
    .prix {
      font-weight: 500;
      color: #1e293b;
    }
    
    .supprimer {
      background: none;
      border: none;
      color: #ef4444;
      cursor: pointer;
      font-size: 1.25rem;
      padding: 0.25rem;
      border-radius: 0.25rem;
      transition: background-color 0.2s;
    }
    
    .supprimer:hover {
      background-color: #fee2e2;
    }
  `;

  render() {
    return html`
      <div class="item">
        <div class="info">
          <span class="nom">${this.nom}</span>
          <span class="quantite">x${this.quantite}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <span class="prix">${(this.prix * this.quantite).toFixed(2)} €</span>
          <button class="supprimer" @click=${this.supprimerDuPanier}>✕</button>
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