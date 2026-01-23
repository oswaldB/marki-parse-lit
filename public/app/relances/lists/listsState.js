// listsState.js - État Alpine.js pour la page des listes
function listsState() {
  return {
    lists: [],
    isDrawerOpen: false,
    newListName: '',
    init() {
      // Initialisation du SDK Parse avec la configuration
      if (window.parseConfig) {
        Parse.initialize(window.parseConfig.appId, window.parseConfig.javascriptKey);
        Parse.serverURL = window.parseConfig.serverURL;
      }
      this.fetchLists();
    },
    async fetchLists() {
      try {
        // Utilisation directe du SDK Parse
        const query = new Parse.Query('listes_relances');
        query.limit(99999);
        const results = await query.find();
        this.lists = results.map(record => ({
          ...record.toJSON(),
          objectId: record.id
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des listes:', error);
      }
    },
    openDrawer() {
      this.isDrawerOpen = true;
    },
    closeDrawer() {
      this.isDrawerOpen = false;
    },
    async createList() {
      try {
        if (!window.parseConfig) {
          console.error('Parse n\'est pas initialisé.');
          return;
        }
        
        // Vérifier les données envoyées
        const listData = {
          nom: this.newListName,
          is_auto: false,
          isActif: true,
          isArchive: false,
          date_creation: new Date().toISOString(),
          date_modification: new Date().toISOString(),
        };
        console.log('Données envoyées:', listData);
        
        // Création de la liste
        const ListesRelances = Parse.Object.extend('listes_relances');
        const newList = new ListesRelances();
        Object.keys(listData).forEach(key => {
          newList.set(key, listData[key]);
        });
        const savedList = await newList.save();
        this.closeDrawer();
        this.newListName = '';
        await this.fetchLists();
        window.location.href = `/app/relances/list/#${savedList.id}`;
      } catch (error) {
        console.error('Erreur lors de la création de la liste:', error);
      }
    },
    viewList(listId) {
      window.location.href = `/app/relances/list/#${listId}`;
    }
  };
}
