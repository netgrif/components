import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelComponent} from "./panel.component";
import {FlexModule} from "@angular/flex-layout";
import {MaterialModule} from "../material/material.module";

@NgModule({
    declarations: [
        PanelComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexModule
    ],
    exports: [
        PanelComponent,
    ]
})
export class PanelModule {
}
