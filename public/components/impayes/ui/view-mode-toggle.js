// view-mode-toggle.js - Composant Lit pour basculer entre les différents modes de vue avec WebAwesome
import { LitElement, html, css } from 'https://unpkg.com/lit@2.0.0-rc.2/index.js?module';

export class ViewModeToggle extends LitElement {
  static properties = {
    currentMode: { type: String },
    availableModes: { type: Array }
  };

  constructor() {
    super();
    this.currentMode = 'grouped-by-payer';
    this.availableModes = [
      { id: 'grouped-by-payer', label: 'Groupé par payeur', icon: 'users' },
      { id: 'invoice-list', label: 'Vue Factures', icon: 'file-invoice' },
      { id: 'to-fix', label: 'À réparer', icon: 'triangle-exclamation' },
      { id: 'sequence', label: 'Vue Séquence', icon: 'link' },
      { id: 'by-actor', label: 'Vue par Acteur', icon: 'user' }
    ];
  }

  static styles = css`
    :host {
      display: block;
      margin-bottom: 1.5rem;
    }

    .toggle-container {
      display: flex;
      gap: 0.25rem;
      background-color: #f3f4f6;
      border-radius: 0.5rem;
      padding: 0.25rem;
    }

    .toggle-button {
      flex: 1;
      padding: 0.5rem 1rem;
      background-color: transparent;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      color: #6b7280;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .toggle-button:hover {
      background-color: #e5e7eb;
    }

    .toggle-button.active {
      background-color: white;
      color: #1f2937;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .wa-icon {
      font-size: 1rem;
      vertical-align: middle;
    }
  `;

  render() {
    return html`
      <div class="toggle-container">
        ${this.availableModes.map(mode => html`
          <button 
            class="toggle-button ${this.currentMode === mode.id ? 'active' : ''}" 
            @click="${() => this.setViewMode(mode.id)}"
          >
            <wa-icon name="${mode.icon}"></wa-icon>
            <span>${mode.label}</span>
          </button>
        `)}
      </div>
    `;
  }

  setViewMode(modeId) {
    this.currentMode = modeId;
    this.dispatchEvent(new CustomEvent('view-mode-changed', {
      detail: { currentMode: this.currentMode }
    }));
  }

  getActiveMode() {
    return this.currentMode;
  }
}

customElements.define('view-mode-toggle', ViewModeToggle);