import {
    apply,
    applyTemplates,
    chain,
    mergeWith,
    move,
    Rule,
    SchematicsException,
    Tree,
    url
} from '@angular-devkit/schematics';
import {normalize} from '@angular-devkit/core';
import {CreateViewArguments} from './schema';
import {Route} from '@angular/router';
import {getParentPath} from '../viewUtilityFunctions';
import {getProjectInfo} from '../../utilityFunctions';

export function createViewPrompt(schematicArguments: CreateViewArguments): Rule {
    return (tree: Tree) => {
        checkPathValidity(schematicArguments.path, schematicArguments._routesMap);
        return createView(tree, schematicArguments);
    };
}

function checkPathValidity(path: string | undefined, routeMap: Map<string, Route>) {
    if (path === undefined) {
        throw new SchematicsException(`Path cannot be undefined!`);
    }
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
            throw new SchematicsException(`Unknown view type '${args.viewType}'`);
    }
}

function createLoginView(tree: Tree, args: CreateViewArguments): Rule {
    const projectInfo = getProjectInfo(tree);
    const rules = [];

    const loginTemplate = apply(url('./files/login'), [
        applyTemplates({
            prefix: projectInfo.projectPrefixDasherized
        }),
        move(normalize(`${projectInfo.path}/views/${args.path}`))
    ]);
    rules.push(mergeWith(loginTemplate));



    return chain(rules);
}
