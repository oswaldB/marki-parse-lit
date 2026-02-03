import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';
import {unsafeSVG} from 'https://unpkg.com/lit-html@3.3.2/directives/unsafe-svg.js';

export class NotificationToast extends LitElement {
  static properties = {
    message: { type: String },
    type: { type: String, reflect: true },
    duration: { type: Number }
  };

  static styles = css`
    :host {
      display: block;
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      z-index: 1000;
      opacity: 0;
      transform: translateX(20px);
      transition: all 0.3s ease-out;
    }
    
    :host([visible]) {
      opacity: 1;
      transform: translateX(0);
    }
    
    :host([hidden]) {
      opacity: 0;
      transform: translateX(20px);
    }
    
    .toast {
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      min-width: 200px;
    }
    
    .toast.success {
      background-color: #10b981;
      color: white;
    }
    
    .toast.error {
      background-color: #ef4444;
      color: white;
    }
    
    .toast.info {
      background-color: #3b82f6;
      color: white;
    }
    
    .toast.warning {
      background-color: #f59e0b;
      color: white;
    }
    
    .icon {
      font-size: 1.25rem;
    }
    
    .message {
      flex: 1;
    }
    
    .close {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 1.25rem;
      padding: 0.25rem;
      border-radius: 0.25rem;
      transition: background-color 0.2s;
    }
    
    .close:hover {
      background-color: rgba(255, 255, 255, 0.2);
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
    this.setAttribute('visible', '');
    
    
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
    this.setAttribute('hidden', '');
    this.removeAttribute('visible');
    
    // Supprimer l'élément après l'animation
    setTimeout(() => {
      this.remove();
    }, 300);
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
    return html`
      <div class="toast ${this.type}">
        <span class="icon">${unsafeSVG(this.getIcon())}</span>
        <span class="message">${this.message}</span>
        <button class="close" @click=${this.hide}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `;
  }
}

customElements.define('notification-toast', NotificationToast);