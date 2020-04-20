import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterSelectorComponent} from './filter-selector.component';
import { FilterSelectorListItemComponent } from './filter-selector-list-item/filter-selector-list-item.component';
import {MaterialModule} from '../../../material/material.module';


@NgModule({
    declarations: [
        FilterSelectorComponent,
        FilterSelectorListItemComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
    ],
    exports: [
        FilterSelectorComponent,
    ]
})
export class SideMenuFilterSelectorModule {
}
