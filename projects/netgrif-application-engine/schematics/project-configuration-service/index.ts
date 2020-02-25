import {
    Rule, Tree, SchematicsException,
    apply, url, applyTemplates, move,
    chain, mergeWith
} from '@angular-devkit/schematics';

import { getProjectInfo } from "../utilityFunctions";
import { strings, normalize } from '@angular-devkit/core';

export function projectConfigurationService(): Rule {
    return (tree: Tree) => {
        const projectInfo = getProjectInfo(tree);
        const naeConfig = getNaeConfiguration(tree);

        const templateSource = apply(url('./files'), [
            applyTemplates({
                classify: strings.classify,
                dasherize: strings.dasherize,
                project: projectInfo.projectName,
                configuration: naeConfig
            }),
            move(normalize(projectInfo.path as string))
        ]);

        return chain([
            mergeWith(templateSource)
        ]);
    };
}

function getNaeConfiguration(tree: Tree): string {
    const naeConfig = tree.read('/nae.json');
    if (!naeConfig) {
        throw new SchematicsException('Could not find Netgrif Application Engine workspace configuration');
    }

    return naeConfig.toString();
}
