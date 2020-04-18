import {Rule, Tree, chain} from '@angular-devkit/schematics';
import {CreateViewArguments} from './schema';
import {createFilesFromTemplates, getProjectInfo} from '../../utility-functions';
import {ClassName} from './classes/ClassName';
import {
    addAuthGuardImport,
    addRouteToRoutesJson,
    addRoutingModuleImport,
    resolveClassSuffixForView,
    updateAppModule
} from '../view-utility-functions';
import {strings} from '@angular-devkit/core';
import {ImportToAdd} from './classes/ImportToAdd';


export function createDashboardView(tree: Tree, args: CreateViewArguments, addRoute: boolean): Rule {
    const projectInfo = getProjectInfo(tree);
    const rules = [];
    const className = new ClassName(args.path as string, resolveClassSuffixForView(args.viewType as string));

    rules.push(createFilesFromTemplates('./files/dashboard-view', `${projectInfo.path}/views/${args.path}`, {
        prefix: projectInfo.projectPrefixDasherized,
        path: className.prefix,
        webPath: args.path,
        dasherize: strings.dasherize,
        classify: strings.classify
    }));

    updateAppModule(tree, className.name, className.fileImportPath, [
        new ImportToAdd('DashboardModule', '@netgrif/application-engine'),
    ]);

    if (addRoute) {
        addRoutingModuleImport(tree, className.name, className.fileImportPath);
        rules.push(addRouteToRoutesJson(args.path as string, className.name, args.access));
        addAuthGuardImport(tree, args.access);
    }
    return chain(rules);
}
