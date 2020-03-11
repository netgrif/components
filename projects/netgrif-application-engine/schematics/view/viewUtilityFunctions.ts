import {Tree} from "@angular-devkit/schematics";
import {commitChangesToFile, FileData, getAppModule, getFileData, getProjectInfo, ProjectInfo} from '../utilityFunctions';
import {ImportsToAdd} from './create-view-prompt/classes/importsToAdd';
import {addDeclarationToModule, addImportToModule, insertImport} from '@schematics/angular/utility/ast-utils';
import {Change} from '@schematics/angular/utility/change';

/**
 * Mocks the `Route` interface of {@link @angular/router#Route | Angular's router package}. But changes the type of the `component` attribute to `string`.
 */
export interface Route{
    component: string;
    path: string;
    children?: Array<Route>
}

export declare type Routes = Route[];

export function getRoutesJsonContent(tree: Tree, projectInfo: ProjectInfo): Array<Route> {
    const routes = tree.read(`${projectInfo.path}/routes.json`);
    if (!routes) {
        return [];
    }
    return JSON.parse(routes.toString());
}

export function getParentPath(path: string): string {
    const index = path.lastIndexOf('/');
    if (index === -1) {
        return '';
    }
    return path.substring(0, index)
}

export function updateAppModule(tree: Tree, className: string, componentPath: string, imports: Array<ImportsToAdd> = []): void {
    const appModule = getAppModule(tree, getProjectInfo(tree).path);
    let changes = addDeclarationToModule(appModule.sourceFile, appModule.fileEntry.path, className, componentPath);
    changes =  changes.concat(addImportsToAppModule(imports, appModule));
    commitChangesToFile(tree, appModule.fileEntry, changes);
}

export function addImportsToAppModule(imports: Array<ImportsToAdd> = [], appModule: FileData): Change[] {
    let changes: Array<Change> = [];
    imports.forEach(importToAdd => {
        changes = changes.concat(addImportToModule(appModule.sourceFile, appModule.fileEntry.path, importToAdd.moduleClassName, importToAdd.moduleImportPath));
    });
    return changes;
}

export function addRoutingModuleImport(tree: Tree, className: string, componentPath: string): void {
    const routingModuleChanges = [];
    const routesModule = getFileData(tree, getProjectInfo(tree).path, 'app-routing.module.ts');
    routingModuleChanges.push(insertImport(routesModule.sourceFile, routesModule.fileEntry.path, className, componentPath));
    commitChangesToFile(tree, routesModule.fileEntry, routingModuleChanges);
}
