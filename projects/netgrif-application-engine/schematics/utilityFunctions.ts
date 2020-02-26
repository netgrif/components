import {SchematicsException, Tree} from "@angular-devkit/schematics";
import {experimental} from "@angular-devkit/core";
import {NetgrifApplicationEngine} from "@netgrif/application-engine/lib/configuration/interfaces/schema";

interface ProjectInfo {
    path: string,
    projectName: string
}


export function getProjectInfo(tree: Tree): ProjectInfo {
    const workspaceConfig = tree.read('/angular.json');
    if (!workspaceConfig) {
        throw new SchematicsException('Could not find Angular workspace configuration. Missing \'angular.json\'.');
    }

    const workspaceContent = workspaceConfig.toString();

    const workspace: experimental.workspace.WorkspaceSchema = JSON.parse(workspaceContent);

    const result = {
        path: '',
        projectName: ''
    };

    result.projectName = workspace.defaultProject as string;

    const project = workspace.projects[result.projectName];

    const projectType = project.projectType === 'application' ? 'app' : 'lib';

    result.path = `${project.sourceRoot}/${projectType}`;

    return result;
}

export function getNaeConfigurationString(tree: Tree): string {
    const naeConfig = tree.read('/nae.json');
    if (!naeConfig) {
        throw new SchematicsException('Could not find Netgrif Application Engine workspace configuration.  Missing \'nae.json\'.');
    }

    return naeConfig.toString();
}

export function getNaeConfiguration(tree: Tree): NetgrifApplicationEngine {
    return JSON.parse(getNaeConfigurationString(tree));
}
