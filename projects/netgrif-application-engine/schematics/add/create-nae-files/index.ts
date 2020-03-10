import {
    chain,
    Rule,
    Tree,
    schematic
} from '@angular-devkit/schematics';
import {commitChangesToFile, createFilesFromTemplates, getAppModule, getProjectInfo} from '../../utilityFunctions';
import {addImportToModule} from '@schematics/angular/utility/ast-utils';

export function createNaeFiles(): Rule {
    return () => {
        return chain([
            createRoutesModule(),
            schematic('initialize-configuration-service', {}),
            schematic('custom-templates', {})
        ]);
    };
}

function createRoutesModule(): Rule {
    return (tree: Tree) => {
        const projectInfo = getProjectInfo(tree);
        const appModule = getAppModule(tree, projectInfo.path);
        commitChangesToFile(tree, appModule.fileEntry,
            addImportToModule(appModule.sourceFile, appModule.fileEntry.path, 'AppRoutingModule', './app-routing.module')
        );
        return createFilesFromTemplates('./files', projectInfo.path);
    }
}
