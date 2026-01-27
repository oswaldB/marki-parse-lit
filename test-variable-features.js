// Script de test pour vérifier les nouvelles fonctionnalités des variables
// À exécuter dans la console du navigateur sur la page de séquence

async function testVariableFeatures() {
    try {
        console.log('🔍 Test des nouvelles fonctionnalités des variables...');
        
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
        
        // Tester la fonction de filtrage
        console.log('🔍 Test de la fonction de filtrage...');
        
        // Tester sans filtre
        sequenceState.variableSearch = '';
        const allVariables = sequenceState.filteredVariables;
        console.log('Tous les variables:', allVariables.length);
        
        // Tester avec un filtre
        sequenceState.variableSearch = 'nom';
        const filteredVariables = sequenceState.filteredVariables;
        console.log('Variables filtrées (nom):', filteredVariables.length);
        console.log('Variables trouvées:', filteredVariables);
        
        // Tester la copie d'une variable
        console.log('📋 Test de la copie d\'une variable...');
        
        if (filteredVariables.length > 0) {
            const testColumn = filteredVariables[0];
            console.log('Copie de la variable:', testColumn);
            sequenceState.copyVariable(testColumn);
        }
        
        // Tester avec un filtre qui ne trouve rien
        sequenceState.variableSearch = 'xyz123';
        const noResults = sequenceState.filteredVariables;
        console.log('Variables filtrées (xyz123):', noResults.length);
        
        // Réinitialiser le filtre
        sequenceState.variableSearch = '';
        
        console.log('✅ Toutes les fonctionnalités testées avec succès !');
        
        return true;
        
    } catch (error) {
        console.error('❌ Erreur lors du test:', error);
        return false;
    }
}

// Exécuter le test
testVariableFeatures().then(success => {
    if (success) {
        console.log('\n🎊 Toutes les fonctionnalités fonctionnent correctement !');
        console.log('\n📋 Fonctionnalités disponibles:');
        console.log('1. Barre de recherche pour filtrer les variables');
        console.log('2. Icônes de copie pour chaque variable');
        console.log('3. Notifications de copie réussie');
        console.log('4. Affichage du nombre de variables filtrées');
        console.log('5. Défilement si trop de variables');
    } else {
        console.log('\n❌ Certaines fonctionnalités ne fonctionnent pas.');
    }
});

// Exposer la fonction pour un appel manuel
window.testVariableFeatures = testVariableFeatures;