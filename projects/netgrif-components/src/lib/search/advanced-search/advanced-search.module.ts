import {NgModule} from '@angular/core';
import {SearchClauseComponent} from './search-clause-component/search-clause.component';
import {SearchPredicateComponent} from './search-predicate-component/search-predicate.component';
import {SearchOperandInputComponent} from './search-operand-input-component/search-operand-input.component';
import {SearchConfigurationInputComponent} from './search-configuration-input-component/search-configuration-input.component';
import {AdvancedSearchComponent} from './advanced-search-component/advanced-search.component';
import {CommonModule} from '@angular/common';
import {MaterialModule, TranslateLibModule} from '@netgrif/components-core';
import {NgxMatDatepickerInput, NgxMatDatetimepicker} from "@ngxmc/datetime-picker";

@NgModule({
    declarations: [
        SearchClauseComponent,
        SearchPredicateComponent,
        SearchOperandInputComponent,
        SearchConfigurationInputComponent,
        AdvancedSearchComponent,
    ],
    exports: [
        SearchClauseComponent,
        SearchPredicateComponent,
        SearchOperandInputComponent,
        SearchConfigurationInputComponent,
        AdvancedSearchComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        TranslateLibModule,
        NgxMatDatepickerInput,
        NgxMatDatetimepicker,
    ]
})
export class AdvancedSearchComponentModule {
}
