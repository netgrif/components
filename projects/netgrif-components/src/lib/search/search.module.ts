import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchComponent} from './search-component/search.component';
import {CaseSearchComponent} from './search-component/case-search/case-search.component';
import {TaskSearchComponent} from './search-component/task-search/task-search.component';
import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';
import {DefaultSearchCategoriesModule, MaterialModule, TranslateLibModule} from '@netgrif/application-engine';
import {FulltextSearchComponent} from './fulltext-search-component/fulltext-search.component';
import {AdvancedSearchComponentModule} from './advanced-search/advanced-search.module';

@NgModule({
    declarations: [
        SearchComponent,
        CaseSearchComponent,
        TaskSearchComponent,
        FulltextSearchComponent,
    ],
    exports: [
        SearchComponent,
        CaseSearchComponent,
        TaskSearchComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        TranslateLibModule,
        NgxMatDatetimePickerModule,
        MaterialModule,
        AdvancedSearchComponentModule,
        DefaultSearchCategoriesModule
    ]
})
export class SearchComponentModule {
}
