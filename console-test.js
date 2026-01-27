// Script pour tester la connexion Parse et récupérer le schéma impayes depuis la console
// À exécuter après avoir chargé Parse SDK

async function testParseConnection() {
    try {
        console.log('🔍 Test de connexion Parse...');
        
        // Configuration
        const appId = 'marki';
        const jsKey = 'Careless7-Gore4-Guileless0-Jogger5-Clubbed9';
        const serverUrl = 'https://dev.parse.markidiags.com';
        
        // Initialiser Parse
        Parse.initialize(appId, jsKey);
        Parse.serverURL = serverUrl;
        
        console.log('Configuration:', { appId, serverUrl });
        
        // Tester une requête simple
        const testQuery = new Parse.Query('TestClass');
        testQuery.limit(0);
        
        await testQuery.find();
        console.log('✅ Connexion réussie !');
        
        return true;
    } catch (error) {
        console.error('❌ Erreur de connexion:', error);
        return false;
    }
}

async function getAllSchemas() {
    try {
        console.log('📚 Récupération de tous les schémas...');
        
        const schemas = await Parse.Schema.all();
        console.log('✅ Schémas récupérés:', schemas.length);
        
        const classNames = schemas.map(s => s.className);
        console.log('Classes disponibles:', classNames);
        
        return schemas;
    } catch (error) {
        console.error('❌ Erreur lors de la récupération des schémas:', error);
        return null;
    }
}

async function getImpayesSchema() {
    try {
        console.log('🔍 Récupération du schéma impayes...');
        
        const schemas = await Parse.Schema.all();
        const impayesSchema = schemas.find(cls => cls.className === 'impayes');

        if (impayesSchema) {
            const fields = impayesSchema.fields;
            const columns = Object.keys(fields);
            
            console.log('✅ Schéma impayes trouvé !');
            console.log(`Nombre de colonnes: ${columns.length}`);
            console.log('Colonnes:', columns);
            
            // Afficher les détails de chaque colonne
            console.log('\n📋 Détails des colonnes:');
            columns.forEach(col => {
                const field = fields[col];
                console.log(`- ${col}: ${field.type} (requis: ${field.required || false})`);
            });
            
            // Stocker dans des variables globales
            window.impayesColumns = columns;
            window.impayesSchema = impayesSchema;
            
            return { columns, schema: impayesSchema };
        } else {
            console.log('❌ Classe impayes non trouvée');
            return null;
        }
    } catch (error) {
        console.error('❌ Erreur lors de la récupération du schéma impayes:', error);
        return null;
    }
}

// Fonction principale
async function main() {
    console.log('🚀 Démarrage des tests Parse...\n');
    
    // Tester la connexion
    const connectionOk = await testParseConnection();
    
    if (connectionOk) {
        // Récupérer tous les schémas
        const schemas = await getAllSchemas();
        
        if (schemas) {
            // Récupérer le schéma impayes
            const impayes = await getImpayesSchema();
            
            if (impayes) {
                console.log('\n🎉 Toutes les opérations ont réussi !');
                console.log('📋 Les colonnes sont disponibles dans window.impayesColumns');
                console.log('📄 Le schéma complet est disponible dans window.impayesSchema');
            }
        }
    } else {
        console.log('\n❌ Impossible de continuer sans connexion valide');
    }
}

// Exécuter automatiquement
main().catch(console.error);

// Exporter les fonctions pour une utilisation manuelle
window.testParseConnection = testParseConnection;
window.getAllSchemas = getAllSchemas;
window.getImpayesSchema = getImpayesSchema;