import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ConfigurationService, LoggerService, ViewService} from '@netgrif/components-core';
import {AuthenticationComponent} from './doc/authentication/authentication.component';
import {LoginFormComponent} from './doc/forms/login-form/login-form.component';
import {PasswordFormComponent} from './doc/forms/email-form/password-form.component';
import {RegisterFormComponent} from './doc/forms/register-form/register-form.component';
import {DrawerExampleComponent} from './doc/drawer-example/drawer-example.component';
import {RailExampleComponent} from './doc/rail-example/rail-example.component';
import {HeadersComponent} from './doc/headers/headers.component';
import {SidemenuExampleComponent} from './doc/sidemenu-example/sidemenu-example.component';
import {SnackBarExampleComponent} from './doc/snack-bar-example/snack-bar-example.component';
import {DialogExampleComponent} from './doc/dialog-example/dialog-example.component';
import {TabViewExampleComponent} from './doc/tab-view-example/tab-view-example.component';
import {ToolbarExampleComponent} from './doc/toolbar-example/toolbar-example.component';
import {PanelsComponent} from './doc/panels/panels.component';
import {TaskViewComponent} from './doc/task-view/task-view.component';
import {CaseViewComponent} from './doc/case-view/case-view.component';
import {TabbedViewsExampleComponent} from './doc/tabbed-case-view/tabbed-views-example.component';
import {WorkflowViewExampleComponent} from './doc/workflow-view-example/workflow-view-example.component';
import {DashboardExampleComponent} from './doc/dashboard-example/dashboard-example.component';
import {FilterRepositoryExampleComponent} from './doc/filter-repository-example/filter-repository-example.component';
import {ProfileComponent} from './doc/profile/profile.component';
import {NavigationExampleComponent} from './doc/navigation-example/navigation-example.component';
import {ButtonsNavComponent} from './doc/navigation-example/buttons-nav/buttons-nav.component';
import {RolesAssignComponent} from './doc/roles-assign/roles-assign.component';
import {LdapGroupRolesAssignComponent} from './doc/ldap-group-roles-assign/ldap-group-roles-assign.component';
import {TreeViewExampleComponent} from './doc/tree-view-example/tree-view-example.component';
import {UserInviteComponent} from './doc/user-invite/user-invite.component';
import {ResetPasswordFormComponent} from './doc/forms/reset-password-form/reset-password-form.component';
import {PublicTaskViewComponent} from './doc/public-task-view/public-task-view.component';
import {PublicWorkflowViewComponent} from './doc/public-workflow-view/public-workflow-view.component';
import {PublicResolverComponent} from './doc/public-resolver/public-resolver.component';
import {GroupViewComponent} from './doc/group-view/group-view.component';
import {TitleConfigComponent} from './doc/demo-title-config/title-config.component';
import {ExampleRedirectComponent} from './doc/redirect/example-redirect.component';
import {ActiveGroupComponent} from './doc/active-group/active-group.component';
import {WrapperEmptyViewComponent} from './views/wrapper/wrapper-empty-view.component';
import {DoubleDrawerExampleComponent} from './doc/double-drawer-example/double-drawer-example.component';
import {PublicSingleTaskViewComponent} from './doc/public-single-task-view/public-single-task-view.component';
import {BreadcrumbsExampleComponent} from './doc/breadcrumbs-example/breadcrumbs-example.component';
import {DashboardCaseExampleComponent} from './doc/dashboard-case-example/dashboard-case-example.component';
import {ImpersonationDemoComponent} from './doc/impersonation-demo/impersonation-demo.component';
import {ChangePasswordComponent} from "./doc/forms/change-password/change-password.component";

@Injectable({
    providedIn: 'root'
})
export class NaeExampleAppViewService extends ViewService {
    constructor(configurationService: ConfigurationService, router: Router, loggerService: LoggerService) {
        // This class is managed by schematics. Do not modify it by hand.
        // If you want to add views to the application run the 'create-view' schematic.
        super([
            {id: 'ImpersonationDemoComponent', class: ImpersonationDemoComponent},
            {id: 'BreadcrumbsExampleComponent', class: BreadcrumbsExampleComponent},
            {id: 'TitleConfigComponent', class: TitleConfigComponent},
            {id: 'PublicSingleTaskViewComponent', class: PublicSingleTaskViewComponent},
            {id: 'WrapperEmptyViewComponent', class: WrapperEmptyViewComponent},
            {id: 'ActiveGroupComponent', class: ActiveGroupComponent},
            {id: 'ExampleRedirectComponent', class: ExampleRedirectComponent},
            {id: 'GroupViewComponent', class: GroupViewComponent},
            {id: 'UserInviteComponent', class: UserInviteComponent},
            {id: 'TreeViewExampleComponent', class: TreeViewExampleComponent},
            {id: 'ButtonsNavComponent', class: ButtonsNavComponent},
            {id: 'ChangePasswordComponent', class: ChangePasswordComponent},
            {id: 'NavigationExampleComponent', class: NavigationExampleComponent},
            {id: 'ProfileComponent', class: ProfileComponent},
            {id: 'FilterRepositoryExampleComponent', class: FilterRepositoryExampleComponent},
            {id: 'DashboardExampleComponent', class: DashboardExampleComponent},
            {id: 'DashboardCaseExampleComponent', class: DashboardCaseExampleComponent},
            {id: 'WorkflowViewExampleComponent', class: WorkflowViewExampleComponent},
            {id: 'TabbedViewsExampleComponent', class: TabbedViewsExampleComponent},
            {id: 'CaseViewComponent', class: CaseViewComponent},
            {id: 'TaskViewComponent', class: TaskViewComponent},
            {id: 'PanelsComponent', class: PanelsComponent},
            {id: 'ToolbarExampleComponent', class: ToolbarExampleComponent},
            {id: 'TabViewExampleComponent', class: TabViewExampleComponent},
            {id: 'DialogExampleComponent', class: DialogExampleComponent},
            {id: 'SnackBarExampleComponent', class: SnackBarExampleComponent},
            {id: 'SidemenuExampleComponent', class: SidemenuExampleComponent},
            {id: 'HeadersComponent', class: HeadersComponent},
            {id: 'RailExampleComponent', class: RailExampleComponent},
            {id: 'DrawerExampleComponent', class: DrawerExampleComponent},
            {id: 'DoubleDrawerExampleComponent', class: DoubleDrawerExampleComponent},
            {id: 'RegisterFormComponent', class: RegisterFormComponent},
            {id: 'PasswordFormComponent', class: PasswordFormComponent},
            {id: 'LoginFormComponent', class: LoginFormComponent},
            {id: 'AuthenticationComponent', class: AuthenticationComponent},
            {id: 'RolesAssignComponent', class: RolesAssignComponent},
            {id: 'LdapGroupRolesAssignComponent', class: LdapGroupRolesAssignComponent},
            {id: 'PublicTaskViewComponent', class: PublicTaskViewComponent},
            {id: 'PublicWorkflowViewComponent', class: PublicWorkflowViewComponent},
            {id: 'PublicResolverComponent', class: PublicResolverComponent},
            {
                id: 'ResetPasswordFormComponent',
                class: ResetPasswordFormComponent
            }], configurationService, router, loggerService);
    }
}
