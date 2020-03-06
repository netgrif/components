import {
    Rule, SchematicsException,
    Tree,
} from '@angular-devkit/schematics';
import {fileEntryToTsSource, getProjectInfo} from '../../utilityFunctions';
import {getRoutesJsonContent} from "../viewUtilityFunctions";
import {Route} from "@angular/router";
import {findNodes} from "@schematics/angular/utility/ast-utils";
import * as ts from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";
import {FileEntry, UpdateRecorder} from "@angular-devkit/schematics/src/tree/interface";

export function populateRouteModule(): Rule {
    return (tree: Tree) => {
        let data: Array<any> = getRoutesJsonContent(tree, getProjectInfo(tree));
        checkFileExists(tree);
        prepareAndUpdateRoutes(tree, data)
    };
}

function checkFileExists(tree: Tree): void {
    if (!tree.exists(getProjectInfo(tree).path + "/app-routing.module.ts") || !tree.exists(getProjectInfo(tree).path + "/routes.json")) {
        throw new SchematicsException('Missing routes.module.ts or routes.json file');
    }
}

function getRoutesFromJson(data: Array<Route>, dataToReturn: string[]): string[] {
    for (let route of data) {
        dataToReturn.push(removeQuotesOnRout(JSON.stringify(route).trim()));
    }
    return dataToReturn
}

function removeQuotesOnRout(phrase: string): string {
    phrase!.match(/.component":(.\w+.)/g)!.forEach(value => {
        phrase = phrase.replace(value, value.split('"').join(""));
    });
    return phrase;
}

function prepareAndUpdateRoutes(tree: Tree, data: Array<Route>) {
    let fileEntry = getFileEntryFromRouteModule(tree);
    let moduleSource = checkAndGetTsSourceFromFileEntry(fileEntry);
    let arrayNode: ts.Node = returnArrayNodesFromSourceFile(moduleSource);
    executeUpdateRoutes(tree,arrayNode,data);
}

function getFileEntryFromRouteModule(tree: Tree): FileEntry {
    let fileEntry = tree.get(getProjectInfo(tree).path + "/app-routing.module.ts");
    if (fileEntry == null) {
        throw new SchematicsException('Problem with reading data from file');
    }
    return fileEntry
}

function checkAndGetTsSourceFromFileEntry(fileEntry: FileEntry): ts.SourceFile {
    let moduleSource = fileEntryToTsSource(fileEntry);
    if (moduleSource == null) {
        throw new SchematicsException('Problem with get ts.SourceFile from FileEntry');
    }
    return moduleSource;
}

function returnArrayNodesFromSourceFile(moduleSource: ts.SourceFile): ts.Node {
    let arrayNodes: ts.Node[] = findNodes(moduleSource, ts.SyntaxKind.ArrayLiteralExpression);
    if (arrayNodes == null) {
        throw new SchematicsException('Problem with get ts.Node[] from ts.SourceFile');
    }
    let index: number = findIndexOfRoutesArrayInNodes(arrayNodes);
    return arrayNodes[index].getChildren()[1];
}

function findIndexOfRoutesArrayInNodes(nodes: ts.Node[]): number {
    let index = 0;
    for (let node of nodes) {
        if (node.parent.getFirstToken()!.getFullText().trim() == "routes") {
            return index;
        }
        index++
    }
    throw new SchematicsException('Routes array is not in ts.Node[]');
}

function checkAndRemoveIfNotEmpty(arrayNode: ts.Node, recorder: UpdateRecorder):void {
    if (arrayNode.getChildren().length != 0)
        recorder.remove(arrayNode.pos, arrayNode.end - arrayNode.pos,);
}

function addRoutesToRouteArray(data: Array<Route>,recorder: UpdateRecorder,arrayNode: ts.Node):void {
    let routesToAdd = getRoutesFromJson(data, []);
    routesToAdd.forEach((value, index) => {
        let valuetoAdd = (index+1 != routesToAdd.length) ? value.concat(",") : value;
        recorder.insertLeft(arrayNode.pos, valuetoAdd);
    });
}

function executeUpdateRoutes(tree:Tree,arrayNode: ts.Node,data: Array<Route>):void{
    const recorder = tree.beginUpdate(getProjectInfo(tree).path + "/app-routing.module.ts");
    checkAndRemoveIfNotEmpty(arrayNode,recorder);
    addRoutesToRouteArray(data,recorder,arrayNode);
    tree.commitUpdate(recorder);
}
