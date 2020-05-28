import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import {SchematicsException, Tree} from '@angular-devkit/schematics';
import {commitChangesToFile, getAppModule, getFileData, getProjectInfo} from '../../_utility/utility-functions';
import {addEntryComponentToModule, findNodes, insertImport} from '@schematics/angular/utility/ast-utils';
import {ImportToAdd} from '../../../src/commons/import-to-add';

/**
 * Adds the view to the ViewService array and into module's EntryComponents as the dynamic routing doesn't work otherwise
 * @param tree schematic Tree object
 * @param view the view that should be imported
 */
export function addViewToViewService(tree: Tree, view: ImportToAdd): void {
    const projectInfo = getProjectInfo(tree);
    const fileData = getFileData(tree, projectInfo.path, `${projectInfo.projectNameDasherized}-view.service.ts`);

    const arrayContent = getArrayNodeContent(fileData.sourceFile);
    const recorder = tree.beginUpdate(fileData.fileEntry.path);
    if (arrayContent.getChildren().length === 0) {
        recorder.insertRight(arrayContent.pos, `${view.className}`);
    } else {
        recorder.insertRight(arrayContent.pos, `${view.className},\n\t\t\t`);
    }
    tree.commitUpdate(recorder);

    const appModule = getAppModule(tree, projectInfo.path);
    const changes = addEntryComponentToModule(
        appModule.sourceFile,
        appModule.fileEntry.path,
        view.className,
        view.fileImportPath
    );
    changes.push(
        insertImport(fileData.sourceFile, fileData.fileEntry.path, view.className, view.fileImportPath)
    );
    commitChangesToFile(tree, fileData.fileEntry, changes);
}

export function getGeneratedViewClassNames(tree: Tree): Set<string> {
    const projectInfo = getProjectInfo(tree);
    const fileData = getFileData(tree, projectInfo.path, `${projectInfo.projectNameDasherized}-view.service.ts`);

    const nodesInArray = getArrayNodeContent(fileData.sourceFile).getChildren();
    const result = new Set<string>();
    for (let i = 0; i < nodesInArray.length; i += 2 /* Even nodes are commas */) {
        result.add(nodesInArray[i].getText());
    }
    return result;
}

function getArrayNodeContent(source: ts.SourceFile): ts.Node {
    const arrayNodes: ts.Node[] = findNodes(source, ts.SyntaxKind.ArrayLiteralExpression);
    if (arrayNodes === null) {
        throw new SchematicsException('Source file doesn\'t contain any array tokens');
    }
    return arrayNodes[0].getChildren()[1];
}
