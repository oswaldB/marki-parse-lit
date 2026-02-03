// parse-server/cloud/main.js
Parse.Cloud.define('hello', async (request) => {
  return 'Hello, world!';
});

// Importer la fonction d'initialisation des collections
require('./initCollections');

// Importer la fonction de synchronisation des impayés
require('./syncImpayes');

// Importer la fonction pour récupérer le schéma
require('./getSchema');

// Importer la fonction pour envoyer un email de test
require('./sendTestEmail');

// Importer les fonctions pour la gestion des profils SMTP
require('./smtpProfiles');

