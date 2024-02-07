import {chain, Rule, Tree} from '@angular-devkit/schematics';
import {CreateViewArguments} from '../../models/create-view-arguments';
import {createFilesFromTemplates, createRelativePath, getProjectInfo} from '../../../../_utility/utility-functions';
import {ViewClassInfo} from '../../../../_commons/view-class-info';
import {strings} from '@angular-devkit/core';
import {getViewIdSegmentFromPath, updateAppModule} from '../../../_utility/view-utility-functions';
import {ImportToAdd} from '../../../../_commons/import-to-add';
import {addViewToViewService} from '../../../_utility/view-service-functions';

export function createTreeCaseView(tree: Tree, args: CreateViewArguments, addViewToService: boolean): Rule {
    const projectInfo = getProjectInfo(tree);
    const rules = [];
    const view = new ViewClassInfo(
        args.path,
        args.viewType,
        args.componentName
    );

    const filterId = args.layoutParams && args.layoutParams.filterId
        ? `'${args.layoutParams.filterId}'`
        : `''/* TODO put your root node filter id here */`;

    rules.push(createFilesFromTemplates('./views/tree-case-view/files', `${projectInfo.path}/views/${args.path}`, {
        prefix: projectInfo.projectPrefixDasherized,
        className: view.nameWithoutComponent,
        dasherize: strings.dasherize,
        classify: strings.classify,
        configName: projectInfo.projectNameClassified,
        configImportPath: createRelativePath(view.fileImportPath, `./${projectInfo.projectNameDasherized}-configuration.service`),
        filterId,
        viewIdSegment: getViewIdSegmentFromPath(args.path)
    }));

    updateAppModule(tree, view.className, view.fileImportPath, [
        new ImportToAdd('FlexModule', '@ngbracket/ngx-layout'),
        new ImportToAdd('MatProgressSpinnerModule', '@angular/material/progress-spinner'),
        new ImportToAdd('TreeCaseViewComponentModule', '@netgrif/components')
    ]);

    if (addViewToService) {
        addViewToViewService(tree, view);
    }
    return chain(rules);
}
