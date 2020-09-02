import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';
import {DataFieldsModule} from '../data-fields/data-fields.module';
import {TranslateLibModule} from '../translate/translate-lib.module';
import {SnackBarModule} from '../snack-bar/snack-bar.module';
import {TaskContentModule} from '../task-content/task-content.module';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexModule,
        DataFieldsModule,
        TranslateLibModule,
        SnackBarModule,
        TaskContentModule
    ],
    exports: [
    ]
})
export class PanelModule {
}
