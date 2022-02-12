import {chain, Rule, Tree} from '@angular-devkit/schematics';
import {createFilesFromTemplates, createRelativePath, getProjectInfo} from '../../../../_utility/utility-functions';
import {strings} from '@angular-devkit/core';
import {getViewIdSegmentFromPath, updateAppModule} from '../../../_utility/view-utility-functions';
import {addViewToViewService} from '../../../_utility/view-service-functions';
import {ViewClassInfo} from '../../../../_commons/view-class-info';
import {ImportToAdd} from '../../../../_commons/import-to-add';
import {CreateViewArguments} from '../../models/create-view-arguments';


export function createLoginView(tree: Tree, args: CreateViewArguments, addViewToService: boolean): Rule {
    const projectInfo = getProjectInfo(tree);
    const rules = [];
    const view = new ViewClassInfo(
        args.path,
        args.viewType,
        args.componentName
    );

    rules.push(createFilesFromTemplates('./views/login/files', `${projectInfo.path}/views/${args.path}`, {
        prefix: projectInfo.projectPrefixDasherized,
        className: view.nameWithoutComponent,
        dasherize: strings.dasherize,
        classify: strings.classify,
        configName: projectInfo.projectNameClassified,
        configImportPath: createRelativePath(view.fileImportPath, `./${projectInfo.projectNameDasherized}-configuration.service`),
        viewIdSegment: getViewIdSegmentFromPath(args.path)
    }));

    updateAppModule(tree, view.className, view.fileImportPath, [
        new ImportToAdd('FlexModule', '@angular/flex-layout'),
        new ImportToAdd('LoginFormComponentModule', '@netgrif/components'),
        new ImportToAdd('AuthenticationComponentModule', '@netgrif/components'),
        new ImportToAdd('AuthenticationModule', '@netgrif/components-core')]);

    if (addViewToService) {
        addViewToViewService(tree, view);
    }
    return chain(rules);
}
