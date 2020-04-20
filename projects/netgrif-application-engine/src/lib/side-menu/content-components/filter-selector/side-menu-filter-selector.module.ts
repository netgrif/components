import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterSelectorComponent} from './filter-selector.component';


@NgModule({
    declarations: [
        FilterSelectorComponent,
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
