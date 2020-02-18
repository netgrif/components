import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import * as data from '../../../../example.nae.json';



export function createFiles(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
      if(!tree.exists("projects/nae-example-app/src/styles/_customLightPalette.scss"))
          tree.create("projects/nae-example-app/src/styles/_customLightPalette.scss",``);
      tree.overwrite("projects/nae-example-app/src/styles/_customLightPalette.scss",  `
@import '~@angular/material/theming';
$bv-light-primary: (
 `+handleJsonString(JSON.stringify(data.theme.pallets.light.primary ),true,false)+'\n'+"contrast : ( "+'\n'
              +handleJsonString(JSON.stringify(data.theme.pallets.light.primary.contrast.light ),false,false)+" "
              +handleJsonString(JSON.stringify(data.theme.pallets.light.primary.contrast.dark ),false,true)+`)
);
$bv-light-secondary: (
 `+handleJsonString(JSON.stringify(data.theme.pallets.light.secondary ),true,false)+'\n'+"contrast : ( "+'\n'
              +handleJsonString(JSON.stringify(data.theme.pallets.light.secondary.contrast.light ),false,false)+" "
              +handleJsonString(JSON.stringify(data.theme.pallets.light.secondary.contrast.dark ),false,true)+`)
);
$bv-light-warn: (
 `+handleJsonString(JSON.stringify(data.theme.pallets.light.warn ),true,false)+'\n'+"contrast : ( "+'\n'
              +handleJsonString(JSON.stringify(data.theme.pallets.light.warn.contrast.light ),false,false)+" "
              +handleJsonString(JSON.stringify(data.theme.pallets.light.warn.contrast.dark ),false,true)+`)
);
`);
if(!tree.exists("projects/nae-example-app/src/styles/_customDarkPalette.scss"))
          tree.create("projects/nae-example-app/src/styles/_customDarkPalette.scss",``);
      tree.overwrite("projects/nae-example-app/src/styles/_customDarkPalette.scss",  `
@import '~@angular/material/theming';
$bv-dark-primary: (
 `+handleJsonString(JSON.stringify(data.theme.pallets.dark.primary ),true,false)+'\n'+"contrast : ( "+'\n'
              +handleJsonString(JSON.stringify(data.theme.pallets.dark.primary.contrast.light ),false,false)+" "
              +handleJsonString(JSON.stringify(data.theme.pallets.dark.primary.contrast.dark ),false,true)+`)
);
$bv-dark-secondary: (
 `+handleJsonString(JSON.stringify(data.theme.pallets.dark.secondary ),true,false)+'\n'+"contrast : ( "+'\n'
              +handleJsonString(JSON.stringify(data.theme.pallets.dark.secondary.contrast.light ),false,false)+" "
              +handleJsonString(JSON.stringify(data.theme.pallets.dark.secondary.contrast.dark ),false,true)+`)
);
$bv-dark-warn: (
 `+handleJsonString(JSON.stringify(data.theme.pallets.dark.warn ),true,false)+'\n'+"contrast : ( "+'\n'
              +handleJsonString(JSON.stringify(data.theme.pallets.dark.warn.contrast.light ),false,false)+" "
              +handleJsonString(JSON.stringify(data.theme.pallets.dark.warn.contrast.dark ),false,true)+`)
);
`);
if(!tree.exists("projects/nae-example-app/src/styles/_customThemes.scss"))
          tree.create("projects/nae-example-app/src/styles/_customThemes.scss",``);
tree.overwrite("projects/nae-example-app/src/styles/_customThemes.scss",  `
@import '~@angular/material/theming';
@import '_customLightPalette.scss';
@import '_customDarkPalette.scss';

.custom-light-theme {
 $custom-light-theme: mat-light-theme(
            mat-palette($bv-light-primary),
            mat-palette($bv-light-secondary),
            mat-palette($bv-light-warn));
    @include angular-material-theme($custom-light-theme);
}

.custom-dark-theme {
    $custom-dark-theme: mat-dark-theme(
        mat-palette($bv-dark-primary),
        mat-palette($bv-dark-secondary),
        mat-palette($bv-dark-warn));
    @include angular-material-theme($custom-dark-theme);
}
`);
    return tree;
  };
}

function handleJsonString(json : string, mainJsonobject : boolean, darkTheme : boolean){
    if(mainJsonobject){
        let limitSeparator=json.split('contrast')[0].split(",").length-1
        json = json.split(',',limitSeparator).join(",\n")+','
    }else {
        if(darkTheme){
            json = json.split(',').join(":$dark-primary-text,\n")
            json = json+":$dark-primary-text,\n"
        }else{
            json = json.split(',').join(":$light-primary-text,\n")
            json = json+":$light-primary-text,\n"
        }
    }
    json=json.split('"').join("").split("[").join("").split("{").join("").split("}").join("").split("]").join("")
    json=json.split(':').join(" : ")
    return json
}


