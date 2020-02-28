import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractTabComponent } from './abstract-tab/abstract-tab.component';
import { CaseTabComponent } from './case-tab/case-tab.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MaterialModule} from "../material/material.module";
import {TaskTabComponent} from "./task-tab/task-tab.component";
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
    declarations: [AbstractTabComponent, CaseTabComponent, TaskTabComponent],
    exports: [
        CaseTabComponent,
        AbstractTabComponent,
        TaskTabComponent
    ],
    imports: [
        CommonModule,
        MatTabsModule,
        MaterialModule,
        FlexLayoutModule
    ]
})
export class TabsModule { }
