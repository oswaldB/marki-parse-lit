import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

export class PanierLayout extends LitElement {
  static properties = {
    title: { type: String },
    welcomeMessage: { type: String },
    showCartIcon: { type: Boolean }
  };

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
    }
    
    .layout {
      display: grid;
      grid-template-rows: auto 1fr auto;
      min-height: 100vh;
    }
    
    header {
      background-color: #3b82f6;
      color: white;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }
    
    .app-title {
      font-size: 1.5rem;
      font-weight: 700;
    }
    
    .welcome-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .welcome-message {
      font-size: 0.875rem;
    }
    
    .cart-icon {
      width: 2rem;
      height: 2rem;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    main {
      padding: 1.5rem;
    }
    
    .main-container {
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }
    
    footer {
      background-color: #f8fafc;
      padding: 1rem;
      text-align: center;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
    }
    
    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
    }
  `;

  constructor() {
    super();
    this.title = 'Mon Application Panier';
    this.welcomeMessage = 'Bienvenue!';
    this.showCartIcon = true;
  }

  render() {
    return html`
      <div class="layout">
        <header>
          <div class="header-content">
            <h1 class="app-title">${this.title}</h1>
            <div class="welcome-section">
              <span class="welcome-message">${this.welcomeMessage}</span>
              ${this.showCartIcon ? html`<div class="cart-icon">🛒</div>` : ''}
            </div>
          </div>
        </header>
        
        <main>
          <div class="main-container">
            <slot></slot>
          </div>
        </main>
        
        <footer>
          <div class="footer-container">
            <slot name="footer">
              <p>© ${new Date().getFullYear()} ${this.title}. Tous droits réservés.</p>
            </slot>
          </div>
        </footer>
      </div>
    `;
  }
}

customElements.define('panier-layout', PanierLayout);