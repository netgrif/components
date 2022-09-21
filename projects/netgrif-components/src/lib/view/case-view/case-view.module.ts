import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CaseListComponent} from './components/case-list/case-list.component';
import {FlexModule} from '@angular/flex-layout';
import {PanelComponentModule} from '../../panel/panel.module';
import {MaterialModule, TranslateLibModule} from '@netgrif/components-core';
import { CreateCaseButtonComponent } from './components/create-case-button/create-case-button.component';
import { CaseListPaginatorComponent } from './components/case-list-paginator/case-list-paginator.component';


@NgModule({
    declarations: [CaseListComponent, CreateCaseButtonComponent, CaseListPaginatorComponent],
    exports: [CaseListComponent, CreateCaseButtonComponent, CaseListPaginatorComponent],
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
