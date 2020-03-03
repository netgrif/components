import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrationCardComponent} from "./registration-card/registration-card.component";
import {LoginCardComponent} from "./login-card/login-card.component";
import {ForgottenPasswordCardComponent} from "./forgotten-password-card/forgotten-password-panel.component";
import {MaterialModule} from "../material/material.module";
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [RegistrationCardComponent, LoginCardComponent, ForgottenPasswordCardComponent],
    exports: [RegistrationCardComponent, LoginCardComponent, ForgottenPasswordCardComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
    ]
})
export class CardModule {
}
