// État Alpine.js pour la gestion de l'équipe
// Ce fichier contient toute la logique métier pour la page de gestion d'équipe

export function initTeamState() {
    document.addEventListener('alpine:init', () => {
        Alpine.data('teamState', () => ({
        // État initial
        sidebarOpen: false,
        drawerOpen: false,
        drawerTitle: 'Ajouter un membre',
        currentUser: null,
        users: [],
        currentUserData: {
            objectId: null,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            is_admin: false
        },

        // Initialisation
        init() {
            // Initialiser Parse si ce n'est pas déjà fait
            this.initializeParse();
        },

        // Initialisation de Parse
        initializeParse() {
            try {           
                // Vérifier si Parse est déjà initialisé
                if (!Parse.applicationId) {
                    if (window.parseConfig) {
                        Parse.initialize(window.parseConfig.appId, window.parseConfig.javascriptKey);
                        Parse.serverURL = window.parseConfig.serverURL;
                    } else {
                        console.error('Configuration Parse non disponible');
                        window.location.href = '/login';
                        return;
                    }
                }
                
                // Une fois Parse initialisé, vérifier l'authentification et charger les utilisateurs
                this.currentUser = Parse.User.current();
                this.checkAuth();
                this.loadUsers();
            } catch (error) {
                console.error('Erreur lors de l\'initialisation de Parse:', error);
                window.location.href = '/login';
            }
        },

        // Vérification de l'authentification (sans vérification is_admin)
        checkAuth() {
            if (!this.currentUser) {
                window.location.href = '/login';
                return;
            }
            // Plus de vérification is_admin - tous les utilisateurs authentifiés peuvent accéder
        },

        // Chargement des utilisateurs
        async loadUsers() {
            try {
                const query = new Parse.Query(Parse.User);
                const results = await query.find();
                this.users = results.map(user => ({
                    objectId: user.id,
                    firstName: user.get('firstName') || '',
                    lastName: user.get('lastName') || '',
                    email: user.get('email') || '',
                    is_admin: user.get('is_admin') || false
                }));
            } catch (error) {
                console.error('Erreur lors du chargement des utilisateurs:', error);
                window.toasterStore.addToast({
                    id: 'load-users-error-' + Date.now(),
                    type: 'error',
                    title: 'Erreur de chargement',
                    message: 'Impossible de charger la liste des utilisateurs.',
                    autoDismiss: true
                });
            }
        },

        // Ouverture du drawer pour ajouter/modifier un utilisateur
        openUserDrawer(user) {
            if (user) {
                this.drawerTitle = 'Modifier le membre';
                this.currentUserData = {
                    objectId: user.objectId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: '',
                    is_admin: user.is_admin
                };
            } else {
                this.drawerTitle = 'Ajouter un membre';
                this.currentUserData = {
                    objectId: null,
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    is_admin: false
                };
            }
            this.drawerOpen = true;
        },

        // Fermeture du drawer
        closeDrawer() {
            this.drawerOpen = false;
        },

        // Sauvegarde d'un utilisateur (création ou mise à jour)
        async saveUser() {
            try {
                const userData = { ...this.currentUserData };
                
                if (userData.objectId) {
                    // Mise à jour d'un utilisateur existant
                    await this.updateUser(userData);
                    window.toasterStore.addToast({
                        id: 'update-user-success-' + Date.now(),
                        type: 'success',
                        title: 'Succès',
                        message: 'Utilisateur mis à jour avec succès.',
                        autoDismiss: true
                    });
                } else {
                    // Création d'un nouvel utilisateur
                    await this.createUser(userData);
                    window.toasterStore.addToast({
                        id: 'create-user-success-' + Date.now(),
                        type: 'success',
                        title: 'Succès',
                        message: 'Utilisateur créé avec succès.',
                        autoDismiss: true
                    });
                }
                
                this.closeDrawer();
                await this.loadUsers();
            } catch (error) {
                console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
                window.toasterStore.addToast({
                    id: 'save-user-error-' + Date.now(),
                    type: 'error',
                    title: 'Erreur d\'enregistrement',
                    message: 'Une erreur est survenue: ' + error.message,
                    autoDismiss: true
                });
            }
        },

        // Création d'un nouvel utilisateur via Cloud Function
        async createUser(userData) {
            try {
                const response = await Parse.Cloud.run('createUser', userData, { useMasterKey: true });
                return response;
            } catch (error) {
                console.error('Erreur lors de la création de l\'utilisateur:', error);
                throw error;
            }
        },

        // Mise à jour d'un utilisateur via Cloud Function
        async updateUser(userData) {
            try {
                const response = await Parse.Cloud.run('updateUser', userData, { useMasterKey: true });
                return response;
            } catch (error) {
                console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
                throw error;
            }
        },

        // Déconnexion de l'utilisateur
        async logout() {
            try {
                await Parse.User.logOut();
                window.location.href = '/login';
            } catch (error) {
                console.error('Erreur lors de la déconnexion:', error);
                window.toasterStore.addToast({
                    id: 'logout-error-' + Date.now(),
                    type: 'error',
                    title: 'Erreur de déconnexion',
                    message: 'Une erreur est survenue lors de la déconnexion.',
                    autoDismiss: true
                });
            }
        }
    }));
});