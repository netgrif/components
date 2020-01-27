import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DataFieldTemplateComponent} from './data-field-template/data-field-template.component';
import {EnumerationFieldComponent} from './enumeration-field/enumeration-field.component';
import {
    MatFormFieldModule,
    MatListModule,
    MatOptionModule, MatRadioModule,
    MatSelectModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EnumerationListFieldComponent} from './enumeration-field/enumeration-list-field/enumeration-list-field.component';
import {EnumerationSelectFieldComponent} from './enumeration-field/enumeration-select-field/enumeration-select-field.component';

@NgModule({
    declarations: [EnumerationFieldComponent, EnumerationListFieldComponent, EnumerationSelectFieldComponent, DataFieldTemplateComponent],
    exports: [
        EnumerationFieldComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatOptionModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        MatListModule,
        ReactiveFormsModule,
        MatRadioModule
    ]
})
export class DataFieldsModule {
}
