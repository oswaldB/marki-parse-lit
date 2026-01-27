// Script de débogage pour vérifier l'état Alpine.js
// À exécuter dans la console du navigateur sur la page de séquence

function debugAlpineState() {
    try {
        console.log('🔍 Début du débogage de l\'état Alpine.js...');
        
        // Vérifier que l'état sequenceState existe
        const sequenceState = Alpine.store('sequenceState') || window.sequenceState;
        
        if (!sequenceState) {
            console.error('❌ État sequenceState non trouvé');
            return;
        }
        
        console.log('✅ État sequenceState trouvé');
        
        // Afficher l'état complet
        console.log('📊 État complet:', sequenceState);
        
        // Vérifier les propriétés spécifiques
        console.log('📋 Propriétés des impayés:');
        console.log('- impayesSchema:', sequenceState.impayesSchema);
        console.log('- impayesColumns:', sequenceState.impayesColumns);
        console.log('- impayesFields:', sequenceState.impayesFields);
        
        // Vérifier si la séquence est chargée
        console.log('📄 Séquence chargée:', sequenceState.sequence ? 'Oui' : 'Non');
        
        // Vérifier les profils SMTP
        console.log('📧 Profils SMTP:', sequenceState.smtpProfiles || 'Non chargés');
        
        // Stocker dans une variable globale pour inspection
        window.debugAlpineState = sequenceState;
        
        return sequenceState;
        
    } catch (error) {
        console.error('❌ Erreur lors du débogage de l\'état Alpine.js:', error);
        return null;
    }
}

// Exécuter le débogage
debugAlpineState();

// Exposer la fonction pour un appel manuel
window.debugAlpineState = debugAlpineState;