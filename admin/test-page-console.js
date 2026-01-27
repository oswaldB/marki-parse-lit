#!/usr/bin/env node

/**
 * Script léger pour tester une page web et capturer les erreurs console
 * Utilise Puppeteer pour lancer un navigateur headless et capturer les logs console
 */

const { firefox } = require('playwright');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  // URL à tester - sera remplacée par l'argument de ligne de commande
  url: null,
  outputFile: path.join(__dirname, 'rapport-console-web.md'),
  timeout: 30000, // 30 secondes
  headless: true, // Mode headless pour légèreté
  slowMo: 50, // Ralentit un peu pour mieux capturer les erreurs
  // Configuration Parse pour l'authentification (optionnelle)
  parseConfig: {
    appId: 'marki',
    javascriptKey: 'Careless7-Gore4-Guileless0-Jogger5-Clubbed9',
    serverURL: 'https://dev.parse.markidiags.com',
    loginUrl: 'http://localhost:5000/login',
    // Credentials de test - à remplacer par des valeurs réelles
    // Laissez vide pour désactiver l'authentification
    testUsername: 'oswald',
    testPassword: 'coucou'
  }
};

// Tableau pour stocker les logs
const consoleLogs = {
  logs: [],
  errors: [],
  warnings: [],
  infos: []
};

async function runTest() {
  console.log('🚀 Démarrage du test de la page...');
  
  let browser;
  try {
    // Lancer le navigateur avec Playwright
    console.log('🔧 Tentative de lancement du navigateur Firefox...');
    browser = await firefox.launch({
      headless: config.headless,
      timeout: config.timeout
    });
    console.log('✅ Navigateur Firefox lancé avec succès');
    
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Capturer tous les événements console
    page.on('console', (msg) => {
      const logEntry = {
        type: msg.type(),
        text: msg.text(),
        timestamp: new Date().toISOString()
      };
      
      consoleLogs.logs.push(logEntry);
      
      // Classer par type
      if (msg.type() === 'error') {
        consoleLogs.errors.push(logEntry);
      } else if (msg.type() === 'warning') {
        consoleLogs.warnings.push(logEntry);
      } else {
        consoleLogs.infos.push(logEntry);
      }
    });
    
    // Capturer les erreurs non gérées
    page.on('pageerror', (error) => {
      consoleLogs.errors.push({
        type: 'pageerror',
        text: error.toString(),
        timestamp: new Date().toISOString()
      });
    });
    
    // Capturer les erreurs de requête
    page.on('requestfailed', (request) => {
      consoleLogs.errors.push({
        type: 'requestfailed',
        text: `Request failed: ${request.url()} - ${request.failure().errorText}`,
        timestamp: new Date().toISOString()
      });
    });
    
    console.log(`🌐 Chargement de la page: ${config.url}`);
    
    // Vérifier si nous devons nous authentifier
    if (config.parseConfig.testUsername && config.parseConfig.testPassword) {
      console.log('🔐 Authentification requise, connexion en cours...');
      await authenticateWithParse(page);
    }
    
    // Naviguer vers la page
    await page.goto(config.url, {
      waitUntil: 'networkidle2',
      timeout: config.timeout
    });
    
    console.log('⏳ Attente de 5 secondes pour permettre le chargement complet...');
    
    // Attendre un peu pour permettre le chargement complet des ressources
    await page.waitForTimeout(5000);
    
    // Capturer un screenshot pour référence visuelle
    const screenshotPath = path.join(__dirname, 'screenshot.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`📸 Screenshot sauvegardé: ${screenshotPath}`);
    
    // Générer le rapport
    generateReport();
    
    console.log('✅ Test terminé avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
    consoleLogs.errors.push({
      type: 'testerror',
      text: error.toString(),
      timestamp: new Date().toISOString()
    });
    
    if (error.message.includes('Failed to launch the browser process')) {
      console.log('');
      console.log('🔧 Solution alternative pour le problème de lancement du navigateur:');
      console.log('1. Assurez-vous que Firefox est installé (which firefox)');
      console.log('2. Essayez de lancer avec HEADLESS=false:');
      console.log('   - Modifiez le script et mettez config.headless = false');
      console.log('3. Utilisez le test manuel:');
      console.log('   - Ouvrez admin/test-manual.html dans votre navigateur');
      console.log('   - Suivez les instructions pour tester manuellement');
    }
    
    generateReport();
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Fonction pour authentifier avec Parse
 * @param {Page} page - La page Puppeteer
 */
async function authenticateWithParse(page) {
  try {
    console.log('🔑 Initialisation de Parse...');
    
    // Naviguer vers la page de login
    await page.goto(config.parseConfig.loginUrl, {
      waitUntil: 'networkidle',
      timeout: config.timeout
    });
    
    console.log('📝 Remplissage du formulaire de connexion...');
    
    // Attendre que les éléments soient disponibles
    await page.waitForSelector('#username', { timeout: 10000 });
    await page.waitForSelector('#password', { timeout: 10000 });
    await page.waitForSelector('#remember', { timeout: 10000 });
    
    // Remplir le formulaire de connexion
    await page.type('#username', config.parseConfig.testUsername);
    await page.type('#password', config.parseConfig.testPassword);
    
    // Cocher "Se souvenir de moi" pour utiliser localStorage
    await page.click('#remember');
    
    console.log('🚪 Soumission du formulaire...');
    
    // Soumettre le formulaire
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      page.click('button[type="submit"]')
    ]);
    
    console.log('✅ Connexion réussie !');
    
    // Attendre que le token soit stocké dans localStorage
    await page.waitForFunction(() => {
      return window.localStorage.getItem('parseSessionToken') !== null;
    }, { timeout: 5000 });
    
    console.log('🔐 Token de session obtenu et stocké');
    
  } catch (error) {
    console.error('❌ Échec de l\'authentification:', error.message);
    consoleLogs.errors.push({
      type: 'authentication',
      text: `Authentication failed: ${error.message}`,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
}

function generateReport() {
  console.log('📝 Génération du rapport...');
  
  let reportContent = `# Rapport Console Web - ${new Date().toISOString()}\n\n`;
  reportContent += `URL testée: ${config.url}\n\n`;
  
  // Statistiques
  reportContent += `## Statistiques\n\n`;
  reportContent += `- Total des logs: ${consoleLogs.logs.length}\n`;
  reportContent += `- Erreurs: ${consoleLogs.errors.length}\n`;
  reportContent += `- Avertissements: ${consoleLogs.warnings.length}\n`;
  reportContent += `- Infos: ${consoleLogs.infos.length}\n\n`;
  
  // Erreurs
  if (consoleLogs.errors.length > 0) {
    reportContent += `## ❌ Erreurs (${consoleLogs.errors.length})\n\n`;
    reportContent += '```\n';
    consoleLogs.errors.forEach((error, index) => {
      reportContent += `${index + 1}. [${error.type.toUpperCase()}] ${error.timestamp}: ${error.text}\n`;
    });
    reportContent += '```\n\n';
  }
  
  // Avertissements
  if (consoleLogs.warnings.length > 0) {
    reportContent += `## ⚠️ Avertissements (${consoleLogs.warnings.length})\n\n`;
    reportContent += '```\n';
    consoleLogs.warnings.forEach((warning, index) => {
      reportContent += `${index + 1}. [${warning.type.toUpperCase()}] ${warning.timestamp}: ${warning.text}\n`;
    });
    reportContent += '```\n\n';
  }
  
  // Infos (limité aux 10 premières pour éviter le bruit)
  if (consoleLogs.infos.length > 0) {
    reportContent += `## ℹ️ Infos (${consoleLogs.infos.length}) - 10 premières\n\n`;
    reportContent += '```\n';
    consoleLogs.infos.slice(0, 10).forEach((info, index) => {
      reportContent += `${index + 1}. [${info.type.toUpperCase()}] ${info.timestamp}: ${info.text}\n`;
    });
    reportContent += '```\n\n';
  }
  
  // Écrire le rapport dans un fichier
  fs.writeFileSync(config.outputFile, reportContent);
  console.log(`📄 Rapport généré: ${config.outputFile}`);
}

// Vérifier que l'URL est fournie
if (process.argv.length < 3) {
  console.log('⚠️  Usage: node test-page-console.js <url> [username] [password]');
  console.log('');
  console.log('Exemples:');
  console.log('  node test-page-console.js "http://localhost:8080/app/relances/sequences/SEQUENCE_ID"');
  console.log('  node test-page-console.js "http://localhost:8080/app/relances/lists"');
  console.log('  node test-page-console.js "http://localhost:8080/dashboard" user pass');
  console.log('');
  console.log('💡 Alternative: Si le test automatique échoue, utilisez le test manuel:');
  console.log('  1. Ouvrez test-manual.html dans votre navigateur');
  console.log('  2. Suivez les instructions pour tester manuellement');
  console.log('  3. Documentez les erreurs et problèmes');
  process.exit(1);
}

// Utiliser l'URL fournie directement
config.url = process.argv[2];

// Si des credentials sont fournis, les utiliser
if (process.argv.length >= 5) {
  config.parseConfig.testUsername = process.argv[3];
  config.parseConfig.testPassword = process.argv[4];
  console.log('🔐 Authentification activée avec les credentials fournis');
} else if (config.parseConfig.testUsername || config.parseConfig.testPassword) {
  console.log('🔐 Authentification activée avec les credentials par défaut');
} else {
  console.log('🚫 Authentification désactivée (aucun credential fourni)');
}

// Lancer le test
runTest();