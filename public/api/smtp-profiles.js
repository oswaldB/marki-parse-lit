// API Mock pour la gestion des profils SMTP
// Ce fichier simule une API backend pour le développement frontal

// Utiliser require au lieu de import pour éviter les erreurs de module
const express = require('express');
const router = express.Router();

// Base de données mock en mémoire
let smtpProfiles = [
  {
    id: '1',
    name: 'Gmail par défaut',
    host: 'smtp.gmail.com',
    port: 587,
    email: 'votre-email@gmail.com',
    username: 'votre-email@gmail.com',
    useSSL: false,
    useTLS: true
  },
  {
    id: '2',
    name: 'Outlook',
    host: 'smtp.office365.com',
    port: 587,
    email: 'votre-email@outlook.com',
    username: 'votre-email@outlook.com',
    useSSL: false,
    useTLS: true
  }
];

// Récupérer tous les profils SMTP
router.get('/', (req, res) => {
  res.json(smtpProfiles);
});

// Créer un nouveau profil SMTP
router.post('/', (req, res) => {
  const newProfile = {
    id: (smtpProfiles.length + 1).toString(),
    name: req.body.name,
    host: req.body.host,
    port: req.body.port,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    useSSL: req.body.useSSL || false,
    useTLS: req.body.useTLS || true
  };
  
  smtpProfiles.push(newProfile);
  res.status(201).json(newProfile);
});

// Mettre à jour un profil SMTP
router.put('/:id', (req, res) => {
  const profileId = req.params.id;
  const profileIndex = smtpProfiles.findIndex(p => p.id === profileId);
  
  if (profileIndex === -1) {
    return res.status(404).json({ error: 'Profil non trouvé' });
  }
  
  const updatedProfile = {
    ...smtpProfiles[profileIndex],
    ...req.body,
    id: profileId
  };
  
  smtpProfiles[profileIndex] = updatedProfile;
  res.json(updatedProfile);
});

// Supprimer un profil SMTP
router.delete('/:id', (req, res) => {
  const profileId = req.params.id;
  smtpProfiles = smtpProfiles.filter(p => p.id !== profileId);
  res.json({ success: true });
});

module.exports = router;