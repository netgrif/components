import {ImportToAdd} from './import-to-add';
import {classify, dasherize} from './angular-cli-devkit-core-strings';
import {SchematicsException} from '@angular-devkit/schematics';

// TODO 28.5.2020 find a better way of handling common files between lib and schematics

export class ViewClassInfo extends ImportToAdd {

    /**
     * for `caseView` located at route `cases/all/` this is equal to `cases-all`
     */
    public prefix: string;
    /**
     * for `caseView` located at route `cases/all/` this is equal to `CasesAllCaseView`
     */
    public nameWithoutComponent: string;
    /**
     * for `caseView` located at route `cases/all/` this is equal to `CasesAllCaseViewComponent`
     */
    public className: string;
    /**
     * for `caseView` located at route `cases/all/` this is equal to `./views/cases/all/cases-all-case-view.component`
     */
    public fileImportPath: string;

    constructor(path: string, viewType: string, customComponentName?: string) {
        super('', '');
        if (!customComponentName) {
            this.prefix = ViewClassInfo.convertPathToClassNamePrefix(path);
            const classSuffix = ViewClassInfo.resolveClassSuffixForView(viewType);
            this.nameWithoutComponent = `${classify(this.prefix)}${classSuffix}`;
            this.fileImportPath = `./views/${path}/${dasherize(this.nameWithoutComponent)}.component`;
        } else {
            this.prefix = '';
            this.nameWithoutComponent = classify(customComponentName);
            this.fileImportPath = `./views/${path}/${dasherize(customComponentName)}.component`;
        }
        this.className = `${this.nameWithoutComponent}Component`;
    }

    private static convertPathToClassNamePrefix(path: string): string {
        const regexDash = /-/g;
        return path.replace(regexDash, '_').replace(/\//g, '-').toLocaleLowerCase();
    }

    private static resolveClassSuffixForView(view: string): string {
        switch (view) {
            case 'login':
                return 'Login';
            case 'tabView':
                return 'TabView';
            case 'taskView':
                return 'TaskView';
            case 'caseView':
                return 'CaseView';
            case 'emptyView':
                return 'EmptyView';
            case 'sidenavView':
                return 'SidenavView';
            case 'toolbarView':
                return 'ToolbarView';
            case 'sidenavAndToolbarView':
                return 'SidenavAndToolbarView';
            case 'dashboard':
                return 'Dashboard';
            case 'groupView':
                return 'GroupView';
            case 'treeCaseView':
                return 'TreeCaseView';
            case 'workflowView':
                return 'WorkflowView';
            case 'roleAssignmentView':
                return 'RoleAssignmentView';
            default:
                throw new SchematicsException(`Unknown view type '${view}'`);
        }
    }
}
