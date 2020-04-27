
import {
    chain,
    Rule,
    Tree,
    schematic
} from '@angular-devkit/schematics';
import {commitChangesToFile, getAppModule, getProjectInfo} from '../../utility-functions';
import { addProviderToModule } from '../../modified-library-functions';
import {insertImport} from '@schematics/angular/utility/ast-utils';

export function initializeConfigurationService(): Rule {
    return (tree: Tree) => {
        const projectInfo = getProjectInfo(tree);
        const appModule = getAppModule(tree, projectInfo.path);

        const changes = addProviderToModule(appModule.sourceFile, appModule.fileEntry.path,
            `${projectInfo.projectNameClassified}ConfigurationService`,
            `./${projectInfo.projectNameDasherized}-configuration.service`,
            `{provide: ConfigurationService, useClass: ${projectInfo.projectNameClassified}ConfigurationService}`);

        changes.push( insertImport(appModule.sourceFile, appModule.fileEntry.path, 'ConfigurationService', '@netgrif/application-engine') );

        commitChangesToFile(tree, appModule.fileEntry, changes);

        return chain([
            schematic('populate-configuration-service', {}),
        ]);
    };
}
