import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelComponent} from "./panel.component";
import {FlexModule} from "@angular/flex-layout";
import {MaterialModule} from "../material/material.module";
import {CovalentModule} from "../covalent/covalent.module";
import { CasePanelComponent } from './case-panel/case-panel.component';

@NgModule({
    declarations: [
        PanelComponent,
        CasePanelComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexModule,
        CovalentModule
    ],
    exports: [
        PanelComponent,
        CovalentModule,
        CasePanelComponent
    ]
})
export class PanelModule {
}
