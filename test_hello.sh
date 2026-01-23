#!/bin/bash

# Configuration de l'URL de Parse Server
PARSE_SERVER_URL="http://localhost:1337"

# Vérification que curl est disponible
if ! command -v curl &> /dev/null; then
    echo "Erreur: curl n'est pas installé."
    echo "Veuillez installer curl avec la commande suivante :"
    echo "sudo apt-get install curl"
    exit 1
fi

# Envoi de la requête pour tester la fonction hello
echo "Test de la fonction hello..."
curl -X POST \
  -H "X-Parse-Application-Id: marki" \
  -H "X-Parse-REST-API-Key: Careless7-Gore4-Guileless0-Jogger5-Clubbed9" \
  -H "Content-Type: application/json" \
  -d "{}" \
  "${PARSE_SERVER_URL}/functions/syncImpayes"

# Vérification du résultat
if [ $? -eq 0 ]; then
    echo ""
    echo "Test terminé avec succès."
else
    echo ""
    echo "Erreur lors du test de la fonction hello."
fi