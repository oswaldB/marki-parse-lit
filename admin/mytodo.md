# page relance/sequence/#id
## todo
+ on peut editer la description. la description est moins large.
+ les popup de confirmation ne permettent pas de confirmer. Supprime tout le code qui gère cela et met un simple prompt en javascript.
+ l'execution du tests consiste à prendre le premier impayés avec un restapayer >0 dans la base de données (Impayes) et appeler un script en cloudcode qui va envoyer tous les messages de la sequence sauf que le destinataire est la valeur dans le drawer.
+ + quand on appuie sur le bouton Tester, il faut ouvrir un drawer qui demande à qui on veut envoyer les emails - champ libre. 
## doing

## done
+ on peut changer le nom de la sequence avec une icone stylo/edit à coté du nom de la séquence.
+ met les boutons inactif, tester et supprimer les uns en dessous des autres. et dans une taille normale de bouton.
+ remplace toutes les confirmations alertjs par des popups.
+ le dropdown de slection d'un profil smtp ne fonctionne pas ou est non peuplé car le nom de la classe est SMTPProfile sans s
+ Le changement de statut actif/inactif est un toggle et pas un bouton. Il est disabled si pas de profil SMTP.
+ + lors des confirlation, je veux que la bande supérieure soit bleu 007ACE et pas orange et il manque le bouton de confirmation de l'action.
---

# page @/public/app/relances/sequences
## todo
## done
+ le drawer creation nouvelle sequence, ne demande que le nom. supprime tout le reste.
+ mettre un bouton actif/inactif. - later
+ ne pas afficher les actions dans la card des sequence
  + mettre un bouton editer qui va sur la page sequence/#id

---
# page /app/settings/emails-smtp/
## todo
+ cette page contient un datatable ou des cards qui liste les profiles smtp. Un bouton permet d'en ajouter, on peut en archiver.
+ toutes les actions de create/update se font par un drawer 50% largeur.
+ on peut tester un profile smtp via la fonction cloud code sendTestEmail via un bouton tester.
+ on peut editer un profil smtp 
+ il y a une sidebar qui est sidebar.js
## done
+ initialsation de parse mauvaise. regarde les instructions
+ metre des icones lucid
+ appeler la base de données parse directement depuis le front sans passer par /api/smtp-profiles.
+ mettre un bouton de test qui envoi un email en français: ceci est un email de test depuis Marki. on demande le destinataire de l'email dans un drawer.
+ le check de l'auth se fait par le component [text](../public/components/check-auth.js)
+  toujours des icones lucid à utiliser en CDN: https://cdn.jsdelivr.net/npm/lucide@0.563.0/dist/cjs/lucide.min.js
+  erreur de l'init de parse. regarde dans tes instructions. 
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
+ transforme cette page en un simple crud des users existants - pas besoin de check is_admin.
+ il faut utiliser component sidebar.js ici et pas mettre du code html dans la page.
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
+ toutes les icones sont en lucid.

## done
+ lien vers les paramètres /app/settings.

---
# sidebar-rel
---
# styleguide.html
## todo
+ applique le stlyeguide.md au styleguide.html
---
# /componenents/toaster.js
## todo
+ il existe un systeme de toaster qui est utilisé par toute l'application.
+ Ce systeme est utilise un Alpine.store.
+ Ce fichier est un component lit qui ne retourne que du html:
```
   const { LitElement, html } = lit;

export class RelanceSidebar extends LitElement {
  createRenderRoot() {
    return this; // Désactive le shadow DOM
  }

  render() {
    return html`
```
+ une fois codé met a jour toutes les pages qui peuvent utiliser des toasters.

# global
## todo
+ on va changer lucid par <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
+ met à jour toutes les icones du projet qui sont dans /public/