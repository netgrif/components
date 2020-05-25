import {chain, Rule, Tree} from '@angular-devkit/schematics';
import {CreateViewArguments} from './schema';
import {
    commitChangesToFile,
    createFilesFromTemplates,
    createRelativePath,
    getAppModule,
    getProjectInfo
} from '../../_utility/utility-functions';
import {strings} from '@angular-devkit/core';
import {
    addViewToViewService,
    resolveClassSuffixForView,
    updateAppModule
} from '../view-utility-functions';
import {addEntryComponentToModule} from '@schematics/angular/utility/ast-utils';
import {TabbedView} from './models/tabbed-view';
import {ViewClassInfo} from './models/view-class-info';
import {ImportToAdd} from './models/import-to-add';


export function createCaseView(tree: Tree, args: CreateViewArguments & TabbedView, addViewToService: boolean): Rule {
    const projectInfo = getProjectInfo(tree);
    const view = new ViewClassInfo(args.path as string, resolveClassSuffixForView(args.viewType as string));
    const rules = [];
    const destinationPath = `${projectInfo.path}/views/${args.path}`;

    const templateParams = {
        prefix: projectInfo.projectPrefixDasherized,
        classNamePrefix: view.prefix,
        viewPath: args.path as string,
        dasherize: strings.dasherize,
        classify: strings.classify,
        configName: projectInfo.projectNameClassified,
        configImportPath: createRelativePath(view.fileImportPath, `./${projectInfo.projectNameDasherized}-configuration.service`)
    };

    const commonPathPrefix = './files/case-view/';
    rules.push(createFilesFromTemplates(`${commonPathPrefix}common`, destinationPath, templateParams));
    if (!!args.isTabbed) {
        rules.push(createFilesFromTemplates(`${commonPathPrefix}tabbed`, destinationPath, templateParams));
    } else {
        rules.push(createFilesFromTemplates(`${commonPathPrefix}simple`, destinationPath, templateParams));
    }

    updateAppModule(tree, view.name, view.fileImportPath, [
        new ImportToAdd('FlexModule', '@angular/flex-layout'),
        new ImportToAdd('FlexLayoutModule', '@angular/flex-layout'),
        new ImportToAdd('MaterialModule', '@netgrif/application-engine'),
        new ImportToAdd('HeaderModule', '@netgrif/application-engine'),
        new ImportToAdd('PanelModule', '@netgrif/application-engine'),
        new ImportToAdd('CaseViewModule', '@netgrif/application-engine')
    ]);

    const appModule = getAppModule(tree, projectInfo.path);
    const changes = addEntryComponentToModule(
        appModule.sourceFile,
        appModule.fileEntry.path,
        'NewCaseComponent',
        '@netgrif/application-engine'
    );
    commitChangesToFile(tree, appModule.fileEntry, changes);

    if (addViewToService) {
        addViewToViewService(tree, view);
    }
    return chain(rules);
}
