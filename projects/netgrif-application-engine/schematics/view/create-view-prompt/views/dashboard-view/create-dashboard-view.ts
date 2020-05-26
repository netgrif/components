import {Rule, Tree, chain} from '@angular-devkit/schematics';
import {strings} from '@angular-devkit/core';
import {createFilesFromTemplates, createRelativePath, getProjectInfo} from '../../../../_utility/utility-functions';
import {
    resolveClassSuffixForView,
    updateAppModule
} from '../../../_utility/view-utility-functions';
import {addViewToViewService} from '../../../_utility/view-service-functions';
import {ViewClassInfo} from '../../models/view-class-info';
import {ImportToAdd} from '../../models/import-to-add';
import {CreateViewArguments} from '../../models/create-view-arguments';


export function createDashboardView(tree: Tree, args: CreateViewArguments, addViewToService: boolean): Rule {
    const projectInfo = getProjectInfo(tree);
    const rules = [];
    const view = new ViewClassInfo(
        args.path as string,
        resolveClassSuffixForView(args.viewType as string),
        args.componentName);

    rules.push(createFilesFromTemplates('./views/dashboard-view/files', `${projectInfo.path}/views/${args.path}`, {
        prefix: projectInfo.projectPrefixDasherized,
        className: view.withoutComponent,
        webPath: args.path,
        dasherize: strings.dasherize,
        classify: strings.classify,
        configName: projectInfo.projectNameClassified,
        configImportPath: createRelativePath(view.fileImportPath, `./${projectInfo.projectNameDasherized}-configuration.service`)
    }));

    updateAppModule(tree, view.name, view.fileImportPath, [
        new ImportToAdd('DashboardModule', '@netgrif/application-engine'),
    ]);

    if (addViewToService) {
        addViewToViewService(tree, view);
    }
    return chain(rules);
}
