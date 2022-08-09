import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
    MaterialModule,
    CovalentModule,
    TranslateLibModule,
    CustomDateAdapter,
    CurrencyModule
} from '@netgrif/components-core';
import {AngularResizeEventModule} from 'angular-resize-event';
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
import {HtmlTextareaFieldComponent} from './text-field/html-textarea-field/html-textarea-field.component';
import {QuillModule} from 'ngx-quill';
import {NumberCurrencyFieldComponent} from './number-field/number-currency-field/number-currency-field.component';
import {NumberDefaultFieldComponent} from './number-field/number-default-field/number-default-field.component';
import {PasswordTextFieldComponent} from './text-field/password-text-field/password-text-field.component';
import {PreviewDialogComponent} from './file-field/preview-dialog/preview-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {EnumerationStepperFieldComponent} from './enumeration-field/enumeration-stepper-field/enumeration-stepper-field.component';
import {EnumerationIconFieldComponent} from './enumeration-field/enumeration-icon-field/enumeration-icon-field.component';
import {
    EnumerationAutocompleteDynamicFieldComponent
} from './enumeration-field/enumeration-autocomplete-dynamic-field/enumeration-autocomplete-dynamic-field.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {FilterFieldComponent} from './filter-field/filter-field.component';
import {FilterFieldContentComponent} from './filter-field/filter-field-content/filter-field-content.component';
import {AdvancedSearchComponentModule} from '../search/advanced-search/advanced-search.module';
import {SideMenuUserAssignComponentModule} from '../side-menu/content-components/user-assign/side-menu-user-assign-component.module';
import { I18nFieldComponent } from './i18n-field/i18n-field.component';
import { I18nDividerFieldComponent } from './i18n-field/i18n-divider-field/i18n-divider-field.component';
import { I18nTextFieldComponent } from './i18n-field/i18n-text-field/i18n-text-field.component';
import { EasymdeWrapperComponent } from './text-field/rich-textarea-field/easymde-wrapper/easymde-wrapper.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UserListFieldComponent } from './user-list-field/user-list-field.component';

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
        RequiredLabelComponent,
        HtmlTextareaFieldComponent,
        PasswordTextFieldComponent,
        NumberCurrencyFieldComponent,
        NumberDefaultFieldComponent,
        PreviewDialogComponent,
        NumberDefaultFieldComponent,
        EnumerationStepperFieldComponent,
        EnumerationIconFieldComponent,
        EnumerationAutocompleteDynamicFieldComponent,
        FilterFieldComponent,
        FilterFieldContentComponent,
        I18nFieldComponent,
        I18nDividerFieldComponent,
        I18nTextFieldComponent,
        EasymdeWrapperComponent,
        UserListFieldComponent,
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
		UserFieldComponent,
		FilterFieldComponent,
		I18nFieldComponent,
		UserListFieldComponent
	],
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        CovalentModule,
        AngularResizeEventModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgxMatDatetimePickerModule,
        NgxMatMomentModule,
        TranslateLibModule,
        SideMenuUserAssignComponentModule,
        QuillModule.forRoot(),
        MatDialogModule,
        AdvancedSearchComponentModule,
        MatProgressSpinnerModule,
        CurrencyModule,
        BrowserModule,
        BrowserAnimationsModule
    ],
    providers: [
        { provide: DateAdapter, useClass: CustomDateAdapter }
    ]
})
export class DataFieldsComponentModule {
}
