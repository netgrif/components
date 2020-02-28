import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoggerModule, MaterialModule, CovalentModule} from '@netgrif/application-engine';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexModule} from "@angular/flex-layout";
import { DocumentationComponent } from './documentation/documentation.component';

import { NaeExampleAppConfigurationService } from './nae-example-app-configuration.service';
import { ConfigurationService } from '@netgrif/application-engine';

@NgModule({
    declarations: [
        AppComponent,
        DocumentationComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LoggerModule,
        FlexModule,
        MaterialModule,
        CovalentModule
        BrowserAnimationsModule
    ],
    providers: [{provide: ConfigurationService, useClass: NaeExampleAppConfigurationService}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
