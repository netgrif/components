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

