import {SchematicsException, Tree} from "@angular-devkit/schematics";
import {experimental} from "@angular-devkit/core";

interface ProjectInfo {
    path: string,
    projectName: string
}


export function getProjectInfo(tree: Tree): ProjectInfo {
    const workspaceConfig = tree.read('/angular.json');
    if (!workspaceConfig) {
        throw new SchematicsException('Could not find Angular workspace configuration');
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
