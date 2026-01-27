#!/bin/bash

# Script pour tester la fonction cloud getImpayesSchema
# Ce script utilise curl pour appeler la fonction cloud Parse

echo "🔍 Test de la fonction cloud getImpayesSchema"
echo "============================================"

# Configuration Parse
PARSE_APP_ID="marki"
PARSE_JS_KEY="Careless7-Gore4-Guileless0-Jogger5-Clubbed9"
PARSE_MASTER_KEY="YOUR_MASTER_KEY"  # À remplacer par la vraie master key
PARSE_SERVER_URL="https://dev.parse.markidiags.com"

# URL de la fonction cloud
CLOUD_FUNCTION_URL="${PARSE_SERVER_URL}/functions/getImpayesSchema"

echo "Configuration:"
echo "- App ID: $PARSE_APP_ID"
echo "- Server URL: $PARSE_SERVER_URL"
echo "- Fonction cloud: getImpayesSchema"
echo ""

# Tester la connexion au serveur
echo "📡 Test de connexion au serveur Parse..."
if curl -s -o /dev/null -w "%{http_code}" "$PARSE_SERVER_URL" | grep -q "200"; then
    echo "✅ Serveur Parse accessible"
else
    echo "❌ Impossible de joindre le serveur Parse"
    exit 1
fi
echo ""

# Appeler la fonction cloud
echo "🚀 Appel de la fonction cloud getImpayesSchema..."

echo "Méthode 1: Avec JavaScript Key (accès client)"
echo "----------------------------------------------"
RESPONSE=$(curl -s -X POST "$CLOUD_FUNCTION_URL" \
    -H "X-Parse-Application-Id: $PARSE_APP_ID" \
    -H "X-Parse-Javascript-Key: $PARSE_JS_KEY" \
    -H "Content-Type: application/json" \
    -d '{}')

echo "Réponse brute:"
echo "$RESPONSE"
echo ""

# Vérifier si la réponse contient des données valides
if echo "$RESPONSE" | grep -q "fields"; then
    echo "✅ Fonction cloud exécutée avec succès !"
    echo ""
    echo "📋 Colonnes disponibles:"
    echo "$RESPONSE" | jq -r '.fields | keys[]' 2>/dev/null || echo "(jq non disponible, affichage brut)"
    echo ""
    echo "📊 Détails complets:"
    echo "$RESPONSE" | jq '.' 2>/dev/null || echo "$RESPONSE"
else
    echo "❌ La fonction cloud n'a pas retourné de schéma valide"
    echo "Erreur possible:"
    echo "$RESPONSE" | jq '.error' 2>/dev/null || echo "$RESPONSE"
fi

echo ""
echo "Méthode 2: Avec Master Key (accès admin)"
echo "------------------------------------------"
if [ "$PARSE_MASTER_KEY" != "YOUR_MASTER_KEY" ]; then
    RESPONSE_MASTER=$(curl -s -X POST "$CLOUD_FUNCTION_URL" \
        -H "X-Parse-Application-Id: $PARSE_APP_ID" \
        -H "X-Parse-Master-Key: $PARSE_MASTER_KEY" \
        -H "Content-Type: application/json" \
        -d '{}')
    
    echo "Réponse avec Master Key:"
    echo "$RESPONSE_MASTER" | jq '.' 2>/dev/null || echo "$RESPONSE_MASTER"
else
    echo "⚠️  Master Key non configurée, test avec Master Key ignoré"
fi

echo ""
echo "🎯 Test terminé"

echo ""
echo "Si vous obtenez des erreurs:"
echo "1. Vérifiez que le serveur Parse est en cours d'exécution"
echo "2. Assurez-vous que la fonction cloud est correctement déployée"
echo "3. Vérifiez les clés d'API (App ID, JavaScript Key, Master Key)"
echo "4. Consultez les logs du serveur Parse pour plus de détails"