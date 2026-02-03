import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

export class PanierLayout extends LitElement {
  static properties = {
    title: { type: String },
    welcomeMessage: { type: String },
    showCartIcon: { type: Boolean }
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
    this.title = 'Mon Application Panier';
    this.welcomeMessage = 'Bienvenue!';
    this.showCartIcon = true;
  }

  render() {
    return html`
      <div class="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <header class="bg-blue-500 text-white p-4 shadow">
          <div class="max-w-6xl mx-auto flex justify-between items-center">
            <h1 class="text-xl font-bold">${this.title}</h1>
            <div class="flex items-center gap-4">
              <span class="text-sm">${this.welcomeMessage}</span>
              ${this.showCartIcon ? html`<div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">🛒</div>` : ''}
            </div>
          </div>
        </header>
        
        <main class="p-6">
          <div class="max-w-6xl mx-auto">
            <slot></slot>
          </div>
        </main>
        
        <footer class="bg-gray-50 p-4 text-center text-gray-500 border-t border-gray-200">
          <div class="max-w-6xl mx-auto">
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