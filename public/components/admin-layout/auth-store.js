// Auth Store using Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.store('auth', {
    isAuthenticated: false,
    user: null,
    token: null,
    
    init() {
      this.checkAuth();
    },
    
    checkAuth() {
      // Vérifier dans localStorage et sessionStorage
      const token = localStorage.getItem('parseSessionToken') || sessionStorage.getItem('parseSessionToken');
      
      if (token) {
        this.token = token;
        this.isAuthenticated = true;
        
        // TODO: Récupérer les informations de l'utilisateur depuis l'API
        // Pour l'instant, on simule avec un username
        this.user = {
          username: localStorage.getItem('parseUsername') || 'Utilisateur',
          email: localStorage.getItem('parseEmail') || ''
        };
        
        return true;
      }
      
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;
      return false;
    },
    
    login(token, username, email) {
      this.token = token;
      this.isAuthenticated = true;
      this.user = { username, email };
      
      // Sauvegarder dans localStorage
      localStorage.setItem('parseSessionToken', token);
      localStorage.setItem('parseUsername', username);
      if (email) {
        localStorage.setItem('parseEmail', email);
      }
    },
    
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;
      
      // Supprimer du localStorage
      localStorage.removeItem('parseSessionToken');
      localStorage.removeItem('parseUsername');
      localStorage.removeItem('parseEmail');
      sessionStorage.removeItem('parseSessionToken');
    }
  });
});