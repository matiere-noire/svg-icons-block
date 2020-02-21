# Matiere Noire SVG icons block 

Plugin WordPress qui ajoute un block **Icones SVG**

Pour ajouter les SVG que vous voulez ajouter vos fichiers SVG dans le dossier `/resoures/svg` de votre thème

## Scripts

* `yarn start` : pour travailler en dev
* `yarn build` : pour builder le plugin

### A ajouter a votre composer.json

```
"post-install-cmd": [
    "cd web/app/plugins/block-icon-svg && yarn install && yarn build"
]
``