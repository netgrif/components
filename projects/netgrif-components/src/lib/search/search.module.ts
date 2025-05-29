import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchComponent} from './search-component/search.component';
import {CaseSearchComponent} from './search-component/case-search/case-search.component';
import {TaskSearchComponent} from './search-component/task-search/task-search.component';
import {DefaultSearchCategoriesModule, MaterialModule, TranslateLibModule} from '@netgrif/components-core';
import {FulltextSearchComponent} from './fulltext-search-component/fulltext-search.component';
import {AdvancedSearchComponentModule} from './advanced-search/advanced-search.module';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

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
        MaterialModule,
        AdvancedSearchComponentModule,
        DefaultSearchCategoriesModule
    ]
})
export class SearchComponentModule {

    private FILTER_VARIANT =
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6,13H18V11H6M3,6V8H21V6M10,18H14V16H10V18Z" /></svg>`;
    constructor(iconRegistry: MatIconRegistry,
                sanitizer: DomSanitizer) {
        iconRegistry.addSvgIconLiteral('filter-variant', sanitizer.bypassSecurityTrustHtml(this.FILTER_VARIANT));
    }
}
