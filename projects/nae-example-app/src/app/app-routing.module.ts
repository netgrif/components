import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from './doc/authentication/authentication.component';
import {DrawerExampleComponent} from './doc/drawer-example/drawer-example.component';
import {RailExampleComponent} from './doc/rail-example/rail-example.component';
import {SidemenuExampleComponent} from './doc/sidemenu-example/sidemenu-example.component';
import {SnackBarExampleComponent} from './doc/snack-bar-example/snack-bar-example.component';
import {DialogExampleComponent} from './doc/dialog-example/dialog-example.component';
import {TabViewExampleComponent} from './doc/tab-view-example/tab-view-example.component';
import {ReactiveTextFieldComponent} from './doc/reactive-text-field/reactive-text-field.component';
import {ToolbarExampleComponent} from './doc/toolbar-example/toolbar-example.component';
import {CaseViewComponent} from './doc/case-view/case-view.component';
import {TaskViewComponent} from './doc/task-view/task-view.component';
import {TabbedViewsExampleComponent} from './doc/tabbed-case-view/tabbed-views-example.component';
import {WorkflowViewExampleComponent} from './doc/workflow-view-example/workflow-view-example.component';
import {LoginFormComponent} from './doc/forms/login-form/login-form.component';
import {PasswordFormComponent} from './doc/forms/password-form/password-form.component';
import {RegisterFormComponent} from './doc/forms/register-form/register-form.component';
import {HeadersComponent} from './doc/headers/headers.component';
import {PanelsComponent} from './doc/panels/panels.component';
import {DashboardExampleComponent} from './doc/dashboard-example/dashboard-example.component';
import {FilterRepositoryExampleComponent} from './doc/filter-repository-example/filter-repository-example.component';
import {ProfileComponent} from './doc/profile/profile.component';
import {NavigationExampleComponent} from './doc/navigation-example/navigation-example.component';
import {ButtonsNavComponent} from './doc/navigation-example/buttons-nav/buttons-nav.component';
import {RolesAssignComponent} from './doc/roles-assign/roles-assign.component';

const routes: Routes = [
    {path: 'roles', component: RolesAssignComponent},
    {path: 'authentication', component: AuthenticationComponent},
    {path: 'login', component: LoginFormComponent},
    {path: 'reset-password', component: PasswordFormComponent},
    {path: 'registration', component: RegisterFormComponent},
    {path: 'drawer', component: DrawerExampleComponent},
    {path: 'rail', component: RailExampleComponent},
    {path: 'headers', component: HeadersComponent},
    {path: 'sidemenu', component: SidemenuExampleComponent},
    {path: 'snack-bar', component: SnackBarExampleComponent},
    {path: 'dialog', component: DialogExampleComponent},
    {path: 'tab-view', component: TabViewExampleComponent},
    {path: 'reactive-forms', component: ReactiveTextFieldComponent},
    {path: 'toolbar', component: ToolbarExampleComponent},
    {path: 'panels', component: PanelsComponent},
    {path: 'task-view', component: TaskViewComponent},
    {path: 'case-view', component: CaseViewComponent},
    {path: 'tabbed-views', component: TabbedViewsExampleComponent},
    {path: 'workflow-view', component: WorkflowViewExampleComponent},
    {path: 'dashboard-view', component: DashboardExampleComponent},
    {path: 'filter-repository', component: FilterRepositoryExampleComponent},
    {path: 'profile', component: ProfileComponent},
    {
        path: 'navigation-test', component: NavigationExampleComponent, children: [
            {
                path: 'one', component: ButtonsNavComponent, children: [
                    {path: 'one-one', component: ButtonsNavComponent},
                    {path: 'one-two', component: ButtonsNavComponent}
                ]
            },
            {
                path: 'two', component: ButtonsNavComponent, children: [
                    {path: 'two-one', component: ButtonsNavComponent},
                    {path: 'two-two', component: ButtonsNavComponent}
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
