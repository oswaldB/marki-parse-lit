// smtpProfilesState.js - État Alpine.js pour la gestion des profils SMTP
function smtpProfilesState() {
  return {
    // État pour la liste des profils
    profiles: [],
    isLoading: false,
    errorMessage: '',
    successMessage: '',
    
    // État pour le drawer
    drawerOpen: false,
    drawerTitle: 'Ajouter un profil SMTP',
    currentProfile: null,
    
    // État pour le formulaire
    profileForm: {
      name: '',
      host: '',
      port: '',
      username: '',
      password: '',
      email: '',
      useSSL: false,
      useTLS: false,
      isActive: true
    },
    
    // État pour le test
    showTestSection: false,
    testEmail: '',
    testResult: null,
    isTesting: false,

    init() {
      // Initialisation du SDK Parse avec la configuration
      if (window.parseConfig) {
        Parse.initialize(window.parseConfig.appId, window.parseConfig.javascriptKey);
        Parse.serverURL = window.parseConfig.serverURL;
      }

      // Charger les profils au démarrage
      this.loadProfiles();
    },

    // Charger tous les profils SMTP
    async loadProfiles() {
      try {
        this.isLoading = true;
        this.errorMessage = '';
        
        const profiles = await Parse.Cloud.run('getSMTPProfiles');
        this.profiles = profiles.filter(p => !p.isArchived); // Filtrer les profils archivés
      } catch (error) {
        console.error('Erreur lors du chargement des profils SMTP:', error);
        this.errorMessage = 'Erreur lors du chargement des profils: ' + error.message;
      } finally {
        this.isLoading = false;
      }
    },

    // Ouvrir le drawer pour ajouter/modifier un profil
    openProfileDrawer(profile = null) {
      if (profile) {
        // Mode édition
        this.drawerTitle = 'Modifier le profil SMTP';
        this.currentProfile = profile;
        this.profileForm = {
          name: profile.name,
          host: profile.host,
          port: profile.port,
          username: profile.username,
          password: '', // Ne pas charger le mot de passe pour des raisons de sécurité
          email: profile.email,
          useSSL: profile.useSSL,
          useTLS: profile.useTLS,
          isActive: profile.isActive
        };
      } else {
        // Mode création
        this.drawerTitle = 'Ajouter un profil SMTP';
        this.currentProfile = null;
        this.resetProfileForm();
      }
      
      this.showTestSection = false;
      this.testResult = null;
      this.drawerOpen = true;
    },

    // Fermer le drawer
    closeDrawer() {
      this.drawerOpen = false;
      this.resetProfileForm();
    },

    // Réinitialiser le formulaire
    resetProfileForm() {
      this.profileForm = {
        name: '',
        host: '',
        port: '',
        username: '',
        password: '',
        email: '',
        useSSL: false,
        useTLS: false,
        isActive: true
      };
      this.testEmail = '';
      this.testResult = null;
    },

    // Sauvegarder un profil (création ou mise à jour)
    async saveProfile() {
      try {
        this.isLoading = true;
        this.errorMessage = '';
        
        if (this.currentProfile) {
          // Mise à jour
          const updatedProfile = await Parse.Cloud.run('updateSMTPProfile', {
            objectId: this.currentProfile.objectId,
            ...this.profileForm
          });
          
          // Mettre à jour la liste
          const index = this.profiles.findIndex(p => p.objectId === updatedProfile.objectId);
          if (index !== -1) {
            this.profiles[index] = updatedProfile;
          }
          
          this.successMessage = 'Profil SMTP mis à jour avec succès!';
        } else {
          // Création
          const newProfile = await Parse.Cloud.run('createSMTPProfile', this.profileForm);
          this.profiles.push(newProfile);
          this.successMessage = 'Profil SMTP créé avec succès!';
        }
        
        this.closeDrawer();
        
        // Réinitialiser le message de succès après 3 secondes
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du profil SMTP:', error);
        this.errorMessage = 'Erreur lors de la sauvegarde: ' + error.message;
      } finally {
        this.isLoading = false;
      }
    },

    // Archiver un profil
    async archiveProfile(objectId) {
      if (!confirm('Êtes-vous sûr de vouloir archiver ce profil SMTP ?')) {
        return;
      }
      
      try {
        this.isLoading = true;
        this.errorMessage = '';
        
        await Parse.Cloud.run('archiveSMTPProfile', { objectId });
        
        // Retirer le profil de la liste
        this.profiles = this.profiles.filter(p => p.objectId !== objectId);
        
        this.successMessage = 'Profil SMTP archivé avec succès!';
        
        // Réinitialiser le message de succès après 3 secondes
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      } catch (error) {
        console.error('Erreur lors de l\'archivage du profil SMTP:', error);
        this.errorMessage = 'Erreur lors de l\'archivage: ' + error.message;
      } finally {
        this.isLoading = false;
      }
    },

    // Supprimer définitivement un profil
    async deleteProfile(objectId) {
      if (!confirm('ATTENTION: Cette action est irréversible. Êtes-vous sûr de vouloir supprimer définitivement ce profil SMTP ?')) {
        return;
      }
      
      try {
        this.isLoading = true;
        this.errorMessage = '';
        
        await Parse.Cloud.run('deleteSMTPProfile', { objectId });
        
        // Retirer le profil de la liste
        this.profiles = this.profiles.filter(p => p.objectId !== objectId);
        
        this.successMessage = 'Profil SMTP supprimé avec succès!';
        
        // Réinitialiser le message de succès après 3 secondes
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      } catch (error) {
        console.error('Erreur lors de la suppression du profil SMTP:', error);
        this.errorMessage = 'Erreur lors de la suppression: ' + error.message;
      } finally {
        this.isLoading = false;
      }
    },

    // Basculer l'état actif/inactif
    async toggleProfileStatus(objectId) {
      try {
        this.isLoading = true;
        this.errorMessage = '';
        
        const profile = this.profiles.find(p => p.objectId === objectId);
        if (!profile) return;
        
        const updatedProfile = await Parse.Cloud.run('updateSMTPProfile', {
          objectId: objectId,
          isActive: !profile.isActive
        });
        
        // Mettre à jour la liste
        const index = this.profiles.findIndex(p => p.objectId === updatedProfile.objectId);
        if (index !== -1) {
          this.profiles[index] = updatedProfile;
        }
        
        this.successMessage = `Profil SMTP ${updatedProfile.isActive ? 'activé' : 'désactivé'} avec succès!`;
        
        // Réinitialiser le message de succès après 3 secondes
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      } catch (error) {
        console.error('Erreur lors du basculement du statut:', error);
        this.errorMessage = 'Erreur lors du basculement du statut: ' + error.message;
      } finally {
        this.isLoading = false;
      }
    },

    // Basculer la section de test
    toggleTestSection() {
      this.showTestSection = !this.showTestSection;
      if (this.showTestSection) {
        this.testResult = null;
      }
    },

    // Tester un profil SMTP
    async testSMTPProfile() {
      if (!this.testEmail) {
        this.errorMessage = 'Veuillez entrer un email de test';
        return;
      }
      
      try {
        this.isTesting = true;
        this.errorMessage = '';
        this.testResult = null;
        
        const result = await Parse.Cloud.run('testSMTPProfile', {
          objectId: this.currentProfile.objectId,
          testEmail: this.testEmail
        });
        
        this.testResult = {
          success: true,
          message: result.message,
          messageId: result.messageId
        };
      } catch (error) {
        console.error('Erreur lors du test du profil SMTP:', error);
        this.testResult = {
          success: false,
          message: 'Erreur lors du test: ' + error.message
        };
      } finally {
        this.isTesting = false;
      }
    },

    // Formater la date pour l'affichage
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };
}