import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberFieldComponent } from './number-field/number-field.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [NumberFieldComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class DataFieldsModule { }
