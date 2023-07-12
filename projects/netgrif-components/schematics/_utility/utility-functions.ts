import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import {
    apply,
    applyTemplates,
    mergeWith,
    move,
    Rule,
    SchematicsException,
    Tree,
    url,
} from '@angular-devkit/schematics';
import {FileEntry, UpdateRecorder, DirEntry} from '@angular-devkit/schematics/src/tree/interface';
import {normalize, strings} from '@angular-devkit/core';
import {Change, InsertChange, NoopChange, RemoveChange} from '@schematics/angular/utility/change';
import {FileData} from './models/file-data';
import {FileSystemNode} from './models/file-system-node';
import {ProjectInfo} from './models/project-info';
import {addSymbolToDecoratorMetadata} from './modified-library-functions';
import {NetgrifApplicationEngine} from '@netgrif/components-core';
import {ImportToAdd} from '../_commons/import-to-add';
import {insertImport} from '@schematics/angular/utility/ast-utils';


export function getProjectInfo(tree: Tree): ProjectInfo {
    const workspaceConfig = tree.read('/angular.json');
    if (!workspaceConfig) {
        throw new SchematicsException('Could not find Angular workspace configuration. Missing \'angular.json\'.');
    }

    const workspaceContent = workspaceConfig.toString();

    const workspace = JSON.parse(workspaceContent);

    const result = new ProjectInfo();

    result.projectName = workspace.defaultProject as string;
    result.projectNameClassified = strings.classify(result.projectName);
    result.projectNameDasherized = strings.dasherize(result.projectName);

    const project = workspace.projects[result.projectName];

    const projectType = project.projectType === 'application' ? 'app' : 'lib';

    result.path = `${project.sourceRoot}/${projectType}`;

    result.projectPrefix = project.prefix;
    result.projectPrefixDasherized = strings.dasherize(result.projectPrefix);

    return result;
}

export function getNaeConfigurationString(tree: Tree): string {
    const naeConfig = tree.read('/nae.json');
    if (!naeConfig) {
        throw new SchematicsException('Could not find Netgrif Application Engine workspace configuration. Missing \'nae.json\'.');
    }

    return naeConfig.toString();
}

export function getNaeConfiguration(tree: Tree): NetgrifApplicationEngine {
    return JSON.parse(getNaeConfigurationString(tree));
}

export function commitChangesToFile(tree: Tree, file: FileEntry, changes: Array<Change>): void {
    const changesRecorder = createChangesRecorder(tree, file, changes);
    tree.commitUpdate(changesRecorder);
}

export function createChangesRecorder(tree: Tree, file: FileEntry, changes: Array<Change>): UpdateRecorder {
    const exportRecorder = tree.beginUpdate(file.path);
    for (const change of changes) {
        if (change instanceof InsertChange) {
            exportRecorder.insertLeft(change.pos, change.toAdd);
        } else if (change instanceof RemoveChange) {
            exportRecorder.remove(change.order, change.toRemove.length);
        } else if (change instanceof NoopChange) {
            continue;
        } else {
            throw new SchematicsException('Other change types are currently not supported by Netgrif utility implementation');
        }
    }
    return exportRecorder;
}

export function getAppModule(tree: Tree, projectPath: string): FileData {
    return getFileData(tree, projectPath, 'app.model.ts');
}

export function getFileData(tree: Tree, projectRootPath: string, relativeFilePath: string): FileData {
    const file = tree.get(`${projectRootPath}/${relativeFilePath}`);
    if (!file) {
        throw new SchematicsException(`Could not find requested file. Missing '${relativeFilePath}'.`);
    }

    return {
        fileEntry: file,
        sourceFile: fileEntryToTsSource(file)
    };
}

export function fileEntryToTsSource(file: FileEntry, encoding: string = 'utf8'): ts.SourceFile {
    const source = getTsSource(file.path, file.content.toString(encoding));
    if (source === null) {
        throw new SchematicsException(`'${file.path}' could not be read. Make sure it has UTF-8 encoding.`);
    }
    return source;
}

export function getTsSource(path: string, content: string): ts.SourceFile {
    return ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);
}

/**
 * A convenience method that creates source files from template files and places them at the specified location in the file system.
 * @param pathToTemplates path relative to the location of the schematic entry-point file
 * (might not necessarily be the same as the file that contains the call!)
 * @param pathToMoveGeneratedFiles path relative to the workspace root where the generated files should be placed
 * @param options the object that supplies parameters to the template files
 */
export function createFilesFromTemplates(pathToTemplates: string, pathToMoveGeneratedFiles: string, options: object = {}): Rule {
    const templateSource = apply(url(pathToTemplates), [
        applyTemplates(options),
        move(normalize(pathToMoveGeneratedFiles)),
    ]);
    return mergeWith(templateSource);
}

/**
 * computes the relative path from one file to another
 * @param sourcePath - path relative to project root of the source file
 * @param destinationPath - path relative to project root of the destination file
 * @return path that leads from source file to destination file
 */
export function createRelativePath(sourcePath: string, destinationPath: string): string {
    const root: FileSystemNode = new FileSystemNode('', null as unknown as FileSystemNode);
    let lastNode: FileSystemNode = root;

    sourcePath.split('/').forEach(pathPart => {
        if (pathPart === '.') {
            return; // continue
        }
        const newNode = new FileSystemNode(pathPart, lastNode);
        lastNode.children.push(newNode);
        lastNode = newNode;
    });
    const sourceNode = lastNode;
    lastNode = root;

    destinationPath.split('/').forEach(pathPart => {
        if (pathPart === '.') {
            return;
        }

        if (lastNode.children.length === 1 && lastNode.children[0].path === pathPart) {
            lastNode = lastNode.children[0];
        } else {
            const newNode = new FileSystemNode(pathPart, lastNode);
            lastNode.children.push(newNode);
            lastNode = newNode;
        }
    });

    let currentNode = sourceNode.parent;
    const pathFragments = [];
    let traversalDirectionUp = true;
    if (currentNode.children.length === 2) {
        pathFragments.push('.');
        traversalDirectionUp = false;
        currentNode = currentNode.children[1];
    }
    while (traversalDirectionUp) {
        if (currentNode.children.length === 2) {
            traversalDirectionUp = false;
            currentNode = currentNode.children[1]; // destination path is always added second
        } else {
            currentNode = currentNode.parent;
            pathFragments.push('..');
        }
    }
    while (true) {
        pathFragments.push(currentNode.path);
        if (currentNode.children.length > 0) {
            currentNode = currentNode.children[0];
        } else {
            break;
        }
    }

    return pathFragments.join('/');
}

/**
 * Recursively iterates over every non-test, typescript source file in the project
 * and executes the given lambda with it as the input parameter.
 */
export function forEachSourceTsFile(tree: Tree, lambda: (fe: FileEntry) => void): void {
    forEachProjectFile(tree, (fe => {
        if (fe.path.endsWith('.ts') && !fe.path.endsWith('.spec.ts')) {
            lambda(fe);
        }
    }));
}

/**
 * Recursively iterates over every file in the project and executes the given lambda with it as the input parameter.
 * @param tree tree to get access to the file system
 * @param lambda the function that is called with each of the project files as it's argument
 */
export function forEachProjectFile(tree: Tree, lambda: (fe: FileEntry) => void): void {
    const projectInfo = getProjectInfo(tree);
    const rootDir = tree.getDir(projectInfo.path);
    forEachSubDirFile(rootDir, lambda);
}


/**
 * Recursively iterates over every file in the given directory and executes the given lambda with it as the input parameter.
 * @param subRoot the directory which should be recursively explored.
 * The files in the given directory and all it's subdirectories are processed by this function
 * @param lambda the function that is called with each of the files as it's argument
 */
export function forEachSubDirFile(subRoot: DirEntry, lambda: (fe: FileEntry) => void): void {
    subRoot.subfiles.forEach(pathFragment => {
        const file = subRoot.file(pathFragment);
        if (file !== null) {
            lambda(file);
        }
    });
    subRoot.subdirs.forEach(pathFragment => {
        forEachSubDirFile(subRoot.dir(pathFragment), lambda);
    });
}

/**
 * Finds all nodes of the given type among the child nodes of the given node.
 * @param start the node who's children should be searched
 * @param target the type of node that should be found
 * @param recursive whether children of children should be examined recursively or not
 * @returns an array of the children that are of the given type. Order of the children is not guaranteed.
 */
export function findNodesInChildren(start: ts.Node, target: ts.SyntaxKind, recursive: boolean = false): Array<ts.Node> {
    const result: Array<ts.Node> = [];

    start.getChildren().forEach(child => {
        if (child.kind === target) {
            result.push(child);
        }
        if (recursive && child.getChildren().length !== 0) {
            result.push(...findNodesInChildren(child, target, recursive));
        }
    });

    return result;
}

/**
 * Adds another provider to the providers of a specified component
 * @param componentFile the file with the component
 * @param symbolName the class name of the added provider
 * @param importPath the path from which to import the symbol
 * @param insertedText? the text that should be inserted into the providers array
 */
export function addProviderToComponent(componentFile: FileEntry,
                                       symbolName: string,
                                       importPath: string | null = null,
                                       insertedText?: string): Array<Change> {
    return addSymbolToDecoratorMetadata(
        fileEntryToTsSource(componentFile),
        componentFile.path,
        'Component',
        'providers',
        symbolName,
        insertedText,
        importPath
    );
}

export function addImport(file: FileEntry, newImport: ImportToAdd): Change {
    return insertImport(fileEntryToTsSource(file), file.path, newImport.className, newImport.fileImportPath);
}
