import {chain, Rule, Tree} from '@angular-devkit/schematics';
import {CreateViewArguments} from './schema';
import {createFilesFromTemplates, getProjectInfo} from '../../utility-functions';
import {ClassName} from './classes/ClassName';
import {strings} from '@angular-devkit/core';
import {addRouteToRoutesJson, addRoutingModuleImport, updateAppModule} from '../view-utility-functions';
import {ImportToAdd} from './classes/ImportToAdd';


export function createTaskView(tree: Tree, args: CreateViewArguments, addRoute: boolean): Rule {
    const projectInfo = getProjectInfo(tree);
    const rules = [];
    const className = new ClassName(args.path as string, 'TaskView');

    rules.push(createFilesFromTemplates('./files/task-view', `${projectInfo.path}/views/${args.path}`, {
        prefix: projectInfo.projectPrefixDasherized,
        path: className.prefix,
        dasherize: strings.dasherize,
        classify: strings.classify
    }));

    updateAppModule(tree, className.name, className.fileImportPath, [
        new ImportToAdd('FlexModule', '@angular/flex-layout'),
        new ImportToAdd('MaterialModule', '@netgrif/application-engine'),
        new ImportToAdd('PanelModule', '@netgrif/application-engine'),
        new ImportToAdd('TaskListModule', '@netgrif/application-engine'),
        new ImportToAdd('CardModule', '@netgrif/application-engine')]);
    if (addRoute) {
        addRoutingModuleImport(tree, className.name, className.fileImportPath);
        rules.push( addRouteToRoutesJson(args.path as string, className.name));
    }
    return chain(rules);
}
