// Script de test pour vérifier que la correction du chargement du schéma fonctionne
// À exécuter dans la console du navigateur sur la page de séquence

async function testFixedSchemaLoading() {
    try {
        console.log('🔍 Test du chargement corrigé du schéma...');
        
        // Vérifier que l'état sequenceState existe
        const sequenceState = Alpine.store('sequenceState') || window.sequenceState;
        
        if (!sequenceState) {
            console.error('❌ État sequenceState non trouvé');
            return;
        }
        
        console.log('✅ État sequenceState trouvé');
        
        // Réinitialiser les données
        sequenceState.impayesSchema = null;
        sequenceState.impayesColumns = [];
        sequenceState.impayesFields = {};
        
        console.log('📦 Données réinitialisées');
        
        // Appeler la méthode corrigée
        console.log('📡 Appel de la méthode loadImpayesSchema corrigée...');
        
        const result = await sequenceState.loadImpayesSchema();
        
        console.log('✅ Résultat de loadImpayesSchema:', result);
        
        // Vérifier l'état après l'appel
        console.log('📋 État après l\'appel:');
        console.log('- impayesSchema:', sequenceState.impayesSchema);
        console.log('- impayesColumns:', sequenceState.impayesColumns);
        console.log('- impayesFields:', sequenceState.impayesFields);
        
        if (sequenceState.impayesColumns && sequenceState.impayesColumns.length > 0) {
            console.log('🎉 Schéma chargé avec succès !');
            console.log('Nombre de colonnes:', sequenceState.impayesColumns.length);
            console.log('Premières colonnes:', sequenceState.impayesColumns.slice(0, 10));
            
            // Afficher quelques détails
            const sampleColumns = sequenceState.impayesColumns.slice(0, 5);
            console.log('📊 Détails des premières colonnes:');
            sampleColumns.forEach(col => {
                const field = sequenceState.impayesFields[col];
                console.log(`- ${col}: ${field.type} (requis: ${field.required || false})`);
            });
            
            return true;
        } else {
            console.log('⚠️ Aucune colonne chargée');
            return false;
        }
        
    } catch (error) {
        console.error('❌ Erreur lors du test:', error);
        console.error('Détails de l\'erreur:', {
            code: error.code,
            message: error.message,
            stack: error.stack
        });
        return false;
    }
}

// Exécuter le test
testFixedSchemaLoading().then(success => {
    if (success) {
        console.log('\n🎊 Le chargement du schéma fonctionne maintenant !');
        console.log('Les variables devraient maintenant être visibles dans l\'interface.');
    } else {
        console.log('\n❌ Le problème persiste.');
        console.log('Veuillez vérifier les logs ci-dessus pour plus de détails.');
    }
});

// Exposer la fonction pour un appel manuel
window.testFixedSchemaLoading = testFixedSchemaLoading;