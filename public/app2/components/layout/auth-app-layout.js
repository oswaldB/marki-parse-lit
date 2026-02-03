// auth-app-layout.js - Layout d'application avec authentification
// Utilise parse-init pour l'initialisation Parse et check-auth pour la vérification d'authentification
// Comprend une double sidebar avec logo, paramètres et navigation

import { LitElement, html } from 'https://unpkg.com/lit@2.0.0-rc.2/index.js?module';
import '/components/check-auth.js';
import '/app2/components/utils/parse-init-component.js';

export class AuthAppLayout extends LitElement {
  static properties = {
    pageTitle: { type: String },
  };

  constructor() {
    super();
    this.pageTitle = 'Marki-parse Auth App';
  }

  createRenderRoot() {
    return this; // Désactive le shadow DOM
  }

  static styles = css`
    :host {
      display: block;
      font-family: 'Inter', sans-serif;
    }

    .layout-container {
      display: grid;
      grid-template-columns: 80px auto 1fr;
      min-height: 100vh;
      position: relative;
      overflow: hidden;
    }

    /* Première sidebar - Logo et icône paramètres */
    .sidebar-first {
      width: 80px;
      background-color: #ffffff;
      border-right: 1px solid #e5e7eb;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem 0;
      position: relative;
    }

    .logo-container {
      width: 40px;
      height: 40px;
      margin-bottom: 2rem;
    }

    .logo-container img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .settings-icon {
      position: absolute;
      bottom: 1rem;
      width: 24px;
      height: 24px;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.2s;
    }

    .settings-icon:hover {
      opacity: 1;
    }

    /* Deuxième sidebar - Navigation */
    .sidebar-second {
      width: 250px;
      background-color: #f9fafb;
      border-right: 1px solid #e5e7eb;
      padding: 1rem;
    }

    .sidebar-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #3b82f6;
    }

    .nav-menu {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-item {
      margin-bottom: 0.75rem;
    }

    .nav-link {
      display: block;
      padding: 0.5rem 1rem;
      color: #4b5563;
      text-decoration: none;
      border-radius: 0.375rem;
      transition: all 0.2s;
      font-weight: 500;
    }

    .nav-link:hover {
      background-color: #e5e7eb;
      color: #1f2937;
    }

    .nav-link.active {
      background-color: #3b82f6;
      color: white;
    }

    /* Contenu principal */
    .main-content {
      padding: 1.5rem;
      background-color: #ffffff;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .page-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1f2937;
    }
  `;

  render() {
    return html`
      <!-- Composant de vérification d'authentification -->
      <check-auth></check-auth>

      <!-- Composant d'initialisation Parse -->
      <parse-init></parse-init>

      <div class="layout-container">
        <!-- Première sidebar - Logo et paramètres -->
        <div class="sidebar-first">
          <div class="logo-container">
            <img src="/assets/marki-logo.png" alt="Marki Logo">
          </div>
          <svg class="settings-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        <!-- Deuxième sidebar - Navigation -->
        <div class="sidebar-second">
          <h2 class="sidebar-title">IMPAYes</h2>
          <ul class="nav-menu">
            <li class="nav-item">
              <a href="/app/relances/impayes" class="nav-link">Impayés</a>
            </li>
            <li class="nav-item">
              <a href="/app/relances/sequence" class="nav-link">Séquences</a>
            </li>
            <li class="nav-item">
              <a href="/app/relances/sequences" class="nav-link">Relance</a>
            </li>
          </ul>
        </div>

        <!-- Contenu principal -->
        <div class="main-content">
          <div class="header">
            <h1 class="page-title">${this.pageTitle}</h1>
          </div>
          <div class="content-area">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }

  // Méthode pour mettre à jour le titre de la page
  setPageTitle(title) {
    this.pageTitle = title;
  }
}

if (!customElements.get('auth-app-layout')) {
  customElements.define('auth-app-layout', AuthAppLayout);
}
