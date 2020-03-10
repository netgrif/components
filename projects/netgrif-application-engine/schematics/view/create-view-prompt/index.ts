import {
    chain,
    Rule,
    schematic,
    SchematicsException,
    Tree
} from '@angular-devkit/schematics';
import {strings} from '@angular-devkit/core';
import {CreateViewArguments} from './schema';
import {getParentPath, Route} from '../viewUtilityFunctions';
import {
    commitChangesToFile,
    getAppModule,
    getFileData,
    getProjectInfo,
    createFilesFromTemplates, FileData
} from '../../utilityFunctions';
import {addDeclarationToModule, addImportToModule, insertImport} from '@schematics/angular/utility/ast-utils';
import {Change} from "@schematics/angular/utility/change";
import { ImportsToAdd } from './classes/importsToAdd';
import {ClassName} from './classes/ClassName';

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
    if (parentPath !== '' && !routeMap.has(parentPath)) {
        throw new SchematicsException(`Parent view doesn't exist! Create a view with '${parentPath}' path first.`);
    }
}

function createView(tree: Tree, args: CreateViewArguments): Rule {
    switch (args.viewType) {
        case "login":
            return createLoginView(tree, args);
        case "tabView":
            return createTabView(tree, args);
        default:
            throw new SchematicsException(`Unknown view type '${args.viewType}'`);
    }
}

function createLoginView(tree: Tree, args: CreateViewArguments): Rule {
    const projectInfo = getProjectInfo(tree);
    const rules = [];
    const className = new ClassName(args.path as string, 'Login');

    rules.push(createFilesFromTemplates('./files/login', `${projectInfo.path}/views/${args.path}`, {
        prefix: projectInfo.projectPrefixDasherized,
        path: className.prefix,
        dasherize: strings.dasherize,
        classify: strings.classify
    }));

    updateAppModule(tree, className.name, className.fileImportPath, [
        new ImportsToAdd("FlexModule", "@angular/flex-layout"),
        new ImportsToAdd("CardModule", "@netgrif/application-engine")]);
    addRoutingModuleImport(tree, className.name, className.fileImportPath);


    rules.push(schematic('add-route', {
        routeObject: createRouteObject(args.path as string, className.name),
        path: args.path
    }));
    return chain(rules);
}

function createTabView(tree: Tree, args: CreateViewArguments): Rule {
    const projectInfo = getProjectInfo(tree);
    const rules = [];
    const className = new ClassName(args.path as string, 'TabView');

    updateAppModule(tree, className.name, className.fileImportPath, [
        new ImportsToAdd("FlexModule", "@angular/flex-layout"),
        new ImportsToAdd("TabsModule", "@netgrif/application-engine")]);

    rules.push(schematic('add-route', {
        routeObject: createRouteObject(args.path as string, className.name),
        path: `${args.path}/*`
    }));
    return chain(rules);
}

function createRouteObject(path: string, className: string): Route {
    const index = path.lastIndexOf('/');
    let relevantPath = path;
    if (index !== -1) {
        relevantPath = path.substring(index + 1);
    }
    return {path: relevantPath, component: className};
}

function updateAppModule(tree: Tree, className: string, componentPath: string, imports: Array<ImportsToAdd> = []): void {
    const appModule = getAppModule(tree, getProjectInfo(tree).path);
    let appModuleChanges = addDeclarationToModule(appModule.sourceFile, appModule.fileEntry.path, className, componentPath);
    appModuleChanges = addImportsToAppModule(imports, appModule, appModuleChanges);
    commitChangesToFile(tree, appModule.fileEntry, appModuleChanges);
}

function addImportsToAppModule(imports: Array<ImportsToAdd> = [], appModule: FileData, appModuleChanges: Change[]): Change[] {
    imports.forEach(value => {
        appModuleChanges = appModuleChanges.concat(addImportToModule(appModule.sourceFile, appModule.fileEntry.path, value.moduleName, value.moduleFrom));
    });
    return appModuleChanges;
}

function addRoutingModuleImport(tree: Tree, className: string, componentPath: string): void {
    const routingModuleChanges = [];
    const routesModule = getFileData(tree, getProjectInfo(tree).path, 'app-routing.module.ts');
    routingModuleChanges.push(insertImport(routesModule.sourceFile, routesModule.fileEntry.path, className, componentPath));
    commitChangesToFile(tree, routesModule.fileEntry, routingModuleChanges);
}
