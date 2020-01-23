import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from "./text-field/text-field.component";
import { NumberFieldComponent } from './number-field/number-field.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [TextFieldComponent, NumberFieldComponent],
    exports: [
        TextFieldComponent,
        NumberFieldComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule
    ]
})
export class DataFieldsModule { }
