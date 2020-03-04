import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabGroupComponent } from './tab-group/tab-group.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MaterialModule} from "../material/material.module";


@NgModule({
    declarations: [TabGroupComponent],
    exports: [
        TabGroupComponent
    ],
    imports: [
        CommonModule,
        MatTabsModule,
        MaterialModule
    ]
})
export class TabsModule { }
