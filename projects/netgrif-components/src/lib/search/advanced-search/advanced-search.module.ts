import {NgModule} from '@angular/core';
import {SearchClauseComponent} from './search-clause-component/search-clause.component';
import {SearchPredicateComponent} from './search-predicate-component/search-predicate.component';
import {SearchOperandInputComponent} from './search-operand-input-component/search-operand-input.component';
import {SearchConfigurationInputComponent} from './search-configuration-input-component/search-configuration-input.component';
import {AdvancedSearchComponent} from './advanced-search-component/advanced-search.component';
import {CommonModule} from '@angular/common';
import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';
import {MaterialModule, TranslateLibModule} from '@netgrif/application-engine';

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
        NgxMatDatetimePickerModule,
    ]
})
export class AdvancedSearchComponentModule {
}
