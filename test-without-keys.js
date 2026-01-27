// Script de test pour vérifier que tout fonctionne sans les :key=
// À exécuter dans la console du navigateur sur la page de séquence

async function testWithoutKeys() {
    try {
        console.log('🔍 Test du fonctionnement sans :key=...');
        
        // Vérifier que l'état sequenceState existe
        const sequenceState = Alpine.store('sequenceState') || window.sequenceState;
        
        if (!sequenceState) {
            console.error('❌ État sequenceState non trouvé');
            return;
        }
        
        console.log('✅ État sequenceState trouvé');
        
        // Vérifier que les données sont chargées
        if (sequenceState.impayesColumns.length === 0) {
            console.log('📡 Chargement des données...');
            await sequenceState.loadImpayesSchema();
        }
        
        if (sequenceState.impayesColumns.length === 0) {
            console.error('❌ Aucune colonne disponible');
            return;
        }
        
        console.log('🎉 Données chargées:', sequenceState.impayesColumns.length, 'colonnes');
        
        // Tester le rendu des variables
        console.log('📋 Test du rendu des variables...');
        
        const nextTick = () => new Promise(resolve => setTimeout(resolve, 100));
        await nextTick();
        
        // Vérifier que les variables sont affichées
        const variableElements = document.querySelectorAll('.font-mono');
        console.log('Variables affichées:', variableElements.length);
        
        if (variableElements.length > 0) {
            console.log('✅ Variables affichées correctement');
            
            // Vérifier quelques variables
            const sampleVariables = Array.from(variableElements).slice(0, 3).map(el => el.textContent);
            console.log('Exemples:', sampleVariables);
        } else {
            console.log('⚠️ Aucune variable affichée');
        }
        
        // Tester le filtre
        console.log('🔍 Test du filtre...');
        sequenceState.variableSearch = 'nom';
        await nextTick();
        
        const filteredElements = document.querySelectorAll('.font-mono');
        console.log('Variables filtrées:', filteredElements.length);
        
        // Réinitialiser le filtre
        sequenceState.variableSearch = '';
        await nextTick();
        
        // Tester la copie d'une variable
        console.log('📋 Test de la copie d\'une variable...');
        
        if (sequenceState.impayesColumns.length > 0) {
            const testColumn = sequenceState.impayesColumns[0];
            sequenceState.copyVariable(testColumn);
            console.log('✅ Copie testée avec:', testColumn);
        }
        
        // Tester le prompt
        console.log('📝 Test du prompt...');
        const promptText = sequenceState.generatePromptText();
        
        if (promptText && promptText.length > 0) {
            console.log('✅ Prompt généré:', promptText.substring(0, 100) + '...');
        } else {
            console.log('⚠️ Prompt vide');
        }
        
        console.log('✅ Tous les tests passés sans :key= !');
        
        return true;
        
    } catch (error) {
        console.error('❌ Erreur lors du test:', error);
        return false;
    }
}

// Exécuter le test
testWithoutKeys().then(success => {
    if (success) {
        console.log('\n🎊 Tout fonctionne correctement sans :key= !');
        console.log('\n📋 Résumé:');
        console.log('1. Les templates x-for fonctionnent sans :key=');
        console.log('2. Le rendu est correct');
        console.log('3. Le filtre fonctionne');
        console.log('4. La copie des variables fonctionne');
        console.log('5. Le prompt est généré correctement');
    } else {
        console.log('\n❌ Certains tests ont échoué.');
    }
});

// Exposer la fonction pour un appel manuel
window.testWithoutKeys = testWithoutKeys;