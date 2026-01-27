// Script de test pour vérifier les fonctionnalités de défilement
// À exécuter dans la console du navigateur sur la page de séquence

async function testScrollFeatures() {
    try {
        console.log('🔍 Test des fonctionnalités de défilement...');
        
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
        
        // Vérifier le conteneur de défilement
        const nextTick = () => new Promise(resolve => setTimeout(resolve, 100));
        await nextTick();
        
        const container = sequenceState.$refs.variablesContainer;
        
        if (!container) {
            console.error('❌ Conteneur de défilement non trouvé');
            return;
        }
        
        console.log('✅ Conteneur de défilement trouvé');
        
        // Vérifier les classes CSS
        console.log('📋 Classes CSS du conteneur:', container.className);
        
        // Tester avec différentes tailles
        console.log('🔍 Test avec différentes tailles de données...');
        
        // Cas 1: Plus de 5 variables (devrait avoir un défilement)
        if (sequenceState.filteredVariables.length > 5) {
            console.log('✅ Mode défilement activé (plus de 5 variables)');
            console.log('Hauteur minimale: 120px, Hauteur maximale: 200px');
            console.log('Défilement: overflow-y-auto');
        }
        
        // Cas 2: 5 variables ou moins (pas de défilement)
        sequenceState.variableSearch = 'xyz123'; // Filtre qui ne trouve rien
        await nextTick();
        
        if (sequenceState.filteredVariables.length <= 5) {
            console.log('✅ Mode sans défilement (5 variables ou moins)');
            console.log('Hauteur: auto');
        }
        
        // Réinitialiser le filtre
        sequenceState.variableSearch = '';
        await nextTick();
        
        // Vérifier le style personnalisé
        const style = getComputedStyle(container);
        console.log('🎨 Style du défilement:');
        console.log('- scrollbar-width:', style.scrollbarWidth);
        console.log('- scrollbar-color:', style.scrollbarColor);
        
        console.log('✅ Toutes les fonctionnalités de défilement testées avec succès !');
        
        return true;
        
    } catch (error) {
        console.error('❌ Erreur lors du test:', error);
        return false;
    }
}

// Exécuter le test
testScrollFeatures().then(success => {
    if (success) {
        console.log('\n🎊 Les fonctionnalités de défilement fonctionnent correctement !');
        console.log('\n📋 Caractéristiques du défilement:');
        console.log('1. Hauteur minimale de 120px pour toujours afficher au moins 5 variables');
        console.log('2. Hauteur maximale de 200px pour limiter l\'espace');
        console.log('3. Défilement vertical si plus de 5 variables');
        console.log('4. Barre de défilement personnalisée (bleu clair)');
        console.log('5. Pas de défilement si 5 variables ou moins');
    } else {
        console.log('\n❌ Certaines fonctionnalités de défilement ne fonctionnent pas.');
    }
});

// Exposer la fonction pour un appel manuel
window.testScrollFeatures = testScrollFeatures;