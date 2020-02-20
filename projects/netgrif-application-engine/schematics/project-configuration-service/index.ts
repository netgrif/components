import {
    Rule, Tree, SchematicsException,
    apply, url, applyTemplates, move,
    chain, mergeWith
} from '@angular-devkit/schematics';

import { strings, normalize, experimental } from '@angular-devkit/core';

import { Schema as ProjectConfigurationServiceSchema } from './schema';

export function projectConfigurationService(options: ProjectConfigurationServiceSchema): Rule {
    return (tree: Tree) => {
        const workspaceConfig = tree.read('/angular.json');
        if (!workspaceConfig) {
            throw new SchematicsException('Could not find Angular workspace configuration');
        }

        // convert workspace to string
        const workspaceContent = workspaceConfig.toString();

        // parse workspace string into JSON object
        const workspace: experimental.workspace.WorkspaceSchema = JSON.parse(workspaceContent);

        if (!options.project) {
            options.project = workspace.defaultProject;
        }

        return tree;
    };
}
