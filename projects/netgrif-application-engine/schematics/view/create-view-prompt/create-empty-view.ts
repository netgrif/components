import {chain, Rule, Tree} from '@angular-devkit/schematics';
import {CreateViewArguments} from './schema';
import {createFilesFromTemplates, getProjectInfo} from '../../utility-functions';
import {ClassName} from './classes/ClassName';
import {
    addAuthGuardImport,
    addRouteToRoutesJson,
    addRoutingModuleImport,
    resolveClassSuffixForView, updateAppModule
} from '../view-utility-functions';
import {strings} from '@angular-devkit/core';


export function createEmptyView(tree: Tree, args: CreateViewArguments, addRoute: boolean): Rule {
    const projectInfo = getProjectInfo(tree);
    const className = new ClassName(args.path as string, resolveClassSuffixForView(args.viewType as string));
    const rules = [];

    rules.push(createFilesFromTemplates('./files/empty-view', `${projectInfo.path}/views/${args.path}`, {
        prefix: projectInfo.projectPrefixDasherized,
        path: className.prefix,
        dasherize: strings.dasherize,
        classify: strings.classify
    }));
    updateAppModule(tree, className.name, className.fileImportPath, []);

    if (addRoute) {
        addRoutingModuleImport(tree, className.name, className.fileImportPath);
        rules.push(addRouteToRoutesJson(args.path as string, className.name, args.access));
        addAuthGuardImport(tree, args.access);
    }
    return chain(rules);
}
