import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {
    AuthenticationModule,
    ConfigurationService,
    DialogModule,
    MaterialModule,
    NAE_ASYNC_RENDERING_CONFIGURATION,
    ResourceProvider,
    TranslateLibModule,
    ViewService
} from '@netgrif/components-core';
import {
    AuthenticationComponentModule,
    BuilderModule,
    CaseViewComponentModule,
    DialogComponentsModule,
    HeaderComponentModule,
    LoginFormComponentModule,
    NavigationComponentModule,
    PanelComponentModule,
    ProfileComponentModule,
    SearchComponentModule,
    TabsComponentModule,
    provideNaeMaterialDefaults
} from '@netgrif/components';
import {NetgrifFrontendConfigurationService} from './netgrif-frontend-configuration.service';
import {NetgrifFrontendViewService} from './netgrif-frontend-view.service';
import {LoginComponent} from './views/login/login.component';
import {SidenavComponent} from './views/side-nav/sidenav.component';
import {CasesViewComponent} from './views/side-nav/cases/cases-view.component';
import {SideNavCasesCaseViewComponent} from './views/side-nav/cases/case-list/side-nav-cases-case-view.component';
import {SideNavCaseTasksTaskViewComponent} from './views/side-nav/cases/case-tasks/side-nav-case-tasks-task-view.component';
import {SideNavTasksTaskViewComponent} from './views/side-nav/tasks/side-nav-tasks-task-view.component';
import {EmptyViewComponent} from './views/side-nav/emptyView/empty-view.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SidenavComponent,
        CasesViewComponent,
        SideNavCasesCaseViewComponent,
        SideNavCaseTasksTaskViewComponent,
        SideNavTasksTaskViewComponent,
        EmptyViewComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        TranslateLibModule,
        AuthenticationModule,
        AuthenticationComponentModule,
        LoginFormComponentModule,
        NavigationComponentModule,
        HeaderComponentModule,
        PanelComponentModule,
        CaseViewComponentModule,
        SearchComponentModule,
        TabsComponentModule,
        ProfileComponentModule,
        // the process view (DefaultProcessViewComponent) opens the Petriflow builder in its tabs
        BuilderModule,
        DialogModule,
        DialogComponentsModule
    ],
    providers: [
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
        ResourceProvider,
        provideNaeMaterialDefaults({iconFontSet: 'material-symbols-rounded'}),
        // @swimlane/ngx-charts (the chart data fields of the task forms) still uses @angular/animations
        provideAnimationsAsync(),
        {provide: ConfigurationService, useClass: NetgrifFrontendConfigurationService},
        {provide: ViewService, useClass: NetgrifFrontendViewService},
        {
            provide: NAE_ASYNC_RENDERING_CONFIGURATION, useValue: {
                batchSize: 20,
                batchDelay: 50,
                numberOfPlaceholders: 4,
                enableAsyncRenderingForNewFields: true,
                enableAsyncRenderingOnTaskExpand: true
            }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
