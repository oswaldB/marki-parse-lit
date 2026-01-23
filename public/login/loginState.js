// loginState.js - État Alpine.js pour la page de login
function loginState() {
  return {
    username: '',
    password: '',
    rememberMe: false,
    isLoading: false,
    errorMessage: '',

    init() {
      // Les credentials sont disponibles directement dans window.parse
    },

    async login() {
      this.isLoading = true;
      this.errorMessage = '';

      try {
        // Vérifier que window.parse est disponible
        if (!window.parse) {
          throw new Error('Configuration Parse non disponible');
        }

        // Appel à l'API Parse pour la connexion
        const response = await axios.post(
          `${window.parse.getUrl()}/login`,
          {
            username: this.username,
            password: this.password
          },
          {
            headers: window.parse.getHeaders()
          }
        );

        // Récupérer le token de session et le username
        const sessionToken = response.data.sessionToken;
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