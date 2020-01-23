import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberFieldComponent } from './number-field/number-field.component';
import { TextFieldComponent } from './text-field/text-field.component';
import {MatFormFieldModule, MatInputModule} from "@angular/material";

@NgModule({
    declarations: [TextFieldComponent, NumberFieldComponent],
    exports: [
        TextFieldComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class DataFieldsModule { }
