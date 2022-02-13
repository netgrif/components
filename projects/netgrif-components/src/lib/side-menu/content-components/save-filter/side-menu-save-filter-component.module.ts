import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SaveFilterComponent} from './save-filter.component';
import {MaterialModule, NAE_SAVE_FILTER_COMPONENT, TranslateLibModule} from '@netgrif/components-core';
import {PanelComponentModule} from '../../../panel/panel.module';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        TranslateLibModule,
        PanelComponentModule
    ],
    declarations: [SaveFilterComponent],
    exports: [SaveFilterComponent],
    entryComponents: [SaveFilterComponent],
    providers: [
        {provide: NAE_SAVE_FILTER_COMPONENT, useValue: SaveFilterComponent}
    ]
})
export class SideMenuSaveFilterComponentModule {
}
