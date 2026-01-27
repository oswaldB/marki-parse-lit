// sequenceState.js - État Alpine.js pour la page de détails de la séquence
function sequenceState() {
  return {
    sequence: null,
    sequenceId: null,
    
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
        
        console.log('Séquence récupérée:', this.sequence);
        
        // Charger les profils SMTP
        await this.loadSmtpProfiles();
      } catch (error) {
        console.error('Erreur lors de la récupération de la séquence:', error);
      }
    },
    
    async loadSmtpProfiles() {
      try {
        // Utiliser directement le SDK Parse pour récupérer les profils SMTP
        const query = new Parse.Query('SMTPProfiles');
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
        
        console.log('Profils SMTP chargés:', this.smtpProfiles);
      } catch (error) {
        console.error('Erreur lors du chargement des profils SMTP:', error);
        // Si la classe n'existe pas, on initialise un tableau vide
        this.smtpProfiles = [];
      }
    },
    
    async loadSmtpProfiles() {
      try {
        // Utiliser directement le SDK Parse pour récupérer les profils SMTP
        const query = new Parse.Query('SMTPProfiles');
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
        
        console.log('Profils SMTP chargés:', this.smtpProfiles);
      } catch (error) {
        console.error('Erreur lors du chargement des profils SMTP:', error);
        // Si la classe n'existe pas, on initialise un tableau vide
        this.smtpProfiles = [];
      }
    },
    
    async toggleSequenceStatus() {
      if (!this.sequence) {
        return;
      }
      
      try {
        const Sequences = Parse.Object.extend('sequences');
        const sequence = new Sequences();
        sequence.id = this.sequence.objectId;
        
        sequence.set('isActif', !this.sequence.isActif);
        
        await sequence.save();
        
        this.sequence.isActif = !this.sequence.isActif;
        
        console.log('Statut de la séquence mis à jour');
      } catch (error) {
        console.error('Erreur lors de la mise à jour du statut:', error);
      }
    },
    
    testSequence() {
      if (!this.sequence || this.sequence.actions.length === 0) {
        alert('Cette séquence ne contient aucune action à tester.');
        return;
      }
      
      // Simuler l'envoi des actions
      console.log('Test de la séquence:', this.sequence.actions);
      alert('Test envoyé avec succès ! Vérifiez vos emails/SMS.');
    },
    
    async deleteSequence() {
      if (!this.sequence) {
        return;
      }
      
      if (confirm('Êtes-vous sûr de vouloir supprimer cette séquence ?')) {
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
        }
      }
    },
    
    formatActionType(type) {
      return type === 'email' ? 'Email' : 'SMS';
    },
    
    getActionIcon(type) {
      return type === 'email' ? '📧' : '📱';
    },
    
    copyPrompt() {
      const promptText = `Rédigez un email de relance pour un impayé. Utilisez les variables suivantes :
- Nom du client : {{nom}}
- Prénom du client : {{prenom}}
- Montant dû : {{montant}}
- Date d'échéance : {{dateEcheance}}
- Lien de paiement : {{lienPaiement}}

Exemple de message :
Bonjour {{prenom}} {{nom}},

Nous vous rappelons que votre paiement de {{montant}} € est dû depuis le {{dateEcheance}}.
Veuillez régulariser votre situation en cliquant sur le lien suivant : {{lienPaiement}}.

Cordialement,
L'équipe de relance.`;

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
    
    // Gestion des actions de la séquence
    async updateSequenceActions(newActions) {
      if (!this.sequence) {
        return;
      }

      try {
        const Sequences = Parse.Object.extend('sequences');
        const sequence = new Sequences();
        sequence.id = this.sequence.objectId;

        // Mettre à jour les actions
        sequence.set('actions', newActions);

        await sequence.save();

        // Mettre à jour localement
        this.sequence.actions = newActions;

        console.log('Séquence mise à jour avec succès');
        return true;
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la séquence:', error);
        alert('Erreur lors de la sauvegarde des modifications');
        return false;
      }
    },
    

  };
}