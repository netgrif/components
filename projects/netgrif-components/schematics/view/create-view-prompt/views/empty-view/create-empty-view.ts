import {chain, Rule, Tree} from '@angular-devkit/schematics';
import {strings} from '@angular-devkit/core';
import {createFilesFromTemplates, getProjectInfo} from '../../../../_utility/utility-functions';
import {ViewClassInfo} from '../../../../_commons/view-class-info';
import {getViewIdSegmentFromPath, updateAppModule} from '../../../_utility/view-utility-functions';
import {addViewToViewService} from '../../../_utility/view-service-functions';
import {CreateViewArguments} from '../../models/create-view-arguments';


export function createEmptyView(tree: Tree, args: CreateViewArguments, addViewToService: boolean): Rule {
    const projectInfo = getProjectInfo(tree);
    const view = new ViewClassInfo(
        args.path,
        args.viewType,
        args.componentName);
    const rules = [];

    rules.push(createFilesFromTemplates('./views/empty-view/files', `${projectInfo.path}/views/${args.path}`, {
        prefix: projectInfo.projectPrefixDasherized,
        className: view.nameWithoutComponent,
        dasherize: strings.dasherize,
        classify: strings.classify,
        viewIdSegment: getViewIdSegmentFromPath(args.path)
    }));
    updateAppModule(tree, view.className, view.fileImportPath, []);

    if (addViewToService) {
        addViewToViewService(tree, view);
    }
    return chain(rules);
}
