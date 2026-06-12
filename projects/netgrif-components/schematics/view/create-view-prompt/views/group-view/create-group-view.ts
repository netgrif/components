import {chain, Rule, Tree} from '@angular-devkit/schematics';
import {strings} from '@angular-devkit/core';
import {createFilesFromTemplates, createRelativePath, getProjectInfo} from '../../../../_utility/utility-functions';
import {getViewIdSegmentFromPath, updateAppModule} from '../../../_utility/view-utility-functions';
import {addViewToViewService} from '../../../_utility/view-service-functions';
import {TabbedView} from '../../models/tabbed-view';
import {ViewClassInfo} from '../../../../_commons/view-class-info';
import {ImportToAdd} from '../../../../_commons/import-to-add';
import {CreateViewArguments} from '../../models/create-view-arguments';


export function createGroupView(tree: Tree, args: CreateViewArguments & TabbedView, addViewToService: boolean): Rule {
    const projectInfo = getProjectInfo(tree);
    const view = new ViewClassInfo(
        args.path,
        args.viewType,
        args.componentName);
    const rules = [];

    rules.push(createFilesFromTemplates('./views/group-view/files/', `${projectInfo.path}/views/${args.path}`, {
        prefix: projectInfo.projectPrefixDasherized,
        className: view.nameWithoutComponent,
        viewPath: args.path,
        dasherize: strings.dasherize,
        classify: strings.classify,
        configName: projectInfo.projectNameClassified,
        configImportPath: createRelativePath(view.fileImportPath, `./${projectInfo.projectNameDasherized}-configuration.service`),
        viewIdSegment: getViewIdSegmentFromPath(args.path)
    }));

    updateAppModule(tree, view.className, view.fileImportPath, [
        new ImportToAdd('FlexModule', '@ngbracket/ngx-layout'),
        new ImportToAdd('MaterialModule', '@netgrif/components-core'),
        new ImportToAdd('PanelComponentModule', '@netgrif/components'),
        new ImportToAdd('SearchComponentModule', '@netgrif/components')
    ]);

    if (addViewToService) {
        addViewToViewService(tree, view);
    }
    return chain(rules);
}
