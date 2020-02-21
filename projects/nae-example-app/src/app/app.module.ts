import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoggerModule, MaterialModule, CovalentModule} from '@netgrif/application-engine';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexModule} from "@angular/flex-layout";
import { DocumentationComponent } from './documentation/documentation.component';


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
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
