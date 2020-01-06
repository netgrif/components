import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NetgrifApplicationEngineModule} from 'netgrif-application-engine';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NetgrifApplicationEngineModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
