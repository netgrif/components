import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../../material/material.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';


@NgModule({
    declarations: [
    ],
    exports: [
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TranslateLibModule
    ]
})
export class QuickPanelModule {
}
