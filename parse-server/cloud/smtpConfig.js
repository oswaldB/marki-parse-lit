// smtpConfig.js - Fonctions Cloud pour la gestion de la configuration SMTP

// Récupérer la configuration SMTP
Parse.Cloud.define('getSMTPConfig', async (request) => {
  const query = new Parse.Query('SMTPConfig');
  const results = await query.first();
  
  if (results) {
    return {
      host: results.get('host'),
      port: results.get('port'),
      username: results.get('username'),
      password: results.get('password'),
      from: results.get('from'),
      ssl: results.get('ssl'),
      tls: results.get('tls')
    };
  }
  
  return null;
});

// Sauvegarder la configuration SMTP
Parse.Cloud.define('saveSMTPConfig', async (request) => {
  const { host, port, username, password, from, ssl, tls } = request.params;
  
  // Vérifier que l'utilisateur est authentifié
  if (!request.user) {
    throw new Error('Non autorisé. Vous devez être connecté.');
  }
  
  // Vérifier les paramètres requis
  if (!host || !port || !from) {
    throw new Error('Les champs host, port et from sont requis.');
  }
  
  // Rechercher une configuration existante
  const query = new Parse.Query('SMTPConfig');
  const existingConfig = await query.first();
  
  let config;
  if (existingConfig) {
    // Mettre à jour la configuration existante
    config = existingConfig;
  } else {
    // Créer une nouvelle configuration
    config = new Parse.Object('SMTPConfig');
  }
  
  // Définir les valeurs
  config.set('host', host);
  config.set('port', port);
  config.set('username', username || '');
  config.set('password', password || '');
  config.set('from', from);
  config.set('ssl', ssl || false);
  config.set('tls', tls || false);
  
  // Sauvegarder
  await config.save(null, { useMasterKey: true });
  
  return { success: true, message: 'Configuration SMTP sauvegardée avec succès.' };
});