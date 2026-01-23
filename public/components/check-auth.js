// check-auth.js - Composant Lit pour vérifier l'authentification
// No shadow DOM, vérifie la présence du token Parse dans sessionStorage ou localStorage
// Redirige vers /login?url_redirect=chemin_actuel si le token est absent

import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

export class CheckAuth extends LitElement {
  createRenderRoot() {
    return this; // Désactive le shadow DOM
  }

  constructor() {
    super();
    this.checkAuthentication();
  }

  checkAuthentication() {
    // Vérifier la présence du token dans sessionStorage ou localStorage
    const sessionToken = sessionStorage.getItem('parseSessionToken') || localStorage.getItem('parseSessionToken');
    
    // Si aucun token n'est trouvé, rediriger vers la page de login
    if (!sessionToken) {
      // Récupérer l'URL actuelle pour la redirection
      const currentPath = window.location.pathname;
      const redirectUrl = encodeURIComponent(currentPath);
      
      // Rediriger vers la page de login avec l'URL de redirection
      window.location.href = `/login?url_redirect=${redirectUrl}`;
      return;
    }

    // Si le token existe, le composant ne fait rien (l'utilisateur est authentifié)
    console.log('Utilisateur authentifié avec token:', sessionToken);
  }

  render() {
    // Ce composant ne rend rien, il gère uniquement la logique d'authentification
    return html``;
  }
}

customElements.define('check-auth', CheckAuth);