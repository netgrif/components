import {
    chain,
    Rule, schematic,
    SchematicsException,
    Tree
} from '@angular-devkit/schematics';
import {addViewToNaeJson} from '../_utility/add-view-to-nae-json';
import {getParentPath, parentViewDefined} from '../_utility/view-utility-functions';
import {createLoginView} from './views/login/create-login-view';
import {createTabView} from './views/tab-view/create-tab-view';
import {createTaskView} from './views/task-view/create-task-view';
import {createCaseView} from './views/case-view/create-case-view';
import {createSidenavOrToolbarView} from './views/sidenav-toolbar-view/create-sidenav-or-toolbar-view';
import {createEmptyView} from './views/empty-view/create-empty-view';
import {createDashboardView} from './views/dashboard-view/create-dashboard-view';
import {checkJsonParamsForSidenav} from './schematic-create-sidenav-prompt';
import {CreateViewArguments} from './models/create-view-arguments';
import {addViewToViewService} from '../_utility/view-service-functions';
import {ImportToAdd} from '../../_commons/import-to-add';
import {createTreeCaseView} from './views/tree-case-view/create-tree-case-view';
import {createGroupView} from './views/group-view/create-group-view';
import {createWorkflowView} from './views/workflow-view/create-workflow-view';
import {createRoleAssignmentView} from './views/role-assignment-view/role-assignment-view';
import {createPublicTaskView} from './views/public-task-view/create-public-task-view';
import {createPublicWorkflowView} from './views/public-workflow-view/create-public-workflow-view';
import {createPublicSingleTaskView} from './views/public-single-task-view/create-public-single-task-view';
import {createPublicResolverView} from './views/public-resolver-view/create-public-resolver-view';

export function schematicEntryPoint(schematicArguments: CreateViewArguments): Rule {
    return (tree: Tree) => {
        checkPathValidity(tree, schematicArguments.path);
        return createView(tree, schematicArguments);
    };
}

function checkPathValidity(tree: Tree, path: string | undefined) {
    if (path === undefined) {
        throw new SchematicsException(`View path cannot be undefined!`);
    }
    if (!parentViewDefined(tree, path)) {
        throw new SchematicsException(`Parent view doesn't exist! Create a view with '${getParentPath(path)}' path first.`);
    }
}

function createView(tree: Tree, args: CreateViewArguments, addViewToService: boolean = true): Rule {
    const rules = [];
    switch (args.viewType) {
        case 'login':
            rules.push(createLoginView(tree, args, addViewToService));
            break;
        case 'tabView':
            rules.push(createTabView(tree, args, addViewToService, createViewRef));
            break;
        case 'taskView':
            rules.push(createTaskView(tree, args, addViewToService));
            break;
        case 'publicTaskView':
            rules.push(createPublicTaskView(tree, args, addViewToService));
            break;
        case 'publicSingleTaskView':
            rules.push(createPublicSingleTaskView(tree, args, addViewToService));
            break;
        case 'publicWorkflowView':
            rules.push(createPublicWorkflowView(tree, args, addViewToService));
            break;
        case 'publicResolverView':
            rules.push(createPublicResolverView(tree, args, addViewToService));
            break;
        case 'caseView':
            rules.push(createCaseView(tree, args, addViewToService));
            break;
        case 'emptyView':
            rules.push(createEmptyView(tree, args, addViewToService));
            break;
        case 'dashboard':
            rules.push(createDashboardView(tree, args, addViewToService));
            break;
        case 'groupView':
            rules.push(createGroupView(tree, args, addViewToService));
            break;
        case 'treeCaseView':
            rules.push(createTreeCaseView(tree, args, addViewToService));
            break;
        case 'toolbarView':
            rules.push(createSidenavOrToolbarView(tree, {
                createViewArguments: args,
                addViewToService
            }));
            break;
        case 'sidenavView':
        case 'sidenavAndToolbarView':
            rules.push(schematic('create-sidenav-prompt', checkJsonParamsForSidenav(args, addViewToService)
            ));
            // we want to add the route AFTER we get the data from the schematic
            addViewToService = false;
            break;
        case 'customView':
            if (!args.componentName || !args.customImportPath) {
                throw new SchematicsException(`Custom components must define both a 'class' and a 'from' attribute! Path: '${args.path}'`);
            }
            addViewToViewService(tree, new ImportToAdd(args.componentName, args.customImportPath));
            break;
        case 'workflowView':
            rules.push(createWorkflowView(tree, args, addViewToService));
            break;
        case 'roleAssignmentView':
            rules.push(createRoleAssignmentView(tree, args, addViewToService));
            break;
        default:
            throw new SchematicsException(`Unknown view type '${args.viewType}'`);
    }
    if (addViewToService) {
        rules.push(addViewToNaeJson(args));
    }
    return chain(rules);
}

const createViewRef: (tree: Tree, args: CreateViewArguments, addRoute?: boolean) => Rule = createView;
