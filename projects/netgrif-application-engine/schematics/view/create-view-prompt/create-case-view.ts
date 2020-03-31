import {chain, Rule, Tree} from '@angular-devkit/schematics';
import {CreateViewArguments} from './schema';
import {commitChangesToFile, createFilesFromTemplates, getAppModule, getProjectInfo} from '../../utility-functions';
import {ClassName} from './classes/ClassName';
import {strings} from '@angular-devkit/core';
import {addRouteToRoutesJson, addRoutingModuleImport, updateAppModule} from '../view-utility-functions';
import {ImportToAdd} from './classes/ImportToAdd';
import {addEntryComponentToModule} from '@schematics/angular/utility/ast-utils';
import {TabbedView} from './tabbed-view';


export function createCaseView(tree: Tree, args: CreateViewArguments & TabbedView, addRoute: boolean): Rule {
    const projectInfo = getProjectInfo(tree);
    const className = new ClassName(args.path as string, 'CaseView');
    const rules = [];

    const templateParams = {
        prefix: projectInfo.projectPrefixDasherized,
        path: className.prefix,
        dasherize: strings.dasherize,
        classify: strings.classify
    };

    const commonPathPrefix = './files/case-view/';
    const destinationPath = `${projectInfo.path}/views/${args.path}`;
    rules.push(createFilesFromTemplates(`${commonPathPrefix}common`, destinationPath, templateParams));
    if (!!args.isTabbed) {
        rules.push(createFilesFromTemplates(`${commonPathPrefix}tabbed`, destinationPath, templateParams));
    } else {
        rules.push(createFilesFromTemplates(`${commonPathPrefix}simple`, destinationPath, templateParams));
    }

    updateAppModule(tree, className.name, className.fileImportPath, [
        new ImportToAdd('FlexModule', '@angular/flex-layout'),
        new ImportToAdd('FlexLayoutModule', '@angular/flex-layout'),
        new ImportToAdd('MaterialModule', '@netgrif/application-engine'),
        new ImportToAdd('HeaderModule', '@netgrif/application-engine'),
        new ImportToAdd('PanelModule', '@netgrif/application-engine')
    ]);

    const appModule = getAppModule(tree, projectInfo.path);
    const changes = addEntryComponentToModule(
        appModule.sourceFile,
        appModule.fileEntry.path,
        'NewCaseComponent',
        '@netgrif/application-engine'
    );
    commitChangesToFile(tree, appModule.fileEntry, changes);

    if (addRoute) {
        addRoutingModuleImport(tree, className.name, className.fileImportPath);
        rules.push(addRouteToRoutesJson(args.path as string, className.name));
    }
    return chain(rules);
}
