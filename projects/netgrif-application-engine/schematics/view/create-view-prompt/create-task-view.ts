import {chain, Rule, Tree} from '@angular-devkit/schematics';
import {CreateViewArguments} from './schema';
import {createFilesFromTemplates, getProjectInfo} from '../../utility-functions';
import {ClassName} from './classes/ClassName';
import {strings} from '@angular-devkit/core';
import {addRouteToRoutesJson, addRoutingModuleImport, updateAppModule} from '../view-utility-functions';
import {ImportToAdd} from './classes/ImportToAdd';
import {TabbedView} from './tabbed-view';


export function createTaskView(tree: Tree, args: CreateViewArguments & TabbedView, addRoute: boolean): Rule {
    const projectInfo = getProjectInfo(tree);
    const rules = [];
    const className = new ClassName(args.path as string, 'TaskView');

    const templateParams = {
        prefix: projectInfo.projectPrefixDasherized,
        path: className.prefix,
        dasherize: strings.dasherize,
        classify: strings.classify
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
        new ImportToAdd('PanelModule', '@netgrif/application-engine'),
        new ImportToAdd('CardModule', '@netgrif/application-engine')]);
    if (addRoute) {
        addRoutingModuleImport(tree, className.name, className.fileImportPath);
        rules.push( addRouteToRoutesJson(args.path as string, className.name));
    }
    return chain(rules);
}
