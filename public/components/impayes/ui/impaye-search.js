// impaye-search.js - Composant Lit pour la recherche de factures avec WebAwesome
import { LitElement, html, css } from 'https://unpkg.com/lit@2.0.0-rc.2/index.js?module';

export class ImpayeSearch extends LitElement {
  static properties = {
    searchQuery: { type: String },
    placeholder: { type: String }
  };

  constructor() {
    super();
    this.searchQuery = '';
    this.placeholder = 'Rechercher...';
  }

  static styles = css`
    :host {
      display: block;
      margin-bottom: 1.5rem;
    }

    .search-container {
      position: relative;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 3rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      transition: all 0.2s;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .search-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #9ca3af;
      font-size: 1.25rem;
    }

    .clear-button {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      color: #9ca3af;
      font-size: 1rem;
      transition: color 0.2s;
      display: ${props => props.searchQuery ? 'block' : 'none'};
    }

    .clear-button:hover {
      color: #6b7280;
    }

    .wa-icon {
      font-size: 1rem;
      vertical-align: middle;
    }
  `;

  render() {
    return html`
      <div class="search-container">
        <wa-icon name="magnifying-glass" class="search-icon"></wa-icon>
        <input 
          class="search-input" 
          type="text" 
          .value="${this.searchQuery}" 
          placeholder="${this.placeholder}" 
          @input="${this.updateSearch}" 
          @keyup="${this.handleKeyUp}"
        >
        ${this.searchQuery ? html`
          <button class="clear-button" @click="${this.clearSearch}">
            <wa-icon name="xmark"></wa-icon>
          </button>
        ` : ''}
      </div>
    `;
  }

  updateSearch(e) {
    this.searchQuery = e.target.value;
    this.dispatchEvent(new CustomEvent('search-updated', {
      detail: { searchQuery: this.searchQuery }
    }));
  }

  clearSearch() {
    this.searchQuery = '';
    this.dispatchEvent(new CustomEvent('search-cleared', {
      detail: { searchQuery: this.searchQuery }
    }));
    
    const input = this.shadowRoot.querySelector('.search-input');
    if (input) {
      input.value = '';
    }
  }

  handleKeyUp(e) {
    if (e.key === 'Enter') {
      this.dispatchEvent(new CustomEvent('search-submitted', {
        detail: { searchQuery: this.searchQuery }
      }));
    }
  }
}

customElements.define('impaye-search', ImpayeSearch);