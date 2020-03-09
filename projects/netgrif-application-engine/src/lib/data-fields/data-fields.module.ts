import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DataFieldTemplateComponent} from './data-field-template/data-field-template.component';
import {TextFieldComponent} from './text-field/text-field.component';
import {
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatOptionModule,
    MatRadioModule,
    MatSelectModule
} from "@angular/material";
import { TextareaFieldComponent } from './text-field/textarea-field/textarea-field.component';
import { SimpleTextFieldComponent } from './text-field/simple-text-field/simple-text-field.component';
import {EnumerationFieldComponent} from "./enumeration-field/enumeration-field.component";
import {EnumerationListFieldComponent} from "./enumeration-field/enumeration-list-field/enumeration-list-field.component";
import {EnumerationSelectFieldComponent} from "./enumeration-field/enumeration-select-field/enumeration-select-field.component";
import {EnumerationAutocompleteSelectFieldComponent} from "./enumeration-field/enumeration-autocomplete-select-field/enumeration-autocomplete-select-field.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NumberFieldComponent} from "./number-field/number-field.component";
import {MatSlideToggleModule} from "@angular/material";

@NgModule({
    declarations: [
        TextFieldComponent,
        TextareaFieldComponent,
        SimpleTextFieldComponent,
        EnumerationFieldComponent,
        EnumerationListFieldComponent,
        EnumerationSelectFieldComponent,
        EnumerationAutocompleteSelectFieldComponent,
        NumberFieldComponent,
        MultichoiceFieldComponent,
        MultichoiceSelectFieldComponent,
        MultichoiceListFieldComponent,
        DataFieldTemplateComponent,
        BooleanFieldComponent
    ],
    exports: [
        TextFieldComponent,
        EnumerationFieldComponent,
        NumberFieldComponent,
        MultichoiceFieldComponent,
        BooleanFieldComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        MatListModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatAutocompleteModule,
        MatInputModule,
        MatSlideToggleModule
    ]
})
export class DataFieldsModule { }
