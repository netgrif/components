import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrationCardComponent} from "./registration-card/registration-card.component";
import {MaterialModule} from "../material/material.module";
import { FlexLayoutModule } from '@angular/flex-layout';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [RegistrationCardComponent],
    exports: [RegistrationCardComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
    ]
})
export class CardModule {
}
