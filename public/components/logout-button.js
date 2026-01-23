// logout-button.js - Composant Lit pour le bouton de déconnexion
// No shadow DOM, crée un bouton qui vide le storage et redirige vers /login

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

export class LogoutButton extends LitElement {
  createRenderRoot() {
    return this; // Désactive le shadow DOM
  }

  static styles = css`
    .logout-btn {
      background-color: var(--error-color, #F44336);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.3s ease;
      font-family: 'Inter', sans-serif;
    }
    
    .logout-btn:hover {
      background-color: var(--error-dark, #D32F2F);
    }
  `;

  constructor() {
    super();
  }

  logout() {
    // Supprimer le token de sessionStorage et localStorage
    sessionStorage.removeItem('parseSessionToken');
    sessionStorage.removeItem('parseUsername');
    localStorage.removeItem('parseSessionToken');
    localStorage.removeItem('parseUsername');
    
    // Rediriger vers la page de login
    window.location.href = '/login';
  }

  render() {
    return html`
      <button class="logout-btn" @click="${this.logout}">
        Se déconnecter
      </button>
    `;
  }
}

customElements.define('logout-button', LogoutButton);