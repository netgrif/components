import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CaseListComponent} from './components/case-list/case-list.component';
import {FlexModule} from '@angular/flex-layout';
import {PanelModule} from '../../panel/panel.module';
import {TranslateLibModule, MaterialModule} from '@netgrif/application-engine';


@NgModule({
    declarations: [CaseListComponent],
    exports: [CaseListComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FlexModule,
        PanelModule,
        TranslateLibModule
    ]
})
export class CaseViewModule {
}
