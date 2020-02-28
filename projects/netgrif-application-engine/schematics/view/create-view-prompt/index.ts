import {
    Rule, SchematicsException,
    Tree
} from '@angular-devkit/schematics';
import {CreateViewArguments} from './schema';
import {Route} from '@angular/router';
import {getParentPath} from '../viewUtilityFunctions';

export function createViewPrompt(schematicArguments: CreateViewArguments): Rule {
    return (tree: Tree) => {
        checkPathValidity(schematicArguments.path, schematicArguments._routesMap);
        return createView(tree, schematicArguments);
    };
}

function checkPathValidity(path: string, routeMap: Map<string, Route>) {
    // if the path was entered from a prompt, it might not have a parent
    const parentPath = getParentPath(path);
    if( parentPath !== '' && !routeMap.has(parentPath) ) {
        throw new SchematicsException(`Parent view doesn't exist! Create a view with '${parentPath}' path first.`);
    }
}

function createView(tree: Tree, args: CreateViewArguments): Rule {
    switch (args.viewType) {
        case "login":
            return createLoginView(tree, args);
        default:
            throw new SchematicsException(`Unknown view type '${schematicArguments.viewType}'`);
    }
}

function createLoginView(tree: Tree, args: CreateViewArguments): Rule {

}
