import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import {SchematicsException, Tree} from '@angular-devkit/schematics';
import {commitChangesToFile, getFileData, getProjectInfo} from '../../_utility/utility-functions';
import {findNodes, insertImport} from '@schematics/angular/utility/ast-utils';
import {ImportToAdd} from '../../_commons/import-to-add';
import {Change} from '@schematics/angular/utility/change';

/**
 * Adds the view to the ViewService array and into model's EntryComponents as the dynamic routing doesn't work otherwise
 * @param tree schematic Tree object
 * @param view the view that should be imported
 */
export function addViewToViewService(tree: Tree, view: ImportToAdd): void {
    const projectInfo = getProjectInfo(tree);
    const fileData = getFileData(tree, projectInfo.path, `${projectInfo.projectNameDasherized}-view.service.ts`);

    const arrayContent = getArrayNodeContent(fileData.sourceFile);
    const recorder = tree.beginUpdate(fileData.fileEntry.path);
    if (arrayContent.getChildren().length === 0) {
        recorder.insertRight(arrayContent.pos, `{id: '${view.className}', class: ${view.className}}`);
    } else {
        recorder.insertRight(arrayContent.pos, `{id: '${view.className}', class: ${view.className}},\n\t\t\t`);
    }
    tree.commitUpdate(recorder);

    const viewServiceChanges: Array<Change> = [];
    viewServiceChanges.push(
        insertImport(fileData.sourceFile, fileData.fileEntry.path, view.className, view.fileImportPath)
    );
    commitChangesToFile(tree, fileData.fileEntry, viewServiceChanges);
}

export function getGeneratedViewClassNames(tree: Tree): Set<string> {
    const projectInfo = getProjectInfo(tree);
    const fileData = getFileData(tree, projectInfo.path, `${projectInfo.projectNameDasherized}-view.service.ts`);

    const nodesInArray = getArrayNodeContent(fileData.sourceFile).getChildren();
    const result = new Set<string>();
    for (let i = 0; i < nodesInArray.length; i += 2 /* Even nodes are commas */) {
        if (nodesInArray[i].kind === ts.SyntaxKind.Identifier) {
            result.add(nodesInArray[i].getText());
        } else if (nodesInArray[i].kind === ts.SyntaxKind.ObjectLiteralExpression) { // object of the form {id: string, class: Class}
            const objectLiteral: ts.ObjectLiteralExpression = nodesInArray[i] as ts.ObjectLiteralExpression;
            const id: ts.PropertyAssignment = objectLiteral.properties.find(property =>
                property.kind === ts.SyntaxKind.PropertyAssignment && property.name.getText() === 'id') as ts.PropertyAssignment;
            const text = id.initializer.getText();
            result.add(text.substring(1, text.length - 1)); // trim ' from start and end of string
        }
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
