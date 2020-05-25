import {Rule, Tree, chain} from '@angular-devkit/schematics';
import {CreateViewArguments} from './schema';
import {createFilesFromTemplates, createRelativePath, getProjectInfo} from '../../_utility/utility-functions';
import {
    addViewToViewService,
    resolveClassSuffixForView,
    updateAppModule
} from '../view-utility-functions';
import {strings} from '@angular-devkit/core';
import {ViewClassInfo} from './models/view-class-info';
import {ImportToAdd} from './models/import-to-add';


export function createDashboardView(tree: Tree, args: CreateViewArguments, addViewToService: boolean): Rule {
    const projectInfo = getProjectInfo(tree);
    const rules = [];
    const className = new ViewClassInfo(args.path as string, resolveClassSuffixForView(args.viewType as string));

    rules.push(createFilesFromTemplates('./files/dashboard-view', `${projectInfo.path}/views/${args.path}`, {
        prefix: projectInfo.projectPrefixDasherized,
        path: className.prefix,
        webPath: args.path,
        dasherize: strings.dasherize,
        classify: strings.classify,
        configName: projectInfo.projectNameClassified,
        configImportPath: createRelativePath(className.fileImportPath, `./${projectInfo.projectNameDasherized}-configuration.service`)
    }));

    updateAppModule(tree, className.name, className.fileImportPath, [
        new ImportToAdd('DashboardModule', '@netgrif/application-engine'),
    ]);

    if (addViewToService) {
        addViewToViewService(tree, className);
    }
    return chain(rules);
}
