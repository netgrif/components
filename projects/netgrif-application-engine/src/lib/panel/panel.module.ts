import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelComponent} from './panel.component';
import {FlexModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';
import { TaskPanelComponent } from './task-panel/task-panel.component';
import { CasePanelComponent } from './case-panel/case-panel.component';

@NgModule({
    declarations: [
        PanelComponent,
        TaskPanelComponent,
        CasePanelComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexModule
    ],
    exports: [
        PanelComponent,
        TaskPanelComponent
        CasePanelComponent
    ]
})
export class PanelModule {
}
