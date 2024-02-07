import {chain, Rule, Tree} from '@angular-devkit/schematics';
import {strings} from '@angular-devkit/core';
import { createFilesFromTemplates, createRelativePath, getProjectInfo } from '../../../../_utility/utility-functions';
import {updateAppModule} from '../../../_utility/view-utility-functions';
import {addViewToViewService} from '../../../_utility/view-service-functions';
import {TabbedView} from '../../models/tabbed-view';
import {ViewClassInfo} from '../../../../_commons/view-class-info';
import {ImportToAdd} from '../../../../_commons/import-to-add';
import {CreateTaskViewArguments} from '../../models/create-task-view-arguments';


export function createPublicWorkflowView(tree: Tree, args: CreateTaskViewArguments & TabbedView, addViewToService: boolean): Rule {
    const projectInfo = getProjectInfo(tree);
    const view = new ViewClassInfo(
        args.path,
        args.viewType,
        args.componentName);
    const rules = [];

    const templateParams = {
        prefix: projectInfo.projectPrefixDasherized,
        className: view.nameWithoutComponent,
        dasherize: strings.dasherize,
        classify: strings.classify,
        configName: projectInfo.projectNameClassified,
        configImportPath: createRelativePath(view.fileImportPath, `./${projectInfo.projectNameDasherized}-configuration.service`),
        isDefaultTabbedTaskView: !!args.isDefaultTabbedTaskView
    };

    const commonPathPrefix = './views/public-workflow-view/files/';
    const destinationPath = `${projectInfo.path}/views/${args.path}`;
    rules.push(createFilesFromTemplates(`${commonPathPrefix}common`, destinationPath, templateParams));

    updateAppModule(tree, view.className, view.fileImportPath, [
        new ImportToAdd('FlexModule', '@ngbracket/ngx-layout'),
        new ImportToAdd('MaterialModule', '@netgrif/components-core'),
        new ImportToAdd('PanelComponentModule', '@netgrif/components'),
        new ImportToAdd('SearchComponentModule', '@netgrif/components'),
        new ImportToAdd('WorkflowViewComponentModule', '@netgrif/components'),
        new ImportToAdd('HeaderComponentModule', '@netgrif/components')

    ]);

    if (addViewToService) {
        addViewToViewService(tree, view);
    }
    return chain(rules);
}
