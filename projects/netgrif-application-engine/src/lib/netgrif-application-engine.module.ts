import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {NetgrifApplicationEngineComponent} from './netgrif-application-engine.component';
import {SimpleComponent} from './simple/simple.component';


@NgModule({
	declarations: [NetgrifApplicationEngineComponent, SimpleComponent],
	imports: [
		BrowserModule,
		FormsModule
	],
	exports: [NetgrifApplicationEngineComponent, SimpleComponent]
})
export class NetgrifApplicationEngineModule {
}
