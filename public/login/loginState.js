// loginState.js - État Alpine.js pour la page de login
function loginState() {
  return {
    username: '',
    password: '',
    rememberMe: false,
    isLoading: false,
    errorMessage: '',

    init() {
      // Initialisation du SDK Parse avec la configuration
      if (window.parseConfig) {
        Parse.initialize(window.parseConfig.appId, window.parseConfig.javascriptKey);
        Parse.serverURL = window.parseConfig.serverURL;
      }
    },

    async login() {
      this.isLoading = true;
      this.errorMessage = '';

      try {
        // Utilisation du SDK Parse pour la connexion
        const user = await Parse.User.logIn(this.username, this.password);

        // Récupérer le token de session et le username
        const sessionToken = user.getSessionToken();
        const username = this.username;

        // Stocker le token et le username en fonction de l'option "Se souvenir de moi"
        if (this.rememberMe) {
          localStorage.setItem('parseSessionToken', sessionToken);
          localStorage.setItem('parseUsername', username);
        } else {
          sessionStorage.setItem('parseSessionToken', sessionToken);
          sessionStorage.setItem('parseUsername', username);
        }

        // Redirection après connexion réussie
        const urlParams = new URLSearchParams(window.location.search);
        const redirectUrl = urlParams.get('url_redirect');

        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          window.location.href = '/dashboard';
        }
      } catch (error) {
        console.error('Erreur de connexion:', error);
        this.errorMessage = 'Email ou mot de passe incorrect. Veuillez réessayer.';
      } finally {
        this.isLoading = false;
      }
    }
  };
}