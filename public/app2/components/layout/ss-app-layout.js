class SSAppLayout extends window.LitElement {
  static properties = {
    pageTitle: { type: String },
    showSidebar: { type: Boolean },
  };

  constructor() {
    super();
    this.pageTitle = 'Marki-parse App2';
    this.showSidebar = true;
  }

  static styles = window.css`
    :host {
      display: block;
      font-family: 'Inter', sans-serif;
    }

    .layout-container {
      display: grid;
      grid-template-columns: auto 1fr;
      min-height: 100vh;
      position: relative;
      overflow: hidden;
    }

    .sidebar {
      width: 250px;
      background-color: #ffffff;
      border-right: 1px solid #e5e7eb;
      transition: all 0.3s ease;
    }

    .sidebar.hidden {
      width: 0;
      overflow: hidden;
    }

    .main-content {
      padding: 1.5rem;
      background-color: #f9fafb;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background-color: #ffffff;
      border-bottom: 1px solid #e5e7eb;
      margin-bottom: 1rem;
    }

    .toggle-sidebar {
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.375rem;
      transition: background-color 0.2s;
    }

    .toggle-sidebar:hover {
      background-color: #f3f4f6;
    }
  `;

  render() {
    return window.html`
      <div class="layout-container">
        <!-- Marki Pebbles - Éparpillés sur toute la page -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <marki-pebble-blue ></marki-pebble-blue>
          <marki-pebble-dark ></marki-pebble-dark>
          <marki-pebble-gray ></marki-pebble-gray>
        </div>

        <!-- Main Content -->
        <div class="main-content relative z-10">
          <!-- Toast Notification -->
          <ss-toast id="layoutToast"></ss-toast>
          
          <!-- Console Monitor - Always active -->
          <ss-console-monitor></ss-console-monitor>
          
          <div class="content-area">
            <slot></slot>
          </div>
      </div>
    `;
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
  
  // Toast methods for easy access
  showToast(message, type = 'info', duration = 5000) {
    const toast = this.shadowRoot.getElementById('layoutToast');
    if (toast) {
      toast.show(message, type, duration);
    } else {
      console.warn('Toast element not found');
    }
  }
  
  showSuccess(message, duration = 5000) {
    this.showToast(message, 'success', duration);
  }
  
  showError(message, duration = 5000) {
    this.showToast(message, 'error', duration);
  }
  
  showWarning(message, duration = 5000) {
    this.showToast(message, 'warning', duration);
  }
  
  showInfo(message, duration = 5000) {
    this.showToast(message, 'info', duration);
  }
  
  hideToast() {
    const toast = this.shadowRoot.getElementById('layoutToast');
    if (toast) {
      toast.hide();
    }
  }
}

customElements.define('ss-app-layout', SSAppLayout);
