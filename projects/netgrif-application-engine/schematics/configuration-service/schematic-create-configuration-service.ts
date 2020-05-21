import {
    Rule,
    SchematicsException,
    Tree,
} from '@angular-devkit/schematics';
import {strings} from '@angular-devkit/core';
import {insertImport} from '@schematics/angular/utility/ast-utils';
import {addProviderToModule} from '../modified-library-functions';
import {
    commitChangesToFile,
    createFilesFromTemplates,
    createRelativePath,
    getAppModule,
    getProjectInfo
} from '../utility-functions';


export function schematicEntryPoint(): Rule {
    return (tree: Tree) => {
        const projectInfo = getProjectInfo(tree);
        const appModule = getAppModule(tree, projectInfo.path);

        const configClassName = `${projectInfo.projectNameClassified}ConfigurationService`;
        const configFileName = `${projectInfo.projectNameDasherized}-configuration.service`;
        const configPathFromRoot = `${projectInfo.path}/${configFileName}`;

        const changes = addProviderToModule(appModule.sourceFile, appModule.fileEntry.path,
            configClassName,
            `./${configFileName}`,
            `{provide: ConfigurationService, useClass: ${configClassName}}`);
        changes.push(
            insertImport(appModule.sourceFile, appModule.fileEntry.path, 'ConfigurationService', '@netgrif/application-engine')
        );
        commitChangesToFile(tree, appModule.fileEntry, changes);

        const tsconfigString = tree.read('./tsconfig.json');
        if (!tsconfigString) {
            throw new SchematicsException('Missing \'tsconfig.json\'');
        }
        const tsconfigContents = JSON.parse(tsconfigString.toString());
        if (!tsconfigContents.compilerOptions) {
            tsconfigContents.compilerOptions = {resolveJsonModule: true};
        } else {
            tsconfigContents.compilerOptions.resolveJsonModule = true;
        }
        tree.overwrite('./tsconfig.json', JSON.stringify(tsconfigContents, null, 4));

        return createFilesFromTemplates('./files', projectInfo.path as string, {
            classify: strings.classify,
            dasherize: strings.dasherize,
            project: projectInfo.projectName,
            configPath: createRelativePath(configPathFromRoot, 'nae.json')
        });
    };
}
