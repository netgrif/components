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
import { WorkflowPanelComponent } from './workflow-panel/workflow-panel.component';
import {TranslateLibModule} from '../translate/translate-lib.module';
import {SnackBarModule} from '../snack-bar/snack-bar.module';


@NgModule({
    declarations: [
        PanelComponent,
        TaskPanelComponent,
        CasePanelComponent,
        TaskPanelContentComponent,
        WorkflowPanelComponent,
        TaskListComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexModule,
        DataFieldsModule,
        TranslateLibModule,
        SnackBarModule
    ],
    exports: [
        PanelComponent,
        TaskPanelComponent,
        CasePanelComponent,
        WorkflowPanelComponent,
        TaskPanelContentComponent,
        TaskListComponent,
    ],
    entryComponents: [
        TaskPanelContentComponent
    ]
})
export class PanelModule {
}
