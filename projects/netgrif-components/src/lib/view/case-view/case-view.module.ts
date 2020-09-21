import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CaseListComponent} from './components/case-list/case-list.component';
import {FlexModule} from '@angular/flex-layout';
import {PanelComponentModule} from '../../panel/panel.module';
import {MaterialModule, TranslateLibModule} from '@netgrif/application-engine';


@NgModule({
    declarations: [CaseListComponent],
    exports: [CaseListComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FlexModule,
        PanelComponentModule,
        TranslateLibModule
    ]
})
export class CaseViewComponentModule {
}
