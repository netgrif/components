import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../../material/material.module';
import {DataFieldsModule} from '../../data-fields/data-fields.module';
import {TranslateLibModule} from '../../translate/translate-lib.module';
import {PanelModule} from '../../panel/panel.module';
import {TaskContentModule} from '../../task-content/task-content.module';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        DataFieldsModule,
        TranslateLibModule,
        PanelModule,
        TaskContentModule
    ]
})
export class TreeCaseViewModule {
}
