import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class IsAuth extends LitElement {
  static properties = {
    redirectUrl: { type: String }
  };

  static styles = css`
    :host {
      display: block;
    }
  `;

  constructor() {
    super();
    this.redirectUrl = '/login';
  }

  firstUpdated() {
    this.checkAuth();
  }

  checkAuth() {
    // Vérifier dans localStorage et sessionStorage
    const token = localStorage.getItem('parseSessionToken') || sessionStorage.getItem('parseSessionToken');
    
    if (!token) {
      // Rediriger vers la page de login avec le paramètre de redirection
      const currentPath = window.location.pathname + window.location.search;
      const redirectParam = encodeURIComponent(currentPath);
      window.location.href = `${this.redirectUrl}?redir=${redirectParam}`;
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define('is-auth', IsAuth);