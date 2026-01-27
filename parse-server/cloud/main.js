// parse-server/cloud/main.js
Parse.Cloud.define('hello', async (request) => {
  return 'Hello, world!';
});

// Cloud Function pour envoyer un email de test
Parse.Cloud.define('sendTestEmail', async (request) => {
  const { recipient, smtpProfile } = request.params;
  
  // Vérifier que le destinataire est fourni
  if (!recipient) {
    throw new Error('Le destinataire est requis');
  }
  
  // Vérifier que le profil SMTP est fourni
  if (!smtpProfile) {
    throw new Error('Le profil SMTP est requis');
  }
  
  // Créer un transporteur SMTP avec les paramètres fournis
  const nodemailer = require('nodemailer');
  
  const transporter = nodemailer.createTransport({
    host: smtpProfile.host,
    port: smtpProfile.port,
    secure: smtpProfile.useSSL, // true pour SSL, false pour STARTTLS
    auth: {
      user: smtpProfile.username,
      pass: smtpProfile.password
    },
    tls: {
      rejectUnauthorized: false // Pour le développement, à désactiver en production
    }
  });
  
  // Envoyer l'email de test
  const info = await transporter.sendMail({
    from: `"Marki Parse Test" <${smtpProfile.email}>`,
    to: recipient,
    subject: 'Test d\'email depuis Marki Parse',
    text: 'Ceci est un email de test envoyé depuis Marki Parse.',
    html: '<p>Ceci est un email de test envoyé depuis <strong>Marki Parse</strong>.</p>'
  });
  
  return {
    success: true,
    messageId: info.messageId,
    message: 'Email de test envoyé avec succès'
  };
});

// Importer la fonction d'initialisation des collections
require('./initCollections');

// Importer la fonction de synchronisation des impayés
require('./syncImpayes');

// Importer la fonction pour récupérer le schéma
require('./getSchema');
