# Composants Steroids

Un composant **Steroids** est un composant basé sur **Lit** qui désactive le **shadow DOM** et retourne du HTML natif. Il est conçu pour être intégré avec **Alpine.js** pour une gestion d'état réactive et une manipulation DOM simplifiée.

---

## **1. Structure d'un Composant Steroids**

### **Exemple à Suivre**

Un composant Steroids doit toujours suivre cette structure :

```javascript
import { LitElement, html } from 'lit';

export class MonComposant extends LitElement {
  createRenderRoot() {
    return this; // Désactive le shadow DOM
  }

  render() {
    return html`
      <div x-data="componentState">
        <h1 x-text="titre"></h1>
        <button @click="monAction()">Cliquez-moi</button>
      </div>
      <script>
        document.addEventListener('alpine:init', () => {
          Alpine.data('componentState', () => ({
            titre: 'Mon Titre',
            estActif: true,
            monAction() {
              console.log('Action déclenchée !');
            }
          }));
        });
      </script>
    `;
  }
}

customElements.define('mon-composant', MonComposant);
```

### **Points Clés**
- **Désactivation du Shadow DOM** : `createRenderRoot() { return this; }`
- **Intégration Alpine.js** : Utilisation de `x-data`, `x-text`, `@click`, etc.

---

## **2. Exemple à NE PAS Suivre**

```javascript
// ❌ NE PAS FAIRE 
import { LitElement, html } from 'lit';

export class MonComposant extends LitElement {
  static properties = { // ❌ NE PAS FAIRE
    titre: { type: String }, // ❌ NE PAS FAIRE
    estActif: { type: Boolean } // ❌ NE PAS FAIRE
  };

  constructor() { // ❌ NE PAS FAIRE
    super(); // ❌ NE PAS FAIRE
    this.titre = 'Mon Titre'; // ❌ NE PAS FAIRE
    this.estActif = true; // ❌ NE PAS FAIRE
  }

  render() {
    return html`
      <div>
        <h1>${this.titre}</h1> // ❌ NE PAS FAIRE
        <button @click=${this.monAction}>Cliquez-moi</button> // ❌ NE PAS FAIRE
      </div>
    `;
  }

  monAction() {
    console.log('Action déclenchée !');
  }
}

customElements.define('mon-composant', MonComposant);
```

**Problèmes** :
- Pas d'intégration avec Alpine.js.
- Pas de gestion d'état réactive.
- Pas de convention de nommage claire.
- Utilisation du shadow DOM par défaut.

---

## **3. Communication entre Composants avec une Page Steroids**

Chaque page a un **store** Alpine.js simple qui stocke les valeurs finales, sans méthodes. Les méthodes sont définies dans les composants enfants. Cela permet une séparation claire entre l'état global et la logique métier.

### **Exemple**

#### **Page Steroids (Store Global)**

```html
<!-- Page HTML avec le store global -->
<body x-data>
  <h1 x-text="$store.page.titre"></h1>
  <enfant-composant></enfant-composant>

  <script>
    document.addEventListener('alpine:init', () => {
      Alpine.store('page', {
        titre: 'Ma Page',
        message: 'Message initial'
      });
    });
  </script>
</body>
```

#### **Composant **

```javascript
import { LitElement, html } from 'lit';

export class MonComponant extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div x-data="componantState">
        <input type="text" x-model="$store.page.message" @input="action">
        <button @click="action">action</button>
      </div>
      <script>
        document.addEventListener('alpine:init', () => {
          Alpine.data('componantState', () => ({
            action() {
              console.log('Message mis à jour :', Alpine.store('page').message);
            }
          }));
        });
      </script>
    `;
  }
}

customElements.define('mon-componant', MonComposant);
```

### **Explication**
- **Store Global** : Le store est initialisé avec `Alpine.store('page', {...})` et est accessible via `$store.page`. Il ne contient que des fonctions globales.
- **Composant** : Contient la logique métier (méthodes) et accède/modifie le store global via `$store.page`.
- **Communication** : Les composants enfants interagissent directement avec le store global de la page.

---

## **4. Bonnes Pratiques**

1. **Intégration Alpine.js** : Utilisez `x-data`, `x-text`, `@click`, etc., pour une gestion d'état réactive.
2. **Communication entre Composants** : Les composants enfants interagissent directement avec le store global de la page.
3. **Désactivation du Shadow DOM** : Toujours désactiver le shadow DOM pour une intégration transparente avec Alpine.js.

---

## **5. Structuration des Fichiers**

Pour une organisation claire et modulaire, les fichiers doivent être structurés comme suit :

```
/page/
├── index.html          # Page principale avec le store global
└── components/        # Composants spécifiques à la page
    └── component.js    # Composant Lit-HTML avec Alpine.js
```

### **Exemple de Structure**

1. **Page principale** (`/page/index.html`) :
   - Contient le store global (`pageStore`).
   - Intègre les composants enfants.

2. **Composants** (`/page/components/component.js`) :
   - Chaque composant est un fichier séparé.
   - Utilise `Alpine.data` pour définir son état et ses méthodes.

### **Exemple de Fichier de Composant**

```javascript
// /page/components/monComposant.js
import { LitElement, html } from 'lit';

export class MonComposant extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div x-data="monComposantState">
        <h1 x-text="titre"></h1>
        <button @click="monAction()">Cliquez-moi</button>
      </div>
      <script>
        document.addEventListener('alpine:init', () => {
          Alpine.data('monComposantState', () => ({
            titre: 'Mon Titre',
            monAction() {
              console.log('Action déclenchée !');
            }
          }));
        });
      </script>
    `;
  }
}

customElements.define('mon-composant', MonComposant);
```

## **6. Exemples**

### **Cas d'Utilisation : Formulaire d'Inscription à une École de Magie**

#### **Structure des Fichiers**

```
/inscription/
├── index.html          # Page principale avec le store global
└── components/        # Composants spécifiques à la page
    └── form-inscription.js  # Composant Lit-HTML pour le formulaire
```

#### **Page Principale (`/inscription/index.html`)**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inscription - École de Magie</title>
  <!-- Alpine.js -->
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <!-- Lit -->
  <script type="module" src="https://cdn.jsdelivr.net/npm/lit@2.0.0/+esm"></script>
</head>
<body x-data>
  <h1 x-text="$store.page.titre"></h1>
  <form-inscription></form-inscription>

  <script>
    document.addEventListener('alpine:init', () => {
      Alpine.store('page', {
        titre: 'Inscription à lÉcole de Magie',
        eleves: []
      });
    });
  </script>

  <!-- Import du composant Lit -->
  <script type="module" src="./components/form-inscription.js"></script>
</body>
</html>
```

#### **Composant Lit pour le Formulaire (`/inscription/components/form-inscription.js`)**

```javascript
import { LitElement, html } from 'lit';

export class FormInscription extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div x-data="formState">
        <form @submit.prevent="soumettreFormulaire">
          <div>
            <label for="nom">Nom :</label>
            <input type="text" id="nom" x-model="nom" required>
          </div>
          <div>
            <label for="maison">Maison :</label>
            <select id="maison" x-model="maison" required>
              <option value="">Sélectionnez une maison</option>
              <option value="Gryffondor">Gryffondor</option>
              <option value="Serpentard">Serpentard</option>
              <option value="Poufsouffle">Poufsouffle</option>
              <option value="Serdaigle">Serdaigle</option>
            </select>
          </div>
          <div>
            <label for="pouvoir">Pouvoir Magique :</label>
            <input type="text" id="pouvoir" x-model="pouvoir" required>
          </div>
          <button type="submit">S'inscrire</button>
        </form>
      </div>
      <script>
        document.addEventListener('alpine:init', () => {
          Alpine.data('formState', () => ({
            nom: '',
            maison: '',
            pouvoir: '',
            soumettreFormulaire() {
              // Ajoute l'élève au store global
              this.eleves.push({
                nom: this.nom,
                maison: this.maison,
                pouvoir: this.pouvoir
              });
              
              // Réinitialise le formulaire
              this.nom = '';
              this.maison = '';
              this.pouvoir = '';
              
              console.log('Élève inscrit :', this.eleves);
            }
          }));
        });
      </script>
    `;
  }
}

customElements.define('form-inscription', FormInscription);
```

### **Explication**

- **Page Principale** : Le store global est initialisé avec `Alpine.store('page', {...})` et est accessible via `$store.page`.
- **Composant Lit** : Le formulaire d'inscription est un composant Lit qui utilise `Alpine.data` pour gérer son état local.
- **Communication** : Le composant accède et met à jour le store global (`$store.page.eleves`) directement.

## **7. Conclusion**

Les composants **Steroids** offrent une approche modulaire et réactive pour le développement d'interfaces utilisateur. En combinant **Lit** et **Alpine.js**, ils permettent une gestion d'état simplifiée et une intégration transparente entre les composants. La structuration des fichiers en `/page/` et `/page/components/` assure une organisation claire et maintenable. L'exemple du formulaire d'inscription à une école de magie illustre comment ces concepts peuvent être appliqués dans un cas concret.
