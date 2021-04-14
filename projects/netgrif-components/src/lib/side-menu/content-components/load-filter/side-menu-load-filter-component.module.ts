import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadFilterComponent} from './load-filter.component';
import {PanelComponentModule} from '../../../panel/panel.module';
import {MaterialModule, NAE_LOAD_FILTER_COMPONENT, TranslateLibModule} from '@netgrif/application-engine';


@NgModule({
    declarations: [LoadFilterComponent],
    imports: [
        CommonModule,
        MaterialModule,
        TranslateLibModule,
        PanelComponentModule
    ],
    exports: [
        LoadFilterComponent
    ],
    entryComponents: [LoadFilterComponent],
    providers: [
        {provide: NAE_LOAD_FILTER_COMPONENT, useValue: LoadFilterComponent}
    ]
})
export class SideMenuLoadFilterComponentModule {
}
