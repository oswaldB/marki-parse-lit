// check-login-redirect.js - Composant Lit pour rediriger les utilisateurs déjà connectés
// No shadow DOM, vérifie la présence du token Parse et redirige vers /dashboard si présent

import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

export class CheckLoginRedirect extends LitElement {
  createRenderRoot() {
    return this; // Désactive le shadow DOM
  }

  constructor() {
    super();
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    // Vérifier la présence du token dans sessionStorage ou localStorage
    const sessionToken = sessionStorage.getItem('parseSessionToken') || localStorage.getItem('parseSessionToken');
    
    // Si un token est trouvé, rediriger vers le dashboard
    if (sessionToken) {
      console.log('Utilisateur déjà connecté, redirection vers /dashboard');
      window.location.href = '/dashboard';
      return;
    }

    // Si aucun token, l'utilisateur reste sur la page de login
    console.log('Aucun token trouvé, affichage de la page de login');
  }

  render() {
    // Ce composant ne rend rien, il gère uniquement la logique de redirection
    return html``;
  }
}

customElements.define('check-login-redirect', CheckLoginRedirect);