import {NgModule} from '@angular/core';
import {TaskListComponent} from './task-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {PanelModule} from '../panel/panel.module';
import {CommonModule} from '@angular/common';


@NgModule({
    declarations: [
        TaskListComponent
    ],
    imports: [
        MatExpansionModule,
        PanelModule,
        CommonModule
    ],
    exports: [
    ]
})
export class TaskListModule {
}
