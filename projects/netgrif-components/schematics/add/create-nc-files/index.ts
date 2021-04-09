import {
    chain,
    Rule,
    Tree,
    schematic,
} from '@angular-devkit/schematics';
import {
    getProjectInfo
} from '../../_utility/utility-functions';
import {addImportsToAppModule} from '../../view/_utility/view-utility-functions';
import {ImportToAdd} from '../../_commons/import-to-add';


export function createNcFiles(): Rule {
    return (/*tree: Tree*/) => {
        const rules = [];
        rules.push(schematic('custom-themes', {}));
        rules.push(updateAppComponentHTML());
        rules.push(addInitialsImportsToAppModule());
        rules.push(addImportsToIndexHTML());
        return chain(rules);
    };
}

function addInitialsImportsToAppModule(): Rule {
    return (tree: Tree) => {
        addImportsToAppModule(tree, [
            new ImportToAdd('BrowserAnimationsModule', '@angular/platform-browser/animations'),
            new ImportToAdd('NavigationComponentModule', '@netgrif/components'),
            new ImportToAdd('SideMenuComponentModule', '@netgrif/components'),
            new ImportToAdd('SideMenuContentComponentModule', '@netgrif/components')
        ]);
    };
}

function updateAppComponentHTML(): Rule {
    return (tree: Tree) => {
        const pathToComponent = getProjectInfo(tree).path + '/app.component.html';
        const content =
            `<nc-side-menu-container>
    <router-outlet></router-outlet>
</nc-side-menu-container>`;
        tree.overwrite(pathToComponent, content);
    };
}

function addImportsToIndexHTML(): Rule {
    return (tree: Tree) => {
        const pathToComponent = getProjectInfo(tree).path + '/../index.html';
        const comp: Buffer | null = tree.read(pathToComponent);
        let strComponent = '';
        if (comp) {
            strComponent = comp.toString();
        }

        const appendIndex = strComponent.indexOf('</head>');
        const content2Append =
            `  <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> \n`;
        const updatedContent = strComponent.slice(0, appendIndex) + content2Append + strComponent.slice(appendIndex);

        tree.overwrite(pathToComponent, updatedContent);
        return tree;
    };
}
