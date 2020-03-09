import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DataFieldTemplateComponent} from './data-field-template/data-field-template.component';
import {TextFieldComponent} from './text-field/text-field.component';
import {MatFormFieldModule, MatInputModule} from "@angular/material";
import { TextareaFieldComponent } from './text-field/textarea-field/textarea-field.component';
import { SimpleTextFieldComponent } from './text-field/simple-text-field/simple-text-field.component';

@NgModule({
    declarations: [
        TextFieldComponent,
        TextareaFieldComponent,
        SimpleTextFieldComponent,
        EnumerationFieldComponent,
        EnumerationListFieldComponent,
        EnumerationSelectFieldComponent,
        EnumerationAutocompleteSelectFieldComponent,
        DataFieldTemplateComponent
    ],
    exports: [
        TextFieldComponent,
        EnumerationFieldComponent
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
        MatInputModule
    ]
})
export class DataFieldsModule { }
