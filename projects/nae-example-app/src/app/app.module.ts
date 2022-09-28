import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
    AuthenticationModule,
    ConfigurationService,
    CovalentModule,
    DashboardPortalComponentRegistryService,
    DialogModule,
    MaterialModule,
    NAE_SNACKBAR_HORIZONTAL_POSITION,
    NAE_SNACKBAR_VERTICAL_POSITION,
    ResourceProvider,
    SignUpModule,
    SnackBarHorizontalPosition,
    SnackBarModule,
    SnackBarVerticalPosition,
    ViewService
} from '@netgrif/components-core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {DocumentationComponent} from './doc/documentation/documentation.component';
import {NaeExampleAppConfigurationService} from './nae-example-app-configuration.service';
import {AuthenticationComponent} from './doc/authentication/authentication.component';
import {DrawerExampleComponent} from './doc/drawer-example/drawer-example.component';
import {RailExampleComponent} from './doc/rail-example/rail-example.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {SidemenuExampleComponent} from './doc/sidemenu-example/sidemenu-example.component';
import {SnackBarExampleComponent} from './doc/snack-bar-example/snack-bar-example.component';
import {DialogExampleComponent} from './doc/dialog-example/dialog-example.component';
import {TabViewExampleComponent} from './doc/tab-view-example/tab-view-example.component';
import {ContentComponent} from './doc/tab-view-example/content/content.component';
import {ToolbarExampleComponent} from './doc/toolbar-example/toolbar-example.component';
import {CaseViewComponent} from './doc/case-view/case-view.component';
import {TranslateLoader, TranslateModule, TranslatePipe, TranslateService, TranslateStore} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TaskViewComponent} from './doc/task-view/task-view.component';
import {TabbedCaseViewComponent} from './doc/tabbed-case-view/tabbed-case-view/tabbed-case-view.component';
import {TabbedViewsExampleComponent} from './doc/tabbed-case-view/tabbed-views-example.component';
import {TabbedTaskViewComponent} from './doc/tabbed-case-view/tabbed-task-view/tabbed-task-view.component';
import {WorkflowViewExampleComponent} from './doc/workflow-view-example/workflow-view-example.component';
import {LoginFormComponent} from './doc/forms/login-form/login-form.component';
import {PasswordFormComponent} from './doc/forms/email-form/password-form.component';
import {RegisterFormComponent} from './doc/forms/register-form/register-form.component';
import {HeadersComponent} from './doc/headers/headers.component';
import {PanelsComponent} from './doc/panels/panels.component';
import {DashboardExampleComponent} from './doc/dashboard-example/dashboard-example.component';
import {FilterRepositoryExampleComponent} from './doc/filter-repository-example/filter-repository-example.component';
import {ProfileComponent} from './doc/profile/profile.component';
import {NavigationExampleComponent} from './doc/navigation-example/navigation-example.component';
import {ButtonsNavComponent} from './doc/navigation-example/buttons-nav/buttons-nav.component';
import {RolesAssignComponent} from './doc/roles-assign/roles-assign.component';
import {LdapGroupRolesAssignComponent} from './doc/ldap-group-roles-assign/ldap-group-roles-assign.component';
import {NaeExampleAppViewService} from './nae-example-app-view.service';
import {TreeViewExampleComponent} from './doc/tree-view-example/tree-view-example.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {
    AdminComponentModule,
    AuthenticationComponentModule,
    CaseViewComponentModule,
    DashboardComponentModule,
    DataFieldsComponentModule,
    EmailSubmissionFormComponent,
    EmailSubmissionFormComponentModule,
    ForgottenPasswordFormComponentModule,
    HeaderComponentModule,
    LoginFormComponentModule,
    NavigationComponentModule,
    PanelComponentModule,
    ProfileComponentModule,
    RedirectComponentModule,
    RegistrationFormComponentModule,
    SearchComponentModule,
    SideMenuComponentModule,
    SideMenuContentComponentModule,
    TabsComponentModule,
    ToolbarComponentModule,
    TreeCaseViewComponentModule,
    WorkflowViewComponentModule
} from '@netgrif/components';
import {UserInviteComponent} from './doc/user-invite/user-invite.component';
import {ExamplePortalCardComponent} from './doc/dashboard-example/piechart-card/example-portal-card.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {ResetPasswordFormComponent} from './doc/forms/reset-password-form/reset-password-form.component';
import {PublicTaskViewComponent} from './doc/public-task-view/public-task-view.component';
import {PublicWorkflowViewComponent} from './doc/public-workflow-view/public-workflow-view.component';
import {PublicResolverComponent} from './doc/public-resolver/public-resolver.component';
import {GroupViewComponent} from './doc/group-view/group-view.component';
import {
    DemoTitleConfigContent0TaskViewComponent
} from './doc/demo-title-config/content/0/demo-title-config-content0-task-view.component';
import {
    DemoTitleConfigContent1CaseViewComponent
} from './doc/demo-title-config/content/1/demo-title-config-content1-case-view.component';
import {
    DemoTitleConfigContent2CaseViewComponent
} from './doc/demo-title-config/content/2/demo-title-config-content2-case-view.component';
import {
    DemoTitleConfigContent3CaseViewComponent
} from './doc/demo-title-config/content/3/demo-title-config-content3-case-view.component';
import {TitleConfigComponent} from './doc/demo-title-config/title-config.component';
import {ExampleRedirectComponent} from './doc/redirect/example-redirect.component';
import {ActiveGroupComponent} from './doc/active-group/active-group.component';
import {WrapperEmptyViewComponent} from './views/wrapper/wrapper-empty-view.component';
import {DoubleDrawerExampleComponent} from './doc/double-drawer-example/double-drawer-example.component';
import {PublicSingleTaskViewComponent} from './doc/public-single-task-view/public-single-task-view.component';
import {BreadcrumbsExampleComponent} from './doc/breadcrumbs-example/breadcrumbs-example.component';
import {ComponentPortal} from '@angular/cdk/portal';
import {DashboardCaseExampleComponent} from './doc/dashboard-case-example/dashboard-case-example.component';
import {
    SingleTabbedCaseViewComponent
} from './doc/single-tabbed-view/single-tabbed-case-view/single-tabbed-case-view.component';
import {
    SingleTabbedTaskViewComponent
} from './doc/single-tabbed-view/single-tabbed-task-view/single-tabbed-task-view.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        DocumentationComponent,
        AuthenticationComponent,
        DrawerExampleComponent,
        RailExampleComponent,
        SidemenuExampleComponent,
        SnackBarExampleComponent,
        DialogExampleComponent,
        TabViewExampleComponent,
        ToolbarExampleComponent,
        TaskViewComponent,
        CaseViewComponent,
        TabbedCaseViewComponent,
        TabbedViewsExampleComponent,
        TabbedTaskViewComponent,
        WorkflowViewExampleComponent,
        ContentComponent,
        LoginFormComponent,
        PasswordFormComponent,
        RegisterFormComponent,
        HeadersComponent,
        PanelsComponent,
        DashboardExampleComponent,
        FilterRepositoryExampleComponent,
        ProfileComponent,
        NavigationExampleComponent,
        ButtonsNavComponent,
        RolesAssignComponent,
        LdapGroupRolesAssignComponent,
        TreeViewExampleComponent,
        UserInviteComponent,
        ExamplePortalCardComponent,
        ResetPasswordFormComponent,
        PublicTaskViewComponent,
        PublicWorkflowViewComponent,
        PublicResolverComponent,
        GroupViewComponent,
        ExampleRedirectComponent,
        DemoTitleConfigContent0TaskViewComponent,
        DemoTitleConfigContent1CaseViewComponent,
        DemoTitleConfigContent2CaseViewComponent,
        DemoTitleConfigContent3CaseViewComponent,
        TitleConfigComponent,
        ActiveGroupComponent,
        WrapperEmptyViewComponent,
        DoubleDrawerExampleComponent,
        PublicSingleTaskViewComponent,
        BreadcrumbsExampleComponent,
        DashboardCaseExampleComponent,
        SingleTabbedCaseViewComponent,
        SingleTabbedTaskViewComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FlexModule,
        FlexLayoutModule,
        MaterialModule,
        CovalentModule,
        SignUpModule,
        HttpClientModule,
        MatIconModule,
        DialogModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
            }
        }),
        MatCardModule,
        LoginFormComponentModule,
        ForgottenPasswordFormComponentModule,
        RegistrationFormComponentModule,
        SnackBarModule,
        MatButtonModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        AdminComponentModule,
        DashboardComponentModule,
        AuthenticationModule,
        AuthenticationComponentModule,
        DataFieldsComponentModule,
        SideMenuContentComponentModule,
        SideMenuComponentModule,
        TabsComponentModule,
        CaseViewComponentModule,
        HeaderComponentModule,
        SearchComponentModule,
        NavigationComponentModule,
        PanelComponentModule,
        ProfileComponentModule,
        ToolbarComponentModule,
        TreeCaseViewComponentModule,
        WorkflowViewComponentModule,
        NgxChartsModule,
        EmailSubmissionFormComponentModule,
        RedirectComponentModule
    ],
    providers: [{
        provide: ConfigurationService,
        useClass: NaeExampleAppConfigurationService
    },
        {provide: NAE_SNACKBAR_VERTICAL_POSITION, useValue: SnackBarVerticalPosition.TOP},
        {provide: NAE_SNACKBAR_HORIZONTAL_POSITION, useValue: SnackBarHorizontalPosition.LEFT},
        ResourceProvider,
        TranslateService,
        TranslatePipe,
        TranslateStore,
        {provide: ViewService, useClass: NaeExampleAppViewService},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

    constructor(registry: DashboardPortalComponentRegistryService) {
        registry.register('email', () => new ComponentPortal(EmailSubmissionFormComponent));
        registry.register('workflow-view', () => new ComponentPortal(WorkflowViewExampleComponent));
        registry.register('task-view', () => new ComponentPortal(TaskViewComponent));
        registry.register('case-view', () => new ComponentPortal(CaseViewComponent));
        registry.register('tab-view', (injector: Injector) => new ComponentPortal(TabbedViewsExampleComponent, null, injector));
    }
}
