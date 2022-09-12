import {Rule, Tree, chain} from '@angular-devkit/schematics';
import {strings} from '@angular-devkit/core';
import {createFilesFromTemplates, createRelativePath, getProjectInfo} from '../../../../_utility/utility-functions';
import {getViewIdSegmentFromPath, updateAppModule} from '../../../_utility/view-utility-functions';
import {addViewToViewService} from '../../../_utility/view-service-functions';
import {ViewClassInfo} from '../../../../_commons/view-class-info';
import {ImportToAdd} from '../../../../_commons/import-to-add';
import {CreateViewArguments} from '../../models/create-view-arguments';


export function createDashboardView(tree: Tree, args: CreateViewArguments, addViewToService: boolean): Rule {
    const projectInfo = getProjectInfo(tree);
    const rules = [];
    const view = new ViewClassInfo(
        args.path,
        args.viewType,
        args.componentName);

    rules.push(createFilesFromTemplates('./views/dashboard-view/files', `${projectInfo.path}/views/${args.path}`, {
        prefix: projectInfo.projectPrefixDasherized,
        className: view.nameWithoutComponent,
        webPath: args.path,
        dasherize: strings.dasherize,
        classify: strings.classify,
        configName: projectInfo.projectNameClassified,
        configImportPath: createRelativePath(view.fileImportPath, `./${projectInfo.projectNameDasherized}-configuration.service`),
        viewIdSegment: getViewIdSegmentFromPath(args.path)
    }));

    updateAppModule(tree, view.className, view.fileImportPath, [
        new ImportToAdd('DashboardComponentModule', '@netgrif/components'),
        new ImportToAdd('PieChartModule', '@swimlane/ngx-charts')
    ]);

    if (addViewToService) {
        addViewToViewService(tree, view);
    }
    return chain(rules);
}
