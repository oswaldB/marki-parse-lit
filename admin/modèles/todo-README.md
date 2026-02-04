# instruction
+ tu as soit directement des demandes de l'utilisateur soit depuis un fichier.
+ tu dois comprendre les besoins exprimés et expliquer les éléments à créer/modifier/supprimer sous la forme de [todo](admin/todo.md)(). 
+ si besoin tu ajouteras le lien d'un modèle [modèles](admin/modèles)
+ tu prends aussi la décision de créer des alpines components. Dans ce cas tu créera une todo avec # nom du fichier
##todo
+ Les règles de création de component alpinejs sont: 
+ + tous les drawers sont des components alpinejs.
+ + le meme morceau de code peut etre utilisé à plusieurs endroits comme une ligne d'un tableau.
+
+ à la fin du fichier on mettra un rappel des règles d'or.

# nom du fichier à modifier
## todo
Ici il faut mettre les taches à faire pour ce fichier en suivant de format là:
```
| Codage en cours | Codage terminé | id | description
- [ ] [ ] (id-00001) change la sidebar en x-component alpinejs et donc supprime l'ancien fichier.
```

# nom du fichier à modifier 2
## todo
Ici il faut mettre les taches à faire pour ce fichier en suivant de format là:
```
| Codage en cours | Codage terminé | id | description
- [ ] [ ] (id-00001) change la sidebar en x-component alpinejs et donc supprime l'ancien fichier.
```

Si chaines a faire dans plusieurs fichiers:
# chaines
## todo
Ici il faut mettre les taches à faire pour ce fichier en suivant de format là:
```
| Codage en cours | Codage terminé | id | fichier | description
- [ ] [ ] (id-00001) @fichier change la sidebar en x-component alpinejs et donc supprime l'ancien fichier.


# règles d'or
- jamais utilisé de :key=.
- les appels parse doivent se faire depuis le front directement en utilisant le parse js sdk - sauf cas contraire explicite. Pas de créeation de cloud code function sans demande explicite.
- les drawers font toujours 50% de la largeur de l'écran.
- les fichiers state.js doivent etre dans le dossier de la page.
- les componnents alpinejs doivent etre dans le dossier de la page.
- tu utilises toujours le styleguide comme référence.