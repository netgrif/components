import {Rule, Tree} from '@angular-devkit/schematics';
import {SidenavPromptOptions} from './models/sidenav-prompt-options';
import {createSidenavOrToolbarView} from './views/sidenav-toolbar-view/create-sidenav-or-toolbar-view';
import {CreateViewArguments} from './models/create-view-arguments';

export function schematicEntryPoint(options: SidenavPromptOptions): Rule {
    return (tree: Tree) => {
        return createSidenavOrToolbarView(tree, options);
    };
}

export function checkJsonParamsForSidenav(args: CreateViewArguments, addViewToService: boolean): SidenavPromptOptions {
    let sidenav: SidenavPromptOptions = {
        user: undefined,
        quickPanel: undefined,
        navigation: undefined,
        createViewArguments: args,
        addViewToService
    };
    if (args.layoutParams !== undefined && Object.keys(args.layoutParams).length !== 0) {
        for (const objectIterator of Object.entries(args.layoutParams)) {
            switch (objectIterator[0]) {
                case 'user':
                    sidenav.user = objectIterator[1] as boolean;
                    break;
                case 'quickPanel':
                    sidenav.quickPanel = objectIterator[1] as boolean;
                    break;
                case 'navigation':
                    sidenav.navigation = objectIterator[1] as boolean;
                    break;
            }
        }
        if (sidenav.user !== undefined || sidenav.navigation !== undefined || sidenav.quickPanel !== undefined) {
            sidenav = addDefaultVaulues(sidenav);
        }
    }
    return sidenav;
}

function addDefaultVaulues(sidenav: SidenavPromptOptions): SidenavPromptOptions {
    if (sidenav.user === undefined)
        sidenav.user = false;
    if (sidenav.quickPanel === undefined)
        sidenav.quickPanel = false;
    if (sidenav.navigation === undefined)
        sidenav.navigation = false;
    return sidenav;
}
