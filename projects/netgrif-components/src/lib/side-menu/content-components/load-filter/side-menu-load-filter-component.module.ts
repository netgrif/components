import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadFilterComponent} from './load-filter.component';
import {MaterialModule, NAE_LOAD_FILTER_COMPONENT, TranslateLibModule} from '@netgrif/components-core';
import {CaseViewComponentModule} from '../../../view/case-view/case-view.module';
import {HeaderComponentModule} from '../../../header/header.module';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        TranslateLibModule,
        CaseViewComponentModule,
        HeaderComponentModule,
    ],
    declarations: [LoadFilterComponent],
    exports: [LoadFilterComponent],
    providers: [
        { provide: NAE_LOAD_FILTER_COMPONENT, useValue: LoadFilterComponent }
    ]
})
export class SideMenuLoadFilterComponentModule {
}
