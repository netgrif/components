import {
    Rule,
    Tree,
} from '@angular-devkit/schematics';
import {strings} from '@angular-devkit/core';
import {createFilesFromTemplates, getNaeConfigurationString, getProjectInfo} from '../../utility-functions';

export function populateConfigurationService(): Rule {
    return (tree: Tree) => {
        const projectInfo = getProjectInfo(tree);

        const naeConfig = getNaeConfigurationString(tree);

        if (tree.exists(projectInfo.path + '/' + projectInfo.projectNameDasherized + '-configuration.service.ts')) {
            tree.delete(projectInfo.path + '/' + projectInfo.projectNameDasherized + '-configuration.service.ts');
        }

        return createFilesFromTemplates('./files', projectInfo.path as string, {
            classify: strings.classify,
            dasherize: strings.dasherize,
            project: projectInfo.projectName,
            configuration: naeConfig
        });

    };
}
