import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DataFieldsModule, SideMenuModule} from '@netgrif/application-engine';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        DataFieldsModule,
        SideMenuModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
