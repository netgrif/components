import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
    AuthenticationModule,
    ConfigurationService,
    CovalentModule,
    DataFieldsModule,
    DialogModule,
    HeaderModule,
    MaterialModule,
    NavigationModule,
    NewCaseComponent,
    PanelModule,
    QuestionDialogComponent,
    QuestionDialogWithAnswerComponent,
    QuickPanelModule,
    SideMenuModule,
    SimpleDialogComponent,
    TabsModule,
    ToolbarModule,
    UserAssignComponent,
    ResourceProvider,
    UserModule,
    ImportNetComponent,
    WorkflowViewModule,
    DashboardModule,
    FilterSelectorComponent,
    FilesUploadComponent,
    LoginFormModule,
    ForgottenPasswordFormModule,
    RegistrationFormModule,
    SignUpModule,
    SearchModule,
} from '@netgrif/application-engine';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {DocumentationComponent} from './doc/documentation/documentation.component';
import {NaeExampleAppConfigurationService} from './nae-example-app-configuration.service';
import {AuthenticationComponent} from './doc/authentication/authentication.component';
import {DrawerExampleComponent} from './doc/drawer-example/drawer-example.component';
import {RailExampleComponent} from './doc/rail-example/rail-example.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MatCardModule, MatIconModule} from '@angular/material';
import {SidemenuExampleComponent} from './doc/sidemenu-example/sidemenu-example.component';
import {SnackBarExampleComponent} from './doc/snack-bar-example/snack-bar-example.component';
import {DialogExampleComponent} from './doc/dialog-example/dialog-example.component';
import {TabViewExampleComponent} from './doc/tab-view-example/tab-view-example.component';
import {ContentComponent} from './doc/tab-view-example/content/content.component';
import {ReactiveTextFieldComponent} from './doc/reactive-text-field/reactive-text-field.component';
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
import {PasswordFormComponent} from './doc/forms/password-form/password-form.component';
import {RegisterFormComponent} from './doc/forms/register-form/register-form.component';
import {HeadersComponent} from './doc/headers/headers.component';
import {PanelsComponent} from './doc/panels/panels.component';
import {DashboardExampleComponent} from './doc/dashboard-example/dashboard-example.component';
import {FilterRepositoryExampleComponent} from './doc/filter-repository-example/filter-repository-example.component';


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
        ReactiveTextFieldComponent,
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
        FilterRepositoryExampleComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FlexModule,
        FlexLayoutModule,
        MaterialModule,
        CovalentModule,
        AuthenticationModule,
        SignUpModule,
        HttpClientModule,
        MatIconModule,
        UserModule,
        QuickPanelModule,
        NavigationModule,
        SideMenuModule,
        PanelModule,
        DialogModule,
        TabsModule,
        DataFieldsModule,
        HeaderModule,
        DataFieldsModule,
        ToolbarModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
            }
        }),
        MatCardModule,
        WorkflowViewModule,
        DashboardModule,
        LoginFormModule,
        ForgottenPasswordFormModule,
        RegistrationFormModule,
        SearchModule,
        SearchModule,
    ],
    entryComponents: [
        FilesUploadComponent,
        NewCaseComponent,
        UserAssignComponent,
        SimpleDialogComponent,
        QuestionDialogComponent,
        QuestionDialogWithAnswerComponent,
        ContentComponent,
        TabbedCaseViewComponent,
        TabbedTaskViewComponent,
        ImportNetComponent,
        FilterSelectorComponent,
    ],
    providers: [{
        provide: ConfigurationService,
        useClass: NaeExampleAppConfigurationService
    },
        ResourceProvider,
        TranslateService,
        TranslatePipe,
        TranslateStore,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
