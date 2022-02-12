import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterSelectorComponent} from './filter-selector.component';
import {FilterSelectorListItemComponent} from './filter-selector-list-item/filter-selector-list-item.component';
import {MaterialModule, TranslateLibModule} from '@netgrif/components-core';

@NgModule({
    declarations: [
        FilterSelectorComponent,
        FilterSelectorListItemComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        TranslateLibModule,
    ],
    exports: [
        FilterSelectorComponent,
    ],
    entryComponents: [
        FilterSelectorComponent
    ]
})
export class SideMenuFilterSelectorComponentModule {
}
