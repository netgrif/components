import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelComponent} from './panel.component';
import {FlexModule} from '@angular/flex-layout';
import {TaskPanelComponent} from './task-panel/task-panel.component';
import {CasePanelComponent} from './case-panel/case-panel.component';
import {TaskListComponent} from './task-panel-list/task-list.component';
import {WorkflowPanelComponent} from './workflow-panel/workflow-panel.component';
import {DataFieldsComponentModule} from '../data-fields/data-fields.module';
import {MaterialModule, SnackBarModule, TranslateLibModule} from '@netgrif/application-engine';
import {SideMenuContentComponentModule} from '../side-menu/content-components/side-menu-content-component.module';
import {TaskContentComponentModule} from '../task-content/task-content.module';

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
        DataFieldsComponentModule,
        TranslateLibModule,
        SnackBarModule,
        TaskContentComponentModule,
        SideMenuContentComponentModule
    ],
    exports: [
        PanelComponent,
        TaskPanelComponent,
        CasePanelComponent,
        WorkflowPanelComponent,
        TaskListComponent,
    ]
})
export class PanelComponentModule {
}
