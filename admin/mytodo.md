'/home/oswald/Desktop/Marki-parse/utils/technique_componentisation_alpinejs_lit-html.md' on va renommer ce document pour parler des composants "steroids". Un composant steroids est un composant lit-html qui desactive le shadowdom et retourne un html. Là on garde l'exemple et on affiche ensuite un example que l'on ne veut pas avec à chaque ligne un NE PAS FAIRE.

Ensuite on va se focaliser sur l'intégration de alpinejs.
Le render html commence toujours par un  <div x-data='componentState()'>
        <h1 x-text="component.element"></h1>
        <div @click="monAction()></div>
      </div>
      <script>function componentState()=>{
      return{'component.property':true}
      }</script>

Tous les properties et states dans le component commencent par nom du component.nom variable.

Crée un nouveau document que tu appelles composants steroids.md

Ce que je vourdais ensuite c'est que peut-etre en utilisant x-modelable tu me montres comment le component déscendant communique avec le component parent.