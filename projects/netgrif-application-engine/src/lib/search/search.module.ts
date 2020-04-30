import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchComponent} from './search-component/search.component';
import {MaterialModule} from '../material/material.module';
import {TranslateLibModule} from '../translate/translate-lib.module';
import {CaseSearchComponent} from './search-component/case-search/case-search.component';
import { TaskSearchComponent } from './search-component/task-search/task-search.component';


@NgModule({
    declarations: [
        SearchComponent,
        CaseSearchComponent,
        TaskSearchComponent,
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
    ]
})
export class SearchModule {
}
