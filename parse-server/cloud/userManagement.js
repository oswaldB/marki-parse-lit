// Cloud Functions pour la gestion des utilisateurs

// Création d'un nouvel utilisateur
Parse.Cloud.define("createUser", async (request) => {
    const { firstName, lastName, email, password, is_admin } = request.params;
    
    // Validation des paramètres
    if (!firstName || !lastName || !email || !password) {
        throw new Error("Tous les champs sont requis (sauf is_admin)");
    }

    try {
        // Vérifier si l'utilisateur existe déjà
        const query = new Parse.Query(Parse.User);
        query.equalTo("email", email);
        const existingUser = await query.first({ useMasterKey: true });
        
        if (existingUser) {
            throw new Error("Un utilisateur avec cet email existe déjà");
        }

        // Créer le nouvel utilisateur
        const user = new Parse.User();
        user.set("username", email); // Utiliser l'email comme username
        user.set("email", email);
        user.set("password", password);
        user.set("firstName", firstName);
        user.set("lastName", lastName);
        user.set("is_admin", is_admin || false);

        // Sauvegarder l'utilisateur
        await user.save(null, { useMasterKey: true });
        
        return {
            success: true,
            message: "Utilisateur créé avec succès",
            userId: user.id
        };
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur:", error);
        throw new Error("Erreur lors de la création de l'utilisateur: " + error.message);
    }
}, { requireMaster: true });

// Mise à jour d'un utilisateur existant
Parse.Cloud.define("updateUser", async (request) => {
    const { objectId, firstName, lastName, email, password, is_admin } = request.params;
    
    // Validation des paramètres
    if (!objectId || !firstName || !lastName || !email) {
        throw new Error("Les champs objectId, firstName, lastName et email sont requis");
    }

    try {
        // Récupérer l'utilisateur
        const query = new Parse.Query(Parse.User);
        const user = await query.get(objectId, { useMasterKey: true });
        
        if (!user) {
            throw new Error("Utilisateur non trouvé");
        }

        // Mettre à jour les champs
        user.set("firstName", firstName);
        user.set("lastName", lastName);
        user.set("email", email);
        user.set("username", email); // Mettre à jour le username avec le nouvel email
        user.set("is_admin", is_admin || false);

        // Mettre à jour le mot de passe uniquement s'il est fourni
        if (password && password.trim() !== "") {
            user.set("password", password);
        }

        // Sauvegarder les modifications
        await user.save(null, { useMasterKey: true });
        
        return {
            success: true,
            message: "Utilisateur mis à jour avec succès",
            userId: user.id
        };
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
        throw new Error("Erreur lors de la mise à jour de l'utilisateur: " + error.message);
    }
}, { requireMaster: true });