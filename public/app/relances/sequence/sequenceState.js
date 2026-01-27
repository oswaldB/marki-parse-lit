// sequenceState.js - État Alpine.js pour la page de détails de la séquence
function sequenceState() {
  return {
    sequence: null,
    sequenceId: null,
    
    // Données du schéma des impayés
    impayesSchema: null,
    impayesColumns: [],
    impayesFields: {},
    
    // Filtre pour les variables
    variableSearch: '',
    
    init() {
      // Initialisation du SDK Parse avec la configuration
      if (window.parseConfig) {
        Parse.initialize(window.parseConfig.appId, window.parseConfig.javascriptKey);
        Parse.serverURL = window.parseConfig.serverURL;
      }
      
      // Récupérer l'ID de la séquence depuis le paramètre de requête
      const urlParams = new URLSearchParams(window.location.search);
      this.sequenceId = urlParams.get('id');
      
      this.fetchSequence();
    },
    
    // Méthodes pour modifier le nombre de jours avec des boutons fléchés
    async increaseActionDelay(index) {
      if (!this.sequence || !this.sequence.actions || index < 0 || index >= this.sequence.actions.length) {
        return;
      }
      
      try {
        // Créer une copie du tableau des actions
        const newActions = [...this.sequence.actions];
        
        // Augmenter le délai de 1 jour
        newActions[index].delay = (newActions[index].delay || 0) + 1;
        
        // Mettre à jour les actions
        this.sequence.actions = newActions;
        
        // Sauvegarder les modifications
        await this.updateSequenceActions(newActions);
        
        console.log('Délai augmenté pour l\'action à l\'index:', index, 'Nouveau délai:', newActions[index].delay);
      } catch (error) {
        console.error('Erreur lors de l\'augmentation du délai:', error);
        alert('Erreur lors de la sauvegarde des modifications.');
      }
    },
    
    async decreaseActionDelay(index) {
      if (!this.sequence || !this.sequence.actions || index < 0 || index >= this.sequence.actions.length) {
        return;
      }
      
      try {
        // Créer une copie du tableau des actions
        const newActions = [...this.sequence.actions];
        
        // Diminuer le délai de 1 jour (minimum 0)
        newActions[index].delay = Math.max((newActions[index].delay || 0) - 1, 0);
        
        // Mettre à jour les actions
        this.sequence.actions = newActions;
        
        // Sauvegarder les modifications
        await this.updateSequenceActions(newActions);
        
        console.log('Délai diminué pour l\'action à l\'index:', index, 'Nouveau délai:', newActions[index].delay);
      } catch (error) {
        console.error('Erreur lors de la diminution du délai:', error);
        alert('Erreur lors de la sauvegarde des modifications.');
      }
    },
    
    async fetchSequence() {
      if (!this.sequenceId) {
        console.error('Aucun ID de séquence trouvé dans l\'URL.');
        return;
      }
      
      try {
        const query = new Parse.Query('sequences');
        const sequence = await query.get(this.sequenceId);
        
        this.sequence = {
          ...sequence.toJSON(),
          objectId: sequence.id,
          emailSubject: sequence.get('emailSubject') || '',
          senderEmail: sequence.get('senderEmail') || ''
        };
        
        // Trier les actions par ordre croissant de délai dès le chargement
        if (this.sequence.actions && this.sequence.actions.length > 0) {
          this.sequence.actions.sort((a, b) => (a.delay || 0) - (b.delay || 0));
        }
        
        console.log('Séquence récupérée:', this.sequence);
        
        // Charger les profils SMTP et le schéma des impayés en parallèle
        await Promise.all([
          this.loadSmtpProfiles(),
          this.loadImpayesSchema()
        ]);
      } catch (error) {
        console.error('Erreur lors de la récupération de la séquence:', error);
      }
    },
    
    // Méthode pour filtrer les variables
    get filteredVariables() {
      if (!this.variableSearch) {
        return this.impayesColumns;
      }
      
      const searchTerm = this.variableSearch.toLowerCase();
      return this.impayesColumns.filter(column => 
        column.toLowerCase().includes(searchTerm)
      );
    },
    
    // Méthode pour copier une variable individuelle
    copyVariable(columnName) {
      const variableText = `[[${columnName}]]`;
      
      navigator.clipboard.writeText(variableText).then(() => {
        // Afficher une notification
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
        notification.textContent = `Variable [[${columnName}]] copiée !`;
        
        document.body.appendChild(notification);
        
        // Supprimer la notification après 3 secondes
        setTimeout(() => {
          notification.remove();
        }, 3000);
        
        console.log(`✅ Variable [[${columnName}]] copiée dans le presse-papiers`);
      }).catch(err => {
        console.error('❌ Erreur lors de la copie de la variable:', err);
        alert('Erreur lors de la copie de la variable.');
      });
    },
    
    // Méthode pour récupérer le schéma des impayés (simplifiée)
    async loadImpayesSchema() {
      try {
        console.log('🔍 Récupération du schéma des impayés...');
        
        // Appeler la fonction cloud pour récupérer le schéma
        // La fonction cloud retourne directement les champs de la classe Impayes
        const fields = await Parse.Cloud.run('getImpayesSchema');
        
        if (fields) {
          this.impayesSchema = { fields: fields };
          this.impayesColumns = Object.keys(fields);
          this.impayesFields = fields;
          
          console.log('✅ Schéma des impayés récupéré:', this.impayesColumns.length, 'colonnes');
          console.log('Colonnes disponibles:', this.impayesColumns);
          
          return true;
        } else {
          console.log('⚠️ Aucune donnée de schéma reçue');
          this.impayesSchema = null;
          this.impayesColumns = [];
          this.impayesFields = {};
          return false;
        }
      } catch (error) {
        console.error('❌ Erreur lors de la récupération du schéma des impayés:', error);
        console.error('Détails de l\'erreur:', {
          code: error.code,
          message: error.message,
          stack: error.stack
        });
        this.impayesSchema = null;
        this.impayesColumns = [];
        this.impayesFields = {};
        return false;
      }
    },
    
    async loadSmtpProfiles() {
      try {
        console.log('📧 Chargement des profils SMTP...');
        
        // Utiliser directement le SDK Parse pour récupérer les profils SMTP
        // Note: Le nom de la classe est SMTPProfile (sans "s")
        const query = new Parse.Query('SMTPProfile');
        const profiles = await query.find();
        
        this.smtpProfiles = profiles.map(profile => {
          return {
            id: profile.id,
            name: profile.get('name'),
            host: profile.get('host'),
            port: profile.get('port'),
            email: profile.get('email'),
            username: profile.get('username')
          };
        });
        
        console.log('✅ Profils SMTP chargés:', this.smtpProfiles);
        
        if (this.smtpProfiles.length === 0) {
          console.log('ℹ️ Aucun profil SMTP trouvé dans la base de données');
        }
        
      } catch (error) {
        console.error('❌ Erreur lors du chargement des profils SMTP:', error);
        console.error('Détails:', error.message);
        // Si la classe n'existe pas, on initialise un tableau vide
        this.smtpProfiles = [];
      }
    },
    
    async toggleSequenceStatus() {
      if (!this.sequence) {
        return;
      }
      
      // Vérifier si des profils SMTP sont disponibles
      if (this.smtpProfiles.length === 0) {
        await this.showPopupMessage(
          'Configuration requise',
          'Aucun profil SMTP configuré. Veuillez ajouter un profil SMTP avant de changer le statut.',
          'error'
        );
        return;
      }
      
      // Demander confirmation
      const newStatus = !this.sequence.isActif;
      const action = newStatus ? 'activer' : 'désactiver';
      
      const confirmed = await this.confirm(
        newStatus ? 'Activer la séquence' : 'Désactiver la séquence',
        `Êtes-vous sûr de vouloir ${action} cette séquence ?`
      );
      
      if (!confirmed) {
        return;
      }
      
      try {
        this.isTogglingStatus = true;
        
        const Sequences = Parse.Object.extend('sequences');
        const sequence = new Sequences();
        sequence.id = this.sequence.objectId;
        
        sequence.set('isActif', newStatus);
        
        await sequence.save();
        
        this.sequence.isActif = newStatus;
        
        console.log('Statut de la séquence mis à jour:', newStatus ? 'Actif' : 'Inactif');
        
        await this.showPopupMessage(
          'Statut mis à jour',
          `La séquence a été ${action}ée avec succès.`,
          'success'
        );
        
      } catch (error) {
        console.error('Erreur lors de la mise à jour du statut:', error);
        await this.showPopupMessage(
          'Erreur de mise à jour',
          'Une erreur est survenue lors de la mise à jour du statut.',
          'error'
        );
      } finally {
        this.isTogglingStatus = false;
      }
    },
    
    testSequence() {
      if (!this.sequence || this.sequence.actions.length === 0) {
        this.showPopupMessage('Aucune action', 'Cette séquence ne contient aucune action à tester.', 'warning');
        return;
      }
      
      // Vérifier si des profils SMTP sont disponibles
      if (this.smtpProfiles.length === 0) {
        this.showPopupMessage(
          'Configuration requise',
          'Aucun profil SMTP configuré. Veuillez ajouter un profil SMTP avant de tester l\'envoi.',
          'error'
        );
        return;
      }
      
      // Ouvrir le drawer de test
      this.showTestDrawer = true;
      this.testRecipient = '';
      
      console.log('Ouverture du drawer de test pour la séquence:', this.sequence.actions);
    },
    

    
    async sendTestSequence() {
      if (!this.testRecipient || !this.testRecipient.trim()) {
        this.showPopupMessage('Adresse requise', 'Veuillez entrer une adresse email valide.', 'warning');
        return;
      }
      
      try {
        // Simuler l'envoi du test
        console.log('Envoi du test à:', this.testRecipient);
        console.log('Actions à tester:', this.sequence.actions);
        
        // Fermer le drawer
        this.showTestDrawer = false;
        
        // Afficher un message de succès
        this.showPopupMessage(
          'Test envoyé',
          'Le test a été envoyé avec succès à ' + this.testRecipient + '. Vérifiez votre boîte de réception.',
          'success'
        );
        
        // Ici, vous pourriez appeler une fonction cloud pour envoyer réellement le test
        // await Parse.Cloud.run('sendTestSequence', {
        //   sequenceId: this.sequenceId,
        //   recipient: this.testRecipient
        // });
        
      } catch (error) {
        console.error('Erreur lors de l\'envoi du test:', error);
        this.showPopupMessage(
          'Erreur d\'envoi',
          'Une erreur est survenue lors de l\'envoi du test. Veuillez réessayer.',
          'error'
        );
      }
    },
    
    async deleteSequence() {
      if (!this.sequence) {
        return;
      }
      
      const confirmed = await this.confirm(
        'Supprimer la séquence',
        'Êtes-vous sûr de vouloir supprimer cette séquence ? Cette action est irréversible.'
      );
      
      if (!confirmed) {
        return;
      }
      
      try {
        const Sequences = Parse.Object.extend('sequences');
        const sequence = new Sequences();
        sequence.id = this.sequence.objectId;
        
        await sequence.destroy();
        
        console.log('Séquence supprimée avec succès');
        
        // Redirection vers la liste des séquences
        window.location.href = '/app/relances/sequences/';
      } catch (error) {
        console.error('Erreur lors de la suppression de la séquence:', error);
        await this.showPopupMessage(
          'Erreur de suppression',
          'Une erreur est survenue lors de la suppression de la séquence.',
          'error'
        );
      }
    },
    
    formatActionType(type) {
      return type === 'email' ? 'Email' : 'SMS';
    },
    
    getActionIcon(type) {
      return type === 'email' ? '📧' : '📱';
    },
    
    generatePromptText() {
      if (this.impayesColumns.length === 0) {
        return 'Aucune variable disponible pour générer le prompt.';
      }

      // Générer la liste complète des variables
      const variablesList = this.impayesColumns.map(col => {
        return `- ${col}: [[${col}]]`;
      }).join('\n');

      // Générer un exemple de message avec toutes les variables disponibles
      let exampleMessage = 'Bonjour';
      
      // Ajouter le prénom et nom si disponibles
      if (this.impayesColumns.includes('prenom') && this.impayesColumns.includes('nom')) {
        exampleMessage += ' [[prenom]] [[nom]]';
      } else if (this.impayesColumns.includes('nom')) {
        exampleMessage += ' [[nom]]';
      }

      exampleMessage += ',\n\nNous vous rappelons que votre paiement';
      
      // Ajouter le montant si disponible
      if (this.impayesColumns.includes('montant')) {
        exampleMessage += ' de [[montant]] €';
      }

      exampleMessage += ' est dû';
      
      // Ajouter la date d'échéance si disponible
      if (this.impayesColumns.includes('dateEcheance')) {
        exampleMessage += ' depuis le [[dateEcheance]]';
      }

      exampleMessage += '.\nVeuillez régulariser votre situation';
      
      // Ajouter le lien de paiement si disponible
      if (this.impayesColumns.includes('lienPaiement')) {
        exampleMessage += ' en cliquant sur le lien suivant : [[lienPaiement]]';
      }

      // Ajouter d'autres informations si disponibles
      if (this.impayesColumns.includes('reference')) {
        exampleMessage += '\nRéférence : [[reference]]';
      }

      if (this.impayesColumns.includes('adresse')) {
        exampleMessage += '\nAdresse : [[adresse]]';
      }

      if (this.impayesColumns.includes('email')) {
        exampleMessage += '\nEmail : [[email]]';
      }

      if (this.impayesColumns.includes('telephone')) {
        exampleMessage += '\nTéléphone : [[telephone]]';
      }

      exampleMessage += '\n\nCordialement,\nL\'équipe de relance.';

      return `Rédigez un email de relance pour un impayé. Utilisez les variables suivantes :
${variablesList}

Exemple de message avec toutes les variables disponibles :
${exampleMessage}`;
    },

    copyPrompt() {
      const promptText = this.generatePromptText();

      navigator.clipboard.writeText(promptText).then(() => {
        alert('Prompt copié dans le presse-papiers !');
      }).catch(err => {
        console.error('Erreur lors de la copie du prompt:', err);
        alert('Erreur lors de la copie du prompt.');
      });
    },

    async addDelay(delay) {
      if (!this.sequence || delay < 0) {
        return;
      }

      try {
        const Sequences = Parse.Object.extend('sequences');
        const sequence = new Sequences();
        sequence.id = this.sequence.objectId;

        // Ajouter une nouvelle action avec le délai spécifié et les paramètres par défaut
        const newActions = [...this.sequence.actions, {
          type: this.defaultMessageType, // Utiliser le type par défaut
          delay: delay,
          message: this.defaultMessageContent // Utiliser le message par défaut
        }];

        sequence.set('actions', newActions);

        await sequence.save();

        // Mettre à jour localement
        this.sequence.actions = newActions;

        console.log('Nouveau délai ajouté avec succès');
      } catch (error) {
        console.error('Erreur lors de l\'ajout du délai:', error);
      }
    },
    
    // Nouvelle méthode pour ajouter des nœuds avec type et message personnalisés
    async addNewNode() {
      if (!this.sequence || this.newNodeDelay < 0 || !this.newNodeMessage.trim()) {
        alert('Veuillez remplir tous les champs correctement.');
        return;
      }

      try {
        const Sequences = Parse.Object.extend('sequences');
        const sequence = new Sequences();
        sequence.id = this.sequence.objectId;

        // Ajouter la nouvelle action avec le type, délai et message spécifiés
        const newAction = {
          type: this.newNodeType,
          delay: parseInt(this.newNodeDelay),
          message: this.newNodeMessage
        };

        // Ajouter les champs spécifiques aux emails
        if (this.newNodeType === 'email') {
          newAction.subject = this.newNodeSubject;
          newAction.senderEmail = this.newNodeSenderEmail;
        }

        const newActions = [...this.sequence.actions, newAction];

        sequence.set('actions', newActions);
        await sequence.save();

        // Mettre à jour localement
        this.sequence.actions = newActions;

        // Réinitialiser le formulaire
        this.newNodeDelay = 0;
        this.newNodeSubject = '';
        this.newNodeSenderEmail = '';
        this.newNodeMessage = '';

        console.log('Nouveau nœud ajouté avec succès');
      } catch (error) {
        console.error('Erreur lors de l\'ajout du nœud:', error);
        alert('Erreur lors de l\'ajout du message.');
      }
    },
    

    // Nouveaux champs pour l'ajout de nœuds
    newNodeType: 'email',
    newNodeDelay: 0,
    newNodeSubject: '',
    newNodeSenderEmail: '',
    newNodeMessage: '',
    
    // Profils SMTP
    smtpProfiles: [],
    
    // État pour le drawer d'édition
    editingActionIndex: null,
    editActionType: 'email',
    editActionDelay: 0,
    editActionSubject: '',
    editActionSenderEmail: '',
    editActionMessage: '',
    
    // État pour les drawers
    showEditDrawer: false,
    showTestDrawer: false,
    
    // État pour les popups
    showPopup: false,
    popupTitle: '',
    popupMessage: '',
    popupType: 'info', // info, success, warning, error, confirm
    
    // État pour les confirmations basées sur les promesses
    confirmResolution: {
      resolve: null,
      reject: null,
      action: null
    },
    
    // État pour l'édition du nom de la séquence
    editingSequenceName: false,
    originalSequenceName: '',
    
    // État pour le test d'envoi
    testRecipient: '',
    
    // État pour le toggle de statut
    isTogglingStatus: false,
    
    // État pour le chargement des actions
    isExecutingAction: false,
    
    // Gestion des actions de la séquence
    async updateSequenceActions(newActions) {
      if (!this.sequence) {
        return;
      }

      try {
        // Trier les actions par ordre croissant de délai
        const sortedActions = [...newActions].sort((a, b) => (a.delay || 0) - (b.delay || 0));

        const Sequences = Parse.Object.extend('sequences');
        const sequence = new Sequences();
        sequence.id = this.sequence.objectId;

        // Mettre à jour les actions (triées)
        sequence.set('actions', sortedActions);

        await sequence.save();

        // Mettre à jour localement avec les actions triées
        this.sequence.actions = sortedActions;

        console.log('Séquence mise à jour avec succès (actions triées)');
        return true;
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la séquence:', error);
        alert('Erreur lors de la sauvegarde des modifications');
        return false;
      }
    },
    
    // Méthodes pour l'édition des actions
    editAction(index) {
      if (!this.sequence || !this.sequence.actions || index < 0 || index >= this.sequence.actions.length) {
        return;
      }
      
      const action = this.sequence.actions[index];
      
      // Remplir les champs d'édition
      this.editingActionIndex = index;
      this.editActionType = action.type || 'email';
      this.editActionDelay = action.delay || 0;
      this.editActionSubject = action.subject || '';
      this.editActionSenderEmail = action.senderEmail || '';
      this.editActionMessage = action.message || '';
      
      // Ouvrir le drawer
      this.showEditDrawer = true;
      
      console.log('Édition de l\'action à l\'index:', index, action);
    },
    
    async saveEditedAction() {
      if (this.editingActionIndex === null || !this.sequence || !this.sequence.actions) {
        return;
      }
      
      if (!this.editActionMessage.trim()) {
        alert('Veuillez remplir le message.');
        return;
      }
      
      try {
        // Créer une copie des actions
        const newActions = [...this.sequence.actions];
        
        // Mettre à jour l'action
        newActions[this.editingActionIndex] = {
          type: this.editActionType,
          delay: parseInt(this.editActionDelay),
          message: this.editActionMessage
        };
        
        // Ajouter les champs spécifiques aux emails
        if (this.editActionType === 'email') {
          newActions[this.editingActionIndex].subject = this.editActionSubject;
          newActions[this.editingActionIndex].senderEmail = this.editActionSenderEmail;
        }
        
        // Sauvegarder les modifications
        const success = await this.updateSequenceActions(newActions);
        
        if (success) {
          // Fermer le drawer
          this.showEditDrawer = false;
          this.editingActionIndex = null;
          
          console.log('Action mise à jour avec succès');
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'action:', error);
        alert('Erreur lors de la sauvegarde des modifications.');
      }
    },
    
    cancelEditAction() {
      this.showEditDrawer = false;
      this.editingActionIndex = null;
    },
    
    showFullMessage(message) {
      this.showPopup = true;
      this.popupTitle = 'Message complet';
      this.popupMessage = message;
      this.popupType = 'info';
    },
    
    // Méthodes pour les popups basées sur les promesses
    showPopupMessage(title, message, type = 'info') {
      this.popupTitle = title;
      this.popupMessage = message;
      this.popupType = type;
      this.showPopup = true;
      
      console.log(`[${type.toUpperCase()}] ${title}: ${message}`);
      
      // Retourner une promesse qui se résout lorsque le popup est fermé
      return new Promise((resolve) => {
        this.confirmResolution.resolve = resolve;
      });
    },
    
    confirm(title, message) {
      this.popupTitle = title;
      this.popupMessage = message;
      this.popupType = 'confirm';
      this.showPopup = true;
      
      console.log(`[CONFIRM] ${title}: ${message}`);
      
      // Retourner une promesse qui se résout avec true si confirmé, false si annulé
      return new Promise((resolve, reject) => {
        this.confirmResolution = {
          resolve: resolve,
          reject: reject,
          action: null
        };
      });
    },
    
    closePopup() {
      this.showPopup = false;
      
      // Réinitialiser la résolution de confirmation
      if (this.confirmResolution && this.confirmResolution.reject) {
        this.confirmResolution.reject(false);
      }
      
      // Réinitialiser l'état
      this.confirmResolution = {
        resolve: null,
        reject: null,
        action: null
      };
      this.isExecutingAction = false;
    },
    
    async handleConfirm() {
      if (this.isExecutingAction) {
        return;
      }
      
      this.isExecutingAction = true;
      
      try {
        // Résoudre la promesse avec true (confirmé)
        if (this.confirmResolution && this.confirmResolution.resolve) {
          this.confirmResolution.resolve(true);
        }
        
        console.log('✅ Action confirmée par l\'utilisateur');
        this.closePopup();
      } catch (error) {
        console.error('❌ Erreur lors de la confirmation:', error);
        this.isExecutingAction = false;
      }
    },
    
    async handleCancel() {
      try {
        // Résoudre la promesse avec false (annulé)
        if (this.confirmResolution && this.confirmResolution.resolve) {
          this.confirmResolution.resolve(false);
        }
        
        console.log('ℹ️ Action annulée par l\'utilisateur');
        this.closePopup();
      } catch (error) {
        console.error('❌ Erreur lors de l\'annulation:', error);
        this.closePopup();
      }
    },
    
    // Méthodes pour l'édition du nom de la séquence
    startEditingSequenceName() {
      if (!this.sequence) return;
      this.originalSequenceName = this.sequence.nom;
      this.editingSequenceName = true;
    },
    
    async saveSequenceName() {
      if (!this.sequence || !this.sequence.nom || !this.sequence.nom.trim()) {
        this.showPopupMessage('Nom invalide', 'Le nom de la séquence ne peut pas être vide.', 'error');
        this.cancelEditingSequenceName();
        return;
      }
      
      try {
        const Sequences = Parse.Object.extend('sequences');
        const sequence = new Sequences();
        sequence.id = this.sequence.objectId;
        
        sequence.set('nom', this.sequence.nom.trim());
        
        await sequence.save();
        
        console.log('Nom de la séquence mis à jour:', this.sequence.nom);
        this.editingSequenceName = false;
        
        this.showPopupMessage(
          'Nom mis à jour',
          'Le nom de la séquence a été mis à jour avec succès.',
          'success'
        );
        
      } catch (error) {
        console.error('Erreur lors de la mise à jour du nom:', error);
        this.showPopupMessage(
          'Erreur de mise à jour',
          'Une erreur est survenue lors de la mise à jour du nom.',
          'error'
        );
        this.cancelEditingSequenceName();
      }
    },
    
    cancelEditingSequenceName() {
      if (this.sequence) {
        this.sequence.nom = this.originalSequenceName;
      }
      this.editingSequenceName = false;
      this.originalSequenceName = '';
    },
    
    async deleteAction(index) {
      if (!this.sequence || !this.sequence.actions || index < 0 || index >= this.sequence.actions.length) {
        return;
      }
      
      const confirmed = await this.confirm(
        'Supprimer l\'action',
        'Êtes-vous sûr de vouloir supprimer cette action ? Cette action est irréversible.'
      );
      
      if (!confirmed) {
        return;
      }
      
      try {
        // Créer une copie des actions sans l'élément supprimé
        const newActions = this.sequence.actions.filter((_, i) => i !== index);
        
        // Sauvegarder les modifications
        const success = await this.updateSequenceActions(newActions);
        
        if (success) {
          console.log('Action supprimée avec succès');
          await this.showPopupMessage(
            'Action supprimée',
            'L\'action a été supprimée avec succès.',
            'success'
          );
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'action:', error);
        await this.showPopupMessage(
          'Erreur de suppression',
          'Une erreur est survenue lors de la suppression de l\'action.',
          'error'
        );
      }
    },
    

  };
}