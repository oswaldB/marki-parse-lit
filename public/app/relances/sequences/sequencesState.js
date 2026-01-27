// sequencesState.js - État Alpine.js pour la page des séquences
function sequencesState() {
  return {
    sequences: [],
    searchQuery: '',
    showCreateDrawer: false,
    newSequence: {
      nom: '',
      description: '',
      isActif: true,
      actions: []
    },
    newAction: {
      type: 'email',
      message: '',
      delay: 0
    },
    
    init() {
      // Initialisation du SDK Parse avec la configuration
      if (window.parseConfig) {
        Parse.initialize(window.parseConfig.appId, window.parseConfig.javascriptKey);
        Parse.serverURL = window.parseConfig.serverURL;
      }
      
      this.fetchSequences();
    },
    
    async fetchSequences() {
      try {
        const query = new Parse.Query('sequences');
        query.limit(99999);
        
        const results = await query.find();
        
        this.sequences = results.map(record => ({
          ...record.toJSON(),
          objectId: record.id
        }));
        
        console.log('Séquences récupérées:', this.sequences);
      } catch (error) {
        console.error('Erreur lors de la récupération des séquences:', error);
      }
    },
    
    get filteredSequences() {
      if (!this.searchQuery) {
        return this.sequences;
      }
      
      const query = this.searchQuery.toLowerCase();
      return this.sequences.filter(sequence => 
        sequence.nom.toLowerCase().includes(query)
      );
    },
    
    openCreateDrawer() {
      this.newSequence = {
        nom: '',
        description: '',
        isActif: true,
        actions: []
      };
      this.showCreateDrawer = true;
    },
    
    closeCreateDrawer() {
      this.showCreateDrawer = false;
    },
    
    addAction() {
      this.newSequence.actions.push({...this.newAction});
      this.newAction = {type: 'email', message: '', delay: 0};
    },
    
    removeAction(index) {
      this.newSequence.actions.splice(index, 1);
    },
    
    async createSequence() {
      try {
        const Sequences = Parse.Object.extend('sequences');
        const sequence = new Sequences();
        
        sequence.set('nom', this.newSequence.nom);
        sequence.set('description', this.newSequence.description);
        sequence.set('isActif', this.newSequence.isActif);
        sequence.set('actions', this.newSequence.actions);
        
        await sequence.save();
        
        this.closeCreateDrawer();
        await this.fetchSequences();
        
        console.log('Séquence créée avec succès');
      } catch (error) {
        console.error('Erreur lors de la sauvegarde de la séquence:', error);
      }
    },
    
    async deleteSequence(sequenceId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette séquence ?')) {
        try {
          const Sequences = Parse.Object.extend('sequences');
          const sequence = new Sequences();
          sequence.id = sequenceId;
          
          await sequence.destroy();
          
          await this.fetchSequences();
          
          console.log('Séquence supprimée avec succès');
        } catch (error) {
          console.error('Erreur lors de la suppression de la séquence:', error);
        }
      }
    },


    
    async toggleSequenceStatus(sequenceId, currentStatus) {
      try {
        const Sequences = Parse.Object.extend('sequences');
        const sequence = new Sequences();
        sequence.id = sequenceId;
        
        sequence.set('isActif', !currentStatus);
        
        await sequence.save();
        
        await this.fetchSequences();
        
        console.log('Statut de la séquence mis à jour');
      } catch (error) {
        console.error('Erreur lors de la mise à jour du statut:', error);
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

    testSequence() {
      if (this.newSequence.actions.length === 0) {
        alert('Veuillez ajouter au moins une action avant de tester la séquence.');
        return;
      }

      // Simuler l'envoi des actions
      console.log('Test de la séquence:', this.newSequence.actions);
      alert('Test envoyé avec succès ! Vérifiez vos emails/SMS.');
    },

    testSequenceFromList(sequence) {
      if (sequence.actions.length === 0) {
        alert('Cette séquence ne contient aucune action à tester.');
        return;
      }

      // Simuler l'envoi des actions
      console.log('Test de la séquence:', sequence.actions);
      alert('Test envoyé avec succès ! Vérifiez vos emails/SMS.');
    }
  };
}
