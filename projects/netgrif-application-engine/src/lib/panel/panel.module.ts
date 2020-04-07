import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelComponent} from './panel.component';
import {FlexModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';
import { TaskPanelComponent } from './task-panel/task-panel.component';
import { CasePanelComponent } from './case-panel/case-panel.component';
import { TaskPanelContentComponent } from './task-panel/task-panel-content/task-panel-content.component';
import {DataFieldsModule} from '../data-fields/data-fields.module';
import {TaskListComponent} from './task-panel-list/task-list.component';
import { WorkflowsPanelComponent } from './workflows-panel/workflows-panel.component';
import {TranslateLibModule} from '../translate/translate-lib.module';

@NgModule({
    declarations: [
        PanelComponent,
        TaskPanelComponent,
        CasePanelComponent,
        TaskPanelContentComponent,
        WorkflowsPanelComponent,
        TaskListComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexModule,
        DataFieldsModule,
        TranslateLibModule
    ],
    exports: [
        PanelComponent,
        TaskPanelComponent,
        CasePanelComponent,
        WorkflowsPanelComponent,
        TaskPanelContentComponent,
        TaskListComponent,
    ],
    entryComponents: [
        TaskPanelContentComponent
    ]
})
export class PanelModule {
}
