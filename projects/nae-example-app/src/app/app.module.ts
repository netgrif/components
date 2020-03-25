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
    DataFieldsModule,
    ToolbarModule,
    HeaderModule
} from '@netgrif/application-engine';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {DocumentationComponent} from './doc/documentation/documentation.component';
import {NaeExampleAppConfigurationService} from './nae-example-app-configuration.service';
import {AuthenticationComponent} from './doc/services/authentication/authentication.component';
import {NavigationDrawerComponent} from './drawer-prototype/navigation-drawer/navigation-drawer.component';
import {DrawerControlsComponent} from './drawer-prototype/drawer-controls/drawer-controls.component';
import {NavigationRailComponent} from './drawer-prototype/navigation-rail/navigation-rail.component';
import {RailControlsComponent} from './drawer-prototype/rail-controls/rail-controls.component';
import {UserShowcaseComponent} from './drawer-prototype/user-showcase/user-showcase.component';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material';
import {NavigationTreeComponent} from './drawer-prototype/navigation-tree/navigation-tree.component';
import {QuickPanelComponent} from './drawer-prototype/quick-panel/quick-panel.component';
import {LanguageSelectorComponent} from './drawer-prototype/quick-panel/language-selector/language-selector.component';
import {InternalLinkComponent} from './drawer-prototype/quick-panel/internal-link/internal-link.component';
import {LogoutShortcutComponent} from './drawer-prototype/quick-panel/logout-shortcut/logout-shortcut.component';
import {UserModule} from '@netgrif/application-engine';
import {CaseSidemenuExampleComponent} from './doc/case-sidemenu-example/case-sidemenu-example.component';
import {SidemenuExampleComponent} from './doc/sidemenu-example/sidemenu-example.component';
import { UserAssignSidemenuExampleComponent } from './doc/user-assign-sidemenu-example/user-assign-sidemenu-example.component';
import { PanelExampleComponent } from './doc/panel-example/panel-example.component';
import { CasePanelExampleComponent } from './doc/case-panel-example/case-panel-example.component';
import { SnackBarExampleComponent } from './doc/snack-bar-example/snack-bar-example.component';
import { DialogExampleComponent } from './doc/dialog-example/dialog-example.component';
import { TabViewExampleComponent } from './doc/tab-view-example/tab-view-example.component';
import { ContentComponent } from './doc/tab-view-example/content/content.component';
import { ReactiveTextFieldComponent } from './doc/reactive-text-field/reactive-text-field.component';
import { CaseHeaderExampleComponent } from './doc/case-header-example/case-header-example.component';
import { TaskHeaderExampleComponent } from './doc/task-header-example/task-header-example.component';
import { ToolbarExampleComponent } from './doc/toolbar-example/toolbar-example.component';
import {TranslateLoader, TranslateModule, TranslatePipe, TranslateService, TranslateStore} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        DocumentationComponent,
        AuthenticationComponent,
        NavigationDrawerComponent,
        DrawerControlsComponent,
        NavigationRailComponent,
        RailControlsComponent,
        UserShowcaseComponent,
        NavigationTreeComponent,
        QuickPanelComponent,
        LanguageSelectorComponent,
        InternalLinkComponent,
        LogoutShortcutComponent,
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
        ToolbarExampleComponent
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
        UserModule,
        SideMenuModule,
        PanelModule,
        DialogModule,
        TabsModule,
        DataFieldsModule,
        HeaderModule,
        ToolbarModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
            }
        })
    ],
    entryComponents: [
        NewCaseComponent,
        UserAssignComponent,
        SimpleDialogComponent,
        QuestionDialogComponent,
        QuestionDialogWithAnswerComponent,
        ContentComponent
    ],
    providers: [
        {provide: ConfigurationService, useClass: NaeExampleAppConfigurationService},
        TranslateService,
        TranslatePipe,
        TranslateStore
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
