import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from './doc/services/authentication/authentication.component';
import {CaseSidemenuExampleComponent} from './doc/case-sidemenu-example/case-sidemenu-example.component';
import {SidemenuExampleComponent} from './doc/sidemenu-example/sidemenu-example.component';
import {UserAssignSidemenuExampleComponent} from './doc/user-assign-sidemenu-example/user-assign-sidemenu-example.component';
import {PanelExampleComponent} from './doc/panel-example/panel-example.component';
import {CasePanelExampleComponent} from './doc/case-panel-example/case-panel-example.component';
import {SnackBarExampleComponent} from './doc/snack-bar-example/snack-bar-example.component';
import {DialogExampleComponent} from './doc/dialog-example/dialog-example.component';
import {TabViewExampleComponent} from './doc/tab-view-example/tab-view-example.component';
import {ReactiveTextFieldComponent} from './doc/reactive-text-field/reactive-text-field.component';
import {CaseHeaderExampleComponent} from './doc/case-header-example/case-header-example.component';
import {TaskHeaderExampleComponent} from './doc/task-header-example/task-header-example.component';
import {ToolbarExampleComponent} from './doc/toolbar-example/toolbar-example.component';
import {CaseResourceExampleComponent} from './doc/case-resource-example/case-resource-example.component';
import {TaskResourceExampleComponent} from './doc/task-resource-example/task-resource-example.component';
import { TasksTaskViewComponent } from './views/tasks/tasks-task-view.component';

const routes: Routes = [
    {path: 'authentication', component: AuthenticationComponent},
    {path: 'new-case-sidemenu', component: CaseSidemenuExampleComponent},
    {path: 'sidemenu', component: SidemenuExampleComponent},
    {path: 'user-assign-sidemenu', component: UserAssignSidemenuExampleComponent},
    {path: 'panel', component: PanelExampleComponent},
    {path: 'case-panel', component: CasePanelExampleComponent},
    {path: 'case-header', component: CaseHeaderExampleComponent},
    {path: 'task-header', component: TaskHeaderExampleComponent},
    {path: 'snack-bar', component: SnackBarExampleComponent},
    {path: 'dialog', component: DialogExampleComponent},
    {path: 'tab-view', component: TabViewExampleComponent},
    {path: 'reactive-forms', component: ReactiveTextFieldComponent},
    {path: 'case', component: CaseResourceExampleComponent},
    {path: 'task', component: TaskResourceExampleComponent},
    {path: 'reactive-forms', component: ReactiveTextFieldComponent},
    {path: 'toolbar', component: ToolbarExampleComponent},
    {path: 'task-select', component: TasksTaskViewComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
