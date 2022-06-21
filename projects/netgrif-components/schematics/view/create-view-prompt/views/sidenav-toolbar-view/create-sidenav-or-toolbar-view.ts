import {chain, Rule, Tree} from '@angular-devkit/schematics';
import {strings} from '@angular-devkit/core';
import {createFilesFromTemplates, createRelativePath, getProjectInfo} from '../../../../_utility/utility-functions';
import {getViewIdSegmentFromPath, updateAppModule} from '../../../_utility/view-utility-functions';
import {addViewToViewService} from '../../../_utility/view-service-functions';
import {SidenavPromptOptions} from '../../models/sidenav-prompt-options';
import {addViewToNaeJson} from '../../../_utility/add-view-to-nae-json';
import {ViewClassInfo} from '../../../../_commons/view-class-info';
import {ImportToAdd} from '../../../../_commons/import-to-add';


export function createSidenavOrToolbarView(tree: Tree, sidenavOptions: SidenavPromptOptions): Rule {
    const projectInfo = getProjectInfo(tree);
    const view = new ViewClassInfo(
        sidenavOptions.createViewArguments.path,
        sidenavOptions.createViewArguments.viewType,
        sidenavOptions.createViewArguments.componentName
    );
    let drawerType = '<nc-navigation-drawer';
    checkTypeOfSideNav();
    const rules = [];
    let isSideNav = false;
    let isToolbar = false;
    let nameOfComponent = '';

    checkArgsToCreateAppropriateView();

    rules.push(createFilesFromTemplates('./views/sidenav-toolbar-view/files',
        `${projectInfo.path}/views/${sidenavOptions.createViewArguments.path}`, {
            prefix: projectInfo.projectPrefixDasherized,
            className: view.nameWithoutComponent,
            dasherize: strings.dasherize,
            classify: strings.classify,
            viewType: strings.dasherize(nameOfComponent),
            isSideNav,
            isToolbar,
            drawerType,
            configName: projectInfo.projectNameClassified,
            configImportPath: createRelativePath(view.fileImportPath, `./${projectInfo.projectNameDasherized}-configuration.service`),
            viewIdSegment: getViewIdSegmentFromPath(sidenavOptions.createViewArguments.path)
        }));
    updateAppModule(tree, view.className, view.fileImportPath, [
        new ImportToAdd('ToolbarComponentModule', '@netgrif/components'),
        new ImportToAdd('NavigationComponentModule', '@netgrif/components')
    ]);

    if (sidenavOptions.addViewToService) {
        addViewToViewService(tree, view);
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
            drawerType += ' [user]="true"';
        if (sidenavOptions.quickPanel)
            drawerType += ' [quickPanel]="true"';
        if (sidenavOptions.navigation)
            drawerType += ' [navigation]="true"';
        drawerType += '>';
    }
}

