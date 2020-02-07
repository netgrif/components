import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {
    LoggerModule,
    PanelModule,
    MaterialModule,
    CovalentModule
} from '@netgrif/application-engine';
import {ExamplePanelComponent} from './example-panel/example-panel.component';

export const routes: Routes = [
    {path: 'panel component example', component: ExamplePanelComponent},
];

@NgModule({
    declarations: [
        AppComponent,
        ExamplePanelComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LoggerModule,
        RouterModule.forRoot(routes),
        FlexLayoutModule,
        PanelModule,
        MaterialModule,
        CovalentModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
