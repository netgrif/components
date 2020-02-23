import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {LoginCardComponent} from "./login-card/login-card.component";
import {MaterialModule} from "../material/material.module";


@NgModule({
    declarations: [LoginCardComponent],
    exports: [LoginCardComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule
    ]
})
export class CardModule {
}
