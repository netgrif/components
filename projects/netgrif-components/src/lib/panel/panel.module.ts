import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelComponent} from './panel.component';
import {FlexModule} from '@angular/flex-layout';
import {TaskPanelComponent} from './task-panel/task-panel.component';
import {CasePanelComponent} from './case-panel/case-panel.component';
import {TaskListComponent} from './task-panel-list/task-list.component';
import {WorkflowPanelComponent} from './workflow-panel/workflow-panel.component';
import {DataFieldsComponentModule} from '../data-fields/data-fields.module';
import {MaterialModule, SnackBarModule, TranslateLibModule, CurrencyModule} from '@netgrif/application-engine';
import {TaskContentComponentModule} from '../task-content/task-content.module';
import {PublicWorkflowPanelComponent} from './public-workflow-panel/public-workflow-panel.component';
import {SideMenuUserAssignComponentModule} from '../side-menu/content-components/user-assign/side-menu-user-assign-component.module';
import {ImmediateFilterTextComponent} from './immediate/immediate-filter-text/immediate-filter-text.component';
import {ImmediateFilterTextContentComponent} from './immediate/immediate-filter-text-content/immediate-filter-text-content.component';

@NgModule({
    declarations: [
        PanelComponent,
        TaskPanelComponent,
        CasePanelComponent,
        WorkflowPanelComponent,
        TaskListComponent,
        PublicWorkflowPanelComponent,
        ImmediateFilterTextComponent,
        ImmediateFilterTextContentComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexModule,
        DataFieldsComponentModule,
        TranslateLibModule,
        SnackBarModule,
        TaskContentComponentModule,
        SideMenuUserAssignComponentModule,
        CurrencyModule
    ],
    exports: [
        PanelComponent,
        TaskPanelComponent,
        CasePanelComponent,
        WorkflowPanelComponent,
        TaskListComponent,
        PublicWorkflowPanelComponent,
        ImmediateFilterTextComponent,
    ],
    entryComponents: [
        ImmediateFilterTextContentComponent,
    ]
})
export class PanelComponentModule {
}
