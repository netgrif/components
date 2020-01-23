import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from './text-field/text-field.component';
import {MatFormFieldModule, MatInputModule} from "@angular/material";

@NgModule({
    declarations: [TextFieldComponent],
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
