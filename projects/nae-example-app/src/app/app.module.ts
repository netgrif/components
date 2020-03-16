import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthenticationModule, ConfigurationService, CovalentModule, MaterialModule} from '@netgrif/application-engine';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {DocumentationComponent} from './doc/documentation/documentation.component';

import {NaeExampleAppConfigurationService} from './nae-example-app-configuration.service';
import {AuthenticationComponent} from './doc/services/authentication/authentication.component';
import {NavigationDrawerComponent} from './drawer-prototype/navigation-drawer/navigation-drawer.component';
import {DrawerControlsComponent} from './drawer-prototype/drawer-controls/drawer-controls.component';
import { NavigationRailComponent } from './drawer-prototype/navigation-rail/navigation-rail.component';
import { RailControlsComponent } from './drawer-prototype/rail-controls/rail-controls.component';

@NgModule({
    declarations: [
        AppComponent,
        DocumentationComponent,
        AuthenticationComponent,
        NavigationDrawerComponent,
        DrawerControlsComponent,
        NavigationRailComponent,
        RailControlsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FlexModule,
        FlexLayoutModule,
        MaterialModule,
        CovalentModule,
        AuthenticationModule
    ],
    providers: [{provide: ConfigurationService, useClass: NaeExampleAppConfigurationService}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
