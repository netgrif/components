import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {FlexModule} from '@angular/flex-layout';
import {MaterialModule, TranslateLibModule} from '@netgrif/application-engine';
import {EditModeComponent} from './header-modes/edit-mode/edit-mode.component';
import {SortModeComponent} from './header-modes/sort-mode/sort-mode.component';
import {SearchModeComponent} from './header-modes/search-mode/search-mode.component';
import {LoadingModeComponent} from './header-modes/loading-mode/loading-mode.component';
import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';

@NgModule({
    declarations: [
        HeaderComponent,
        SortModeComponent,
        SearchModeComponent,
        EditModeComponent,
        LoadingModeComponent
    ],
    exports: [
        HeaderComponent,
        SortModeComponent,
        SearchModeComponent,
        EditModeComponent,
        LoadingModeComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexModule,
        TranslateLibModule,
        MaterialModule,
        NgxMatDatetimePickerModule
    ]
})
export class HeaderComponentModule {
}
