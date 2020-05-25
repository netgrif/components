import {chain, Rule, Tree} from '@angular-devkit/schematics';
import {strings} from '@angular-devkit/core';
import {createFilesFromTemplates, createRelativePath, getProjectInfo} from '../../../../_utility/utility-functions';
import {
    resolveClassSuffixForView,
    updateAppModule
} from '../../../_utility/view-utility-functions';
import {addViewToViewService} from '../../../_utility/view-service-functions';
import {TabbedView} from '../../models/tabbed-view';
import {ViewClassInfo} from '../../models/view-class-info';
import {ImportToAdd} from '../../models/import-to-add';
import {CreateViewArguments} from '../../models/create-view-arguments';


export function createTaskView(tree: Tree, args: CreateViewArguments & TabbedView, addViewToService: boolean): Rule {
    const projectInfo = getProjectInfo(tree);
    const view = new ViewClassInfo(args.path as string, resolveClassSuffixForView(args.viewType as string));
    const rules = [];

    const templateParams = {
        prefix: projectInfo.projectPrefixDasherized,
        classNamePrefix: view.prefix,
        viewPath: args.path as string,
        dasherize: strings.dasherize,
        classify: strings.classify,
        configName: projectInfo.projectNameClassified,
        configImportPath: createRelativePath(view.fileImportPath, `./${projectInfo.projectNameDasherized}-configuration.service`)
    };

    const commonPathPrefix = './files/';
    const destinationPath = `${projectInfo.path}/views/${args.path}`;
    rules.push(createFilesFromTemplates(`${commonPathPrefix}common`, destinationPath, templateParams));
    if (!!args.isTabbed) {
        rules.push(createFilesFromTemplates(`${commonPathPrefix}tabbed`, destinationPath, templateParams));
    } else {
        rules.push(createFilesFromTemplates(`${commonPathPrefix}simple`, destinationPath, templateParams));
    }

    updateAppModule(tree, view.name, view.fileImportPath, [
        new ImportToAdd('FlexModule', '@angular/flex-layout'),
        new ImportToAdd('MaterialModule', '@netgrif/application-engine'),
        new ImportToAdd('PanelModule', '@netgrif/application-engine')
    ]);

    if (addViewToService) {
        addViewToViewService(tree, view);
    }
    return chain(rules);
}
