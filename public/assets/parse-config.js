// parse-config.js - Configuration pour Parse Server
// Ce fichier définit les fonctions nécessaires pour interagir avec Parse Server

// Vérifier que window.parse est disponible
if (!window.parse) {
  console.error('Configuration Parse non disponible. Veuillez inclure parse-credentials.js avant ce fichier.');
}

// Fonction pour initialiser Parse
function initializeParse() {
  Parse.initialize(window.parse.appId, window.parse.javascriptKey);
  Parse.serverURL = window.parse.serverUrl;
}

// Fonction pour récupérer les données depuis Parse Server
async function fetchDataFromParse(className, query = {}) {
  const parseClass = Parse.Object.extend(className);
  const parseQuery = new Parse.Query(parseClass);
  
  // Appliquer les filtres de la requête
  for (const [key, value] of Object.entries(query)) {
    parseQuery.equalTo(key, value);
  }
  
  try {
    const results = await parseQuery.find();
    return results.map(item => item.toJSON());
  } catch (error) {
    console.error('Erreur lors de la récupération des données depuis Parse:', error);
    throw error;
  }
}

// Fonction pour créer un nouvel enregistrement dans Parse Server
async function createRecordInParse(className, data) {
  const parseClass = Parse.Object.extend(className);
  const newRecord = new parseClass();
  
  // Définir les propriétés
  for (const [key, value] of Object.entries(data)) {
    newRecord.set(key, value);
  }
  
  try {
    const savedRecord = await newRecord.save();
    return savedRecord.toJSON();
  } catch (error) {
    console.error('Erreur lors de la création de l\'enregistrement dans Parse:', error);
    throw error;
  }
}

// Fonction pour mettre à jour un enregistrement dans Parse Server
async function updateRecordInParse(className, objectId, data) {
  const parseClass = Parse.Object.extend(className);
  const query = new Parse.Query(parseClass);
  
  try {
    const recordToUpdate = await query.get(objectId);
    
    // Mettre à jour les propriétés
    for (const [key, value] of Object.entries(data)) {
      recordToUpdate.set(key, value);
    }
    
    const updatedRecord = await recordToUpdate.save();
    return updatedRecord.toJSON();
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'enregistrement dans Parse:', error);
    throw error;
  }
}

// Fonction pour supprimer un enregistrement dans Parse Server
async function deleteRecordInParse(className, objectId) {
  const parseClass = Parse.Object.extend(className);
  const query = new Parse.Query(parseClass);
  
  try {
    const recordToDelete = await query.get(objectId);
    await recordToDelete.destroy();
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'enregistrement dans Parse:', error);
    throw error;
  }
}

// Exporter les fonctions pour une utilisation globale
window.parseConfig = {
  initializeParse,
  fetchDataFromParse,
  createRecordInParse,
  updateRecordInParse,
  deleteRecordInParse
};