import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DataFieldTemplateComponent} from './data-field-template/data-field-template.component';
import {EnumerationFieldComponent} from './enumeration-field/enumeration-field.component';
import {
    MatAutocompleteModule,
    MatFormFieldModule, MatInputModule,
    MatListModule,
    MatOptionModule, MatRadioModule,
    MatSelectModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EnumerationListFieldComponent } from './enumeration-field/enumeration-list-field/enumeration-list-field.component';
import { EnumerationSelectFieldComponent } from './enumeration-field/enumeration-select-field/enumeration-select-field.component';
import { EnumerationAutocompleteSelectFieldComponent } from './enumeration-field/enumeration-autocomplete-select-field/enumeration-autocomplete-select-field.component';

@NgModule({
    declarations: [EnumerationFieldComponent, EnumerationListFieldComponent, EnumerationSelectFieldComponent, EnumerationAutocompleteSelectFieldComponent, DataFieldTemplateComponent],
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
        MatRadioModule,
        MatAutocompleteModule,
        MatInputModule
    ]
})
export class DataFieldsModule { }
