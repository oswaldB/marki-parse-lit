// Is Auth Component using Alpine.js
document.addEventListener('alpine:init', () => {
  Alpine.data('isAuth', (redirectUrl = '/login') => ({
    redirectUrl: redirectUrl,
    
    init() {
      this.checkAuth();
    },
    
    checkAuth() {
      // Vérifier dans localStorage et sessionStorage
      const token = localStorage.getItem('parseSessionToken') || sessionStorage.getItem('parseSessionToken');
      
      if (!token) {
        // Rediriger vers la page de login avec le paramètre de redirection
        const currentPath = window.location.pathname + window.location.search;
        const redirectParam = encodeURIComponent(currentPath);
        window.location.href = `${this.redirectUrl}?redir=${redirectParam}`;
      }
    }
  }));
});