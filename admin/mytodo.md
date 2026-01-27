# page relance/sequence/#id
## todo
+ Le changement de statut actif/inactif est un toggle et pas un bouton. Il est disabled si pas de profil SMTP.
+ l'execution du tests consiste à prendre le premier impayés avec un restapayer >0 dans la base de données (Impayes) et appeler un script en cloudcode qui va envoyer tous les messages de la sequence sauf que le destinataire est la valeur dans le drawer.
## doing
+ lors des confirlation, je veux que la bande supérieure soit bleu 007ACE et pas orange et il manque le bouton de confirmation de l'action.
+ remplace toutes les confirmations alertjs par des popups.
+ quand on appuie sur le bouton Tester, il faut ouvrir un drawer qui demande à qui on veut envoyer les emails. Si aucun profil SMTP renseigné alors message d'erreur en mode callout et le bouton Tester est disabled.
## done


# page /app/settings/emails-smtp/
## todo
+  toujours des icones lucid à utiliser en CDN: https://cdn.jsdelivr.net/npm/lucide@0.563.0/dist/cjs/lucide.min.js
 
## doing
 + metre des icones lucid
  + appeler la base de données parse directement depuis le front sans passer par /api/smtp-profiles.
  + mettre un bouton de test qui envoi un email en français: ceci est un email de test depuis Marki. on demande le destinataire de l'email dans un drawer.
## done

# /cloud/main.js
## todo
## done
+ met le script test email dans un autre fichier - comme les autres fichiers.

# global front
## todo
