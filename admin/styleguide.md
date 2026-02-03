zVoici un document structuré avec **le style guide complet**, **la configuration Tailwind en JSON**, et **les snippets des composants clés** (sans répétition du HTML de base). Tout est prêt pour une intégration rapide dans vos projets **Steroids Studio**.

---

# **Documentation Style Guide – Steroids Studio**

*Version 2.0 – Design Moderne avec Tailwind CSS (CDN)*

---

## **📌 1. Style Guide Complet**

### **Charte des Couleurs - Marki**

#### **Couleurs Principales (Marque Marki)**

Nom,Couleur,Hex,RGB,Usage,Classes CSS
**Marki Blue (Primary)**,Bleu Marki,#007ace,rgb(0, 122, 206),Boutons principaux, identité de marque,bg-marki-blue, text-marki-blue
**Marki Blue Dark**,Bleu Marki foncé,#005a9e,rgb(0, 90, 158),Survol, états actifs,bg-marki-blue-dark, hover:bg-marki-blue-dark
**Marki Blue Light**,Bleu Marki clair,#4da6ff,rgb(77, 166, 255),Arrière-plans, accents,bg-marki-blue-light, border-marki-blue-light

#### **Couleurs Secondaires**

Nom,Couleur,Hex,RGB,Usage,Classes CSS
Secondary,Violet,#6D5DCF,rgb(109, 93, 207),Accents secondaires,bg-secondary, text-secondary
Success,Vert,#10b981,rgb(16, 185, 129),Messages de succès,bg-success, text-success
Error,Rouge,#ef4444,rgb(239, 68, 68),Erreurs et alertes,bg-error, text-error
Warning,Orange,#f59e0b,rgb(245, 158, 11),Alertes modérées,bg-warning, text-warning
Info,Bleu info,#3b82f6,rgb(59, 130, 246),Informations,bg-info, text-info

#### **Couleurs Neutres**

Nom,Couleur,Hex,RGB,Usage,Classes CSS
Text Principal,Gris foncé,#1f2937,rgb(31, 41, 55),Texte principal,text-gray-900
Text Secondaire,Gris moyen,#6b7280,rgb(107, 114, 128),Texte secondaire,text-gray-500
Border,Gris clair,#d1d5db,rgb(209, 213, 219),Bordures et séparateurs,border-gray-200
Background Light,Gris très clair,#f9fafb,rgb(249, 250, 251),Arrière-plans clairs,bg-gray-50
Background Card,Blanc,#ffffff,rgb(255, 255, 255),Cartes et conteneurs,bg-white

#### **Palettes de Couleurs Complémentaires**

**Dégradés Marki:**
- Dégradé principal: `linear-gradient(135deg, #007ace 0%, #005a9e 100%)`
- Dégradé clair: `linear-gradient(135deg, #4da6ff 0%, #007ace 100%)`

**Couleurs de Fond:**
- Fond application: `#f3f4f6` (gris très clair)
- Fond sidebar: `#ffffff` (blanc)
- Fond carte survol: `#f9fafb` (gris presque blanc)

**Couleurs de Texte:**
- Texte sur fond bleu: `#ffffff` (blanc)
- Texte sur fond clair: `#1f2937` (gris foncé)
- Texte désactivé: `#9ca3af` (gris moyen)

---

### **Typographie - Design Moderne**

- **Police** : `Inter` (via Google Fonts) - moderne et lisible
- **Hiérarchie** :
    
    
    | Élément | Classe Tailwind |
    | --- | --- |
    | H1 | `text-3xl font-bold text-gray-900` |
    | H2 | `text-2xl font-semibold text-gray-900` |
    | H3 | `text-xl font-semibold text-gray-900` |
    | H4 | `text-lg font-semibold text-gray-900` |
    | Body Text | `text-base text-gray-700 leading-6` |
    | Small Text | `text-sm text-gray-500` |
    | Lien | `text-marki-blue hover:text-marki-blue-dark transition-colors` |
    | Lien avec icône | `flex items-center text-marki-blue hover:text-marki-blue-dark transition-colors` |

---

### **Espacements - Design Moderne**

| Variable | Valeur | Classe Tailwind |
| --- | --- | --- |
| `spacing-xs` | 4px | `p-1`, `gap-1` |
| `spacing-sm` | 8px | `p-2`, `gap-2` |
| `spacing-md` | 16px | `p-4`, `gap-4` |
| `spacing-lg` | 24px | `p-6`, `gap-6` |
| `spacing-xl` | 32px | `p-8`, `gap-8` |

**Nouveaux standards** :
- `space-y-3` pour l'espacement vertical entre éléments
- `space-x-2` pour l'espacement horizontal
- `mb-4`, `mt-6` pour les marges spécifiques

---

### **Bordures et Ombres - Design Moderne**

| Élément | Classe Tailwind |
| --- | --- |
| Bordure standard | `border border-gray-200 rounded-lg` |
| Bordure active | `border border-blue-500` |
| Bordure erreur | `border border-red-500` |
| Ombre légère | `shadow-sm` |
| Ombre moyenne | `shadow-md` |
| Ombre grande | `shadow-lg` |
| Ombre moderne | `shadow-modern` (custom) |
| Ombre grande moderne | `shadow-modern-lg` (custom) |

**Nouveaux styles** :
- `border border-gray-100` pour les bordures subtiles
- `rounded-lg` (0.5rem) pour les coins arrondis modernes
- `rounded-full` pour les éléments circulaires

---

## **📌 2. Configuration Tailwind (`tailwind.config.js`) - Version Marki**

```json
json
Copier
{
"theme": {
"extend": {
"colors": {
"marki-blue": {
"DEFAULT": "#007ace",
"dark": "#005a9e",
"light": "#4da6ff"
      },
"secondary": "#6D5DCF",
"success": "#10b981",
"error": "#ef4444",
"warning": "#f59e0b",
"info": "#3b82f6",
"text": {
"DEFAULT": "#1f2937",
"light": "#6b7280"
      },
"border": "#d1d5db",
"bg-light": "#f9fafb"
    },
"fontFamily": {
"sans": ["Inter", "sans-serif"]
    }
  },
"plugins": []
}

```

## **📌 3. Classes CSS Personnalisées - Design Moderne**

```css
/* Scrollbar personnalisée - Design moderne */
.variables-scroll {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f8fafc;
}

.variables-scroll::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.variables-scroll::-webkit-scrollbar-track {
  background: #f8fafc;
  border-radius: 4px;
}

.variables-scroll::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
  border: 2px solid #f8fafc;
}

.variables-scroll::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Card moderne */
.card-modern {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05);
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease-in-out;
}

.card-modern:hover {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

/* Badge moderne */
.badge-modern {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
}

.badge-success {
  background-color: #d1fae5;
  color: #065f46;
}

.badge-warning {
  background-color: #fef3c7;
  color: #92400e;
}

.badge-error {
  background-color: #fee2e2;
  color: #991b1b;
}

.badge-info {
  background-color: #dbeafe;
  color: #1e40af;
}

/* Input moderne */
.input-modern {
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  padding: 0.75rem 1rem;
  transition: all 0.2s ease-in-out;
  font-size: 0.875rem;
}

.input-modern:focus {
  border-color: #3b82f6;
  ring: 2px;
  ring-color: #3b82f6;
  ring-opacity: 0.5;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Bouton moderne */
.btn-modern {
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Animation douce */
.transition-modern {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Ombre moderne */
.shadow-modern {
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.shadow-modern-lg {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

/* Style pour le drawer - Design moderne */
.drawer-overlay {
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);
}

.drawer-content {
  width: 50%;
  max-width: 600px;
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Styles pour les popups - Design moderne */
.popup-overlay {
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
}

.popup-content {
  width: 90%;
  max-width: 420px;
  transition: all 0.3s ease;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Styles pour les différents types de popups - Design moderne */
.popup-info {
  border-top: 4px solid #3b82f6;
}

.popup-success {
  border-top: 4px solid #10b981;
}

.popup-warning {
  border-top: 4px solid #f59e0b;
}

.popup-error {
  border-top: 4px solid #ef4444;
}

.popup-confirm {
  border-top: 4px solid #3b82f6;
}

/* Style pour les callouts - Design moderne */
.callout {
  border-left: 4px solid;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

.callout-info {
  background-color: #eff6ff;
  border-color: #3b82f6;
  color: #1e40af;
}

.callout-warning {
  background-color: #fef9c3;
  border-color: #f59e0b;
  color: #92400e;
}

.callout-error {
  background-color: #fee2e2;
  border-color: #ef4444;
  color: #991b1b;
}
```

---

## **📌 4. Composants Modernes (Nouveautés)**

### **1. Boutons Modernes avec Icônes**

#### **Bouton Principal Marki**
```html
html
Copier
<buttonclass="btn-marki bg-marki-blue text-white px-4 py-2 hover:bg-marki-blue-dark shadow-modern transition-modern">
  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
  </svg>
  Ajouter
</button>
```

#### **Bouton Secondaire Moderne**
```html
html
Copier
<buttonclass="btn-modern bg-gray-100 text-gray-700 px-4 py-2 hover:bg-gray-200 transition-modern border border-gray-200">
  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
  </svg>
  Annuler
</button>
```

#### **Bouton de Validation**
```html
html
Copier
<buttonclass="btn-modern bg-success text-white px-4 py-2 hover:bg-green-700 transition-modern shadow-modern">
  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
  </svg>
  Valider
</button>
```

### **2. Cartes Modernes**

#### **Carte avec En-tête et Badge**
```html
html
Copier
<divclass="card-modern p-6">
  <divclass="flex items-center justify-between mb-4">
    <h3class="text-lg font-semibold text-gray-900">Titre de la Carte</h3>
    <spanclass="badge-modern badge-success">
      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      Actif
    </span>
  </div>
  <pclass="text-gray-600 mb-4">Description de la carte avec du contenu pertinent.</p>
  <buttonclass="btn-modern bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-modern">
    Action
  </button>
</div>
```

#### **Carte avec Icône et Statistiques**
```html
html
Copier
<divclass="card-modern p-6">
  <divclass="flex items-center gap-4">
    <divclass="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
      <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
    </div>
    <div>
      <h4class="text-xl font-bold text-gray-900">12 Actions</h4>
      <pclass="text-sm text-gray-500">Séquence active</p>
    </div>
  </div>
</div>
```

### **3. Inputs Modernes avec Icônes**

#### **Input Standard Moderne**
```html
html
Copier
<div>
  <labelfor="email"class="block text-sm font-medium text-gray-700 mb-1 flex items-center">
    <svg class="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>
    Email
  </label>
  <input type="email" id="email" class="input-modern w-full" placeholder="votre@email.com">
</div>
```

#### **Input avec Bouton de Copie**
```html
html
Copier
<divclass="relative">
  <input type="text" value="[[variable]]" class="input-modern w-full pr-10" readonly>
  <button onclick="copyToClipboard()" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-700">
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
    </svg>
  </button>
</div>
```

### **4. Variables et Badges Modernes**

#### **Liste de Variables avec Copie**
```html
html
Copier
<divclass="flex flex-wrap gap-2">
  <divclass="bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full flex items-center gap-2 hover:bg-blue-100 transition-modern border border-blue-200">
    <spanclass="font-mono">nom</span>
    <buttonclass="text-blue-600 hover:text-blue-800 focus:outline-none p-1 rounded-full hover:bg-blue-200">
      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
      </svg>
    </button>
  </div>
  <divclass="bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full flex items-center gap-2 hover:bg-blue-100 transition-modern border border-blue-200">
    <spanclass="font-mono">email</span>
    <buttonclass="text-blue-600 hover:text-blue-800 focus:outline-none p-1 rounded-full hover:bg-blue-200">
      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
      </svg>
    </button>
  </div>
</div>
```

### **5. Boutons d'Action Ronds**

#### **Boutons d'Action pour les Cartes**
```html
html
Copier
<divclass="flex items-center gap-2">
  <buttonclass="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 transition-modern">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  </button>
  <buttonclass="w-8 h-8 rounded-full flex items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-600 transition-modern">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z"></path>
    </svg>
  </button>
  <buttonclass="w-8 h-8 rounded-full flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 transition-modern">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
    </svg>
  </button>
</div>
```

---

## **📌 5. Snippets des Composants Clés (Version Classique)**

### **1. Boutons**

### **Bouton Principal**

```html
html
Copier
<buttonclass="bg-primarytext-whitepx-5py-2.5rounded-mdfont-mediumhover:bg-primary-darktransition-colorsduration-300hover:-translate-y-0.5transform">
BoutonPrincipal
</button>

```

### **Bouton Secondaire**

```html
html
Copier
<buttonclass="borderborder-secondarytext-secondarypx-5py-2rounded-mdfont-mediumhover:bg-secondaryhover:bg-opacity-10transition-allduration-300">
BoutonSecondaire
</button>

```

### **Bouton avec Icône**

```html
html
Copier
<buttonclass="bg-primarytext-whitepx-4py-2rounded-mdfont-mediumflexitems-centerspace-x-2transition-colorshover:bg-primary-dark">
  <svgclass="h-5w-5"xmlns="http://www.w3.org/2000/svg"fill="none"viewBox="002424"stroke="currentColor">
    <pathstroke-linecap="round"stroke-linejoin="round"stroke-width="2"d="M126v6m00v6m0-6h6m-60H6" />
  </svg>
  <span>Ajouter</span>
</button>

```

---

### **2. Cartes (Cards)**

### **Carte Basique**

```html
html
Copier
<divclass="borderborder-borderrounded-mdp-5bg-whiteshadow-sm">
  <h3class="text-xlfont-semiboldtext-text">TitredelaCarte</h3>
  <pclass="text-text-lightmt-2">
Descriptionoucontenudelacarte.
  </p>
  <buttonclass="bg-primarytext-whitepx-4py-2rounded-mdmt-4font-mediumhover:bg-primary-darktransition-colors">
Action
  </button>
</div>

```

### **Carte avec Image**

```html
html
Copier
<divclass="borderborder-borderrounded-mdoverflow-hiddenbg-whiteshadow-sm">
  <imgsrc="https://via.placeholder.com/400x200"alt="Placeholder"class="w-fullh-40object-cover">
  <divclass="p-5">
    <h3class="text-xlfont-semiboldtext-text">TitredelaCarte</h3>
    <pclass="text-text-lightmt-2">
Descriptiondelacarteavecuneimageenhaut.
    </p>
  </div>
</div>

```

---

### **3. Formulaires**

### **Champ de Saisie**

```html
html
Copier
<divclass="mb-4">
  <labelfor="email"class="blocktext-textfont-mediummb-1">Email</label>
  <input
type="email"
id="email"
class="w-fullpx-3py-2borderborder-borderrounded-mdfocus:outline-nonefocus:ring-2focus:ring-primaryfocus:border-transparent"
placeholder="Votreemail"
  >
</div>

```

### **Champ avec Icône**

```html
html
Copier
<divclass="mb-4relative">
  <labelfor="search"class="blocktext-textfont-mediummb-1">Rechercher</label>
  <divclass="relative">
    <spanclass="absoluteinset-y-0left-0pl-3flexitems-centerpointer-events-none">
      <svgclass="h-5w-5text-text-light"xmlns="http://www.w3.org/2000/svg"viewBox="002020"fill="currentColor">
        <pathfill-rule="evenodd"d="M84a4401008440000-8zM28a6601110.893.476l4.8174.817a11001-1.4141.414l-4.816-4.816A6600128z"clip-rule="evenodd" />
      </svg>
    </span>
    <input
type="text"
id="search"
class="w-fullpl-10pr-3py-2borderborder-borderrounded-mdfocus:outline-nonefocus:ring-2focus:ring-primaryfocus:border-transparent"
placeholder="Rechercher..."
    >
  </div>
</div>

```

### **Case à Cocher**

```html
html
Copier
<divclass="flexitems-centermb-4">
  <inputid="checkbox"type="checkbox"class="h-4w-4text-primaryfocus:ring-primaryborder-borderrounded">
  <labelfor="checkbox"class="ml-2blocktext-text-light">
Case àcocher
  </label>
</div>

```

---

### **4. Alertes et Notifications**

### **Alerte de Succès**

```html
html
Copier
<divclass="p-3rounded-mdbg-successbg-opacity-10borderborder-successtext-success">
Succès !Votreactiona étéenregistrée.
</div>

```

### **Alerte d'Erreur**

```html
html
Copier
<divclass="p-3rounded-mdbg-errorbg-opacity-10borderborder-errortext-error">
Erreur :Veuillezvérifierleschamps.
</div>

```

### **Notification avec Icône**

```html
html
Copier
<divclass="flexitems-startp-3rounded-mdbg-primarybg-opacity-10border-l-4border-primary">
  <svgclass="h-5w-5text-primarymt-0.5"xmlns="http://www.w3.org/2000/svg"viewBox="002020"fill="currentColor">
    <pathfill-rule="evenodd"d="M1810a88011-16088001160zm-7-4a11011-201100120zM99a1100002h2a110100-2H9z"clip-rule="evenodd" />
  </svg>
  <divclass="ml-3">
    <pclass="text-smtext-primaryfont-medium">
Informationimportante àconnaître.
    </p>
  </div>
</div>

```

---

### **5. Sidebar (Menu Latéral)**

### **Sidebar Basique (Collapsible)**

```html
html
Copier
<!-- Structure HTML de base (à placer dans votre layout) -->
<div id="sidebar"class="bg-whiteborder-rborder-borderw-64space-y-6py-7px-2absoluteinset-y-0left-0transform -translate-x-fullmd:relativemd:translate-x-0z-20">
  <divclass="flexitems-centerjustify-betweenpx-4">
    <spanclass="text-xlfont-boldtext-text">Steroids</span>
    <buttonid="close-sidebar"class="md:hiddenp-2rounded-mdhover:bg-bg-light">
      <svgclass="w-5h-5text-text"xmlns="http://www.w3.org/2000/svg"fill="none"viewBox="002424"stroke="currentColor">
        <pathstroke-linecap="round"stroke-linejoin="round"stroke-width="2"d="M618L186M66l1212" />
      </svg>
    </button>
  </div>

  <nav>
    <ahref="#"class="flexitems-centerpx-4py-2.5text-texthover:bg-bg-lightrounded-mdtransition-colors">
      <svgclass="w-5h-5mr-3"xmlns="http://www.w3.org/2000/svg"fill="none"viewBox="002424"stroke="currentColor">
        <pathstroke-linecap="round"stroke-linejoin="round"stroke-width="2"d="M312l2-2m00l7-777M510v10a1100011h3m10-11l22m-2-2v10a11001-11h-3m-60a110001-1v-4a110011-1h2a1100111v4a1100011m-60h6" />
      </svg>
      <span>Dashboard</span>
    </a>
    <!--Ajoutezd'autresliensici -->
  </nav>
</div>

<!--Overlaypourmobile -->
<divid="overlay"class="fixedinset-0bg-blackbg-opacity-50z-10md:hiddenhidden"></div>

<!--Boutonpourouvrirlasidebar (mobile) -->
<buttonid="open-sidebar"class="md:hiddenmb-4p-2rounded-mdbg-whiteborderborder-border">
  <svgclass="w-5h-5text-text"xmlns="http://www.w3.org/2000/svg"fill="none"viewBox="002424"stroke="currentColor">
    <pathstroke-linecap="round"stroke-linejoin="round"stroke-width="2"d="M46h16M412h16M418h16" />
  </svg>
</button>

```

### **JavaScript pour la Sidebar**

```jsx
javascript
Copier
const sidebar =document.getElementById('sidebar');
const overlay =document.getElementById('overlay');
const openSidebarBtn =document.getElementById('open-sidebar');
const closeSidebarBtn =document.getElementById('close-sidebar');

openSidebarBtn.addEventListener('click',() => {
  sidebar.classList.remove('-translate-x-full');
  overlay.classList.remove('hidden');
});

closeSidebarBtn.addEventListener('click',() => {
  sidebar.classList.add('-translate-x-full');
  overlay.classList.add('hidden');
});

overlay.addEventListener('click',() => {
  sidebar.classList.add('-translate-x-full');
  overlay.classList.add('hidden');
});

```

---

### **6. Sidebar avec Sous-Menus (Dropdown)**

```html
html
Copier
<!-- Exemple d'un menu avec dropdown -->
<divclass="px-2">
<buttononclick="toggleDropdown('projects-dropdown')"class="w-full flex items-center justify-between px-2 py-2.5 text-text hover:bg-bg-light rounded-md transition-colors">
<divclass="flex items-center">
<svgclass="w-5 h-5 mr-3"xmlns="http://www.w3.org/2000/svg"fill="none"viewBox="0 0 24 24"stroke="currentColor">
<pathstroke-linecap="round"stroke-linejoin="round"stroke-width="2"d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
</svg>
<span>Projets</span>
</div>
<svgid="projects-dropdown-icon"class="w-4 h-4 transition-transform"xmlns="http://www.w3.org/2000/svg"viewBox="0 0 20 20"fill="currentColor">
<pathfill-rule="evenodd"d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"clip-rule="evenodd" />
</svg>
</button>
<divid="projects-dropdown"class="hidden pl-6">
<ahref="#"class="block px-4 py-2 text-text-light hover:text-text hover:bg-bg-light rounded-md transition-colors">Projet Alpha</a>
<ahref="#"class="block px-4 py-2 text-text-light hover:text-text hover:bg-bg-light rounded-md transition-colors">Projet Bêta</a>
</div>
</div>

```

### **JavaScript pour les Dropdowns**

```jsx
javascript
Copier
functiontoggleDropdown(id){
const dropdown =document.getElementById(id);
const icon =document.getElementById(id +'-icon');

if (dropdown.classList.contains('hidden')) {
    dropdown.classList.remove('hidden');
    icon.classList.add('rotate-180','transform');
  }else {
    dropdown.classList.add('hidden');
    icon.classList.remove('rotate-180','transform');
  }
}

```

---

### **7. Sidebar Réductible**

```html
html
Copier
<!-- Bouton pour réduire/étendre -->
<button id="toggle-sidebar"class="p-1rounded-mdhover:bg-bg-light">
  <svgid="toggle-icon"class="w-5h-5text-text"xmlns="http://www.w3.org/2000/svg"fill="none"viewBox="002424"stroke="currentColor">
    <pathstroke-linecap="round"stroke-linejoin="round"stroke-width="2"d="M135l77-77M55l77-77" />
  </svg>
</button>

```

### **JavaScript pour la Sidebar Réductible**

```jsx
javascript
Copier
const sidebar =document.getElementById('sidebar');
const toggleBtn =document.getElementById('toggle-sidebar');
const toggleIcon =document.getElementById('toggle-icon');

toggleBtn.addEventListener('click',() => {
if (sidebar.classList.contains('w-64')) {
    sidebar.classList.remove('w-64');
    sidebar.classList.add('w-16');
    toggleIcon.innerHTML =`
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    `;
document.querySelectorAll('#sidebar span').forEach(span => {
      span.classList.add('hidden');
    });
  }else {
    sidebar.classList.remove('w-16');
    sidebar.classList.add('w-64');
    toggleIcon.innerHTML =`
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
    `;
document.querySelectorAll('#sidebar span').forEach(span => {
      span.classList.remove('hidden');
    });
  }
});

```

---

### **8. Tableaux**

```html
html
Copier
<divclass="overflow-x-auto">
  <tableclass="min-w-fulldivide-ydivide-border">
    <theadclass="bg-bg-light">
      <tr>
        <thclass="px-6py-3text-lefttext-xsfont-mediumtext-textuppercasetracking-wider">Nom</th>
        <thclass="px-6py-3text-lefttext-xsfont-mediumtext-textuppercasetracking-wider">Statut</th>
        <thclass="px-6py-3text-lefttext-xsfont-mediumtext-textuppercasetracking-wider">Actions</th>
      </tr>
    </thead>
    <tbodyclass="bg-whitedivide-ydivide-border">
      <tr>
        <tdclass="px-6py-4whitespace-nowraptext-text">ProjetAlpha</td>
        <tdclass="px-6py-4whitespace-nowrap">
          <spanclass="px-2inline-flextext-xsleading-5font-semiboldrounded-fullbg-successbg-opacity-10text-success">
Actif
          </span>
        </td>
        <tdclass="px-6py-4whitespace-nowraptext-righttext-smfont-medium">
          <buttonclass="text-primaryhover:text-primary-dark">
            <svgclass="h-5w-5"xmlns="http://www.w3.org/2000/svg"viewBox="002020"fill="currentColor">
              <pathd="M106a220110-42200104zM1012a220110-42200104zM1018a220110-42200104z" />
            </svg>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>

```

---

### **9. Modales**

```html
html
Copier
<!-- Backdrop -->
<div id="modal"class="fixedinset-0bg-blackbg-opacity-50flexitems-centerjustify-centerp-4z-50hidden">
  <!--Modal -->
  <divclass="bg-whiterounded-lgp-6max-w-mdw-fullshadow-xl">
    <divclass="flexjustify-betweenitems-centermb-4">
      <h3class="text-xlfont-semiboldtext-text">TitredelaModale</h3>
      <buttononclick="document.getElementById('modal').classList.add('hidden')"class="p-1rounded-fullhover:bg-bg-lighttransition-colors">
        <svgclass="h-6w-6text-text-light"xmlns="http://www.w3.org/2000/svg"fill="none"viewBox="002424"stroke="currentColor">
          <pathstroke-linecap="round"stroke-linejoin="round"stroke-width="2"d="M618L186M66l1212" />
        </svg>
      </button>
    </div>
    <pclass="text-text-lightmb-4">
Contenudelamodaleavecuntextedescriptifetdesoptions.
    </p>
    <divclass="flexjustify-endspace-x-3">
      <buttononclick="document.getElementById('modal').classList.add('hidden')"class="px-4py-2borderborder-borderrounded-mdtext-textfont-mediumhover:bg-bg-lighttransition-colors">
Annuler
      </button>
      <buttonclass="px-4py-2bg-primarytext-whiterounded-mdfont-mediumhover:bg-primary-darktransition-colors">
Confirmer
      </button>
    </div>
  </div>
</div>

<!--Boutonpourouvrirlamodale -->
<buttononclick="document.getElementById('modal').classList.remove('hidden')"class="bg-primarytext-whitepx-4py-2rounded-mdfont-medium">
OuvrirModale
</button>

```

---

### **10. Accordéons**

```html
html
Copier
<divclass="borderborder-borderrounded-mdmb-2">
  <buttononclick="toggleAccordion('accordion-1')"class="w-fullp-4text-leftflexjustify-betweenitems-centerfocus:outline-none">
    <spanclass="font-mediumtext-text">Titredel'Accordéon</span>
    <svgid="accordion-1-icon"class="h-5w-5text-texttransition-transformduration-300"xmlns="http://www.w3.org/2000/svg"viewBox="002020"fill="currentColor">
      <pathfill-rule="evenodd"d="M5.2937.293a110011.4140L1010.586l3.293-3.293a110111.4141.414l-44a11001-1.4140l-4-4a110010-1.414z"clip-rule="evenodd" />
    </svg>
  </button>
  <divid="accordion-1"class="hiddenp-4border-tborder-bordertext-text-light">
Contenucachédel'accordéon.
  </div>
</div>

<script>
functiontoggleAccordion(id) {
const content = document.getElementById(id);
const icon = document.getElementById(id +'-icon');
if (content.classList.contains('hidden')) {
      content.classList.remove('hidden');
      icon.classList.add('rotate-180','transform');
    }else {
      content.classList.add('hidden');
      icon.classList.remove('rotate-180','transform');
    }
  }
</script>

```

---

### **11. Badges et Tags**

```html
html
Copier
<spanclass="inline-blockpx-2.5py-0.5rounded-fulltext-xsfont-mediumbg-bg-lighttext-text">
TagNeutre
</span>
<spanclass="inline-blockpx-2.5py-0.5rounded-fulltext-xsfont-mediumbg-primarybg-opacity-10text-primary">
TagPrimary
</span>
<spanclass="inline-blockpx-2.5py-0.5rounded-fulltext-xsfont-mediumbg-successbg-opacity-10text-success">
TagSuccès
</span>
<spanclass="inline-blockpx-2.5py-0.5rounded-fulltext-xsfont-mediumbg-errorbg-opacity-10text-error">
TagErreur
</span>

```

---

### **12. Pied de Page (Footer)**

```html
html
Copier
<footerclass="bg-bg-lightborder-tborder-borderpy-8">
  <divclass="max-w-7xlmx-autopx-4sm:px-6lg:px-8">
    <divclass="gridgrid-cols-1md:grid-cols-4gap-8">
      <div>
        <h3class="text-textfont-semiboldmb-4">SteroidsStudio</h3>
        <pclass="text-text-lighttext-sm">
Noustransformonslesidéesenproduitsdigitauxexceptionnels.
        </p>
      </div>
      <div>
        <h4class="text-textfont-mediummb-3">LiensUtiles</h4>
        <ulclass="space-y-2">
          <li><ahref="#"class="text-text-lighthover:text-primarytransition-colors">Accueil</a></li>
          <li><ahref="#"class="text-text-lighthover:text-primarytransition-colors">Projets</a></li>
          <li><ahref="#"class="text-text-lighthover:text-primarytransition-colors">ÀPropos</a></li>
        </ul>
      </div>
      <div>
        <h4class="text-textfont-mediummb-3">RéseauxSociaux</h4>
        <ulclass="space-y-2">
          <li><ahref="#"class="text-text-lighthover:text-primarytransition-colors">Twitter</a></li>
          <li><ahref="#"class="text-text-lighthover:text-primarytransition-colors">LinkedIn</a></li>
          <li><ahref="#"class="text-text-lighthover:text-primarytransition-colors">Instagram</a></li>
        </ul>
      </div>
      <div>
        <h4class="text-textfont-mediummb-3">Contact</h4>
        <pclass="text-text-lighttext-sm">
contact@steroids.studio<br>
          +441234567890
        </p>
      </div>
    </div>
    <divclass="border-tborder-bordermt-8pt-6text-centertext-text-lighttext-sm">
      ©2026SteroidsStudio.Tousdroitsréservés.
    </div>
  </div>
</footer>

```
