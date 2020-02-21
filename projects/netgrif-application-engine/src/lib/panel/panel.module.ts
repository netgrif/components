import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelComponent} from "./panel.component";
import {FlexModule} from "@angular/flex-layout";
import {MaterialModule} from "../material/material.module";
import { CasePanelComponent } from './case-panel/case-panel.component';

@NgModule({
    declarations: [
        PanelComponent,
        CasePanelComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexModule
    ],
    exports: [
        PanelComponent,
        CasePanelComponent
    ]
})
export class PanelModule {
}
