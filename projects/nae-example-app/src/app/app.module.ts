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
    SideMenuModule
} from '@netgrif/application-engine';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {DocumentationComponent} from './doc/documentation/documentation.component';

import {NaeExampleAppConfigurationService} from './nae-example-app-configuration.service';
import {AuthenticationComponent} from './doc/services/authentication/authentication.component';
import {CaseSidemenuExampleComponent} from './doc/case-sidemenu-example/case-sidemenu-example.component';
import {SidemenuExampleComponent} from './doc/sidemenu-example/sidemenu-example.component';

@NgModule({
    declarations: [
        AppComponent,
        DocumentationComponent,
        AuthenticationComponent,
        CaseSidemenuExampleComponent,
        SidemenuExampleComponent
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
        SideMenuModule
    ],
    entryComponents: [NewCaseComponent],
    providers: [{provide: ConfigurationService, useClass: NaeExampleAppConfigurationService}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
