import {Tree, SchematicsException} from '@angular-devkit/schematics';
import {commitChangesToFile, getAppModule, getFileData, getProjectInfo} from '../utility-functions';
import {ImportToAdd} from './create-view-prompt/classes/ImportToAdd';
import {addDeclarationToModule, addImportToModule, insertImport} from '@schematics/angular/utility/ast-utils';
import {Change} from '@schematics/angular/utility/change';
import {CreateViewArguments} from './create-view-prompt/schema';

export function getParentPath(path: string): string {
    const index = path.lastIndexOf('/');
    if (index === -1) {
        return '';
    }
    return path.substring(0, index);
}

export function updateAppModule(tree: Tree, className: string, componentPath: string, imports: Array<ImportToAdd> = []): void {
    const appModule = getAppModule(tree, getProjectInfo(tree).path);
    commitChangesToFile(tree, appModule.fileEntry,
        addDeclarationToModule(appModule.sourceFile, appModule.fileEntry.path, className, componentPath)
    );
    addImportsToAppModule(tree, imports);
}

export function addImportsToAppModule(tree: Tree, imports: Array<ImportToAdd>): void {
    const projectPath = getProjectInfo(tree).path;
    imports.forEach(importToAdd => {
        const appModule = getAppModule(tree, projectPath);
        commitChangesToFile(tree, appModule.fileEntry,
            addImportToModule(appModule.sourceFile, appModule.fileEntry.path, importToAdd.className, importToAdd.importPath)
        );
    });
}

export function addRoutingModuleImport(tree: Tree, className: string, componentPath: string): void {
    const routingModuleChanges: Array<Change> = [];
    const routesModule = getFileData(tree, getProjectInfo(tree).path, 'app-routing.module.ts');
    routingModuleChanges.push(insertImport(routesModule.sourceFile, routesModule.fileEntry.path, className, componentPath));
    commitChangesToFile(tree, routesModule.fileEntry, routingModuleChanges);
}

export function addAuthGuardImport(tree: Tree, access: CreateViewArguments['access']) {
    // TODO 9.4.2020 - Add condition if access is object
    if (access === 'private')
        addRoutingModuleImport(tree, 'AuthenticationGuardService', '@netgrif/application-engine');
}

export function constructRoutePath(pathPrefix: string, pathPart: string): string {
    return `${pathPrefix}${pathPrefix.length > 0 ? '/' : ''}${pathPart}`;
}

export function resolveClassSuffixForView(view: string): string {
    switch (view) {
        case 'login':
            return 'Login';
        case 'tabView':
            return 'TabView';
        case 'taskView':
            return 'TaskView';
        case 'caseView':
            return 'CaseView';
        case 'emptyView':
            return 'EmptyView';
        case 'sidenavView':
            return 'SidenavView';
        case 'toolbarView':
            return 'ToolbarView';
        case 'sidenavAndToolbarView':
            return 'SidenavAndToolbarView';
        case 'dashboard':
            return 'Dashboard';
        default:
            throw new SchematicsException(`Unknown view type '${view}'`);
    }
}
