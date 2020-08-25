import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskContentComponent} from './task-content/task-content.component';
import {DataFieldsComponentModule} from '../data-fields/data-fields.module';
import {FlexModule} from '@angular/flex-layout';
import {SnackBarModule, MaterialModule, TranslateLibModule} from '@netgrif/application-engine';


@NgModule({
    declarations: [
        TaskContentComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexModule,
        TranslateLibModule,
        SnackBarModule,
        DataFieldsComponentModule
    ],
    exports: [
        TaskContentComponent
    ],
    entryComponents: [
        TaskContentComponent
    ]
})
export class TaskContentComponentModule {
}
