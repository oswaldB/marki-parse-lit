// Script de débogage pour vérifier le processus d'initialisation
// À exécuter dans la console du navigateur sur la page de séquence

async function debugInitProcess() {
    try {
        console.log('🔍 Début du débogage du processus d\'initialisation...');
        
        // Vérifier que l'état sequenceState existe
        const sequenceState = Alpine.store('sequenceState') || window.sequenceState;
        
        if (!sequenceState) {
            console.error('❌ État sequenceState non trouvé');
            return;
        }
        
        console.log('✅ État sequenceState trouvé');
        
        // Vérifier l'ID de la séquence
        console.log('📋 ID de la séquence:', sequenceState.sequenceId);
        
        if (!sequenceState.sequenceId) {
            console.error('❌ Aucun ID de séquence trouvé dans l\'URL');
            return;
        }
        
        // Appeler manuellement fetchSequence pour recharger tout
        console.log('📡 Rechargement de la séquence...');
        
        await sequenceState.fetchSequence();
        
        console.log('✅ Séquence rechargée');
        
        // Vérifier l'état après le rechargement
        console.log('📋 État après rechargement:');
        console.log('- Séquence:', sequenceState.sequence ? 'Chargée' : 'Non chargée');
        console.log('- Profils SMTP:', sequenceState.smtpProfiles ? sequenceState.smtpProfiles.length + ' profils' : 'Non chargés');
        console.log('- Schéma impayés:', sequenceState.impayesSchema ? 'Chargé' : 'Non chargé');
        console.log('- Colonnes impayés:', sequenceState.impayesColumns ? sequenceState.impayesColumns.length + ' colonnes' : 'Aucune');
        
        if (sequenceState.impayesColumns && sequenceState.impayesColumns.length > 0) {
            console.log('🎉 Tout est chargé correctement !');
            console.log('Colonnes:', sequenceState.impayesColumns);
        } else {
            console.log('⚠️ Problème avec le chargement du schéma des impayés');
        }
        
        return sequenceState;
        
    } catch (error) {
        console.error('❌ Erreur lors du processus d\'initialisation:', error);
        console.error('Détails de l\'erreur:', {
            code: error.code,
            message: error.message,
            stack: error.stack
        });
        return null;
    }
}

// Exécuter le débogage
debugInitProcess();

// Exposer la fonction pour un appel manuel
window.debugInitProcess = debugInitProcess;