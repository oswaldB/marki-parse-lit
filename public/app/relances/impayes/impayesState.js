// impayesState.js - État Alpine.js pour la page des impayés
function impayesState() {
  return {
    impayes: [],
    searchQuery: '',
    filterStatus: 'all',
    currentPage: 1,
    itemsPerPage: 10,
    init() {
      // Initialisation du SDK Parse avec la configuration
      if (window.parseConfig) {
        Parse.initialize(window.parseConfig.appId, window.parseConfig.javascriptKey);
        Parse.serverURL = window.parseConfig.serverURL;
      }
      
      this.fetchImpayes();
    },
    async fetchImpayes() {
      try {
        // Utilisation directe du SDK Parse
        const query = new Parse.Query('Impayes');
        query.limit(99999);
        
        const results = await query.find();
        
        this.impayes = results.map(record => ({
          ...record.toJSON(),
          objectId: record.id,
          datepiece: record.get('datepiece') ? this.formatDateForDisplay(record.get('datepiece')) : null
        }));
        
        console.log('Impayés récupérés:', this.impayes);
      } catch (error) {
        console.error('Erreur lors de la récupération des impayés:', error);
      }
    },
    formatDateForDisplay(date) {
      // Vérifier si la date est un objet avec une propriété iso
      if (date && date.iso) {
        return new Date(date.iso);
      }
      
      // Vérifier si la date est une chaîne de caractères au format ISO
      if (typeof date === 'string' && !isNaN(new Date(date).getTime())) {
        return new Date(date);
      }
      
      // Si la date est déjà un objet Date
      if (date instanceof Date) {
        return date;
      }
      
      // Si la date n'est pas valide
      return null;
    },
    // Ajouter les nouvelles propriétés pour la vue par payeur
    viewMode: 'list', // 'list' ou 'byPayeur'
    showListDrawer: false,
    
    // Tableaux séparés pour les impayés et les payés
    get impayesUnpaid() {
      return this.impayes.filter(impaye => !impaye.facturesoldee || (impaye.resteapayer && impaye.resteapayer > 0));
    },
    
    get impayesPaid() {
      return this.impayes.filter(impaye => impaye.facturesoldee || (impaye.resteapayer && impaye.resteapayer === 0));
    },
    
    // Recherche sur les deux tableaux
    get filteredImpayes() {
      let filtered = this.impayes;
      
      // Filtrer par statut
      if (this.filterStatus === 'unpaid') {
        filtered = this.impayesUnpaid;
      } else if (this.filterStatus === 'paid') {
        filtered = this.impayesPaid;
      }
      
      // Filtrer par recherche sur les deux tableaux
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        const unpaidFiltered = this.impayesUnpaid.filter(impaye =>
          impaye.nfacture.toString().includes(query) ||
          (impaye.payeur_nom && impaye.payeur_nom.toLowerCase().includes(query)) ||
          (impaye.payeur_email && impaye.payeur_email.toLowerCase().includes(query)) ||
          (impaye.reference && impaye.reference.toLowerCase().includes(query))
        );
        const paidFiltered = this.impayesPaid.filter(impaye =>
          impaye.nfacture.toString().includes(query) ||
          (impaye.payeur_nom && impaye.payeur_nom.toLowerCase().includes(query)) ||
          (impaye.payeur_email && impaye.payeur_email.toLowerCase().includes(query)) ||
          (impaye.reference && impaye.reference.toLowerCase().includes(query))
        );
        
        // Combiner les résultats
        filtered = [...unpaidFiltered, ...paidFiltered];
      } else {
        // Si pas de recherche, utiliser le filtre de statut
        if (this.filterStatus === 'all') {
          filtered = [...this.impayesUnpaid, ...this.impayesPaid];
        }
      }
      
      // Trier par nombre de jours de retard (les plus retardataires en haut)
      filtered.sort((a, b) => {
        const daysA = this.calculateDaysOverdue(a);
        const daysB = this.calculateDaysOverdue(b);
        return daysB - daysA; // Tri décroissant
      });
      
      return filtered;
    },
    
    // Vue groupée par payeur
    get impayesByPayeur() {
      const grouped = {};
      
      // Filtrer d'abord selon le statut
      let filtered = this.impayes;
      if (this.filterStatus === 'unpaid') {
        filtered = this.impayesUnpaid;
      } else if (this.filterStatus === 'paid') {
        filtered = this.impayesPaid;
      }
      
      // Appliquer la recherche
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(impaye =>
          impaye.nfacture.toString().includes(query) ||
          (impaye.payeur_nom && impaye.payeur_nom.toLowerCase().includes(query)) ||
          (impaye.payeur_email && impaye.payeur_email.toLowerCase().includes(query)) ||
          (impaye.reference && impaye.reference.toLowerCase().includes(query))
        );
      }
      
      // Grouper par payeur
      filtered.forEach(impaye => {
        const payeurKey = impaye.payeur_nom || 'Inconnu';
        if (!grouped[payeurKey]) {
          grouped[payeurKey] = [];
        }
        grouped[payeurKey].push(impaye);
      });
      
      return grouped;
    },
    calculateDaysOverdue(impaye) {
      if (!impaye.datepiece || impaye.facturesoldee) {
        return 0;
      }
      
      // Convertir la date de la pièce en objet Date
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
      
      // Calculer le nombre de jours de retard
      const today = new Date();
      const timeDiff = today.getTime() - datePiece.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      return daysDiff;
    },
    get paginatedImpayes() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredImpayes.slice(startIndex, endIndex);
    },
    get totalPages() {
      return Math.ceil(this.filteredImpayes.length / this.itemsPerPage);
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    viewImpaye(impayeId) {
      window.location.href = `/app/relances/impayes/${impayeId}`;
    },
    
    toggleViewMode() {
      this.viewMode = this.viewMode === 'list' ? 'byPayeur' : 'list';
      this.currentPage = 1; // Réinitialiser à la première page lors du changement de mode
    },
    
    getViewModeLabel() {
      return this.viewMode === 'list' ? 'Vue par payeur' : 'Vue liste';
    },
    toggleListDrawer() {
      this.showListDrawer = !this.showListDrawer;
    },
    formatDate(date) {
      if (!date) return 'N/A';
      
      // Vérifier si la date est un objet avec une propriété iso
      if (date && date.iso) {
        return new Date(date.iso).toLocaleDateString();
      }
      
      // Vérifier si la date est une chaîne de caractères au format ISO
      if (typeof date === 'string' && !isNaN(new Date(date).getTime())) {
        return new Date(date).toLocaleDateString();
      }
      
      // Si la date est déjà un objet Date
      if (date instanceof Date) {
        return date.toLocaleDateString();
      }
      
      // Si la date n'est pas valide
      return 'Date invalide';
    }
  };
}