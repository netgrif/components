import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {FlexModule} from "@angular/flex-layout";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {LoginCardComponent} from "./login-card/login-card.component";
import {ForgottenPasswordCardComponent} from "./forgotten-password-card/forgotten-password-panel.component";
import {RouterModule} from "@angular/router";


@NgModule({
    declarations: [LoginCardComponent, ForgottenPasswordCardComponent],
    exports: [LoginCardComponent, ForgottenPasswordCardComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCardModule,
        FlexModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        RouterModule
    ]
})
export class CardModule {
}
