import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterSelectorComponent} from './filter-selector.component';
import {FilterSelectorListItemComponent} from './filter-selector-list/filter-selector-list-item/filter-selector-list-item.component';
import {MaterialModule} from '../../../material/material.module';
import {TranslateLibModule} from '../../../translate/translate-lib.module';
import { FilterSelectorListComponent } from './filter-selector-list/filter-selector-list.component';


@NgModule({
    declarations: [
        FilterSelectorComponent,
        FilterSelectorListItemComponent,
        FilterSelectorListComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        TranslateLibModule,
    ],
    exports: [
        FilterSelectorComponent,
    ]
})
export class SideMenuFilterSelectorModule {
}
