import {Rule, schematic, Tree} from '@angular-devkit/schematics';
import {commitChangesToFile, getAppModule, getFileData, getProjectInfo, ProjectInfo} from '../utilityFunctions';
import {ImportToAdd} from './create-view-prompt/classes/ImportToAdd';
import {addDeclarationToModule, addImportToModule, insertImport} from '@schematics/angular/utility/ast-utils';
import {Change} from '@schematics/angular/utility/change';
/**
 * Mocks the `Route` interface of {@link @angular/router#Route | Angular's router package}.
 * But changes the type of the `component` attribute to `string`.
 */
export interface Route {
    component: string;
    path: string;
    children?: Array<Route>;
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

export function addRouteToRoutesJson(path: string, className: string): Rule {
    return schematic('add-route', {
        routeObject: createRouteObject(path, className),
        path
    });
}

export function createRouteObject(path: string, className: string): Route {
    const index = path.lastIndexOf('/');
    let relevantPath = path;
    if (index !== -1) {
        relevantPath = path.substring(index + 1);
    }
    return {path: relevantPath, component: className};
}
export function constructRoutePath(pathPrefix: string, pathPart: string): string {
    return `${pathPrefix}${pathPrefix.length > 0 ? '/' : ''}${pathPart}`;
}
export function addAllRoutesToMap(map: Map<string, Route>, routes: Routes, pathPrefix: string = ''): void {
    routes.forEach(route => {
        if (route.path !== undefined) {
            const routePath = constructRoutePath(pathPrefix, route.path);
            map.set(routePath, route);
            if (route.children !== undefined) {
                addAllRoutesToMap(map, route.children, routePath);
            }
        }
    });
}
