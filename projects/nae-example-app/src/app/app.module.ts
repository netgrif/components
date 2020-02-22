import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoggerModule, DataFieldsModule, SideMenuModule} from '@netgrif/application-engine';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        LoggerModule,
        DataFieldsModule,
        SideMenuModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
