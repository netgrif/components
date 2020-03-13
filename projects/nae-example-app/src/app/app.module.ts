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
    UserAssignComponent,
    PanelModule
} from '@netgrif/application-engine';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {DocumentationComponent} from './doc/documentation/documentation.component';

import {NaeExampleAppConfigurationService} from './nae-example-app-configuration.service';
import {AuthenticationComponent} from './doc/services/authentication/authentication.component';
import {CaseSidemenuExampleComponent} from './doc/case-sidemenu-example/case-sidemenu-example.component';
import {SidemenuExampleComponent} from './doc/sidemenu-example/sidemenu-example.component';
import { UserAssignSidemenuExampleComponent } from './doc/user-assign-sidemenu-example/user-assign-sidemenu-example.component';
import { PanelExampleComponent } from './doc/panel-example/panel-example.component';
import { CasePanelExampleComponent } from './doc/case-panel-example/case-panel-example.component';
import { SnackBarExampleComponent } from './doc/snack-bar-example/snack-bar-example.component';

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
        SnackBarExampleComponent
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
        SideMenuModule,
        PanelModule
    ],
    entryComponents: [
        NewCaseComponent,
        UserAssignComponent
    ],
    providers: [{provide: ConfigurationService, useClass: NaeExampleAppConfigurationService}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
