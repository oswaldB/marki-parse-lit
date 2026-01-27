// smtpState.js - État Alpine.js pour la page de configuration SMTP
function smtpState() {
  return {
    // Données du formulaire
    smtpConfig: {
      host: '',
      port: '',
      username: '',
      password: '',
      from: '',
      ssl: false,
      tls: false
    },
    
    isLoading: false,
    errorMessage: '',
    successMessage: '',

    init() {
      // Initialisation du SDK Parse avec la configuration
      if (window.parseConfig) {
        Parse.initialize(window.parseConfig.appId, window.parseConfig.javascriptKey);
        Parse.serverURL = window.parseConfig.serverURL;
      }

      // Charger la configuration existante
      this.loadSMTPConfig();
    },

    // Charger la configuration SMTP existante
    async loadSMTPConfig() {
      try {
        this.isLoading = true;
        const config = await Parse.Cloud.run('getSMTPConfig');
        
        if (config) {
          this.smtpConfig = {
            host: config.host || '',
            port: config.port || '',
            username: config.username || '',
            password: config.password || '',
            from: config.from || '',
            ssl: config.ssl || false,
            tls: config.tls || false
          };
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la configuration SMTP:', error);
        this.errorMessage = 'Erreur lors du chargement de la configuration.';
      } finally {
        this.isLoading = false;
      }
    },

    // Sauvegarder la configuration SMTP
    async saveSMTPConfig() {
      try {
        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';
        
        await Parse.Cloud.run('saveSMTPConfig', this.smtpConfig);
        
        this.successMessage = 'Configuration SMTP sauvegardée avec succès!';
        
        // Réinitialiser le message de succès après 3 secondes
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      } catch (error) {
        console.error('Erreur lors de la sauvegarde de la configuration SMTP:', error);
        this.errorMessage = 'Erreur lors de la sauvegarde: ' + error.message;
      } finally {
        this.isLoading = false;
      }
    },

    // Réinitialiser le formulaire
    resetForm() {
      this.smtpConfig = {
        host: '',
        port: '',
        username: '',
        password: '',
        from: '',
        ssl: false,
        tls: false
      };
      this.errorMessage = '';
      this.successMessage = '';
    }
  };
}