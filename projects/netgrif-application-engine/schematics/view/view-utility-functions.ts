import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import {Tree, SchematicsException} from '@angular-devkit/schematics';
import {commitChangesToFile, getAppModule, getFileData, getProjectInfo} from '../_utility/utility-functions';
import {ImportToAdd} from './create-view-prompt/classes/ImportToAdd';
import {addDeclarationToModule, addImportToModule, findNodes} from '@schematics/angular/utility/ast-utils';
import {ClassName} from './create-view-prompt/classes/ClassName';

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

export function addViewToViewService(tree: Tree, className: ClassName): void {
    const projectInfo = getProjectInfo(tree);
    const fileData = getFileData(tree, projectInfo.path, `${projectInfo.projectNameDasherized}-view.service.ts`);
    const arrayContent = getArrayNodeContent(fileData.sourceFile);
    // arrayContent.getChildren();
    // String(className.fileImportPath);

}

function getArrayNodeContent(source: ts.SourceFile): ts.Node {
    const arrayNodes: ts.Node[] = findNodes(source, ts.SyntaxKind.ArrayLiteralExpression);
    if (arrayNodes === null) {
        throw new SchematicsException('Source file doesn\'t contain any array tokens');
    }
    return arrayNodes[0].getChildren()[1];
}
