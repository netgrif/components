import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterSelectorComponent} from './filter-selector.component';
import {FilterSelectorListItemComponent} from './filter-selector-list-item/filter-selector-list-item.component';
import {MaterialModule} from '../../../material/material.module';
import {TranslateLibModule} from '../../../translate/translate-lib.module';


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
export class SideMenuFilterSelectorModule {
}
