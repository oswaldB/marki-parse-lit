# page relance/sequence/#id
## todo
+ met les boutons inactif, tester et supprimer les uns en dessous des autres.
+ Supprimer l'action me donne Êtes-vous sûr de vouloir supprimer cette action ? Cette action est irréversible. Pes de bouton pour dire oui. Rajoute le bouton pour confirmer.
+ l'execution du tests consiste à prendre le premier impayés avec un restapayer >0 dans la base de données (Impayes) et appeler un script en cloudcode qui va envoyer tous les messages de la sequence sauf que le destinataire est la valeur dans le drawer.

## doing
+ remplace toutes les confirmations alertjs par des popups.
+ quand on appuie sur le bouton Tester, il faut ouvrir un drawer qui demande à qui on veut envoyer les emails. Si aucun profil SMTP renseigné alors message d'erreur en mode callout et le bouton Tester est disabled.
## done
+ Le changement de statut actif/inactif est un toggle et pas un bouton. Il est disabled si pas de profil SMTP.
+ + lors des confirlation, je veux que la bande supérieure soit bleu 007ACE et pas orange et il manque le bouton de confirmation de l'action.
---

# page /app/relances/sequences
## todo
+ mettre un bouton editer
+ mettre un bouton actif/inactif. - later

## done
+ ne pas afficher les actions dans la card des sequence
---
# page /app/settings/emails-smtp/
## todo
+ le check de l'auth se fait par le component [text](../public/components/check-auth.js)
+  toujours des icones lucid à utiliser en CDN: https://cdn.jsdelivr.net/npm/lucide@0.563.0/dist/cjs/lucide.min.js
+  erreur de l'init de parse. regarde dans tes instructions.

 
## doing
 + metre des icones lucid
  + appeler la base de données parse directement depuis le front sans passer par /api/smtp-profiles.
  + mettre un bouton de test qui envoi un email en français: ceci est un email de test depuis Marki. on demande le destinataire de l'email dans un drawer.
## done


---
# /cloud/main.js
## todo
## done
+ met le script test email dans un autre fichier - comme les autres fichiers.

---
# global front
## todo

# /app/settings/team
## todo
+ une page qui permet d'ajouter des users. L'ajout de user passe par une fonction cloud code tout comme la modification. 
+ La suppression d'un user n'est pas possible
+ Seul les uses qui ont is_admin a true peuvent voir cet ecran.
+ L'ajout et la modification des valeurs de users passent par un drawer.
+  On peut modifier le mot de passe d'un user pas de règles specifique d'un user.
+  Pour faire des appels js avec la master key il faut ajouter ,{ useMasterKey: true } 
---
# app/settings
## todo
+ il manque le logo de Marki sur cette page.
+ il faut aussi y mettre les galets
+ je veux la sidebar.
## done
+ affichage sous la forme d'une grid de toutes les pages de settings.
---
# sidebar-relance
## todo
+ lien vers les paramètres /app/settings.
