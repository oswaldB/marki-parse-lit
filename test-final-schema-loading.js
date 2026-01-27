// Script de test final pour vérifier que le chargement du schéma fonctionne correctement
// À exécuter dans la console du navigateur sur la page de séquence

async function testFinalSchemaLoading() {
    try {
        console.log('🔍 Test final du chargement du schéma...');
        
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
        
        // Appeler la méthode simplifiée
        console.log('📡 Appel de la méthode loadImpayesSchema simplifiée...');
        
        const result = await sequenceState.loadImpayesSchema();
        
        console.log('✅ Résultat:', result);
        
        // Vérifier l'état après l'appel
        console.log('📋 État après l\'appel:');
        console.log('- impayesSchema:', sequenceState.impayesSchema);
        console.log('- impayesColumns:', sequenceState.impayesColumns);
        console.log('- impayesFields:', sequenceState.impayesFields);
        
        if (sequenceState.impayesColumns && sequenceState.impayesColumns.length > 0) {
            console.log('🎉 Schéma chargé avec succès !');
            console.log('Nombre de colonnes:', sequenceState.impayesColumns.length);
            console.log('Toutes les colonnes:', sequenceState.impayesColumns);
            
            // Afficher quelques détails
            const sampleColumns = sequenceState.impayesColumns.slice(0, 10);
            console.log('📊 Détails des premières colonnes:');
            sampleColumns.forEach(col => {
                const field = sequenceState.impayesFields[col];
                console.log(`- ${col}: ${field.type} (requis: ${field.required || false})`);
            });
            
            // Vérifier que les variables sont maintenant visibles dans l'interface
            console.log('\n👀 Vérification de l\'interface:');
            console.log('Les variables devraient maintenant être visibles dans:');
            console.log('1. La section "Variables des impayés disponibles" (en haut)');
            console.log('2. La section "Variables disponibles" (colonne de droite)');
            console.log('3. Le prompt dynamique (colonne de droite)');
            
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
testFinalSchemaLoading().then(success => {
    if (success) {
        console.log('\n🎊 Le chargement du schéma fonctionne maintenant !');
        console.log('Les variables devraient maintenant être visibles dans l\'interface.');
        console.log('\n📋 Prochaines étapes:');
        console.log('1. Rafraîchissez la page pour voir les variables');
        console.log('2. Vérifiez que toutes les colonnes sont affichées');
        console.log('3. Testez la copie du prompt');
        console.log('4. Utilisez les variables dans vos messages de relance');
    } else {
        console.log('\n❌ Le problème persiste.');
        console.log('Veuillez vérifier les logs ci-dessus pour plus de détails.');
    }
});

// Exposer la fonction pour un appel manuel
window.testFinalSchemaLoading = testFinalSchemaLoading;