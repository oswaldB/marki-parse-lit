// Script pour récupérer le schéma de la classe impayes
const Parse = require('parse/node');
require('dotenv').config();

// Initialisation de Parse avec les variables d'environnement ou les valeurs par défaut
const appId = 'marki';
const jsKey = 'Careless7-Gore4-Guileless0-Jogger5-Clubbed9';
const masterKey = "Shaky4-Exception6"; // À remplacer par la vraie master key
const serverURL = 'https://dev.parse.markidiags.com';

Parse.initialize(appId, jsKey, masterKey);
Parse.serverURL = serverURL;

async function getSchema() {
    try {
        // Utiliser la master key pour les requêtes
        Parse.Cloud.useMasterKey();
        
        // Récupérer le schéma de la classe Impayes (avec majuscule)
        const schema = await Parse.Schema.all();
        const impayesSchema = schema.find(cls => cls.className === 'Impayes',{ useMasterKey: true });

        if (impayesSchema) {
            console.log('Schéma de la classe Impayes :');
            console.log('Colonnes :', impayesSchema.fields);
            return impayesSchema.fields;
        } else {
            console.log('La classe Impayes n\'existe pas dans le schéma.');
            return null;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du schéma :', error);
        return null;
    }
}

// Définir une fonction cloud pour récupérer le schéma
Parse.Cloud.define('getImpayesSchema', async (request) => {
  return await getSchema();
});

// Exporter la fonction pour qu'elle soit utilisée par main.js
module.exports = { getSchema };