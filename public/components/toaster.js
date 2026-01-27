import { LitElement, html } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

export class Toaster extends LitElement {
  createRenderRoot() {
    return this; // Désactive le shadow DOM
  }

  render() {
    return html`
      <div id="toast-container" class="fixed top-4 right-4 z-50 space-y-2 w-full max-w-xs">
        <!-- Les toasts seront ajoutés ici dynamiquement -->
      </div>
    `;
  }
}