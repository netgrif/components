import {Tree} from '@angular-devkit/schematics';
import {commitChangesToFile, getAppModule, getNaeConfiguration, getProjectInfo} from '../../_utility/utility-functions';
import {addDeclarationToModule, addImportToModule} from '@schematics/angular/utility/ast-utils';
import {ImportToAdd} from '../../_commons/import-to-add';
import {View, Views} from '../../_commons/schema';


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
            addImportToModule(appModule.sourceFile, appModule.fileEntry.path, importToAdd.className, importToAdd.fileImportPath)
        );
    });
}

export function constructRoutePath(pathPrefix: string, pathPart: string): string {
    return `${pathPrefix}${pathPrefix.length > 0 ? '/' : ''}${pathPart}`;
}
