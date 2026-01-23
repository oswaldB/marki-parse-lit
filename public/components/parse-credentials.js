// parse-credentials.js - Script simple pour stocker les credentials Parse dans window.parse
window.parse = {
  serverUrl: 'http://localhost:1337',
  appId: 'marki',
  javascriptKey: 'Careless7-Gore4-Guileless0-Jogger5-Clubbed9',
  restApiKey: 'Careless7-Gore4-Guileless0-Jogger5-Clubbed9',
  
  // Méthode pour obtenir les headers nécessaires pour les appels REST
  getHeaders: function() {
    return {
      'X-Parse-Application-Id': this.appId,
      'X-Parse-Javascript-Key': this.javascriptKey,
      'X-Parse-REST-API-Key': this.restApiKey,
      'Content-Type': 'application/json'
    };
  },
  
  // Méthode pour obtenir l'URL de base de Parse Server
  getUrl: function() {
    return this.serverUrl;
  }
};