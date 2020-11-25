import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ViewService, ConfigurationService, LoggerService} from '@netgrif/application-engine';
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
import {ReactiveTextFieldComponent} from './doc/reactive-text-field/reactive-text-field.component';
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
import {TreeViewExampleComponent} from './doc/tree-view-example/tree-view-example.component';
import {UserInviteComponent} from './doc/user-invite/user-invite.component';
import { GroupViewGroupViewComponent } from './views/group-view/group-view-group-view.component';
import {ResetPasswordFormComponent} from './doc/forms/reset-password-form/reset-password-form.component';

@Injectable({
    providedIn: 'root'
})
export class NaeExampleAppViewService extends ViewService {
    constructor(configurationService: ConfigurationService, router: Router, loggerService: LoggerService) {
        // This class is managed by schematics. Do not modify it by hand.
        // If you want to add views to the application run the 'create-view' schematic.
        super([
            UserInviteComponent,
            TreeViewExampleComponent,
            ButtonsNavComponent,
            NavigationExampleComponent,
            ProfileComponent,
            FilterRepositoryExampleComponent,
            DashboardExampleComponent,
            WorkflowViewExampleComponent,
            TabbedViewsExampleComponent,
            CaseViewComponent,
            TaskViewComponent,
            PanelsComponent,
            ToolbarExampleComponent,
            ReactiveTextFieldComponent,
            TabViewExampleComponent,
            DialogExampleComponent,
            SnackBarExampleComponent,
            SidemenuExampleComponent,
            HeadersComponent,
            RailExampleComponent,
            DrawerExampleComponent,
            RegisterFormComponent,
            PasswordFormComponent,
            LoginFormComponent,
            AuthenticationComponent,
            RolesAssignComponent,
            ResetPasswordFormComponent], configurationService, router, loggerService);
    }
}
