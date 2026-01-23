// parse-server/cloud/main.js
Parse.Cloud.define('hello', async (request) => {
  return 'Hello, world!';
});

// Importer la fonction de synchronisation des impayés
require('./syncImpayes');
