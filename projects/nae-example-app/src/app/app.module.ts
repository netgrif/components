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
        LogoutShortcutComponent
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
        UserModule
    ],
    providers: [{provide: ConfigurationService, useClass: NaeExampleAppConfigurationService}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
