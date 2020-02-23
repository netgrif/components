import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material/material.module";
import {ForgottenPasswordCardComponent} from "./forgotten-password-card/forgotten-password-panel.component";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
    declarations: [ForgottenPasswordCardComponent],
    exports: [ForgottenPasswordCardComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule
    ]
})
export class CardModule {
}
