// Main application logic for Login Page
import authService from './auth-service.js';

// Alpine.js store for authentication state
document.addEventListener('alpine:init', () => {
  Alpine.store('auth', {
    user: null,
    isAuthenticated: false,
    authError: '',
    isLoading: false,
    
    // Initialize authentication state
    async init() {
      this.isLoading = true;
      try {
        const isAuth = await authService.isAuthenticated();
        if (isAuth) {
          this.user = await authService.getCurrentUser();
          this.isAuthenticated = true;
          // Redirect to dashboard if already authenticated
          window.location.href = '/dashboard.html';
        }
      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        this.isLoading = false;
      }
    },
    
    // Handle login submission
    async handleLogin(email, password) {
      this.isLoading = true;
      this.authError = '';
      
      try {
        const user = await authService.login(email, password);
        this.user = user;
        this.isAuthenticated = true;
        
        // Redirect to dashboard on successful login
        window.location.href = '/dashboard.html';
        
        return true;
      } catch (error) {
        this.authError = error.message;
        this.isAuthenticated = false;
        return false;
      } finally {
        this.isLoading = false;
      }
    },
    
    // Handle login form submission event
    handleLoginSubmit(event) {
      const { email, password } = event.detail;
      this.handleLogin(email, password);
    }
  });
});

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Alpine.js store
  if (typeof Alpine !== 'undefined') {
    Alpine.store('auth').init();
  }
  
  // Set up event listeners
  setupEventListeners();
});

function setupEventListeners() {
  // Listen for login submission events from the login form component
  document.addEventListener('login-submit', (event) => {
    event.stopPropagation();
    
    if (typeof Alpine !== 'undefined' && Alpine.store('auth')) {
      Alpine.store('auth').handleLoginSubmit(event);
    } else {
      console.warn('Alpine.js not loaded or auth store not available');
    }
  });
  
  // Listen for login error events
  document.addEventListener('login-error', (event) => {
    const { message } = event.detail;
    if (typeof Alpine !== 'undefined' && Alpine.store('auth')) {
      Alpine.store('auth').authError = message;
    }
  });
}

// Utility function to show notifications
export function showNotification(message, type = 'info') {
  if (typeof Alpine !== 'undefined' && Alpine.store('notifications')) {
    Alpine.store('notifications').add(message, type);
  } else {
    console.log(`[${type.toUpperCase()}] ${message}`);
  }
}