import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OverviewComponent} from './demos/overview/overview.component';
import {DataFieldDemoComponent} from './demos/data-field/data-field-demo.component';
import {SnackBarDemoComponent} from './demos/snack-bar/snack-bar-demo.component';
import {DialogDemoComponent} from './demos/dialog/dialog-demo.component';
import {DialogsDemoComponent} from './demos/dialog/dialogs-demo.component';
import {AccountDemoComponent} from './demos/account/account-demos';
import {
    AdvancedSearchDemoComponent,
    BuilderViewDemoComponent,
    CaseViewDemoComponent,
    TabbedViewDemoComponent,
    TaskViewDemoComponent,
} from './demos/views/view-demos';
import {
    BreadcrumbsDemoComponent,
    DashboardDemoComponent,
    NavigationDemoComponent,
    NavigationHomeComponent,
    NavigationItemComponent,
    SingleTaskDemoComponent,
} from './demos/views/navigation-demos';
import {
    ProfileDemoComponent,
    RoleAssignmentDemoComponent,
    LdapRoleAssignmentDemoComponent,
    TicketViewDemoComponent,
    UserInviteDemoComponent,
} from './demos/views/user-admin-demos';

const routes: Routes = [
    {path: '', component: OverviewComponent, title: 'Netgrif components playground'},
    {path: 'fields/:type', component: DataFieldDemoComponent},
    {path: 'feedback/snack-bar', component: SnackBarDemoComponent},
    {path: 'feedback/dialog', redirectTo: 'dialogs/basic'},
    {path: 'dialogs/basic', component: DialogDemoComponent, title: 'Dialogs'},
    {path: 'dialogs/:id', component: DialogsDemoComponent, title: 'Dialogs'},
    {path: 'views/cases', component: CaseViewDemoComponent, title: 'Case view'},
    {path: 'views/search', component: AdvancedSearchDemoComponent, title: 'Advanced search'},
    {path: 'views/tasks', component: TaskViewDemoComponent, title: 'Task view'},
    {path: 'views/tabbed', component: TabbedViewDemoComponent, title: 'Tabbed views'},
    {path: 'views/single-task', component: SingleTaskDemoComponent, title: 'Single task view'},
    {path: 'views/builder', component: BuilderViewDemoComponent, title: 'Process view'},
    {path: 'views/dashboard', component: DashboardDemoComponent, title: 'Dashboard'},
    {path: 'views/tickets', component: TicketViewDemoComponent, title: 'Ticket view'},
    {path: 'account/:form', component: AccountDemoComponent, title: 'Account'},
    {path: 'user/profile', component: ProfileDemoComponent, title: 'User profile'},
    {path: 'admin/roles', component: RoleAssignmentDemoComponent, title: 'Role assignment'},
    {path: 'admin/ldap-roles', component: LdapRoleAssignmentDemoComponent, title: 'LDAP group role assignment'},
    {path: 'admin/invite', component: UserInviteDemoComponent, title: 'User invite'},
    {
        path: 'views/navigation', component: NavigationDemoComponent, title: 'Navigation double drawer', children: [
            {path: '', component: NavigationHomeComponent},
            // menu item routes: services.groupNavigation.groupNavigationRoute + base64 id of the menu item case;
            // the parameter name is GroupNavigationConstants.GROUP_NAVIGATION_ROUTER_PARAM (breadcrumbs read it)
            {path: 'item/:itemCaseId', component: NavigationItemComponent},
        ],
    },
    {path: 'views/breadcrumbs', component: BreadcrumbsDemoComponent, title: 'Breadcrumbs'},
    {path: 'views/breadcrumbs/:itemCaseId', component: BreadcrumbsDemoComponent, title: 'Breadcrumbs'},
    {path: '**', redirectTo: ''},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {bindToComponentInputs: false})],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
