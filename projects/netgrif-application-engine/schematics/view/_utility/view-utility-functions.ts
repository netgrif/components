import {Tree, SchematicsException} from '@angular-devkit/schematics';
import {commitChangesToFile, getAppModule, getNaeConfiguration, getProjectInfo} from '../../_utility/utility-functions';
import {addDeclarationToModule, addImportToModule} from '@schematics/angular/utility/ast-utils';
import {ImportToAdd} from '../create-view-prompt/models/import-to-add';
import {View, Views} from '../../../src/lib/configuration/interfaces/schema';


export function getParentPath(path: string): string {
    const index = path.lastIndexOf('/');
    if (index === -1) {
        return '';
    }
    return path.substring(0, index);
}

export function parentViewDefined(tree: Tree, path: string): boolean {
    const parentPath = getParentPath(path);
    if (parentPath === '') {
        return true;
    }
    const pathSegments = parentPath.split('/');
    const naeConfig = getNaeConfiguration(tree);

    let views: Views | undefined = naeConfig.views;
    for (const pathSegment of pathSegments) {
        if (views === undefined) {
            return false;
        }
        const view: View = views[pathSegment];
        if (view === undefined) {
            return false;
        }
        views = view.children;
    }

    return true;
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
