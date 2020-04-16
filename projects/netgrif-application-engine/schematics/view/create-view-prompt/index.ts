import {
    chain,
    Rule, schematic,
    SchematicsException,
    Tree
} from '@angular-devkit/schematics';
import {
    createAppRoutesMap,
    getParentPath,
} from '../view-utility-functions';
import {CreateViewArguments} from './schema';
import {addViewToNaeJson} from './add-view-to-nae-json';
import {createLoginView} from './create-login-view';
import {createTabView} from './create-tab-view';
import {createTaskView} from './create-task-view';
import {createCaseView} from './create-case-view';
import {createSidenavOrToolbarView} from './create-sidenav-or-toolbar-view';
import {createEmptyView} from './create-empty-view';
import {checkJsonParamsForSidenav} from './create-sidenav-prompt';
import {createDashboardView} from './create-dashboard-view';


export function createViewPrompt(schematicArguments: CreateViewArguments): Rule {
    return (tree: Tree) => {
        checkPathValidity(tree, schematicArguments.path);
        return createView(tree, schematicArguments);
    };
}

function checkPathValidity(tree: Tree, path: string | undefined) {
    if (path === undefined) {
        throw new SchematicsException(`Path cannot be undefined!`);
    }
    // if the path was entered from a prompt, it might not have a parent
    const parentPath = getParentPath(path);
    const routeMap = createAppRoutesMap(tree);
    if (parentPath !== '' && !routeMap.has(parentPath)) {
        throw new SchematicsException(`Parent view doesn't exist! Create a view with '${parentPath}' path first.`);
    }
}

function createView(tree: Tree, args: CreateViewArguments, addRoute: boolean = true): Rule {
    const rules = [];
    switch (args.viewType) {
        case 'login':
            rules.push(createLoginView(tree, args, addRoute));
            break;
        case 'tabView':
            rules.push(createTabView(tree, args, addRoute, createViewRef));
            break;
        case 'taskView':
            rules.push(createTaskView(tree, args, addRoute));
            break;
        case 'caseView':
            rules.push(createCaseView(tree, args, addRoute));
            break;
        case 'emptyView':
            rules.push(createEmptyView(tree, args, addRoute));
            break;
        case 'dashboard':
            rules.push(createDashboardView(tree, args, addRoute));
            break;
        case 'toolbarView':
            rules.push(createSidenavOrToolbarView(tree, {
                createViewArguments: args,
                addRoute
            }));
            break;
        case 'sidenavView':
        case 'sidenavAndToolbarView':
            rules.push(schematic('create-sidenav-prompt', checkJsonParamsForSidenav(args, addRoute)
            ));
            break;
        default:
            throw new SchematicsException(`Unknown view type '${args.viewType}'`);
    }
    if (addRoute) {
        rules.push(addViewToNaeJson(args));
    }
    return chain(rules);
}

const createViewRef: (tree: Tree, args: CreateViewArguments, addRoute?: boolean) => Rule = createView;
