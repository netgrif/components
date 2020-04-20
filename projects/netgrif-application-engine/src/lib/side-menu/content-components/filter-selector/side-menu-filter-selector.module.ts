import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterSelectorComponent} from './filter-selector.component';
import { FilterSelectorListItemComponent } from './filter-selector-list-item/filter-selector-list-item.component';


@NgModule({
    declarations: [
        FilterSelectorComponent,
        FilterSelectorListItemComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        FilterSelectorComponent,
    ]
})
export class SideMenuFilterSelectorModule {
}
