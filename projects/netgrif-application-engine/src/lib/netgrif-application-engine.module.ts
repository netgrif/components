import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NetgrifApplicationEngineComponent} from './netgrif-application-engine.component';
import {SimpleComponent} from './simple/simple.component';
import {MatSelectModule} from '@angular/material';


@NgModule({
	declarations: [NetgrifApplicationEngineComponent, SimpleComponent],
	imports: [
		BrowserModule,
		FormsModule,
		MatSelectModule,
		BrowserAnimationsModule
	],
	exports: [NetgrifApplicationEngineComponent, SimpleComponent]
})
export class NetgrifApplicationEngineModule {
}
