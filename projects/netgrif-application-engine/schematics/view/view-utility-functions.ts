import {Rule, schematic, Tree, SchematicsException} from '@angular-devkit/schematics';
import {commitChangesToFile, getAppModule, getFileData, getProjectInfo, ProjectInfo} from '../utility-functions';
import {ImportToAdd} from './create-view-prompt/classes/ImportToAdd';
import {addDeclarationToModule, addImportToModule, insertImport} from '@schematics/angular/utility/ast-utils';
import {Change} from '@schematics/angular/utility/change';
import {CreateViewArguments} from './create-view-prompt/schema';


/**
 * Mocks the `Route` interface of {@link @angular/router#Route | Angular's router package}.
 * But changes the type of the `component` attribute to `string`.
 */
export interface Route {
    component: string;
    path: string;
    children?: Array<Route>;
    canActivate?: any[];
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

export function addRouteToRoutesJson(path: string, className: string, access?: CreateViewArguments['access']): Rule {
    return schematic('add-route', {
        routeObject: createRouteObject(path, className, access),
        path
    });
}

export function createRouteObject(path: string, className: string,
                                  access?: CreateViewArguments['access']): Route {
    const index = path.lastIndexOf('/');
    let relevantPath = path;
    if (index !== -1) {
        relevantPath = path.substring(index + 1);
    }
    if (access === 'private') {
        return {path: relevantPath, component: className, canActivate: ['AuthenticationGuardService']};
    } else {
        return {path: relevantPath, component: className};
    }
}

export function addAuthGuardImport(tree: Tree, access: CreateViewArguments['access']) {
    // TODO 9.4.2020 - Add condition if access is object
    if (access === 'private')
        addRoutingModuleImport(tree, 'AuthenticationGuardService', '@netgrif/application-engine');
}

export function constructRoutePath(pathPrefix: string, pathPart: string): string {
    return `${pathPrefix}${pathPrefix.length > 0 ? '/' : ''}${pathPart}`;
}

/**
 * Creates a Map object with address paths as keys and corresponding Route objects as values.
 * The source for this information is routes.json file in the application project.
 *
 * @param tree - schematic tree
 * @returns Key is the whole path, with leading backslash omitted. Value is the Route object from routes.json corresponding to the path
 */
export function createAppRoutesMap(tree: Tree) {
    const angularRoutes = getRoutesJsonContent(tree, getProjectInfo(tree));
    const map = new Map<string, Route>();
    addAllRoutesToMap(map, angularRoutes);
    return map;
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
