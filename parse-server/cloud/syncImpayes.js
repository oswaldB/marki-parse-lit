const { Pool } = require('pg');
require('dotenv').config(); // Charger les variables d'environnement depuis .env

// Configuration Parse Server
const PARSE_COLLECTION = 'Impayes'; // Nom de la classe dans Parse Server

Parse.Cloud.define('syncImpayes', async (request) => {

  console.log('========================================');
  console.log('Début de la synchronisation des impayés...');
  console.log('========================================');
  console.log('Configuration de la base PostgreSQL :');
  console.log('Host :', process.env.DB_HOST);
  console.log('Port :', process.env.DB_PORT);
  console.log('User :', process.env.DB_USER);
  console.log('Database :', process.env.DB_NAME);

  // Connexion à PostgreSQL
  console.log('\n========================================');
  console.log('Connexion à la base PostgreSQL...');
  console.log('========================================');
  console.log('Paramètres de connexion :');
  console.log('- Host:', process.env.DB_HOST);
  console.log('- Port:', process.env.DB_PORT);
  console.log('- User:', process.env.DB_USER);
  console.log('- Database:', process.env.DB_NAME);
  console.log('- Password:', process.env.DB_PASSWORD ? '********' : 'Non défini');

  // Vérifier que les paramètres de connexion sont définis
  const dbHost = process.env.DB_HOST || 'localhost';
  const dbPort = process.env.DB_PORT || '5432';
  const dbUser = process.env.DB_USER || 'postgres';
  const dbName = process.env.DB_NAME || 'postgres';
  const dbPassword = process.env.DB_PASSWORD || '';

  if (!dbHost || !dbPort || !dbUser || !dbName) {
    console.error('✗ Erreur : Certains paramètres de connexion à PostgreSQL ne sont pas définis.');
    console.error('Veuillez vérifier votre fichier .env.');
    throw new Error('Paramètres de connexion à PostgreSQL manquants.');
  }

  const pgPool = new Pool({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    database: dbName,
  });

  // Écouter les événements de la connexion
  pgPool.on('error', (err) => {
    console.error('✗ Erreur de connexion à PostgreSQL :', err.message);
    console.error('Détails de l\'erreur :', err);
  });

  // Tester la connexion
  console.log('\nTest de la connexion à PostgreSQL...');
  try {
    const res = await pgPool.query('SELECT 1');
    console.log('✓ Connexion à PostgreSQL établie avec succès.');
    console.log('✓ La base de données est accessible.');
    console.log('Résultat du test :', res.rows[0]);
  } catch (err) {
    console.error('✗ Échec de la connexion à PostgreSQL :', err.message);
    console.error('Code d\'erreur :', err.code);
    console.error('Détails de l\'erreur :', err);
    throw err;
  }

  try {
    console.log('\n========================================');
    console.log('Exécution de la requête PostgreSQL...');
    console.log('========================================');
    console.log('La requête peut prendre quelques secondes...');
    console.log('Veuillez patienter...');

    // Exécuter la requête PostgreSQL avec un timeout
    const query = `
 SELECT
  -- Champs Pièce
  p."nfacture" AS "nfacture",
  p."datepiece" AS "datepiece",
  p."totalhtnet" AS "totalhtnet",
  p."totalttcnet" AS "totalttcnet",
  p."resteapayer" AS "resteapayer",
  p."facturesoldee" AS "facturesoldee",
  p."commentaire" AS "commentaire_piece",
  p."refpiece" AS "refpiece",

  -- Champs Dossier
  d."idDossier" AS "idDossier",
  d."idStatut" AS "idStatut",
  s."intitule" AS "statut_intitule",
  d."contactPlace" AS "contactPlace",
  d."reference" AS "reference",
  d."referenceExterne" AS "referenceExterne",
  d."numero" AS "numero",
  d."idEmployeIntervention" AS "idEmployeIntervention",
  d."commentaire" AS "commentaire_dossier",
  d."adresse" AS "adresse",
  d."cptAdresse" AS "cptAdresse",
  d."codePostal" AS "codePostal",
  d."ville" AS "ville",
  d."numeroLot" AS "numeroLot",
  d."etage" AS "etage",
  d."entree" AS "entree",
  d."escalier" AS "escalier",
  d."porte" AS "porte",
  d."numVoie" AS "numVoie",
  d."cptNumVoie" AS "cptNumVoie",
  d."typeVoie" AS "typeVoie",
  d."dateDebutMission" AS "dateDebutMission",
  COALESCE(e."prenom" || ' ' || e."nom", '') AS "employe_intervention",

  -- Acquéreur
  MAX(CASE WHEN role."intitule" = 'Acquéreur' THEN iloc."nom" || ' ' || iloc."prenom" END) AS "acquerur_nom",
  MAX(CASE WHEN role."intitule" = 'Acquéreur' THEN iloc."email" END) AS "acquerur_email",
  MAX(CASE WHEN role."intitule" = 'Acquéreur' THEN iloc."telephoneMobile" END) AS "acquerur_telephone",

  -- Apporteur d'affaire
  MAX(CASE WHEN role."intitule" = 'Apporteur d''affaire' THEN 
    CASE 
      WHEN iloc."typePersonne" = 'M' THEN iloc."nom"
      ELSE COALESCE(iloc."nom" || ' ' || iloc."prenom", iloc."nom", iloc."prenom")
    END
  END) AS "apporteur_affaire_nom",
  MAX(CASE WHEN role."intitule" = 'Apporteur d''affaire' THEN iloc."email" END) AS "apporteur_affaire_email",
  MAX(CASE WHEN role."intitule" = 'Apporteur d''affaire' THEN iloc."telephoneMobile" END) AS "apporteur_affaire_telephone",
  MAX(CASE WHEN role."intitule" = 'Apporteur d''affaire' THEN iloc."typePersonne" END) AS "apporteur_affaire_typePersonne",
  MAX(CASE WHEN role."intitule" = 'Apporteur d''affaire' THEN 
    CASE 
      WHEN ilocContact."typePersonne" = 'M' THEN ilocContact."nom"
      ELSE COALESCE(ilocContact."nom" || ' ' || ilocContact."prenom", ilocContact."nom", ilocContact."prenom")
    END
  END) AS "apporteur_affaire_contact_nom",
  MAX(CASE WHEN role."intitule" = 'Apporteur d''affaire' THEN ilocContact."email" END) AS "apporteur_affaire_contact_email",

  -- Donneur d'ordre
  MAX(CASE WHEN role."intitule" = 'Donneur d''ordre' THEN iloc."nom" || ' ' || iloc."prenom" END) AS "donneur_ordre_nom",
  MAX(CASE WHEN role."intitule" = 'Donneur d''ordre' THEN iloc."email" END) AS "donneur_ordre_email",
  MAX(CASE WHEN role."intitule" = 'Donneur d''ordre' THEN iloc."telephoneMobile" END) AS "donneur_ordre_telephone",

  -- Locataire entrant
  MAX(CASE WHEN role."intitule" = 'Locataire entrant' THEN iloc."nom" || ' ' || iloc."prenom" END) AS "locataire_entrant_nom",
  MAX(CASE WHEN role."intitule" = 'Locataire entrant' THEN iloc."email" END) AS "locataire_entrant_email",
  MAX(CASE WHEN role."intitule" = 'Locataire entrant' THEN iloc."telephoneMobile" END) AS "locataire_entrant_telephone",

  -- Locataire sortant
  MAX(CASE WHEN role."intitule" = 'Locataire sortant' THEN iloc."nom" || ' ' || iloc."prenom" END) AS "locataire_sortant_nom",
  MAX(CASE WHEN role."intitule" = 'Locataire sortant' THEN iloc."email" END) AS "locataire_sortant_email",
  MAX(CASE WHEN role."intitule" = 'Locataire sortant' THEN iloc."telephoneMobile" END) AS "locataire_sortant_telephone",

  -- Notaire
  MAX(CASE WHEN role."intitule" = 'Notaire' THEN iloc."nom" || ' ' || iloc."prenom" END) AS "notaire_nom",
  MAX(CASE WHEN role."intitule" = 'Notaire' THEN iloc."email" END) AS "notaire_email",
  MAX(CASE WHEN role."intitule" = 'Notaire' THEN iloc."telephoneMobile" END) AS "notaire_telephone",

  -- Payeur
  MAX(CASE WHEN role."intitule" = 'Payeur' THEN 
    CASE 
      WHEN iloc."typePersonne" = 'M' THEN iloc."nom"
      ELSE COALESCE(iloc."nom" || ' ' || iloc."prenom", iloc."nom", iloc."prenom")
    END
  END) AS "payeur_nom",
  MAX(CASE WHEN role."intitule" = 'Payeur' THEN iloc."email" END) AS "payeur_email",
  MAX(CASE WHEN role."intitule" = 'Payeur' THEN iloc."telephoneMobile" END) AS "payeur_telephone",
  MAX(CASE WHEN role."intitule" = 'Payeur' THEN iloc."typePersonne" END) AS "payeur_typePersonne",
  MAX(CASE WHEN role."intitule" = 'Payeur' THEN 
    CASE 
      WHEN ilocContact."typePersonne" = 'M' THEN ilocContact."nom"
      ELSE COALESCE(ilocContact."nom" || ' ' || ilocContact."prenom", ilocContact."nom", ilocContact."prenom")
    END
  END) AS "payeur_contact_nom",
  MAX(CASE WHEN role."intitule" = 'Payeur' THEN ilocContact."email" END) AS "payeur_contact_email",

  -- Propriétaire
  MAX(CASE WHEN role."intitule" = 'Propriétaire' THEN 
    CASE 
      WHEN iloc."typePersonne" = 'M' THEN iloc."nom"
      ELSE COALESCE(iloc."nom" || ' ' || iloc."prenom", iloc."nom", iloc."prenom")
    END
  END) AS "proprietaire_nom",
  MAX(CASE WHEN role."intitule" = 'Propriétaire' THEN iloc."email" END) AS "proprietaire_email",
  MAX(CASE WHEN role."intitule" = 'Propriétaire' THEN iloc."telephoneMobile" END) AS "proprietaire_telephone",
  MAX(CASE WHEN role."intitule" = 'Propriétaire' THEN iloc."typePersonne" END) AS "proprietaire_typePersonne",
  MAX(CASE WHEN role."intitule" = 'Propriétaire' THEN 
    CASE 
      WHEN ilocContact."typePersonne" = 'M' THEN ilocContact."nom"
      ELSE COALESCE(ilocContact."nom" || ' ' || ilocContact."prenom", ilocContact."nom", ilocContact."prenom")
    END
  END) AS "proprietaire_contact_nom",
  MAX(CASE WHEN role."intitule" = 'Propriétaire' THEN ilocContact."email" END) AS "proprietaire_contact_email",

  -- Syndic
  MAX(CASE WHEN role."intitule" = 'Syndic' THEN iloc."nom" || ' ' || iloc."prenom" END) AS "syndic_nom",
  MAX(CASE WHEN role."intitule" = 'Syndic' THEN iloc."email" END) AS "syndic_email",
  MAX(CASE WHEN role."intitule" = 'Syndic' THEN iloc."telephoneMobile" END) AS "syndic_telephone",

  -- Calcul du type de payeur
  CASE
    WHEN MAX(CASE WHEN role."intitule" = 'Payeur' THEN 
      CASE 
        WHEN iloc."typePersonne" = 'M' THEN iloc."nom"
        ELSE COALESCE(iloc."nom" || ' ' || iloc."prenom", iloc."nom", iloc."prenom")
      END
    END) = MAX(CASE WHEN role."intitule" = 'Propriétaire' THEN 
      CASE 
        WHEN iloc."typePersonne" = 'M' THEN iloc."nom"
        ELSE COALESCE(iloc."nom" || ' ' || iloc."prenom", iloc."nom", iloc."prenom")
      END
    END)
    THEN 'Propriétaire'
    WHEN MAX(CASE WHEN role."intitule" = 'Payeur' THEN 
      CASE 
        WHEN iloc."typePersonne" = 'M' THEN iloc."nom"
        ELSE COALESCE(iloc."nom" || ' ' || iloc."prenom", iloc."nom", iloc."prenom")
      END
    END) = MAX(CASE WHEN role."intitule" = 'Apporteur d''affaire' THEN 
      CASE 
        WHEN iloc."typePersonne" = 'M' THEN iloc."nom"
        ELSE COALESCE(iloc."nom" || ' ' || iloc."prenom", iloc."nom", iloc."prenom")
      END
    END)
    THEN 'Apporteur d''affaire'
    ELSE 'Autre'
  END AS "payeur_type"

FROM
  "public"."(GCO) GcoPiece" p
LEFT JOIN
  "public"."(GCO) GcoPieceMetier" pm ON p."idpiece" = pm."idpiece"
LEFT JOIN
  "public"."(ADN_DIAG) Dossier" d ON pm."idmetier" = d."idDossier"
LEFT JOIN
  "public"."(ADN_RG)Employe" e ON d."idEmployeIntervention" = e."idEmploye"
LEFT JOIN
  "public"."(ADN_DIAG) StatutDossier" s ON d."idStatut" = s."idStatut"
LEFT JOIN
  "public"."(ADN_DIAG) DossierInterlocuteur" di ON d."idDossier" = di."idDossier"
LEFT JOIN
  "public"."(ADN_RG)Interlocuteur" iloc ON di."idInterlocuteur" = iloc."idInterlocuteur"
LEFT JOIN
  "public"."(ADN_RG)Interlocuteur" ilocContact ON di."idContact" = ilocContact."idInterlocuteur"
LEFT JOIN
  "public"."(ADN_DIAG) RoleInterlocuteurDossier" role ON di."idRole" = role."idRole"

WHERE
  (p."nfacture" IS NOT NULL)
  AND (
    p."datepiece" >= (
      CAST(CAST((NOW() + INTERVAL '-300000 day') AS date) AS timestamptz) + INTERVAL '-7 day'
    )
  )
  AND (
    p."datepiece" < (
      CAST(CAST(NOW() AS date) AS timestamptz) + INTERVAL '-7 day'
    )
  )
  AND (p."facturesoldee" = FALSE)
  AND (p."resteapayer" > 0)
  AND (p."valide" = TRUE)
  AND EXISTS (
    SELECT 1 
    FROM "public"."(ADN_DIAG) DossierInterlocuteur" di2
    LEFT JOIN "public"."(ADN_DIAG) RoleInterlocuteurDossier" role2 ON di2."idRole" = role2."idRole"
    WHERE di2."idDossier" = d."idDossier" 
    AND role2."intitule" = 'Payeur'
  )

GROUP BY
  p."nfacture",
  p."datepiece",
  p."totalhtnet",
  p."totalttcnet",
  p."resteapayer",
  p."facturesoldee",
  p."commentaire",
  p."refpiece",
  d."idDossier",
  d."idStatut",
  s."intitule",
  d."contactPlace",
  d."reference",
  d."referenceExterne",
  d."numero",
  d."idEmployeIntervention",
  d."commentaire",
  d."adresse",
  d."cptAdresse",
  d."codePostal",
  d."ville",
  d."numeroLot",
  d."etage",
  d."entree",
  d."escalier",
  d."porte",
  d."numVoie",
  d."cptNumVoie",
  d."typeVoie",
  d."dateDebutMission",
  COALESCE(e."prenom" || ' ' || e."nom", '')
ORDER BY p."datepiece" DESC
    `;

    // Initialiser externalData pour éviter les erreurs de référence
    let externalData = [];
    
    // Ajouter un timeout à la requête PostgreSQL
    const client = await pgPool.connect();
    try {
      // Définir un timeout de 10 secondes pour la requête
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('Timeout: La requête PostgreSQL a dépassé le temps d\'exécution maximum de 10 secondes.'));
        }, 10000);
      });

      console.log('Exécution de la requête PostgreSQL...');
      console.log('Veuillez patienter, cela peut prendre un moment...');
      console.log('Si le timeout est atteint, la requête sera annulée.');

      const res = await Promise.race([
        client.query(query),
        timeoutPromise
      ]);
      externalData = res.rows;
      console.log(`Récupération de ${externalData.length} factures impayées depuis la base PostgreSQL.`);
      console.log('Exemple de données externes :', externalData.length > 0 ? externalData[0] : 'Aucune donnée');
    } catch (err) {
      if (err.message.startsWith('Timeout:')) {
        console.error('Erreur :', err.message);
        console.error('La requête PostgreSQL a été annulée en raison d\'un timeout.');
        console.error('Veuillez vérifier la requête ou la connexion à la base de données.');
      } else {
        throw err;
      }
    } finally {
      client.release();
    }

    // Vérifier si externalData contient des données valides
    if (externalData.length === 0) {
      console.log('\nAucune donnée externe à synchroniser. Arrêt du script.');
      console.log('========================================');
      console.log('Fin du script de synchronisation.');
      console.log('========================================');
      return { success: true, message: 'Aucune donnée à synchroniser', inserted: 0, updated: 0, skipped: 0 };
    }

    // Récupérer les données locales depuis Parse Server
    console.log('\nRécupération des données locales depuis Parse Server...');
    let localData = [];
    try {
      // Créer une requête pour récupérer toutes les données existantes
      const Impaye = Parse.Object.extend(PARSE_COLLECTION);
      const query = new Parse.Query(Impaye);
      
      // Récupérer toutes les données avec une limite de 10 000 résultats
      query.limit(10000);
      const results = await query.find();
      localData = results.map(item => item.toJSON());
      
      console.log(`✓ Récupération terminée. Total : ${localData.length} factures impayées.`);
      console.log('Exemple de données locales :', localData.length > 0 ? localData[0] : 'Aucune donnée');
    } catch (err) {
      console.error('❌ Erreur lors de la récupération des données depuis Parse Server :');
      console.error('Message d\'erreur :', err.message);
      console.error('Détails :', err);
      throw err;
    }

    // Comparer et mettre à jour
    console.log('\nComparaison et synchronisation des données...');
    let updatedCount = 0;
    let insertedCount = 0;
    let skippedCount = 0;

    for (const externalRow of externalData) {
      console.log(`\nTraitement de la facture ${externalRow.nfacture}...`);
      
      // Valider les données avant l'envoi
      if (!externalRow.nfacture || !externalRow.idDossier) {
        console.error(`❌ Erreur : Les champs requis (nfacture ou idDossier) sont manquants pour la facture ${externalRow.nfacture}.`);
        continue;
      }
      
      // Vérifier les types de données
      const requiredFields = ['nfacture', 'idDossier', 'datepiece', 'totalhtnet', 'totalttcnet', 'resteapayer', 'facturesoldee'];
      for (const field of requiredFields) {
        if (externalRow[field] === undefined || externalRow[field] === null) {
          console.error(`❌ Erreur : Le champ requis ${field} est manquant ou null pour la facture ${externalRow.nfacture}.`);
          continue;
        }
      }
      
      // Convertir les champs numériques en nombres
      const numericFields = ['totalhtnet', 'totalttcnet', 'resteapayer'];
      for (const field of numericFields) {
        if (typeof externalRow[field] === 'string') {
          externalRow[field] = parseFloat(externalRow[field]);
        }
      }
      
      // Vérifier les types de données numériques
      const requiredNumericFields = ['nfacture', 'idDossier', 'totalhtnet', 'totalttcnet', 'resteapayer'];
      for (const field of requiredNumericFields) {
        if (typeof externalRow[field] !== 'number') {
          console.error(`❌ Erreur : Le champ ${field} doit être un nombre pour la facture ${externalRow.nfacture}. Type actuel : ${typeof externalRow[field]}`);
          continue;
        }
      }
      
      // Vérifier les types de données booléens
      if (typeof externalRow.facturesoldee !== 'boolean') {
        console.error(`❌ Erreur : Le champ facturesoldee doit être un booléen pour la facture ${externalRow.nfacture}. Type actuel : ${typeof externalRow.facturesoldee}`);
        continue;
      }
      
      const localRow = localData.find(row => row.nfacture === externalRow.nfacture && row.idDossier === externalRow.idDossier);

      if (!localRow) {
        console.log(`La facture ${externalRow.nfacture} n'existe pas dans Parse Server. Insertion...`);
        try {
          // Insérer une nouvelle entrée dans Parse Server
          const Impaye = Parse.Object.extend(PARSE_COLLECTION);
          const newImpaye = new Impaye();
          
          // Définir toutes les propriétés
          for (const [key, value] of Object.entries(externalRow)) {
            newImpaye.set(key, value);
          }
          
          const savedItem = await newImpaye.save();
          insertedCount++;
          console.log(`✓ Facture ${externalRow.nfacture} insérée avec succès. ID : ${savedItem.id}`);
        } catch (err) {
          console.error(`❌ Erreur lors de l'insertion de la facture ${externalRow.nfacture} :`);
          console.error('Message d\'erreur :', err.message);
          console.error('Détails :', err);
          console.error('Données envoyées :', JSON.stringify(externalRow, null, 2));
        }
      } else if (JSON.stringify(localRow) !== JSON.stringify(externalRow)) {
        console.log(`La facture ${externalRow.nfacture} existe déjà dans Parse Server mais est différente. Mise à jour...`);
        try {
          // Mettre à jour l'entrée existante dans Parse Server
          const Impaye = Parse.Object.extend(PARSE_COLLECTION);
          const query = new Parse.Query(Impaye);
          query.equalTo('nfacture', externalRow.nfacture);
          query.equalTo('idDossier', externalRow.idDossier);
          
          const itemToUpdate = await query.first();
          if (itemToUpdate) {
            // Mettre à jour toutes les propriétés
            for (const [key, value] of Object.entries(externalRow)) {
              itemToUpdate.set(key, value);
            }
            
            await itemToUpdate.save();
            updatedCount++;
            console.log(`✓ Facture ${externalRow.nfacture} mise à jour avec succès.`);
          }
        } catch (err) {
          console.error(`❌ Erreur lors de la mise à jour de la facture ${externalRow.nfacture} :`);
          console.error('Message d\'erreur :', err.message);
          console.error('Détails :', err);
          console.error('Données envoyées :', JSON.stringify(externalRow, null, 2));
        }
      } else {
        console.log(`La facture ${externalRow.nfacture} existe déjà dans Parse Server et est identique. Aucune action nécessaire.`);
        skippedCount++;
      }
    }

    console.log('\n========================================');
    console.log('Synchronisation terminée avec succès !');
    console.log('========================================');
    console.log(`Nombre de nouvelles entrées ajoutées : ${insertedCount}`);
    console.log(`Nombre d'entrées mises à jour : ${updatedCount}`);
    console.log(`Nombre d'entrées inchangées : ${skippedCount}`);
    console.log(`Total des entrées traitées : ${externalData.length}`);

    return {
      success: true,
      message: 'Synchronisation terminée avec succès',
      inserted: insertedCount,
      updated: updatedCount,
      skipped: skippedCount,
      total: externalData.length
    };
  } catch (err) {
    console.error('\n========================================');
    console.error('Erreur lors de la synchronisation :');
    console.error('========================================');
    console.error('Message d\'erreur :', err.message);
    console.error('Détails de l\'erreur :', err.response ? err.response.data : err);
    console.error('Stack trace :', err.stack);
    
    return {
      success: false,
      message: 'Erreur lors de la synchronisation',
      error: err.message,
      details: err.response ? err.response.data : err
    };
  } finally {
    // Fermer la connexion à PostgreSQL
    console.log('\nFermeture de la connexion à PostgreSQL...');
    await pgPool.end();
    console.log('Connexion à PostgreSQL fermée avec succès.');
    console.log('========================================');
    console.log('Fin du script de synchronisation.');
    console.log('========================================');
  }
});