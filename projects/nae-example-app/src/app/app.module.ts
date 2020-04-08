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
    CardModule,
    UserAssignComponent,
    ResourceProvider,
    UserModule,
    ImportNetComponent,
    WorkflowsModule,
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
import {CaseSidemenuExampleComponent} from './doc/case-sidemenu-example/case-sidemenu-example.component';
import {SidemenuExampleComponent} from './doc/sidemenu-example/sidemenu-example.component';
import {UserAssignSidemenuExampleComponent} from './doc/user-assign-sidemenu-example/user-assign-sidemenu-example.component';
import {CasePanelExampleComponent} from './doc/case-panel-example/case-panel-example.component';
import {SnackBarExampleComponent} from './doc/snack-bar-example/snack-bar-example.component';
import {DialogExampleComponent} from './doc/dialog-example/dialog-example.component';
import {TabViewExampleComponent} from './doc/tab-view-example/tab-view-example.component';
import {ContentComponent} from './doc/tab-view-example/content/content.component';
import {ReactiveTextFieldComponent} from './doc/reactive-text-field/reactive-text-field.component';
import {CaseHeaderExampleComponent} from './doc/case-header-example/case-header-example.component';
import {TaskHeaderExampleComponent} from './doc/task-header-example/task-header-example.component';
import {ToolbarExampleComponent} from './doc/toolbar-example/toolbar-example.component';
import {CaseViewComponent} from './doc/case-view/case-view.component';
import {CaseResourceExampleComponent} from './doc/case-resource-example/case-resource-example.component';
import {TranslateLoader, TranslateModule, TranslatePipe, TranslateService, TranslateStore} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TaskViewComponent} from './doc/task-view/task-view.component';
import {TabbedCaseViewComponent} from './doc/tabbed-case-view/tabbed-case-view/tabbed-case-view.component';
import {TabbedViewsExampleComponent} from './doc/tabbed-case-view/tabbed-views-example.component';
import {TabbedTaskViewComponent} from './doc/tabbed-case-view/tabbed-task-view/tabbed-task-view.component';
import {WorkflowsViewExampleComponent} from './doc/workflows-view-example/workflows-view-example.component';
import { LoginCardComponent } from './doc/cards/login-card/login-card.component';
import { PasswordCardComponent } from './doc/cards/password-card/password-card.component';
import { RegisterCardComponent } from './doc/cards/register-card/register-card.component';

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
        CaseSidemenuExampleComponent,
        SidemenuExampleComponent,
        UserAssignSidemenuExampleComponent,
        CasePanelExampleComponent,
        SnackBarExampleComponent,
        DialogExampleComponent,
        TabViewExampleComponent,
        ContentComponent,
        ReactiveTextFieldComponent,
        CaseHeaderExampleComponent,
        TaskHeaderExampleComponent,
        ReactiveTextFieldComponent,
        ToolbarExampleComponent,
        CaseResourceExampleComponent,
        TaskViewComponent,
        CaseViewComponent,
        TabbedCaseViewComponent,
        TabbedViewsExampleComponent,
        TabbedTaskViewComponent,
        WorkflowsViewExampleComponent,
        ContentComponent,
        CaseResourceExampleComponent,
        LoginCardComponent,
        PasswordCardComponent,
        RegisterCardComponent,
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
        CardModule,
        WorkflowsModule,
    ],
    entryComponents: [
        NewCaseComponent,
        UserAssignComponent,
        SimpleDialogComponent,
        QuestionDialogComponent,
        QuestionDialogWithAnswerComponent,
        ContentComponent,
        TabbedCaseViewComponent,
        TabbedTaskViewComponent,
        ImportNetComponent,
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
