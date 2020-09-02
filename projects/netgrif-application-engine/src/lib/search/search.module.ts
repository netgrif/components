import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {TranslateLibModule} from '../translate/translate-lib.module';
import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';


@NgModule({
    declarations: [
    ],
    exports: [
    ],
    imports: [
        CommonModule,
        MaterialModule,
        TranslateLibModule,
        NgxMatDatetimePickerModule,
    ]
})
export class SearchModule {
}
