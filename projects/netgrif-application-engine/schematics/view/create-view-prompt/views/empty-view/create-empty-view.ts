import {chain, Rule, Tree} from '@angular-devkit/schematics';
import {createFilesFromTemplates, getProjectInfo} from '../../../../_utility/utility-functions';
import {ViewClassInfo} from '../../models/view-class-info';
import {
    addViewToViewService,
    resolveClassSuffixForView,
    updateAppModule
} from '../../../_utility/view-utility-functions';
import {strings} from '@angular-devkit/core';
import {CreateViewArguments} from '../../models/create-view-arguments';


export function createEmptyView(tree: Tree, args: CreateViewArguments, addViewToService: boolean): Rule {
    const projectInfo = getProjectInfo(tree);
    const className = new ViewClassInfo(args.path as string, resolveClassSuffixForView(args.viewType as string));
    const rules = [];

    rules.push(createFilesFromTemplates('./files', `${projectInfo.path}/views/${args.path}`, {
        prefix: projectInfo.projectPrefixDasherized,
        path: className.prefix,
        dasherize: strings.dasherize,
        classify: strings.classify
    }));
    updateAppModule(tree, className.name, className.fileImportPath, []);

    if (addViewToService) {
        addViewToViewService(tree, className);
    }
    return chain(rules);
}
