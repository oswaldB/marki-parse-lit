class SSToast extends window.LitElement {
  static properties = {
    message: { type: String },
    type: { type: String }, // 'success', 'error', 'warning', 'info'
    visible: { type: Boolean },
    autoHide: { type: Boolean },
    duration: { type: Number }
  };

  constructor() {
    super();
    this.message = '';
    this.type = 'info';
    this.visible = false;
    this.autoHide = true;
    this.duration = 5000;
    this.timer = null;
  }

  static styles = window.css`
    :host {
      display: block;
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      pointer-events: none;
    }

    .toast {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transform: translateX(120%);
      transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
      opacity: 0;
      pointer-events: auto;
      min-width: 250px;
      max-width: 350px;
      color: white;
      font-size: 14px;
    }

    .toast.visible {
      transform: translateX(0);
      opacity: 1;
    }

    .toast.success {
      background-color: #10b981;
    }

    .toast.error {
      background-color: #ef4444;
    }

    .toast.warning {
      background-color: #f59e0b;
    }

    .toast.info {
      background-color: #007ace;
    }

    .toast-icon {
      margin-right: 12px;
      font-size: 20px;
    }

    .toast-message {
      flex: 1;
    }

    .toast-close {
      margin-left: 12px;
      cursor: pointer;
      font-size: 18px;
      opacity: 0.7;
      transition: opacity 0.2s;
    }

    .toast-close:hover {
      opacity: 1;
    }
  `;

  render() {
    return window.html`
      <div class="toast ${this.visible ? 'visible' : ''} ${this.type}" @click=${this.handleClick}>
        <span class="toast-icon material-icons">
          ${this.getIcon()}
        </span>
        <span class="toast-message">${this.message}</span>
        <span class="toast-close material-icons" @click=${this.hide}>close</span>
      </div>
    `;
  }

  getIcon() {
    const icons = {
      success: 'check_circle',
      error: 'error',
      warning: 'warning',
      info: 'info'
    };
    return icons[this.type] || 'info';
  }

  show(message, type = 'info', duration = this.duration) {
    this.message = message;
    this.type = type;
    this.visible = true;
    
    if (this.autoHide && duration > 0) {
      this.clearTimer();
      this.timer = setTimeout(() => {
        this.hide();
      }, duration);
    }
  }

  hide() {
    this.visible = false;
    this.clearTimer();
  }

  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  handleClick(e) {
    if (e.target.classList.contains('toast-close')) {
      return;
    }
    // Optional: add click handling for the toast itself
  }

  disconnectedCallback() {
    this.clearTimer();
    super.disconnectedCallback();
  }
}

customElements.define('ss-toast', SSToast);