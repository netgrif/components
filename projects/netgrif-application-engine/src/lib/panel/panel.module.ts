import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractPanelComponent} from './abstract-panel/abstract-panel.component';


@NgModule({
	declarations: [AbstractPanelComponent],
	imports: [
		CommonModule
	],
	exports: [AbstractPanelComponent]
})
export class PanelModule {
}
