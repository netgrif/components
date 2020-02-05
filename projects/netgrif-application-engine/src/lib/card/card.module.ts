import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrationCardComponent} from "./registration-card/registration-card.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {FlexModule} from "@angular/flex-layout";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
    declarations: [RegistrationCardComponent],
    exports: [RegistrationCardComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCardModule,
        FlexModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class CardModule {
}
