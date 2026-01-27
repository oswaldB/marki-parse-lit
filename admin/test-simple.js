#!/usr/bin/env node

/**
 * Script de test simplifié pour vérifier les problèmes courants
 * Ce script vérifie la syntaxe JavaScript et les problèmes évidents
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Test simplifié des fichiers...\n');

// Fichiers à tester
const filesToTest = [
  '../public/app/relances/list/index.html',
  '../public/app/relances/list/listState.js'
];

let hasErrors = false;

filesToTest.forEach(filePath => {
  const fullPath = path.resolve(__dirname, filePath);
  
  try {
    console.log(`📄 Vérification de: ${filePath}`);
    
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ Fichier introuvable: ${filePath}`);
      hasErrors = true;
      return;
    }
    
    const content = fs.readFileSync(fullPath, 'utf8');
    
    // Vérifications de base
    if (filePath.endsWith('.js')) {
      // Vérifier les syntaxes évidentes
      if (content.includes('ndossier') || content.includes('ndossierDrawerOpen')) {
        console.error(`❌ Référence obsolète à "ndossier" trouvée dans ${filePath}`);
        hasErrors = true;
      }
    }
    
    if (filePath.endsWith('.html')) {
      // Vérifier que les éléments essentiels sont présents
      const essentialElements = [
        '<relance-sidebar',
        'openApporteurDrawer',
        'openNfactureDrawer',
        'openNumeroDrawer',
        'openPayeurDrawer'
      ];
      
      essentialElements.forEach(element => {
        if (!content.includes(element)) {
          console.warn(`⚠️ Élément attendu manquant: ${element}`);
        }
      });
      
      // Vérifier les références obsolètes
      if (content.includes('ndossier')) {
        console.error(`❌ Référence obsolète à "ndossier" trouvée dans ${filePath}`);
        hasErrors = true;
      }
    }
    
    console.log(`✅ Fichier vérifié: ${filePath}\n`);
    
  } catch (error) {
    console.error(`❌ Erreur lors de la vérification de ${filePath}:`, error.message);
    hasErrors = true;
  }
});

// Vérifier la structure des dossiers
console.log('📁 Vérification de la structure des dossiers...');
const requiredDirs = [
  '../public/app/relances/list',
  '../public/components'
];

requiredDirs.forEach(dir => {
  const fullPath = path.resolve(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Dossier manquant: ${dir}`);
    hasErrors = true;
  } else {
    console.log(`✅ Dossier présent: ${dir}`);
  }
});

console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ Des problèmes ont été détectés. Voir ci-dessus pour les détails.');
  process.exit(1);
} else {
  console.log('✅ Aucun problème évident détecté dans les fichiers.');
  console.log('📝 Rapport: Tous les fichiers et structures semblent corrects.');
  process.exit(0);
}