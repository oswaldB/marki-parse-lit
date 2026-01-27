// Script pour récupérer le schéma de la classe impayes
const Parse = require('parse/node');

// Initialisation de Parse avec les informations de configuration
Parse.initialize("YOUR_APP_ID", "YOUR_JS_KEY");
Parse.serverURL = "http://localhost:1337/parse";

async function getSchema() {
    try {
        // Récupérer le schéma de la classe impayes
        const schema = await Parse.Schema.all();
        const impayesSchema = schema.find(cls => cls.className === 'impayes');

        if (impayesSchema) {
            console.log('Schéma de la classe impayes :');
            console.log('Colonnes :', impayesSchema.fields);
            return impayesSchema.fields;
        } else {
            console.log('La classe impayes n\'existe pas dans le schéma.');
            return null;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du schéma :', error);
        return null;
    }
}

// Exécuter la fonction
getSchema().then(result => {
    if (result) {
        console.log('Colonnes disponibles :', Object.keys(result));
    }
});