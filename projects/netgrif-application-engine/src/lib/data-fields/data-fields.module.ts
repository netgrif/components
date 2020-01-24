import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnumerationFieldComponent } from './enumeration-field/enumeration-field.component';
import {
    MatFormFieldModule,
    MatListModule,
    MatOptionModule, MatRadioModule,
    MatSelectModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EnumerationListFieldComponent } from './enumeration-field/enumeration-list-field/enumeration-list-field.component';
import { EnumerationSelectFieldComponent } from './enumeration-field/enumeration-select-field/enumeration-select-field.component';

@NgModule({
    declarations: [EnumerationFieldComponent, EnumerationListFieldComponent, EnumerationSelectFieldComponent],
    exports: [
        EnumerationFieldComponent
    ],
    imports: [
        CommonModule,
        MatOptionModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        MatListModule,
        ReactiveFormsModule,
        MatRadioModule
    ]
})
export class DataFieldsModule { }
