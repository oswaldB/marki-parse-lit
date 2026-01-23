// listState.js - État Alpine.js pour la page de détail d'une liste
function listState() {
  return {
    list: {
      nom: '',
      is_auto: false,
      isActif: true,
      isArchive: false,
      date_creation: '',
      date_modification: '',
      filters: {}
    },
    listId: '',
    impayes: [],
    filters: {
      minAmount: 0,
      maxAmount: 0,
      minDaysOverdue: 0,
      maxDaysOverdue: 0
    },
    sequenceName: '',
    sequenceType: 'email',
    sequenceDelay: 1,
    sequenceSteps: [],
    init() {
      // Initialisation du SDK Parse avec la configuration
      if (window.parseConfig) {
        Parse.initialize(window.parseConfig.appId, window.parseConfig.javascriptKey);
        Parse.serverURL = window.parseConfig.serverURL;
      }
      
      // Récupérer l'ID de la liste depuis l'URL
      const hash = window.location.hash.substring(1);
      if (hash) {
        this.listId = hash;
        this.fetchListDetails();
        this.fetchImpayesForList();
      }
    },
    async fetchListDetails() {
      try {
        const query = new Parse.Query('listes_relances');
        const list = await query.get(this.listId);
        this.list = {
          ...list.toJSON(),
          objectId: list.id,
          filters: list.get('filters') || {}
        };
        
        // Charger les filtres si disponibles
        if (this.list.filters) {
          this.filters = {
            minAmount: this.list.filters.minAmount || 0,
            maxAmount: this.list.filters.maxAmount || 0,
            minDaysOverdue: this.list.filters.minDaysOverdue || 0,
            maxDaysOverdue: this.list.filters.maxDaysOverdue || 0
          };
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de la liste:', error);
      }
    },
    async fetchImpayesForList() {
      try {
        const query = new Parse.Query('Impayes');
        query.equalTo('list_id', this.listId);
        query.notEqualTo('resteapayer', 0);
        const results = await query.find();
        this.impayes = results.map(record => ({
          ...record.toJSON(),
          objectId: record.id
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des impayés pour cette liste:', error);
      }
    },
    toggleAutoMode() {
      this.list.is_auto = !this.list.is_auto;
    },
    async saveList() {
      try {
        const ListesRelances = Parse.Object.extend('listes_relances');
        const listToSave = new ListesRelances();
        listToSave.id = this.listId;
        
        // Mettre à jour les propriétés de la liste
        listToSave.set('nom', this.list.nom);
        listToSave.set('is_auto', this.list.is_auto);
        listToSave.set('isActif', this.list.isActif);
        listToSave.set('isArchive', this.list.isArchive);
        listToSave.set('date_modification', new Date().toISOString());
        
        // Sauvegarder les filtres si le mode automatique est activé
        if (this.list.is_auto) {
          listToSave.set('filters', this.filters);
        }
        
        await listToSave.save();
        alert('Liste sauvegardée avec succès !');
      } catch (error) {
        console.error('Erreur lors de la sauvegarde de la liste:', error);
      }
    },
    calculateDaysOverdue(impaye) {
      if (!impaye.datepiece || impaye.facturesoldee) {
        return 0;
      }
      
      let datePiece;
      if (impaye.datepiece && impaye.datepiece.iso) {
        datePiece = new Date(impaye.datepiece.iso);
      } else if (typeof impaye.datepiece === 'string') {
        datePiece = new Date(impaye.datepiece);
      } else if (impaye.datepiece instanceof Date) {
        datePiece = impaye.datepiece;
      } else {
        return 0;
      }
      
      const today = new Date();
      const timeDiff = today.getTime() - datePiece.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      return daysDiff;
    },
    get filteredImpayes() {
      return this.impayes.filter(impaye => {
        const daysOverdue = this.calculateDaysOverdue(impaye);
        return (
          (this.filters.minAmount === 0 || impaye.resteapayer >= this.filters.minAmount) &&
          (this.filters.maxAmount === 0 || impaye.resteapayer <= this.filters.maxAmount) &&
          (this.filters.minDaysOverdue === 0 || daysOverdue >= this.filters.minDaysOverdue) &&
          (this.filters.maxDaysOverdue === 0 || daysOverdue <= this.filters.maxDaysOverdue)
        );
      });
    },
    async removeFromList(impayeId) {
      try {
        const Impayes = Parse.Object.extend('Impayes');
        const impaye = new Impayes();
        impaye.id = impayeId;
        impaye.set('list_id', null);
        await impaye.save();
        await this.fetchImpayesForList();
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'impayé de la liste:', error);
      }
    },
    addStep() {
      this.sequenceSteps.push({
        subject: '',
        message: ''
      });
    },
    removeStep(index) {
      this.sequenceSteps.splice(index, 1);
    },
    async createSequence() {
      try {
        const Sequences = Parse.Object.extend('Sequences');
        const newSequence = new Sequences();
        
        newSequence.set('nom', this.sequenceName);
        newSequence.set('type', this.sequenceType);
        newSequence.set('delay', this.sequenceDelay);
        newSequence.set('steps', this.sequenceSteps);
        newSequence.set('list_id', this.listId);
        
        await newSequence.save();
        alert('Séquence créée avec succès !');
        this.sequenceName = '';
        this.sequenceType = 'email';
        this.sequenceDelay = 1;
        this.sequenceSteps = [];
      } catch (error) {
        console.error('Erreur lors de la création de la séquence:', error);
      }
    }
  };
}
