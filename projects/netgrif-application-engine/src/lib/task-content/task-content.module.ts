import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskPanelContentComponent} from './task-panel-content/task-panel-content.component';
import {DataFieldsModule} from '../data-fields/data-fields.module';
import {SnackBarModule} from '../snack-bar/snack-bar.module';
import {MaterialModule} from '../material/material.module';
import {FlexModule} from '@angular/flex-layout';
import {TranslateLibModule} from '../translate/translate-lib.module';


@NgModule({
    declarations: [
        TaskPanelContentComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexModule,
        TranslateLibModule,
        DataFieldsModule,
        SnackBarModule
    ],
    exports: [
        TaskPanelContentComponent
    ],
    entryComponents: [
        TaskPanelContentComponent
    ]
})
export class TaskContentModule {
}
