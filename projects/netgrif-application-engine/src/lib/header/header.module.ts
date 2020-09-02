import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {FlexModule} from '@angular/flex-layout';
import {TranslateLibModule} from '../translate/translate-lib.module';

@NgModule({
    declarations: [
    ],
    exports: [
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexModule,
        TranslateLibModule
    ]
})
export class HeaderModule {
}
