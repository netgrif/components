import {
    apply,
    applyTemplates,
    chain,
    mergeWith,
    move,
    Rule,
    schematic,
    SchematicsException,
    Tree,
    url
} from '@angular-devkit/schematics';
import {normalize, strings} from '@angular-devkit/core';
import {CreateViewArguments} from './schema';
import {getParentPath, Route} from '../viewUtilityFunctions';
import {commitChangesToFile, getAppModule, getFileData, getProjectInfo} from '../../utilityFunctions';
import {addDeclarationToModule, addImportToModule, insertImport} from '@schematics/angular/utility/ast-utils';

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
    const classNamePrefix = convertPathToClassNamePrefix(args.path as string);
    const classNameNoComponent = `${strings.classify(classNamePrefix)}Login`;

    const loginTemplate = apply(url('./files/login'), [
        applyTemplates({
            prefix: projectInfo.projectPrefixDasherized,
            path: classNamePrefix,
            dasherize: strings.dasherize,
            classify: strings.classify
        }),
        move(normalize(`${projectInfo.path}/views/${args.path}`))
    ]);
    rules.push(mergeWith(loginTemplate));

    const appModule = getAppModule(tree, projectInfo.path);
    let appModuleChanges = addImportToModule(appModule.sourceFile, appModule.fileEntry.path, 'FlexModule', '@angular/flex-layout');
    appModuleChanges = appModuleChanges.concat(addImportToModule(appModule.sourceFile, appModule.fileEntry.path, 'CardModule', '@netgrif/application-engine'));

    const className = `${classNameNoComponent}Component`;
    const componentPath = `./views/${args.path}/${strings.dasherize(classNameNoComponent)}.component`;
    appModuleChanges = appModuleChanges.concat(addDeclarationToModule(appModule.sourceFile, appModule.fileEntry.path, className, componentPath));

    commitChangesToFile(tree, appModule.fileEntry, appModuleChanges);

    const routingModuleChanges = [];
    const routesModule = getFileData(tree, projectInfo.path, 'app-routing.module.ts');
    routingModuleChanges.push(insertImport(routesModule.sourceFile, routesModule.fileEntry.path, className, componentPath));

    commitChangesToFile(tree, routesModule.fileEntry, routingModuleChanges);

    rules.push(schematic('add-route', {
        routeObject: createRouteObject(args.path as string, className),
        path: args.path
    }));
    return chain(rules);
}

function convertPathToClassNamePrefix(path: string): string {
    return path.replace('-', '_').replace('/', '-').toLocaleLowerCase();
}

function createRouteObject(path: string, className: string): Route {
    const index = path.lastIndexOf('/');
    let relevantPath = path;
    if (index !== -1) {
        relevantPath = path.substring(index+1);
    }
    return {path: relevantPath, component: className};
}
