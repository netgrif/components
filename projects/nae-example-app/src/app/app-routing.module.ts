import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from './doc/authentication/authentication.component';
import {DrawerExampleComponent} from './doc/drawer-example/drawer-example.component';
import {RailExampleComponent} from './doc/rail-example/rail-example.component';
import {CaseSidemenuExampleComponent} from './doc/case-sidemenu-example/case-sidemenu-example.component';
import {SidemenuExampleComponent} from './doc/sidemenu-example/sidemenu-example.component';
import {UserAssignSidemenuExampleComponent} from './doc/user-assign-sidemenu-example/user-assign-sidemenu-example.component';
import {CasePanelExampleComponent} from './doc/case-panel-example/case-panel-example.component';
import {SnackBarExampleComponent} from './doc/snack-bar-example/snack-bar-example.component';
import {DialogExampleComponent} from './doc/dialog-example/dialog-example.component';
import {TabViewExampleComponent} from './doc/tab-view-example/tab-view-example.component';
import {ReactiveTextFieldComponent} from './doc/reactive-text-field/reactive-text-field.component';
import {CaseHeaderExampleComponent} from './doc/case-header-example/case-header-example.component';
import {TaskHeaderExampleComponent} from './doc/task-header-example/task-header-example.component';
import {ToolbarExampleComponent} from './doc/toolbar-example/toolbar-example.component';
import {CaseViewComponent} from './doc/case-view/case-view.component';
import {TaskViewComponent} from './doc/task-view/task-view.component';
import {TabbedViewsExampleComponent} from './doc/tabbed-case-view/tabbed-views-example.component';
import {WorkflowsViewExampleComponent} from './doc/workflows-view-example/workflows-view-example.component';
import {CaseResourceExampleComponent} from './doc/case-resource-example/case-resource-example.component';
import {LoginCardComponent} from './doc/cards/login-card/login-card.component';
import {PasswordCardComponent} from './doc/cards/password-card/password-card.component';
import {RegisterCardComponent} from './doc/cards/register-card/register-card.component';

const routes: Routes = [
    {path: 'authentication', component: AuthenticationComponent},
    {path: 'login-card', component: LoginCardComponent},
    {path: 'pass-card', component: PasswordCardComponent},
    {path: 'reg-card', component: RegisterCardComponent},
    {path: 'drawer', component: DrawerExampleComponent},
    {path: 'rail', component: RailExampleComponent},
    {path: 'new-case-sidemenu', component: CaseSidemenuExampleComponent},
    {path: 'sidemenu', component: SidemenuExampleComponent},
    {path: 'user-assign-sidemenu', component: UserAssignSidemenuExampleComponent},
    {path: 'case-panel', component: CasePanelExampleComponent},
    {path: 'case-header', component: CaseHeaderExampleComponent},
    {path: 'task-header', component: TaskHeaderExampleComponent},
    {path: 'snack-bar', component: SnackBarExampleComponent},
    {path: 'dialog', component: DialogExampleComponent},
    {path: 'tab-view', component: TabViewExampleComponent},
    {path: 'case', component: CaseResourceExampleComponent},
    {path: 'reactive-forms', component: ReactiveTextFieldComponent},
    {path: 'toolbar', component: ToolbarExampleComponent},
    {path: 'task-view', component: TaskViewComponent},
    {path: 'case-view', component: CaseViewComponent},
    {path: 'tabbed-views', component: TabbedViewsExampleComponent},
    {path: 'workflows view', component: WorkflowsViewExampleComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
