import {chain, Rule, Tree} from '@angular-devkit/schematics';
import {createFilesFromTemplates, createRelativePath, getProjectInfo} from '../../utility-functions';
import {ClassName} from './classes/ClassName';
import {
    addAuthGuardImport,
    addRouteToRoutesJson,
    addRoutingModuleImport,
    resolveClassSuffixForView, updateAppModule
} from '../view-utility-functions';
import {strings} from '@angular-devkit/core';
import {SidenavPromptOptions} from './files/sidenav-toolbar-files/sidenav-prompt-options';
import {addViewToNaeJson} from './add-view-to-nae-json';


export function createSidenavOrToolbarView(tree: Tree, sidenavOptions: SidenavPromptOptions): Rule {
    const projectInfo = getProjectInfo(tree);
    const className = new ClassName(sidenavOptions.createViewArguments.path as string,
        resolveClassSuffixForView(sidenavOptions.createViewArguments.viewType as string));
    let drawerType = '<nae-navigation-drawer';
    checkTypeOfSideNav();
    const rules = [];
    let isSideNav = false;
    let isToolbar = false;
    let nameOfComponent = '';

    checkArgsToCreateAppropriateView();

    rules.push(createFilesFromTemplates('./files/sidenav-toolbar-view',
        `${projectInfo.path}/views/${sidenavOptions.createViewArguments.path}`, {
            prefix: projectInfo.projectPrefixDasherized,
            path: className.prefix,
            dasherize: strings.dasherize,
            classify: strings.classify,
            viewType: strings.dasherize(nameOfComponent),
            isSideNav,
            isToolbar,
            drawerType,
            fileName: resolveClassSuffixForView(sidenavOptions.createViewArguments.viewType as string),
            configName: projectInfo.projectNameClassified,
            configImportPath: createRelativePath(className.fileImportPath, `./${projectInfo.projectNameDasherized}-configuration.service`)
        }));
    updateAppModule(tree, className.name, className.fileImportPath, []);

    if (sidenavOptions.addRoute) {
        addRoutingModuleImport(tree, className.name, className.fileImportPath);
        rules.push(addRouteToRoutesJson(sidenavOptions.createViewArguments.path as string,
            className.name, sidenavOptions.createViewArguments.access));
        addAuthGuardImport(tree, sidenavOptions.createViewArguments.access);
    }
    if (sidenavOptions.addRoute) {
        sidenavOptions.createViewArguments.layoutParams = {
            user: sidenavOptions.user,
            quickPanel: sidenavOptions.quickPanel,
            navigation: sidenavOptions.navigation,
        };
        rules.push(addViewToNaeJson(sidenavOptions.createViewArguments));
    }


    return chain(rules);

    function checkArgsToCreateAppropriateView() {
        switch (sidenavOptions.createViewArguments.viewType) {
            case 'sidenavView':
                isSideNav = true;
                nameOfComponent = 'sidenav-view';
                break;
            case 'toolbarView':
                isToolbar = true;
                nameOfComponent = 'toolbar-view';
                break;
            case 'sidenavAndToolbarView':
                isToolbar = true;
                isSideNav = true;
                nameOfComponent = 'sidenav-and-toolbar-view';
                break;
            default:
        }
    }

    function checkTypeOfSideNav(): void {
        if (sidenavOptions.user === undefined || sidenavOptions.quickPanel === undefined || sidenavOptions.navigation === undefined) {
            drawerType += '>';
            return;
        }
        if (sidenavOptions.user)
            drawerType += ' user="true"';
        if (sidenavOptions.quickPanel)
            drawerType += ' quickPanel="true"';
        if (sidenavOptions.navigation)
            drawerType += ' navigation="true"';
        drawerType += '>';
    }
}

