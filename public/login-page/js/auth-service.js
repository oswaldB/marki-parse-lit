// Authentication Service for Marki Login
// Handles communication with Parse Server

export class AuthService {
  constructor() {
    this.parseAppId = 'YOUR_PARSE_APP_ID';
    this.parseServerUrl = 'YOUR_PARSE_SERVER_URL';
    this.parseJavaScriptKey = 'YOUR_PARSE_JS_KEY';
  }

  // Initialize Parse SDK
  async initializeParse() {
    try {
      // Load Parse SDK dynamically
      if (typeof Parse === 'undefined') {
        await this.loadParseSDK();
      }

      Parse.initialize(this.parseAppId, this.parseJavaScriptKey);
      Parse.serverURL = this.parseServerUrl;
      
      return true;
    } catch (error) {
      console.error('Failed to initialize Parse:', error);
      return false;
    }
  }

  // Load Parse SDK dynamically
  loadParseSDK() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/parse@3.3.0/dist/parse.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Login with email and password
  async login(email, password) {
    try {
      // Initialize Parse if not already done
      if (typeof Parse === 'undefined' || !Parse.applicationId) {
        const initialized = await this.initializeParse();
        if (!initialized) {
          throw new Error('Failed to initialize Parse SDK');
        }
      }

      const user = await Parse.User.logIn(email, password);
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw this.handleParseError(error);
    }
  }

  // Handle Parse errors and return user-friendly messages
  handleParseError(error) {
    if (error.code === Parse.Error.INVALID_EMAIL_ADDRESS) {
      return new Error('Adresse email invalide');
    } else if (error.code === Parse.Error.INVALID_USERNAME_PASSWORD) {
      return new Error('Email ou mot de passe incorrect');
    } else if (error.code === Parse.Error.CONNECTION_FAILED) {
      return new Error('Problème de connexion au serveur');
    } else if (error.code === Parse.Error.OBJECT_NOT_FOUND) {
      return new Error('Compte utilisateur non trouvé');
    } else {
      return new Error('Erreur de connexion. Veuillez réessayer.');
    }
  }

  // Check if user is authenticated
  async isAuthenticated() {
    try {
      if (typeof Parse === 'undefined') {
        const initialized = await this.initializeParse();
        if (!initialized) {
          return false;
        }
      }

      const currentUser = Parse.User.current();
      return currentUser !== null;
    } catch (error) {
      console.error('Authentication check error:', error);
      return false;
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      if (typeof Parse === 'undefined') {
        const initialized = await this.initializeParse();
        if (!initialized) {
          return null;
        }
      }

      return Parse.User.current();
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  // Logout current user
  async logout() {
    try {
      if (typeof Parse === 'undefined') {
        const initialized = await this.initializeParse();
        if (!initialized) {
          return false;
        }
      }

      await Parse.User.logOut();
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  }

  // Password reset request
  async requestPasswordReset(email) {
    try {
      if (typeof Parse === 'undefined') {
        const initialized = await this.initializeParse();
        if (!initialized) {
          throw new Error('Failed to initialize Parse SDK');
        }
      }

      await Parse.User.requestPasswordReset(email);
      return true;
    } catch (error) {
      console.error('Password reset error:', error);
      throw this.handleParseError(error);
    }
  }
}

// Singleton instance
const authService = new AuthService();
export default authService;