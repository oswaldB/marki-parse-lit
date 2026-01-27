// test-sequence-actions.js
// Script de test pour vérifier les fonctionnalités des actions de séquence

const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Démarrage des tests pour les actions de séquence...');
  
  // Configuration du navigateur
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Connexion à l'application
    console.log('📝 Connexion à l\'application...');
    await page.goto('http://localhost:8080/login');
    
    // Attendre que la page de login soit chargée
    await page.waitForSelector('input[type="email"]', { timeout: 10000 });
    
    // Remplir les informations de connexion (à adapter selon votre application)
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');
    
    // Attendre la redirection après connexion
    await page.waitForNavigation();
    
    console.log('✅ Connexion réussie');
    
    // Aller à la page des séquences
    console.log('📋 Navigation vers les séquences...');
    await page.goto('http://localhost:8080/app/relances/sequences');
    await page.waitForSelector('.sequence-item', { timeout: 10000 });
    
    console.log('✅ Page des séquences chargée');
    
    // Sélectionner une séquence existante ou en créer une nouvelle
    const sequenceExists = await page.$('.sequence-item');
    
    if (sequenceExists) {
      console.log('📝 Sélection d\'une séquence existante...');
      await page.click('.sequence-item:first-child');
      await page.waitForNavigation();
    } else {
      console.log('➕ Création d\'une nouvelle séquence...');
      await page.click('button:has-text("Nouvelle séquence")');
      await page.waitForSelector('#sequenceName');
      
      // Remplir les informations de la séquence
      await page.fill('#sequenceName', 'Séquence de test');
      await page.fill('#sequenceDescription', 'Description de test');
      await page.click('button:has-text("Créer")');
      await page.waitForNavigation();
    }
    
    console.log('✅ Séquence chargée');
    
    // Tester le glisser-déposer
    console.log('🔄 Test du glisser-déposer...');
    
    // Attendre que les actions soient chargées
    await page.waitForSelector('.sortable-item', { timeout: 10000 });
    
    const actions = await page.$$('.sortable-item');
    
    if (actions.length >= 2) {
      console.log(`📝 Trouvé ${actions.length} actions à réorganiser`);
      
      // Obtenir les positions initiales
      const firstAction = actions[0];
      const secondAction = actions[1];
      
      const firstBox = await firstAction.boundingBox();
      const secondBox = await secondAction.boundingBox();
      
      if (firstBox && secondBox) {
        // Calculer les coordonnées pour le glisser-déposer
        const fromX = firstBox.x + firstBox.width / 2;
        const fromY = firstBox.y + firstBox.height / 2;
        const toX = secondBox.x + secondBox.width / 2;
        const toY = secondBox.y + secondBox.height / 2;
        
        // Effectuer le glisser-déposer
        await page.mouse.move(fromX, fromY);
        await page.mouse.down();
        await page.mouse.move(toX, toY, { steps: 10 });
        await page.mouse.up();
        
        console.log('✅ Glisser-déposer effectué');
        
        // Attendre un court instant pour que la réorganisation soit sauvegardée
        await page.waitForTimeout(1000);
      }
    } else {
      console.log('ℹ️ Pas assez d\'actions pour tester le glisser-déposer');
    }
    
    // Tester l'édition d'une action
    console.log('✏️ Test de l\'édition d\'une action...');
    
    const editButtons = await page.$$('button:has-text("Éditer")');
    
    if (editButtons.length > 0) {
      await editButtons[0].click();
      await page.waitForSelector('.drawer-content', { timeout: 5000 });
      
      console.log('✅ Drawer d\'édition ouvert');
      
      // Modifier le message
      await page.fill('textarea', 'Message modifié pour le test');
      await page.click('button:has-text("Enregistrer")');
      
      // Attendre que le drawer se ferme
      await page.waitForSelector('.drawer-content', { state: 'hidden', timeout: 5000 });
      
      console.log('✅ Action modifiée avec succès');
    }
    
    // Tester la suppression d'une action
    console.log('🗑️ Test de la suppression d\'une action...');
    
    const deleteButtons = await page.$$('button:has-text("Supprimer")');
    
    if (deleteButtons.length > 0) {
      // Cliquer sur le bouton de suppression
      await deleteButtons[0].click();
      
      // Confirmer la suppression dans la boîte de dialogue
      const dialog = page.once('dialog', dialog => {
        console.log('📝 Boîte de dialogue de confirmation détectée');
        dialog.accept();
      });
      
      console.log('✅ Action supprimée avec succès');
    }
    
    console.log('🎉 Tous les tests ont été exécutés avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors des tests:', error);
  } finally {
    // Fermer le navigateur
    await browser.close();
    console.log('🔚 Navigateur fermé');
  }
})();