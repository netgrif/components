import {chain, Rule, Tree} from '@angular-devkit/schematics';
import {CreateViewArguments} from './schema';
import {createFilesFromTemplates, createRelativePath, getProjectInfo} from '../../_utility/utility-functions';
import {ViewClassInfo} from './models/ViewClassInfo';
import {strings} from '@angular-devkit/core';
import {
    resolveClassSuffixForView,
    updateAppModule
} from '../view-utility-functions';
import {ImportToAdd} from './models/ImportToAdd';


export function createLoginView(tree: Tree, args: CreateViewArguments): Rule {
    const projectInfo = getProjectInfo(tree);
    const rules = [];
    const className = new ViewClassInfo(args.path as string, resolveClassSuffixForView(args.viewType as string));

    rules.push(createFilesFromTemplates('./files/login', `${projectInfo.path}/views/${args.path}`, {
        prefix: projectInfo.projectPrefixDasherized,
        path: className.prefix,
        dasherize: strings.dasherize,
        classify: strings.classify,
        configName: projectInfo.projectNameClassified,
        configImportPath: createRelativePath(className.fileImportPath, `./${projectInfo.projectNameDasherized}-configuration.service`)
    }));

    updateAppModule(tree, className.name, className.fileImportPath, [
        new ImportToAdd('FlexModule', '@angular/flex-layout'),
        new ImportToAdd('LoginFormModule', '@netgrif/application-engine')]);

    // if (addRoute) {
    //     addRoutingModuleImport(tree, className.name, className.fileImportPath);
    //     rules.push(addRouteToRoutesJson(args.path as string, className.name, args.access));
    //     addAuthGuardImport(tree, args.access);
    // }
    return chain(rules);
}
