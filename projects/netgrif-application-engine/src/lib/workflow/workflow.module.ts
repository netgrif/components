import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkflowViewComponent} from './workflow-view.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';
import {SideMenuModule} from '../side-menu/side-menu.module';
import { WorkflowsPanelGroupComponent } from './workflows-panel-group/workflows-panel-group.component';
import {HeaderModule} from '../header/header.module';
import {PanelModule} from '../panel/panel.module';
import {DataFieldsModule} from '../data-fields/data-fields.module';
import {ImportNetComponent} from '../side-menu/import-net/import-net.component';


@NgModule({
    declarations: [
        WorkflowViewComponent,
        WorkflowsPanelGroupComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        SideMenuModule,
        HeaderModule,
        PanelModule,
        DataFieldsModule
    ],
    exports: [
        WorkflowViewComponent,
        WorkflowsPanelGroupComponent
    ],
    entryComponents: [
        ImportNetComponent
    ]

})
export class WorkflowModule {
}
