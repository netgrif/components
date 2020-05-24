import {chain, Rule, Tree} from '@angular-devkit/schematics';
import {CreateViewArguments} from './schema';
import {createFilesFromTemplates, createRelativePath, getProjectInfo} from '../../utility-functions';
import {ClassName} from './classes/ClassName';
import {strings} from '@angular-devkit/core';
import {
    addAuthGuardImport,
    addRouteToRoutesJson,
    addRoutingModuleImport,
    resolveClassSuffixForView,
    updateAppModule
} from '../view-utility-functions';
import {ImportToAdd} from './classes/ImportToAdd';
import {TabbedView} from './tabbed-view';


export function createTaskView(tree: Tree, args: CreateViewArguments & TabbedView, addRoute: boolean): Rule {
    const projectInfo = getProjectInfo(tree);
    const className = new ClassName(args.path as string, resolveClassSuffixForView(args.viewType as string));
    const rules = [];

    const templateParams = {
        prefix: projectInfo.projectPrefixDasherized,
        classNamePrefix: className.prefix,
        viewPath: args.path as string,
        dasherize: strings.dasherize,
        classify: strings.classify,
        configName: projectInfo.projectNameClassified,
        configImportPath: createRelativePath(className.fileImportPath, `./${projectInfo.projectNameDasherized}-configuration.service`)
    };

    const commonPathPrefix = './files/task-view/';
    const destinationPath = `${projectInfo.path}/views/${args.path}`;
    rules.push(createFilesFromTemplates(`${commonPathPrefix}common`, destinationPath, templateParams));
    if (!!args.isTabbed) {
        rules.push(createFilesFromTemplates(`${commonPathPrefix}tabbed`, destinationPath, templateParams));
    } else {
        rules.push(createFilesFromTemplates(`${commonPathPrefix}simple`, destinationPath, templateParams));
    }

    updateAppModule(tree, className.name, className.fileImportPath, [
        new ImportToAdd('FlexModule', '@angular/flex-layout'),
        new ImportToAdd('MaterialModule', '@netgrif/application-engine'),
        new ImportToAdd('PanelModule', '@netgrif/application-engine')
    ]);

    if (addRoute) {
        addRoutingModuleImport(tree, className.name, className.fileImportPath);
        rules.push( addRouteToRoutesJson(args.path as string, className.name, args.access));
        addAuthGuardImport(tree, args.access);
    }
    return chain(rules);
}
