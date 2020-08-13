import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {DataFieldTemplateComponent} from './data-field-template/data-field-template.component';
import {TextFieldComponent} from './text-field/text-field.component';
import {TextareaFieldComponent} from './text-field/textarea-field/textarea-field.component';
import {SimpleTextFieldComponent} from './text-field/simple-text-field/simple-text-field.component';
import {EnumerationFieldComponent} from './enumeration-field/enumeration-field.component';
import {EnumerationListFieldComponent} from './enumeration-field/enumeration-list-field/enumeration-list-field.component';
import {EnumerationSelectFieldComponent} from './enumeration-field/enumeration-select-field/enumeration-select-field.component';
import {
    EnumerationAutocompleteSelectFieldComponent
} from './enumeration-field/enumeration-autocomplete-select-field/enumeration-autocomplete-select-field.component';
import {NumberFieldComponent} from './number-field/number-field.component';
import {MultichoiceFieldComponent} from './multichoice-field/multichoice-field.component';
import {MultichoiceSelectFieldComponent} from './multichoice-field/multichoice-select-field/multichoice-select-field.component';
import {MultichoiceListFieldComponent} from './multichoice-field/multichoice-list-field/multichoice-list-field.component';
import {BooleanFieldComponent} from './boolean-field/boolean-field.component';
import {DateFieldComponent} from './date-field/date-field.component';
import {FileFieldComponent} from './file-field/file-field.component';
import {MaterialModule} from '../material/material.module';
import {SideMenuModule} from '../side-menu/side-menu.module';
import {HttpClientModule} from '@angular/common/http';
import {AngularResizedEventModule} from 'angular-resize-event';
import {UserFieldComponent} from './user-field/user-field.component';
import {DateTimeFieldComponent} from './date-time-field/date-time-field.component';
import {ButtonFieldComponent} from './button-field/button-field.component';
import {RequiredLabelComponent} from './required-label/required-label.component';
import {CovalentModule} from '../covalent/covalent.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CustomDateAdapter} from './date-field/models/custom-date-adapter';
import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';
import {NgxMatMomentModule} from '@angular-material-components/moment-adapter';
import {RichTextareaFieldComponent} from './text-field/rich-textarea-field/rich-textarea-field.component';
import {TranslateLibModule} from '../translate/translate-lib.module';
import {DateAdapter} from '@angular/material/core';
import { FileListFieldComponent } from './file-list-field/file-list-field.component';

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
        DateFieldComponent,
        BooleanFieldComponent,
        FileFieldComponent,
        UserFieldComponent,
        DateTimeFieldComponent,
        ButtonFieldComponent,
        DataFieldTemplateComponent,
        RequiredLabelComponent,
        RichTextareaFieldComponent,
        FileListFieldComponent,
    ],
    exports: [
        TextFieldComponent,
        EnumerationFieldComponent,
        NumberFieldComponent,
        MultichoiceFieldComponent,
        BooleanFieldComponent,
        DateFieldComponent,
        FileFieldComponent,
        UserFieldComponent,
        DateTimeFieldComponent,
        ButtonFieldComponent,
        FileListFieldComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        CovalentModule,
        AngularResizedEventModule,
        HttpClientModule,
        SideMenuModule,
        ReactiveFormsModule,
        NgxMatDatetimePickerModule,
        NgxMatMomentModule,
        TranslateLibModule
    ],
    providers: [
        {provide: DateAdapter, useClass: CustomDateAdapter}
    ]
})
export class DataFieldsModule {
}
