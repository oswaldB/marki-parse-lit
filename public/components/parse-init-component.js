// Parse Server Initialization Component
// Lit Element component for initializing Parse SDK

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

export class ParseInitComponent extends LitElement {
  static properties = {
    appId: { type: String },
    serverUrl: { type: String },
    javascriptKey: { type: String },
    initialized: { type: Boolean },
    error: { type: String }
  };

  static styles = css`
    :host {
      display: none; /* Hidden component - only for initialization */
    }
  `;

  constructor() {
    super();
    this.appId = 'marki';
    this.serverUrl = 'https://dev.parse.markidiags.com/';
    this.javascriptKey = 'Careless7-Gore4-Guileless0-Jogger5-Clubbed9';
    this.initialized = false;
    this.error = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.initializeParse();
  }

  async initializeParse() {
    try {
      // Check if Parse is already loaded and initialized
      if (typeof Parse !== 'undefined' && Parse.applicationId) {
        this.initialized = true;
        this.dispatchEvent(new CustomEvent('parse-initialized', {
          detail: { success: true },
          bubbles: true,
          composed: true
        }));
        return;
      }

      // Load Parse SDK if not already loaded
      if (typeof Parse === 'undefined') {
        await this.loadParseSDK();
      }

      // Initialize Parse
      Parse.initialize(this.appId, this.javascriptKey);
      Parse.serverURL = this.serverUrl;
      
      this.initialized = true;
      this.error = '';
      
      // Dispatch success event
      this.dispatchEvent(new CustomEvent('parse-initialized', {
        detail: { success: true },
        bubbles: true,
        composed: true
      }));
      
    } catch (error) {
      console.error('Parse initialization error:', error);
      this.error = error.message || 'Failed to initialize Parse SDK';
      this.initialized = false;
      
      // Dispatch error event
      this.dispatchEvent(new CustomEvent('parse-initialized', {
        detail: { success: false, error: this.error },
        bubbles: true,
        composed: true
      }));
    }
  }

  loadParseSDK() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/parse@3.3.0/dist/parse.min.js';
      script.onload = resolve;
      script.onerror = () => reject(new Error('Failed to load Parse SDK'));
      document.head.appendChild(script);
    });
  }

  render() {
    // This component doesn't render anything visible
    return html``;
  }
}

customElements.define('parse-init', ParseInitComponent);