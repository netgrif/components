import {apply, applyTemplates, chain, mergeWith, move, Rule, Tree, url} from '@angular-devkit/schematics';
import {normalize, strings} from '@angular-devkit/core';
import {getNaeConfigurationString, getProjectInfo} from '../utilityFunctions';

export function createConfigurationService(): Rule {
    return (tree: Tree) => {
        const projectInfo = getProjectInfo(tree);

        const naeConfig = getNaeConfigurationString(tree);

        if (tree.exists(projectInfo.path + '/' + projectInfo.projectNameDasherized + '-configuration.service.ts')) {
            tree.delete(projectInfo.path + '/' + projectInfo.projectNameDasherized + '-configuration.service.ts');
        }


        const templateSource = apply(url('./files'), [
            applyTemplates({
                classify: strings.classify,
                dasherize: strings.dasherize,
                project: projectInfo.projectName,
                configuration: naeConfig
            }),
            move(normalize(projectInfo.path)),
        ]);

        return chain([
            mergeWith(templateSource)
        ]);
    };
}
