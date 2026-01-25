// sequencesState.js - État Alpine.js pour la page des séquences
function sequencesState() {
  return {
    sequences: [],
    searchQuery: '',
    showCreateDrawer: false,
    showEditModal: false,
    currentSequence: null,
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
        
        // Redirection vers la page de détail de la séquence
        window.location.href = `/app/relances/sequences/${sequence.id}`;
        
        console.log('Séquence créée avec succès');
      } catch (error) {
        console.error('Erreur lors de la création de la séquence:', error);
      }
    },
    
    openEditModal(sequence) {
      this.currentSequence = {
        ...sequence,
        originalActions: [...sequence.actions] // Sauvegarde pour annulation
      };
      this.showEditModal = true;
    },
    
    closeEditModal() {
      this.showEditModal = false;
      this.currentSequence = null;
    },
    
    addEditAction() {
      this.currentSequence.actions.push({type: 'email', message: '', delay: 0});
    },
    
    removeEditAction(index) {
      this.currentSequence.actions.splice(index, 1);
    },
    
    async updateSequence() {
      try {
        const Sequences = Parse.Object.extend('sequences');
        const sequence = new Sequences();
        sequence.id = this.currentSequence.objectId;
        
        sequence.set('nom', this.currentSequence.nom);
        sequence.set('isActif', this.currentSequence.isActif);
        sequence.set('actions', this.currentSequence.actions);
        
        await sequence.save();
        
        this.closeEditModal();
        await this.fetchSequences();
        
        console.log('Séquence mise à jour avec succès');
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la séquence:', error);
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
    }
  };
}
