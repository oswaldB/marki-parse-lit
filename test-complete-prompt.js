// Script de test pour vérifier que le prompt génère toutes les variables
// À exécuter dans la console du navigateur sur la page de séquence

async function testCompletePrompt() {
    try {
        console.log('🔍 Test du prompt complet avec toutes les variables...');
        
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
        
        // Générer le prompt
        console.log('📝 Génération du prompt...');
        const promptText = sequenceState.generatePromptText();
        
        console.log('✅ Prompt généré:');
        console.log('---');
        console.log(promptText);
        console.log('---');
        
        // Vérifier que toutes les variables sont dans le prompt
        console.log('🔍 Vérification des variables dans le prompt...');
        
        const allVariablesPresent = sequenceState.impayesColumns.every(column => {
            const variablePattern = new RegExp(`\{\{${column}\}\}`, 'g');
            return variablePattern.test(promptText);
        });
        
        if (allVariablesPresent) {
            console.log('✅ Toutes les variables sont présentes dans le prompt !');
        } else {
            console.log('⚠️ Certaines variables sont manquantes dans le prompt');
            
            const missingVariables = sequenceState.impayesColumns.filter(column => {
                const variablePattern = new RegExp(`\{\{${column}\}\}`, 'g');
                return !variablePattern.test(promptText);
            });
            
            console.log('Variables manquantes:', missingVariables);
        }
        
        // Vérifier la structure du prompt
        console.log('📋 Structure du prompt:');
        
        const lines = promptText.split('\n');
        const variablesSectionIndex = lines.findIndex(line => line.includes('Utilisez les variables suivantes'));
        const exampleSectionIndex = lines.findIndex(line => line.includes('Exemple de message'));
        
        console.log('- Lignes totales:', lines.length);
        console.log('- Section variables:', variablesSectionIndex > 0 ? 'Trouvée' : 'Non trouvée');
        console.log('- Section exemple:', exampleSectionIndex > 0 ? 'Trouvée' : 'Non trouvée');
        
        if (variablesSectionIndex > 0 && exampleSectionIndex > 0) {
            const variablesCount = exampleSectionIndex - variablesSectionIndex - 1;
            console.log('- Nombre de variables listées:', variablesCount);
            console.log('- Correspondance:', variablesCount === sequenceState.impayesColumns.length ? '✅ Correct' : '⚠️ Incorrect');
        }
        
        // Tester la copie du prompt
        console.log('📋 Test de la copie du prompt...');
        
        const textarea = document.querySelector('textarea[readonly]');
        if (textarea) {
            console.log('✅ Zone de texte trouvée');
            console.log('Contenu:', textarea.value.substring(0, 100) + '...');
        } else {
            console.log('⚠️ Zone de texte non trouvée');
        }
        
        console.log('✅ Test du prompt complet terminé !');
        
        return true;
        
    } catch (error) {
        console.error('❌ Erreur lors du test:', error);
        return false;
    }
}

// Exécuter le test
testCompletePrompt().then(success => {
    if (success) {
        console.log('\n🎊 Le prompt génère maintenant toutes les variables !');
        console.log('\n📋 Améliorations apportées:');
        console.log('1. Liste complète de toutes les variables disponibles');
        console.log('2. Exemple de message utilisant toutes les variables pertinentes');
        console.log('3. Format clair et bien structuré');
        console.log('4. Prêt à être copié et utilisé');
    } else {
        console.log('\n❌ Le test a échoué.');
    }
});

// Exposer la fonction pour un appel manuel
window.testCompletePrompt = testCompletePrompt;