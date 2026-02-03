import { LitElement, html, css } from 'https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm';

export class LoginForm extends LitElement {
  static properties = {
    email: { type: String },
    password: { type: String },
    isLoading: { type: Boolean },
    errorMessage: { type: String }
  };

  static styles = css`
    :host {
      display: block;
    }
    
    .form-container {
      max-width: 400px;
      margin: 0 auto;
      padding: 2rem;
      background: white;
      border-radius: 0.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    }
    
    .form-title {
      text-align: center;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: #1f2937;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }
    
    input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    
    input:focus {
      border-color: #3b82f6;
      outline: none;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    input.error {
      border-color: #ef4444;
    }
    
    .error-message {
      color: #ef4444;
      font-size: 0.75rem;
      margin-top: 0.25rem;
      display: none;
    }
    
    .error-message.show {
      display: block;
    }
    
    .login-button {
      width: 100%;
      padding: 0.75rem 1rem;
      background-color: #007ace;
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .login-button:hover {
      background-color: #005a9e;
    }
    
    .login-button:disabled {
      background-color: #9ca3af;
      cursor: not-allowed;
    }
    
    .forgot-password {
      text-align: center;
      margin-top: 1rem;
      font-size: 0.875rem;
    }
    
    .forgot-password a {
      color: #3b82f6;
      text-decoration: none;
      transition: color 0.2s;
    }
    
    .forgot-password a:hover {
      color: #1d4ed8;
      text-decoration: underline;
    }
    
    .form-error {
      color: #ef4444;
      background-color: #fee2e2;
      padding: 0.75rem;
      border-radius: 0.5rem;
      margin-bottom: 1.5rem;
      text-align: center;
      display: none;
    }
    
    .form-error.show {
      display: block;
    }
    
    .loading-spinner {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s ease-in-out infinite;
      margin-right: 0.5rem;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  constructor() {
    super();
    this.email = '';
    this.password = '';
    this.isLoading = false;
    this.errorMessage = '';
  }

  render() {
    return html`
      <div class="form-container">
        <h2 class="form-title">Connexion</h2>
        
        <div class="form-error ${this.errorMessage ? 'show' : ''}" id="formError">
          ${this.errorMessage}
        </div>
        
        <form @submit=${this.handleSubmit}>
          <div class="form-group">
            <label for="email">Adresse email</label>
            <input 
              type="email" 
              id="email" 
              .value=${this.email}
              @input=${this.handleEmailInput}
              placeholder="votre@email.com"
              required
            >
            <div class="error-message" id="emailError">Veuillez entrer une adresse email valide</div>
          </div>
          
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input 
              type="password" 
              id="password" 
              .value=${this.password}
              @input=${this.handlePasswordInput}
              placeholder="••••••••"
              required
              minlength="8"
            >
            <div class="error-message" id="passwordError">Le mot de passe doit contenir au moins 8 caractères</div>
          </div>
          
          <button 
            type="submit" 
            class="login-button" 
            ?disabled=${this.isLoading}
          >
            ${this.isLoading ? html`<span class="loading-spinner"></span>Connexion en cours...` : 'Se connecter'}
          </button>
          
          <div class="forgot-password">
            <a href="/password-reset">Mot de passe oublié ?</a>
          </div>
        </form>
      </div>
    `;
  }

  handleEmailInput(e) {
    this.email = e.target.value;
    this.validateEmail();
  }

  handlePasswordInput(e) {
    this.password = e.target.value;
    this.validatePassword();
  }

  validateEmail() {
    const emailInput = this.shadowRoot.getElementById('email');
    const emailError = this.shadowRoot.getElementById('emailError');
    
    if (!this.email || !this.isValidEmail(this.email)) {
      emailInput.classList.add('error');
      emailError.classList.add('show');
      return false;
    } else {
      emailInput.classList.remove('error');
      emailError.classList.remove('show');
      return true;
    }
  }

  validatePassword() {
    const passwordInput = this.shadowRoot.getElementById('password');
    const passwordError = this.shadowRoot.getElementById('passwordError');
    
    if (!this.password || this.password.length < 8) {
      passwordInput.classList.add('error');
      passwordError.classList.add('show');
      return false;
    } else {
      passwordInput.classList.remove('error');
      passwordError.classList.remove('show');
      return true;
    }
  }

  isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const isEmailValid = this.validateEmail();
    const isPasswordValid = this.validatePassword();
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    // Dispatch login event with credentials
    this.dispatchEvent(new CustomEvent('login-submit', {
      detail: {
        email: this.email,
        password: this.password
      },
      bubbles: true,
      composed: true
    }));
  }

  showError(message) {
    this.errorMessage = message;
    this.isLoading = false;
    this.requestUpdate();
  }

  resetForm() {
    this.email = '';
    this.password = '';
    this.isLoading = false;
    this.errorMessage = '';
    this.requestUpdate();
  }
}

customElements.define('login-form', LoginForm);