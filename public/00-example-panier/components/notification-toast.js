import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';
import {unsafeSVG} from 'https://unpkg.com/lit-html@3.3.2/directives/unsafe-svg.js';

export class NotificationToast extends LitElement {
  static properties = {
    message: { type: String },
    type: { type: String, reflect: true },
    duration: { type: Number }
  };

  createRenderRoot() {
    return this;
  }

  static styles = css`
    :host {
      display: block;
    }
  `;

  constructor() {
    super();
    this.message = '';
    this.type = 'info'; // info, success, error, warning
    this.duration = 3000;
    this._timeoutId = null;
    this.lucideIcons = {};
  }

  connectedCallback() {
    super.connectedCallback();
    
    // Démarrer le timer pour masquer automatiquement
    this._timeoutId = setTimeout(() => {
      this.hide();
    }, this.duration);
  }

  disconnectedCallback() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
    super.disconnectedCallback();
  }

  hide() {
    // Supprimer l'élément directement
    this.remove();
  }

getIcon() {
  const icons = {
    success: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
    warning: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`
  };
  return icons[this.type] || icons.info;
}


  render() {
    const typeClasses = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      info: 'bg-blue-500',
      warning: 'bg-yellow-500'
    };
    
    return html`
      <div class="fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white min-w-[200px] ${typeClasses[this.type] || 'bg-blue-500'}" 
           x-show="visible" 
           x-transition:enter="transition ease-out duration-300" 
           x-transition:enter-start="opacity-0 transform translate-x-5" 
           x-transition:enter-end="opacity-100 transform translate-x-0">
        <span class="text-xl">${unsafeSVG(this.getIcon())}</span>
        <span class="flex-1">${this.message}</span>
        <button class="text-white hover:bg-white/20 p-1 rounded transition" @click=${this.hide}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `;
  }
}

customElements.define('notification-toast', NotificationToast);