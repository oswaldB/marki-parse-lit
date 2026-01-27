// Script de débogage pour vérifier l'appel à la fonction cloud
// À exécuter dans la console du navigateur sur la page de séquence

async function debugCloudFunction() {
    try {
        console.log('🔍 Début du débogage de la fonction cloud...');
        
        // Vérifier que Parse est initialisé
        if (typeof Parse === 'undefined') {
            console.error('❌ Parse SDK non chargé');
            return;
        }
        
        console.log('✅ Parse SDK chargé');
        
        // Vérifier la configuration
        console.log('Configuration Parse:', {
            appId: Parse.applicationId,
            serverURL: Parse.serverURL
        });
        
        // Appeler la fonction cloud manuellement
        console.log('📡 Appel de la fonction cloud getImpayesSchema...');
        
        const result = await Parse.Cloud.run('getImpayesSchema');
        
        console.log('✅ Résultat de la fonction cloud:', result);
        
        if (result && result.fields) {
            const columns = Object.keys(result.fields);
            console.log('📋 Colonnes disponibles:', columns);
            console.log('Nombre de colonnes:', columns.length);
            
            // Afficher les détails de chaque colonne
            columns.forEach(col => {
                const field = result.fields[col];
                console.log(`- ${col}: ${field.type} (requis: ${field.required || false})`);
            });
            
            return result;
        } else {
            console.log('⚠️ Aucune donnée valide retournée');
            return null;
        }
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'appel à la fonction cloud:', error);
        console.error('Détails de l\'erreur:', {
            code: error.code,
            message: error.message,
            stack: error.stack
        });
        return null;
    }
}

// Exécuter le débogage
debugCloudFunction().then(result => {
    if (result) {
        console.log('🎉 Fonction cloud fonctionne correctement !');
        // Stocker le résultat dans une variable globale pour inspection
        window.debugCloudResult = result;
    } else {
        console.log('❌ Problème avec la fonction cloud');
    }
});

// Exposer la fonction pour un appel manuel
window.debugCloudFunction = debugCloudFunction;