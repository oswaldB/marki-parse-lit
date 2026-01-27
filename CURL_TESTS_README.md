# Tests CURL pour la Fonction Cloud getImpayesSchema

Ce guide explique comment utiliser les scripts curl pour tester la fonction cloud `getImpayesSchema`.

## Fichiers disponibles

### 1. Scripts bash pour les tests

- **`test-cloud-function.sh`** : Script complet avec plusieurs méthodes de test
  - Teste la connexion au serveur Parse
  - Appelle la fonction cloud avec JavaScript Key
  - Appelle la fonction cloud avec Master Key (si configurée)
  - Analyse les réponses et affiche les résultats
  - Utilise `jq` pour un affichage formaté si disponible

- **`simple-curl-test.sh`** : Version simplifiée pour un test rapide
  - Vérifie la connexion au serveur
  - Appelle la fonction cloud
  - Affiche la réponse brute
  - Détecte les erreurs dans la réponse

## Prérequis

1. **curl** : Doit être installé sur votre système (généralement installé par défaut)
2. **jq** (optionnel) : Pour un affichage formaté des réponses JSON
   - Installation: `sudo apt-get install jq` (Ubuntu/Debian)
   - Ou: `brew install jq` (macOS)

## Comment utiliser

### Méthode 1: Exécuter le script complet

```bash
cd /home/oswald/Desktop/Marki-parse
./test-cloud-function.sh
```

### Méthode 2: Exécuter le test simple

```bash
cd /home/oswald/Desktop/Marki-parse
./simple-curl-test.sh
```

### Méthode 3: Exécuter curl directement

```bash
curl -X POST "https://dev.parse.markidiags.com/functions/getImpayesSchema" \
  -H "X-Parse-Application-Id: marki" \
  -H "X-Parse-Javascript-Key: Careless7-Gore4-Guileless0-Jogger5-Clubbed9" \
  -H "Content-Type: application/json" \
  -d '{}'
```

## Configuration

Les scripts utilisent la configuration suivante par défaut:
- **App ID**: `marki`
- **JavaScript Key**: `Careless7-Gore4-Guileless0-Jogger5-Clubbed9`
- **Server URL**: `https://dev.parse.markidiags.com`
- **Master Key**: `YOUR_MASTER_KEY` (à remplacer dans le script)

Pour modifier la configuration:
1. Éditez le fichier `test-cloud-function.sh`
2. Modifiez les variables en haut du script
3. Sauvegardez et exécutez à nouveau

## Résultats attendus

### Réponse réussie

Si la fonction cloud est correctement déployée et accessible, vous devriez voir:

```json
{
  "result": {
    "className": "impayes",
    "fields": {
      "colonne1": {"type": "String"},
      "colonne2": {"type": "Number"},
      "colonne3": {"type": "Date"}
      // ... autres colonnes
    }
  }
}
```

### Erreurs possibles

1. **Serveur inaccessible**:
   ```
   ❌ Impossible de joindre le serveur Parse
   ```

2. **Fonction cloud non trouvée**:
   ```json
   {
     "code": 141,
     "error": "Function not found."
   }
   ```

3. **Clés d'API invalides**:
   ```json
   {
     "code": 101,
     "error": "Invalid application Id."
   }
   ```

4. **Classe impayes non trouvée**:
   ```json
   {
     "result": null
   }
   ```

## Résolution des problèmes

### 1. Serveur Parse inaccessible
- Vérifiez que l'URL du serveur est correcte
- Assurez-vous que le serveur est en cours d'exécution
- Vérifiez votre connexion Internet
- Testez avec un navigateur: `https://dev.parse.markidiags.com`

### 2. Fonction cloud non trouvée
- Vérifiez que le fichier `parse-server/cloud/getSchema.js` est correctement déployé
- Assurez-vous que le fichier `parse-server/cloud/main.js` require le fichier getSchema.js
- Redémarrez le serveur Parse après avoir ajouté la fonction cloud
- Vérifiez les logs du serveur Parse pour les erreurs de déploiement

### 3. Clés d'API invalides
- Vérifiez que l'App ID et la JavaScript Key sont corrects
- Assurez-vous que les clés n'ont pas expiré
- Vérifiez que les clés correspondent à l'application Parse cible

### 4. Classe impayes non trouvée
- Vérifiez que la classe existe dans votre base de données Parse
- Assurez-vous que vous avez les droits d'accès appropriés
- Vérifiez l'orthographe (sensible à la casse)
- Essayez avec la Master Key pour un accès admin

## Utilisation de la Master Key

Pour utiliser la Master Key (accès admin):

1. Éditez le fichier `test-cloud-function.sh`
2. Remplacez `YOUR_MASTER_KEY` par la vraie Master Key
3. Exécutez le script à nouveau

La Master Key donne un accès complet à toutes les données et fonctions cloud.

## Exemples de commandes curl avancées

### Avec Master Key

```bash
curl -X POST "https://dev.parse.markidiags.com/functions/getImpayesSchema" \
  -H "X-Parse-Application-Id: marki" \
  -H "X-Parse-Master-Key: YOUR_MASTER_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Avec affichage formaté (jq)

```bash
curl -s -X POST "https://dev.parse.markidiags.com/functions/getImpayesSchema" \
  -H "X-Parse-Application-Id: marki" \
  -H "X-Parse-Javascript-Key: Careless7-Gore4-Guileless0-Jogger5-Clubbed9" \
  -H "Content-Type: application/json" \
  -d '{}' | jq '.'
```

### Extraire uniquement les colonnes

```bash
curl -s -X POST "https://dev.parse.markidiags.com/functions/getImpayesSchema" \
  -H "X-Parse-Application-Id: marki" \
  -H "X-Parse-Javascript-Key: Careless7-Gore4-Guileless0-Jogger5-Clubbed9" \
  -H "Content-Type: application/json" \
  -d '{}' | jq -r '.result.fields | keys[]'
```

## Prochaines étapes

Une fois que vous avez récupéré le schéma avec succès:

1. **Analysez les colonnes**: Identifiez toutes les colonnes disponibles dans la classe impayes
2. **Mettez à jour l'interface**: Modifiez le fichier `/home/oswald/Desktop/Marki-parse/public/app/relances/sequence/index.html` pour inclure toutes les colonnes
3. **Validez les données**: Utilisez les informations de schéma pour valider les données dans votre application
4. **Créez des formulaires dynamiques**: Utilisez le schéma pour générer des formulaires basés sur les types de données