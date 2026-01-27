#!/bin/bash

# Test simple avec curl pour appeler la fonction cloud

echo "Test de la fonction cloud getImpayesSchema"
echo "============================================"

# Configuration
APP_ID="marki"
JS_KEY="Careless7-Gore4-Guileless0-Jogger5-Clubbed9"
SERVER_URL="https://dev.parse.markidiags.com"

# Test 1: Vérifier que le serveur est accessible
echo "Test 1: Vérification de la connexion au serveur..."
curl -s -o /dev/null -w "Code HTTP: %{http_code}\n" "$SERVER_URL"
echo ""

# Test 2: Appeler la fonction cloud
echo "Test 2: Appel de la fonction cloud getImpayesSchema..."
RESPONSE=$(curl -s -X POST "${SERVER_URL}/functions/getImpayesSchema" \
    -H "X-Parse-Application-Id: $APP_ID" \
    -H "X-Parse-Javascript-Key: $JS_KEY" \
    -H "Content-Type: application/json" \
    -d '{}')

echo "Réponse:"
echo "$RESPONSE"
echo ""

# Analyser la réponse
if echo "$RESPONSE" | grep -q "error"; then
    echo "❌ Erreur détectée dans la réponse"
    echo "$RESPONSE" | grep -o '"error":"[^"]*"' | sed 's/"error":"\([^"]*\)"/Erreur: \1/'
else
    echo "✅ Réponse reçue (peut contenir des données ou une erreur)"
fi