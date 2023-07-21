import {chain, Rule, Tree} from '@angular-devkit/schematics';
import {CreateViewArguments} from '../../models/create-view-arguments';
import {createFilesFromTemplates, createRelativePath, getProjectInfo} from '../../../../_utility/utility-functions';
import {ViewClassInfo} from '../../../../_commons/view-class-info';
import {strings} from '@angular-devkit/core';
import {updateAppModule} from '../../../_utility/view-utility-functions';
import {addViewToViewService} from '../../../_utility/view-service-functions';
import {ImportToAdd} from '../../../../_commons/import-to-add';

export function createWorkflowView(tree: Tree, args: CreateViewArguments, addViewToService: boolean): Rule {
    const projectInfo = getProjectInfo(tree);
    const rules = [];
    const view = new ViewClassInfo(
        args.path,
        args.viewType,
        args.componentName
    );
    const destinationPath = `${projectInfo.path}/views/${args.path}`;

    const templateParams = {
        prefix: projectInfo.projectPrefixDasherized,
        className: view.nameWithoutComponent,
        viewPath: args.path,
        dasherize: strings.dasherize,
        classify: strings.classify,
        configName: projectInfo.projectNameClassified,
        configImportPath: createRelativePath(view.fileImportPath, `./${projectInfo.projectNameDasherized}-configuration.service`),
        modulePath: createRelativePath(view.fileImportPath, './app.module'),
        showDeleteMenu: args.showDeleteMenu,
        confirmWorkflowDeletion: args.confirmWorkflowDeletion
    };

    rules.push(createFilesFromTemplates('./views/workflow-view/files', destinationPath, templateParams));
    updateAppModule(tree, view.className, view.fileImportPath, [
        new ImportToAdd('WorkflowViewComponentModule', '@netgrif/components')
    ]);

    if (addViewToService) {
        addViewToViewService(tree, view);
    }
    return chain(rules);
}
