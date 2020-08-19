import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
    MaterialModule,
    CovalentModule,
    TranslateLibModule,
    CustomDateAdapter
} from '@netgrif/application-engine';
import {AngularResizedEventModule} from 'angular-resize-event';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';
import {NgxMatMomentModule} from '@angular-material-components/moment-adapter';
import {BooleanFieldComponent} from './boolean-field/boolean-field.component';
import {ButtonFieldComponent} from './button-field/button-field.component';
import {DateAdapter} from '@angular/material/core';
import {DataFieldTemplateComponent} from './data-field-template/data-field-template.component';
import {DateFieldComponent} from './date-field/date-field.component';
import {DateTimeFieldComponent} from './date-time-field/date-time-field.component';
import {EnumerationFieldComponent} from './enumeration-field/enumeration-field.component';
import {
    EnumerationAutocompleteSelectFieldComponent
} from './enumeration-field/enumeration-autocomplete-select-field/enumeration-autocomplete-select-field.component';
import {EnumerationSelectFieldComponent} from './enumeration-field/enumeration-select-field/enumeration-select-field.component';
import {EnumerationListFieldComponent} from './enumeration-field/enumeration-list-field/enumeration-list-field.component';
import {FileFieldComponent} from './file-field/file-field.component';
import {FileListFieldComponent} from './file-field-list/file-list-field.component';
import {MultichoiceFieldComponent} from './multichoice-field/multichoice-field.component';
import {MultichoiceSelectFieldComponent} from './multichoice-field/multichoice-select-field/multichoice-select-field.component';
import {MultichoiceListFieldComponent} from './multichoice-field/multichoice-list-field/multichoice-list-field.component';
import {NumberFieldComponent} from './number-field/number-field.component';
import {TextFieldComponent} from './text-field/text-field.component';
import {TextareaFieldComponent} from './text-field/textarea-field/textarea-field.component';
import {RichTextareaFieldComponent} from './text-field/rich-textarea-field/rich-textarea-field.component';
import {SimpleTextFieldComponent} from './text-field/simple-text-field/simple-text-field.component';
import {UserFieldComponent} from './user-field/user-field.component';
import {RequiredLabelComponent} from './required-label/required-label.component';


@NgModule({
    declarations: [
        BooleanFieldComponent,
        ButtonFieldComponent,
        DataFieldTemplateComponent,
        DateFieldComponent,
        DateTimeFieldComponent,
        EnumerationFieldComponent,
        EnumerationAutocompleteSelectFieldComponent,
        EnumerationSelectFieldComponent,
        EnumerationListFieldComponent,
        FileFieldComponent,
        FileListFieldComponent,
        MultichoiceFieldComponent,
        MultichoiceSelectFieldComponent,
        MultichoiceListFieldComponent,
        NumberFieldComponent,
        TextFieldComponent,
        TextareaFieldComponent,
        RichTextareaFieldComponent,
        SimpleTextFieldComponent,
        UserFieldComponent,
        RequiredLabelComponent
    ],
    exports: [
        BooleanFieldComponent,
        ButtonFieldComponent,
        DataFieldTemplateComponent,
        DateFieldComponent,
        DateTimeFieldComponent,
        EnumerationFieldComponent,
        FileFieldComponent,
        FileListFieldComponent,
        MultichoiceFieldComponent,
        NumberFieldComponent,
        TextFieldComponent,
        UserFieldComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        CovalentModule,
        AngularResizedEventModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgxMatDatetimePickerModule,
        NgxMatMomentModule,
        TranslateLibModule
    ],
    providers: [
        {provide: DateAdapter, useClass: CustomDateAdapter}
    ]
})
export class DataFieldsComponentModule {
}
