import {inject, NgModule, provideAppInitializer} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TranslateModule} from '@ngx-translate/core';
import {
    AuthenticationMethodService,
    AuthenticationModule,
    AuthenticationService,
    ConfigurationService,
    MockAuthenticationService,
    DialogModule,
    MockAuthenticationMethodService,
    MockUserPreferenceService,
    SessionService,
    SignUpModule,
    SnackBarModule,
    UserPreferenceService,
    ViewService,
} from '@netgrif/components-core';
import {
    AdminComponentModule,
    BuilderModule,
    CaseViewComponentModule,
    ChangePasswordFormComponentModule,
    EmailSubmissionFormComponentModule,
    ForgottenPasswordFormComponentModule,
    LoginFormComponentModule,
    RegistrationFormComponentModule,
    DataFieldsComponentModule,
    DialogComponentsModule,
    HeaderComponentModule,
    NavigationComponentModule,
    PanelComponentModule,
    ProfileComponentModule,
    provideNaeMaterialDefaults,
    SearchComponentModule,
    TabsComponentModule,
} from '@netgrif/components';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CodeBlockComponent} from './playground/code-block/code-block.component';
import {DemoPageComponent} from './playground/demo-page/demo-page.component';
import {RerenderDirective} from './playground/rerender.directive';
import {PlaygroundConfigurationService} from './playground/offline/playground-configuration.service';
import {OfflineHttpInterceptor} from './playground/offline/offline-http.interceptor';
import {PlaygroundViewService} from './playground/offline/playground-view.service';
import {OverviewComponent} from './demos/overview/overview.component';
import {DataFieldDemoComponent} from './demos/data-field/data-field-demo.component';
import {SnackBarDemoComponent} from './demos/snack-bar/snack-bar-demo.component';
import {DialogDemoComponent} from './demos/dialog/dialog-demo.component';
import {DialogsDemoComponent} from './demos/dialog/dialogs-demo.component';
import {AccountDemoComponent} from './demos/account/account-demos';
import {
    PlaygroundCaseViewComponent,
    PlaygroundSearchViewComponent,
    PlaygroundSingleTaskViewComponent,
    PlaygroundTabbedCaseViewComponent,
    PlaygroundTabbedTaskViewComponent,
    PlaygroundTaskViewComponent,
} from './demos/views/playground-views';
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
    NavigationItemViewComponent,
    SingleTaskDemoComponent,
    SingleTaskFrameComponent,
} from './demos/views/navigation-demos';
import {
    ProfileDemoComponent,
    RoleAssignmentDemoComponent,
    LdapRoleAssignmentDemoComponent,
    TicketViewDemoComponent,
    UserInviteDemoComponent,
} from './demos/views/user-admin-demos';

@NgModule({
    declarations: [
        AppComponent,
        CodeBlockComponent,
        DemoPageComponent,
        RerenderDirective,
        OverviewComponent,
        DataFieldDemoComponent,
        SnackBarDemoComponent,
        DialogDemoComponent,
        DialogsDemoComponent,
        AccountDemoComponent,
        PlaygroundCaseViewComponent,
        PlaygroundSearchViewComponent,
        PlaygroundTaskViewComponent,
        PlaygroundTabbedCaseViewComponent,
        PlaygroundTabbedTaskViewComponent,
        PlaygroundSingleTaskViewComponent,
        CaseViewDemoComponent,
        AdvancedSearchDemoComponent,
        TaskViewDemoComponent,
        TabbedViewDemoComponent,
        BuilderViewDemoComponent,
        SingleTaskDemoComponent,
        SingleTaskFrameComponent,
        NavigationDemoComponent,
        NavigationHomeComponent,
        NavigationItemComponent,
        NavigationItemViewComponent,
        DashboardDemoComponent,
        BreadcrumbsDemoComponent,
        TicketViewDemoComponent,
        ProfileDemoComponent,
        RoleAssignmentDemoComponent,
        LdapRoleAssignmentDemoComponent,
        UserInviteDemoComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        TranslateModule.forRoot(),
        ClipboardModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        DataFieldsComponentModule,
        SnackBarModule,
        DialogModule,
        // guards of the navigation (AuthorityGuardService, RoleGuardService) are provided in AuthenticationModule
        AuthenticationModule,
        // SignUpService of the user invite
        SignUpModule,
        CaseViewComponentModule,
        DialogComponentsModule,
        HeaderComponentModule,
        SearchComponentModule,
        PanelComponentModule,
        TabsComponentModule,
        NavigationComponentModule,
        BuilderModule,
            ProfileComponentModule,
        AdminComponentModule,
        LoginFormComponentModule,
        RegistrationFormComponentModule,
        EmailSubmissionFormComponentModule,
        ForgottenPasswordFormComponentModule,
        ChangePasswordFormComponentModule,
    ],
    providers: [
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
        provideNaeMaterialDefaults({iconFontSet: 'material-symbols-rounded'}),
        // offline: no engine, no login
        {provide: ConfigurationService, useClass: PlaygroundConfigurationService},
        {provide: HTTP_INTERCEPTORS, useClass: OfflineHttpInterceptor, multi: true},
        {provide: AuthenticationMethodService, useClass: MockAuthenticationMethodService},
        // the playground user (mock engine `user/me`) is always logged in
        {provide: AuthenticationService, useClass: MockAuthenticationService},
        // a verified session, the URI service of the navigation loads the root node only with one
        provideAppInitializer(() => inject(SessionService).setVerifiedToken('playground-session')),
        {provide: UserPreferenceService, useClass: MockUserPreferenceService},
        {provide: ViewService, useClass: PlaygroundViewService},
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
