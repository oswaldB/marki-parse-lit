zVoici un document structuré avec **le style guide complet**, **la configuration Tailwind en JSON**, et **les snippets des composants clés** (sans répétition du HTML de base). Tout est prêt pour une intégration rapide dans vos projets **Steroids Studio**.

---

# **Documentation Style Guide – Steroids Studio**

*Version 1.0 – Tailwind CSS (CDN)*

---

## **📌 1. Style Guide Complet**

### **Couleurs**

Nom,Couleur,Usage,Classes CSS
Primary,#007ACE,Boutons, liens, accents,bg-primary, text-primary
Primary Dark,#005FA3,Hover des boutons, en-têtes,bg-primary-dark
Secondary,#4A90E2,Accents secondaires,bg-secondary, text-secondary
Success,#2ECC71,Messages de succès,bg-success, text-success
Error,#E74C3C,Erreurs, alertes,bg-error, text-error
Warning,#F39C12,Alertes modérées,bg-warning, text-warning
Text,#2C3E50,Texte principal,text-text
Text Light,#7F8C8D,Texte secondaire,text-text-light
Border,#BDC3C7,Bordures, séparateurs,border-border
Background Light,#ECF0F1,Arrière-plans clairs,bg-light

---

### **Typographie**

- **Police** : `Inter` (via Google Fonts).
- **Hiérarchie** :
    
    
    | Élément | Classe Tailwind |
    | --- | --- |
    | H1 | `text-4xl font-bold text-text` |
    | H2 | `text-3xl font-semibold text-text` |
    | H3 | `text-2xl font-semibold text-text` |
    | Body Text | `text-base text-text-light leading-6` |
    | Lien | `text-primary hover:text-primary-dark hover:underline` |

---

### **Espacements**

| Variable | Valeur | Classe Tailwind |
| --- | --- | --- |
| `spacing-xs` | 5px | `p-1.5`, `gap-1.5` |
| `spacing-sm` | 10px | `p-2.5`, `gap-2.5` |
| `spacing-md` | 20px | `p-5`, `gap-5` |
| `spacing-lg` | 30px | `p-7`, `gap-7` |

---

### **Bordures et Ombres**

| Élément | Classe Tailwind |
| --- | --- |
| Bordure | `border border-border rounded-md` |
| Ombre | `shadow-sm` |
| Bordure active | `border-primary` |

---

## **📌 2. Configuration Tailwind (`tailwind.config.js`)**

```json
json
Copier
{
"theme": {
"extend": {
"colors": {
"primary": {
"DEFAULT":"#509EE3",
"dark":"#236CB9"
        },
"secondary":"#6D5DCF",
"success":"#4CAF50",
"error":"#F44336",
"text": {
"DEFAULT":"#333333",
"light":"#666666"
        },
"border":"#CCCCCC",
"bg-light":"#F5F7FA"
      },
"fontFamily": {
"sans": ["Inter","sans-serif"]
      }
    }
  },
"plugins": []
}

```

---

## **📌 3. Snippets des Composants Clés**

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
