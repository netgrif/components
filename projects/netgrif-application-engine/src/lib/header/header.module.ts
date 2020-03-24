import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {MaterialModule} from '../material/material.module';
import {FlexModule} from '@angular/flex-layout';
import { SortModeComponent } from './header-modes/sort-mode/sort-mode.component';
import { SearchModeComponent } from './header-modes/search-mode/search-mode.component';
import { EditModeComponent } from './header-modes/edit-mode/edit-mode.component';

@NgModule({
    declarations: [
        HeaderComponent,
        SortModeComponent,
        SearchModeComponent,
        EditModeComponent
    ],
    exports: [
        HeaderComponent,
        SortModeComponent,
        SearchModeComponent,
        EditModeComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexModule,
    ]
})
export class HeaderModule {
}
