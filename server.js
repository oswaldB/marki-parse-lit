// server.js - Serveur Node.js pour l'API

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Routes API
const smtpProfilesRouter = require('./public/api/smtp-profiles');
app.use('/api/smtp-profiles', smtpProfilesRouter);

// Routes principales
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login', 'index.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard', 'index.html'));
});

app.get('/app/relances', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'app', 'relances', 'index.html'));
});

app.get('/app/relances/sequences', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'app', 'relances', 'sequences', 'index.html'));
});

app.get('/app/relances/sequence', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'app', 'relances', 'sequence', 'index.html'));
});

app.get('/app/settings/emails-smtp', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'app', 'settings', 'emails-smtp', 'index.html'));
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

module.exports = app;