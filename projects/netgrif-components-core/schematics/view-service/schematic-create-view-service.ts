import {
    Rule,
    Tree,
} from '@angular-devkit/schematics';
import {
    commitChangesToFile,
    createFilesFromTemplates,
    getAppModule,
    getProjectInfo
} from '../_utility/utility-functions';
import {addProviderToModule} from '../_utility/modified-library-functions';
import {insertImport} from '@schematics/angular/utility/ast-utils';
import {strings} from '@angular-devkit/core';


export function schematicEntryPoint(): Rule {
    return (tree: Tree) => {
        const projectInfo = getProjectInfo(tree);
        const appModule = getAppModule(tree, projectInfo.path);

        const serviceClassName = `${projectInfo.projectNameClassified}ViewService`;
        const serviceFileName = `${projectInfo.projectNameDasherized}-view.service`;

        const changes = addProviderToModule(appModule.sourceFile, appModule.fileEntry.path,
            serviceClassName,
            `./${serviceFileName}`,
            `{provide: ViewService, useClass: ${serviceClassName}}`);
        changes.push(
            insertImport(appModule.sourceFile, appModule.fileEntry.path, 'ViewService', '@netgrif/components-core')
        );
        commitChangesToFile(tree, appModule.fileEntry, changes);

        return createFilesFromTemplates('./files', projectInfo.path, {
            classify: strings.classify,
            dasherize: strings.dasherize,
            project: projectInfo.projectName
        });
    };
}
