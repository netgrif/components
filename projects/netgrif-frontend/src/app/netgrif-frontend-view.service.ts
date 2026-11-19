import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ConfigurationService, LoggerService, ViewService} from '@netgrif/components-core';
import {LoginComponent} from './views/login/login.component';
import {SidenavComponent} from './views/side-nav/sidenav.component';
import {CasesViewComponent} from './views/side-nav/cases/cases-view.component';
import {SideNavTasksTaskViewComponent} from './views/side-nav/tasks/side-nav-tasks-task-view.component';
import {EmptyViewComponent} from './views/side-nav/emptyView/empty-view.component';
import {
    DashboardComponent,
    DefaultPublicResolverComponent,
    DefaultPublicTaskViewComponent,
    DefaultPublicWorkflowViewComponent,
    DefaultSimpleTaskViewComponent,
    DefaultSingleTaskViewComponent,
    DefaultProcessViewComponent,
    ProfileComponent,
    RoleAssignmentComponent,
    WorkflowViewComponent
} from '@netgrif/components';


@Injectable({
    providedIn: 'root'
})
export class NetgrifFrontendViewService extends ViewService {
    constructor(configurationService: ConfigurationService, router: Router, loggerService: LoggerService) {
        // Views referenced from nae.json (view `layout.componentName`) have to be registered here.
        super([{id: 'RoleAssignmentComponent', class: RoleAssignmentComponent},
            {id: 'WorkflowViewComponent', class: WorkflowViewComponent},
            {id: 'DashboardComponent', class: DashboardComponent},
            {id: 'EmptyViewComponent', class: EmptyViewComponent},
            {id: 'SideNavTasksTaskViewComponent', class: SideNavTasksTaskViewComponent},
            {id: 'CasesViewComponent', class: CasesViewComponent},
            {id: 'SidenavComponent', class: SidenavComponent},
            {id: 'LoginComponent', class: LoginComponent},
            {id: 'DefaultSimpleTaskViewComponent', class: DefaultSimpleTaskViewComponent},
            {id: 'PublicSingleTaskViewComponent', class: DefaultSingleTaskViewComponent},
            {id: 'PublicTaskViewComponent', class: DefaultPublicTaskViewComponent},
            {id: 'PublicWorkflowViewComponent', class: DefaultPublicWorkflowViewComponent},
            {id: 'PublicResolverComponent', class: DefaultPublicResolverComponent},
            {id: 'DefaultProcessViewComponent', class: DefaultProcessViewComponent},
            {id: 'ProfileComponent', class: ProfileComponent},
        ], configurationService, router, loggerService);
    }
}
