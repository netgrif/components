import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelComponent} from './panel.component';
import {FlexModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';
import { TaskPanelComponent } from './task-panel/task-panel.component';
import { TaskPanelContentComponent } from './task-panel/task-panel-content/task-panel-content.component';
import {DataFieldsModule} from '../data-fields/data-fields.module';

@NgModule({
    declarations: [
        PanelComponent,
        TaskPanelComponent,
        TaskPanelContentComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexModule,
        DataFieldsModule
    ],
    exports: [
        PanelComponent,
        TaskPanelComponent
    ],
    entryComponents: [
        TaskPanelContentComponent
    ]
})
export class PanelModule {
}
