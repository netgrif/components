import {
    chain,
    Rule,
    Tree,
    schematic, SchematicsException
} from '@angular-devkit/schematics';
import {createChangesRecorder, fileEntryToTsSource, getProjectInfo} from "../utilityFunctions";
import { addProviderToModule } from '../modifiedLibraryFunctions';
import {insertImport} from "@schematics/angular/utility/ast-utils";

export function initializeConfigurationService(): Rule {
    return (tree: Tree) => {
        const projectInfo = getProjectInfo(tree);

        const appModule = tree.get(`${projectInfo.path}/app.module.ts`);
        if (!appModule) {
            throw new SchematicsException('Could not find application Module. Missing \'app.module.ts\'.');
        }

        const appModuleSourceFile = fileEntryToTsSource(appModule);

        const changes = addProviderToModule(appModuleSourceFile, appModule.path,
            `${projectInfo.projectNameClassified}ConfigurationService`,
            `./${projectInfo.projectNameDasherized}-configuration.service`,
            `{provide: ConfigurationService, useClass: ${projectInfo.projectNameClassified}ConfigurationService}`);

        changes.push( insertImport(appModuleSourceFile, appModule.path, 'ConfigurationService', '@netgrif/application-engine') );

        const changesRecorder = createChangesRecorder(tree, appModule, changes);

        tree.commitUpdate(changesRecorder);

        return chain([
            schematic('create-configuration-service', {}),
        ]);
    };
}
