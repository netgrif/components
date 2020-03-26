import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
    AuthenticationModule,
    ConfigurationService,
    CovalentModule,
    MaterialModule,
    NewCaseComponent,
    SideMenuModule,
    PanelModule,
    DialogModule,
    UserAssignComponent,
    SimpleDialogComponent,
    QuestionDialogWithAnswerComponent,
    QuestionDialogComponent,
    TabsModule,
    ToolbarModule,
    HeaderModule,
    ImportNetComponent,
    DataFieldsModule,
    ResourceProvider, WorkflowsModule
} from '@netgrif/application-engine';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {DocumentationComponent} from './doc/documentation/documentation.component';
import {NaeExampleAppConfigurationService} from './nae-example-app-configuration.service';
import {AuthenticationComponent} from './doc/services/authentication/authentication.component';
import {CaseSidemenuExampleComponent} from './doc/case-sidemenu-example/case-sidemenu-example.component';
import {SidemenuExampleComponent} from './doc/sidemenu-example/sidemenu-example.component';
import {UserAssignSidemenuExampleComponent} from './doc/user-assign-sidemenu-example/user-assign-sidemenu-example.component';
import {PanelExampleComponent} from './doc/panel-example/panel-example.component';
import {CasePanelExampleComponent} from './doc/case-panel-example/case-panel-example.component';
import {SnackBarExampleComponent} from './doc/snack-bar-example/snack-bar-example.component';
import {DialogExampleComponent} from './doc/dialog-example/dialog-example.component';
import {TabViewExampleComponent} from './doc/tab-view-example/tab-view-example.component';
import {ContentComponent} from './doc/tab-view-example/content/content.component';
import {ReactiveTextFieldComponent} from './doc/reactive-text-field/reactive-text-field.component';
import {CaseHeaderExampleComponent} from './doc/case-header-example/case-header-example.component';
import {TaskHeaderExampleComponent} from './doc/task-header-example/task-header-example.component';
import {ToolbarExampleComponent} from './doc/toolbar-example/toolbar-example.component';
import {TranslateLoader, TranslateModule, TranslatePipe, TranslateService, TranslateStore} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {WorkflowsViewExampleComponent} from './doc/workflows-view-example/workflows-view-example.component';
// // TODO
// import {WorkflowsModule} from '../../../netgrif-application-engine/src/lib/workflows/workflows.module';
import {CaseResourceExampleComponent} from './doc/case-resource-example/case-resource-example.component';
import {HttpClientModule} from '@angular/common/http';
import {TaskResourceExampleComponent} from './doc/task-resource-example/task-resource-example.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        DocumentationComponent,
        AuthenticationComponent,
        CaseSidemenuExampleComponent,
        SidemenuExampleComponent,
        UserAssignSidemenuExampleComponent,
        PanelExampleComponent,
        CasePanelExampleComponent,
        SnackBarExampleComponent,
        DialogExampleComponent,
        TabViewExampleComponent,
        ContentComponent,
        ReactiveTextFieldComponent,
        CaseHeaderExampleComponent,
        TaskHeaderExampleComponent,
        ToolbarExampleComponent,
        WorkflowsViewExampleComponent,
        ContentComponent,
        CaseResourceExampleComponent,
        TaskResourceExampleComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FlexModule,
        FlexLayoutModule,
        MaterialModule,
        CovalentModule,
        AuthenticationModule,
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
        WorkflowsModule,
        WorkflowsModule,
        WorkflowsModule,
        WorkflowsModule
    ],
    entryComponents: [
        NewCaseComponent,
        UserAssignComponent,
        SimpleDialogComponent,
        QuestionDialogComponent,
        QuestionDialogWithAnswerComponent,
        ContentComponent,
        ImportNetComponent
    ],
    providers: [{
        provide: ConfigurationService,
        useClass: NaeExampleAppConfigurationService
    },
        TranslateService,
        TranslatePipe,
        TranslateStore,
        ResourceProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
