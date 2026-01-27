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
