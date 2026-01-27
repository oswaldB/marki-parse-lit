// Script pour récupérer le schéma de la classe impayes
const Parse = require('parse/node');
require('dotenv').config();

// Initialisation de Parse avec les variables d'environnement ou les valeurs par défaut
const appId = process.env.PARSE_APPLICATION_ID || 'marki';
const jsKey = process.env.PARSE_JAVASCRIPT_KEY || 'Careless7-Gore4-Guileless0-Jogger5-Clubbed9';
const masterKey = process.env.PARSE_MASTER_KEY || 'YOUR_MASTER_KEY'; // À remplacer par la vraie master key
const serverURL = process.env.PARSE_SERVER_URL || 'https://dev.parse.markidiags.com';

Parse.initialize(appId, jsKey, masterKey);
Parse.serverURL = serverURL;

async function getSchema() {
    try {
        // Utiliser la master key pour les requêtes
        Parse.Cloud.useMasterKey();
        
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

// Définir une fonction cloud pour récupérer le schéma
Parse.Cloud.define('getImpayesSchema', async (request) => {
  return await getSchema();
});

// Exporter la fonction pour qu'elle soit utilisée par main.js
module.exports = { getSchema };