import {
    chain,
    Rule,
    Tree,
    schematic, SchematicsException
} from '@angular-devkit/schematics';
import {createChangesRecorder, fileEntryToTsSource, getAppModule, getProjectInfo} from '../../utilityFunctions';
import { addProviderToModule } from '../../modifiedLibraryFunctions';
import {insertImport} from "@schematics/angular/utility/ast-utils";

export function initializeConfigurationService(): Rule {
    return (tree: Tree) => {
        const projectInfo = getProjectInfo(tree);
        const appModule = getAppModule(tree, projectInfo.path);

        const changes = addProviderToModule(appModule.sourceFile, appModule.fileEntry.path,
            `${projectInfo.projectNameClassified}ConfigurationService`,
            `./${projectInfo.projectNameDasherized}-configuration.service`,
            `{provide: ConfigurationService, useClass: ${projectInfo.projectNameClassified}ConfigurationService}`);

        changes.push( insertImport(appModule.sourceFile, appModule.fileEntry.path, 'ConfigurationService', '@netgrif/application-engine') );

        const changesRecorder = createChangesRecorder(tree, appModule.fileEntry, changes);

        tree.commitUpdate(changesRecorder);

        return chain([
            schematic('create-configuration-service', {}),
        ]);
    };
}
