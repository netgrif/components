import {chain, Rule, Tree} from '@angular-devkit/schematics';
import {strings} from '@angular-devkit/core';
import {
    createFilesFromTemplates,
    createRelativePath,
    getProjectInfo
} from '../../../../_utility/utility-functions';
import {getViewIdSegmentFromPath, updateAppModule} from '../../../_utility/view-utility-functions';
import {addViewToViewService} from '../../../_utility/view-service-functions';
import {TabbedView} from '../../models/tabbed-view';
import {ViewClassInfo} from '../../../../_commons/view-class-info';
import {ImportToAdd} from '../../../../_commons/import-to-add';
import {CreateViewArguments} from '../../models/create-view-arguments';


export function createCaseView(tree: Tree, args: CreateViewArguments & TabbedView, addViewToService: boolean): Rule {
    const projectInfo = getProjectInfo(tree);
    const view = new ViewClassInfo(
        args.path,
        args.viewType,
        args.componentName);
    const rules = [];
    const destinationPath = `${projectInfo.path}/views/${args.path}`;

    const templateParams = {
        prefix: projectInfo.projectPrefixDasherized,
        className: view.nameWithoutComponent,
        viewPath: args.path,
        dasherize: strings.dasherize,
        classify: strings.classify,
        configName: projectInfo.projectNameClassified,
        configImportPath: createRelativePath(view.fileImportPath, `./${projectInfo.projectNameDasherized}-configuration.service`),
        caseCreationConfig: {
            enableCaseTitle: args.enableCaseTitle === undefined ? true : args.enableCaseTitle,
            isCaseTitleRequired: args.isCaseTitleRequired === undefined ? false : args.isCaseTitleRequired
        }
    };

    const commonPathPrefix = './views/case-view/files/';
    rules.push(createFilesFromTemplates(`${commonPathPrefix}common`, destinationPath, templateParams));
    if (!!args.isTabbed) {
        rules.push(createFilesFromTemplates(`${commonPathPrefix}tabbed`, destinationPath, templateParams));
    } else {
        Object.assign(templateParams, {viewIdSegment: getViewIdSegmentFromPath(args.path)});
        rules.push(createFilesFromTemplates(`${commonPathPrefix}simple`, destinationPath, templateParams));
    }

    updateAppModule(tree, view.className, view.fileImportPath, [
        new ImportToAdd('FlexModule', '@angular/flex-layout'),
        new ImportToAdd('FlexLayoutModule', '@angular/flex-layout'),
        new ImportToAdd('MaterialModule', '@netgrif/components-core'),
        new ImportToAdd('HeaderComponentModule', '@netgrif/components'),
        new ImportToAdd('PanelComponentModule', '@netgrif/components'),
        new ImportToAdd('CaseViewComponentModule', '@netgrif/components'),
        new ImportToAdd('SearchComponentModule', '@netgrif/components')
    ]);

    if (addViewToService) {
        addViewToViewService(tree, view);
    }
    return chain(rules);
}
