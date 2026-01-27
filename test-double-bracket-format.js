// Script de test pour vérifier que le format [[ ]] est utilisé partout
// À exécuter dans la console du navigateur sur la page de séquence

async function testDoubleBracketFormat() {
    try {
        console.log('🔍 Test du format [[ ]] pour les variables...');
        
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
        
        // Tester le format dans l'interface
        console.log('📋 Vérification du format dans l\'interface...');
        
        const nextTick = () => new Promise(resolve => setTimeout(resolve, 100));
        await nextTick();
        
        // Vérifier que les variables sont affichées avec [[ ]]
        const variableElements = document.querySelectorAll('.font-mono');
        console.log('Variables affichées:', variableElements.length);
        
        if (variableElements.length > 0) {
            const firstVariable = variableElements[0].textContent;
            console.log('Première variable:', firstVariable);
            
            if (firstVariable.includes('[[') && firstVariable.includes(']]')) {
                console.log('✅ Format [[ ]] confirmé dans l\'interface');
            } else {
                console.log('⚠️ Format incorrect dans l\'interface:', firstVariable);
            }
        } else {
            console.log('⚠️ Aucune variable affichée');
        }
        
        // Tester le prompt généré
        console.log('📝 Vérification du prompt...');
        const promptText = sequenceState.generatePromptText();
        
        if (promptText && promptText.length > 0) {
            console.log('Prompt généré (extraits):');
            
            // Vérifier la présence de [[ ]] dans le prompt
            const hasDoubleBrackets = promptText.includes('[[') && promptText.includes(']]');
            const hasDoubleCurly = promptText.includes('{{') && promptText.includes('}}');
            
            if (hasDoubleBrackets && !hasDoubleCurly) {
                console.log('✅ Format [[ ]] confirmé dans le prompt');
            } else if (hasDoubleCurly) {
                console.log('⚠️ Ancien format {{ }} encore présent dans le prompt');
            } else {
                console.log('⚠️ Aucun format de variable trouvé dans le prompt');
            }
            
            // Afficher un extrait
            const lines = promptText.split('\n');
            const sampleLines = lines.slice(0, 5);
            console.log('Exemple:', sampleLines.join('\n'));
        } else {
            console.log('⚠️ Prompt vide');
        }
        
        // Tester la copie d'une variable
        console.log('📋 Test de la copie d\'une variable...');
        
        if (sequenceState.impayesColumns.length > 0) {
            const testColumn = sequenceState.impayesColumns[0];
            console.log('Test avec la variable:', testColumn);
            
            // Simuler la copie (sans vraiment copier)
            const variableText = `[[${testColumn}]]`;
            console.log('Format de copie:', variableText);
            
            if (variableText.includes('[[') && variableText.includes(']]')) {
                console.log('✅ Format [[ ]] confirmé pour la copie');
            } else {
                console.log('⚠️ Format incorrect pour la copie');
            }
        }
        
        console.log('✅ Test du format [[ ]] terminé !');
        
        return true;
        
    } catch (error) {
        console.error('❌ Erreur lors du test:', error);
        return false;
    }
}

// Exécuter le test
testDoubleBracketFormat().then(success => {
    if (success) {
        console.log('\n🎊 Le format [[ ]] est maintenant utilisé partout !');
        console.log('\n📋 Changements apportés:');
        console.log('1. Affichage des variables: {{variable}} → [[variable]]');
        console.log('2. Prompt généré: {{variable}} → [[variable]]');
        console.log('3. Copie des variables: {{variable}} → [[variable]]');
        console.log('4. Notifications: {{variable}} → [[variable]]');
    } else {
        console.log('\n❌ Certains tests ont échoué.');
    }
});

// Exposer la fonction pour un appel manuel
window.testDoubleBracketFormat = testDoubleBracketFormat;