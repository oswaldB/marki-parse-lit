// parse-init-component.js - Composant Lit pour l'initialisation Parse
// Ce composant encapsule la logique d'initialisation Parse dans un composant Lit

import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

export class ParseInitComponent extends LitElement {
  createRenderRoot() {
    return this; // Désactive le shadow DOM pour un accès global
  }

  constructor() {
    super();
    this.initializeParse();
  }

  initializeParse() {
    // Parse Configuration - Directly embedded
    const PARSE_CONFIG = {
      APP_ID: 'marki',
      JS_KEY: 'Careless7-Gore4-Guileless0-Jogger5-Clubbed9',
      SERVER_URL: 'https://dev.parse.markidiags.com'
    };

    // Check if Parse is already loaded
    if (typeof Parse !== 'undefined') {
      console.log('Parse SDK already loaded, initializing...');
      this.setupParse(PARSE_CONFIG);
      return;
    }

    // Load Parse SDK from CDN
    const parseScript = document.createElement('script');
    parseScript.src = 'https://cdn.jsdelivr.net/npm/parse@3.3.0/dist/parse.min.js';
    parseScript.id = 'parse-sdk';
    parseScript.onload = () => this.setupParse(PARSE_CONFIG);
    parseScript.onerror = () => {
      console.error('Failed to load Parse SDK');
      document.dispatchEvent(new CustomEvent('parse-error', {
        detail: { error: 'Failed to load Parse SDK' }
      }));
    };
    document.head.appendChild(parseScript);
  }

  setupParse(config) {
    try {
      // Initialize Parse with embedded configuration
      Parse.initialize(config.APP_ID, config.JS_KEY);
      Parse.serverURL = config.SERVER_URL;
      
      console.log('Parse SDK initialized successfully');
      console.log('Connected to:', config.SERVER_URL);
      
      // Dispatch event when Parse is ready
      const parseReadyEvent = new CustomEvent('parse-ready', {
        detail: { Parse: Parse }
      });
      document.dispatchEvent(parseReadyEvent);
      console.log('parse-ready event dispatched');
      
    } catch (error) {
      console.error('Failed to initialize Parse:', error);
      // Dispatch error event
      document.dispatchEvent(new CustomEvent('parse-error', {
        detail: { error: error }
      }));
    }
  }

  render() {
    // Ce composant ne rend rien, il gère uniquement l'initialisation Parse
    return html``;
  }
}

if (!customElements.get('parse-init')) {
  customElements.define('parse-init', ParseInitComponent);
}
