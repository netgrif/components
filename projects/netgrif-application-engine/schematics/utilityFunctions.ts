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
import {FileEntry, UpdateRecorder} from '@angular-devkit/schematics/src/tree/interface';
import {experimental, normalize, strings} from '@angular-devkit/core';
import {NetgrifApplicationEngine} from '../src/lib/configuration/interfaces/schema';
import {Change, InsertChange} from '@schematics/angular/utility/change';
import {FileSystemNode} from './utilityClasses';

export class ProjectInfo {
    /**
     * projects/[name]/src/app
     */
    path = '';
    projectName = '';
    projectNameClassified = '';
    projectNameDasherized = '';
    projectPrefix = '';
    projectPrefixDasherized = '';
}

export interface FileData {
    fileEntry: FileEntry;
    sourceFile: ts.SourceFile;
}


export function getProjectInfo(tree: Tree): ProjectInfo {
    const workspaceConfig = tree.read('/angular.json');
    if (!workspaceConfig) {
        throw new SchematicsException('Could not find Angular workspace configuration. Missing \'angular.json\'.');
    }

    const workspaceContent = workspaceConfig.toString();

    const workspace: experimental.workspace.WorkspaceSchema = JSON.parse(workspaceContent);

    const result = new ProjectInfo();

    result.projectName = workspace.defaultProject;
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

export function getTsSource(path: string, content: string): ts.SourceFile {
    return ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);
}

export function fileEntryToTsSource(file: FileEntry, encoding: string = 'utf8'): ts.SourceFile {
    return getTsSource(file.path, file.content.toString(encoding));
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
        }
    }
    return exportRecorder;
}

export function getAppModule(tree: Tree, projectPath: string): FileData {
    return getFileData(tree, projectPath, 'app.module.ts');
}

export function getFileData(tree: Tree, projectRootPath: string, relativeFilePath: string): FileData {
    const file = tree.get(`${projectRootPath}/${relativeFilePath}`);
    if (!file) {
        throw new SchematicsException(`Could not find requested file. Missing '${relativeFilePath}'.`);
    }

    const source = fileEntryToTsSource(file);

    return {
        fileEntry: file,
        sourceFile: source
    };
}

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

