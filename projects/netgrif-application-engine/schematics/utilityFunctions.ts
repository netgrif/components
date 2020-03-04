import * as ts from "@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript";

import {SchematicsException, Tree, } from "@angular-devkit/schematics";
import {FileEntry, UpdateRecorder} from "@angular-devkit/schematics/src/tree/interface";
import {experimental, strings} from "@angular-devkit/core";
import {NetgrifApplicationEngine} from "../src/lib/configuration/interfaces/schema";
import {Change, InsertChange} from "@schematics/angular/utility/change";

export class ProjectInfo {
    /**
     * projects/[name]/src/app
     */
    path: string = '';
    projectName: string = '';
    projectNameClassified: string = '';
    projectNameDasherized: string = '';
    projectPrefix: string = '';
    projectPrefixDasherized: string = '';
}


export function getProjectInfo(tree: Tree): ProjectInfo {
    const workspaceConfig = tree.read('/angular.json');
    if (!workspaceConfig) {
        throw new SchematicsException('Could not find Angular workspace configuration. Missing \'angular.json\'.');
    }

    const workspaceContent = workspaceConfig.toString();

    const workspace: experimental.workspace.WorkspaceSchema = JSON.parse(workspaceContent);

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

export function getTsSource(path: string, content: string): ts.SourceFile {
    return ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);
}

export function fileEntryToTsSource(file: FileEntry, encoding: string = 'utf8'): ts.SourceFile {
    return getTsSource(file.path, file.content.toString(encoding));
}

export function createChangesRecorder(tree: Tree, file: FileEntry, changes: Array<Change>): UpdateRecorder {
    const exportRecorder= tree.beginUpdate(file.path);
    for (const change of changes) {
        if (change instanceof InsertChange) {
            exportRecorder.insertLeft(change.pos, change.toAdd);
        }
    }
    return exportRecorder;
}
