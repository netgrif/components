import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelComponent} from './panel.component';
import {FlexModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';
import { TaskPanelComponent } from './task-panel/task-panel.component';
import { CasePanelComponent } from './case-panel/case-panel.component';
import {DataFieldsModule} from '../data-fields/data-fields.module';
import {TaskListComponent} from './task-panel-list/task-list.component';
import { WorkflowPanelComponent } from './workflow-panel/workflow-panel.component';
import {TranslateLibModule} from '../translate/translate-lib.module';
import {SnackBarModule} from '../snack-bar/snack-bar.module';
import {TaskContentModule} from '../task-content/task-content.module';


@NgModule({
    declarations: [
        PanelComponent,
        TaskPanelComponent,
        CasePanelComponent,
        WorkflowPanelComponent,
        TaskListComponent,
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
        PanelComponent,
        TaskPanelComponent,
        CasePanelComponent,
        WorkflowPanelComponent,
        TaskListComponent,
    ]
})
export class PanelModule {
}
