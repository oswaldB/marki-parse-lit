// Utilisation du CDN de Lit pour éviter les problèmes d'importation
import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

export class Sidebar extends LitElement {
  createRenderRoot() {
    return this; // Désactive le shadow DOM
  }

  render() {
    return html`
      <div class="sidebar">
        <!-- Contenu de la sidebar -->
        <h2>Menu</h2>
        <ul>
          <li><a href="/">Accueil</a></li>
          <li><a href="/impayes">Impayés</a></li>
          <li><a href="/commissions-techs">Commissions techs</a></li>
          <li><a href="/admin">Admin</a></li>
        </ul>
      </div>
    `;
  }
}

if (!customElements.get('sidebar-component')) {
  customElements.define('sidebar-component', Sidebar);
}