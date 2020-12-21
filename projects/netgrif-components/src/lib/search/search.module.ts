import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchComponent} from './search-component/search.component';
import {CaseSearchComponent} from './search-component/case-search/case-search.component';
import {TaskSearchComponent} from './search-component/task-search/task-search.component';
import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';
import {MaterialModule, TranslateLibModule} from '@netgrif/application-engine';
import { SearchClauseComponent } from './search-clause-component/search-clause.component';
import { SearchPredicateComponent } from './search-predicate-component/search-predicate.component';

@NgModule({
    declarations: [
        SearchComponent,
        CaseSearchComponent,
        TaskSearchComponent,
        SearchClauseComponent,
        SearchPredicateComponent,
    ],
    exports: [
        SearchComponent,
        CaseSearchComponent,
        TaskSearchComponent,
        SearchClauseComponent,
        SearchPredicateComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        TranslateLibModule,
        NgxMatDatetimePickerModule,
    ]
})
export class SearchComponentModule {
}
