// Script de débogage pour vérifier le chargement du schéma
// À exécuter dans la console du navigateur sur la page de séquence

async function debugLoadSchema() {
    try {
        console.log('🔍 Début du débogage du chargement du schéma...');
        
        // Vérifier que l'état sequenceState existe
        const sequenceState = Alpine.store('sequenceState') || window.sequenceState;
        
        if (!sequenceState) {
            console.error('❌ État sequenceState non trouvé');
            return;
        }
        
        console.log('✅ État sequenceState trouvé');
        
        // Appeler manuellement la méthode loadImpayesSchema
        console.log('📡 Appel de loadImpayesSchema...');
        
        const result = await sequenceState.loadImpayesSchema();
        
        console.log('✅ Résultat de loadImpayesSchema:', result);
        
        // Vérifier l'état après l'appel
        console.log('📋 État après l\'appel:');
        console.log('- impayesSchema:', sequenceState.impayesSchema);
        console.log('- impayesColumns:', sequenceState.impayesColumns);
        console.log('- impayesFields:', sequenceState.impayesFields);
        
        if (sequenceState.impayesColumns && sequenceState.impayesColumns.length > 0) {
            console.log('🎉 Schéma chargé avec succès !');
            console.log('Colonnes:', sequenceState.impayesColumns);
        } else {
            console.log('⚠️ Aucune colonne chargée');
        }
        
        return result;
        
    } catch (error) {
        console.error('❌ Erreur lors du chargement du schéma:', error);
        console.error('Détails de l\'erreur:', {
            code: error.code,
            message: error.message,
            stack: error.stack
        });
        return null;
    }
}

// Exécuter le débogage
debugLoadSchema();

// Exposer la fonction pour un appel manuel
window.debugLoadSchema = debugLoadSchema;