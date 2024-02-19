import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../material/material.module';
import {HttpClientModule} from '@angular/common/http';
import {AngularResizeEventModule} from 'angular-resize-event';
import {CovalentModule} from '../covalent/covalent.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CustomDateAdapter} from './date-field/models/custom-date-adapter';
import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';
import {NgxMatMomentModule} from '@angular-material-components/moment-adapter';
import {TranslateLibModule} from '../translate/translate-lib.module';
import {DateAdapter} from '@angular/material/core';
import {ValidationRegistryService} from "../registry/validation-registry.service";
import {
    betweenValidation,
    decimalValidation,
    emailValidation, evenValidation, inRangeValidation,
    maxLengthValidation,
    minLengthValidation, negativeValidation, oddValidation, positiveValidation,
    regexValidation, requiredTrueValidation, requiredValidation,
    telNumberValidation, translationOnlyValidation, translationRequiredValidation, weekendValidation, workdayValidation
} from "./models/validation-functions";
import {FieldTypeResource} from "../task-content/model/field-type-resource";

@NgModule({
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
        TranslateLibModule
    ],
    providers: [
        {provide: DateAdapter, useClass: CustomDateAdapter}
    ]
})
export class DataFieldsModule {
    constructor(validationRegistry: ValidationRegistryService) {
        validationRegistry.register(FieldTypeResource.TEXT, 'required', requiredValidation)
        validationRegistry.register(FieldTypeResource.TEXT, 'minLength', minLengthValidation)
        validationRegistry.register(FieldTypeResource.TEXT, 'maxLength', maxLengthValidation)
        validationRegistry.register(FieldTypeResource.TEXT, 'regex', regexValidation)
        validationRegistry.register(FieldTypeResource.TEXT, 'telNumber', telNumberValidation)
        validationRegistry.register(FieldTypeResource.TEXT, 'email', emailValidation)

        validationRegistry.register(FieldTypeResource.NUMBER, 'required', requiredValidation)
        validationRegistry.register(FieldTypeResource.NUMBER, 'odd', oddValidation)
        validationRegistry.register(FieldTypeResource.NUMBER, 'even', evenValidation)
        validationRegistry.register(FieldTypeResource.NUMBER, 'positive', positiveValidation)
        validationRegistry.register(FieldTypeResource.NUMBER, 'negative', negativeValidation)
        validationRegistry.register(FieldTypeResource.NUMBER, 'decimal', decimalValidation)
        validationRegistry.register(FieldTypeResource.NUMBER, 'inrange', inRangeValidation)

        validationRegistry.register(FieldTypeResource.BOOLEAN, 'requiredTrue', requiredTrueValidation)

        validationRegistry.register(FieldTypeResource.DATE, 'required', requiredValidation)
        validationRegistry.register(FieldTypeResource.DATE, 'between', betweenValidation)
        validationRegistry.register(FieldTypeResource.DATE, 'workday', workdayValidation)
        validationRegistry.register(FieldTypeResource.DATE, 'weekend', weekendValidation)
        validationRegistry.register(FieldTypeResource.DATE_TIME, 'required', requiredValidation)
        validationRegistry.register(FieldTypeResource.DATE_TIME, 'between', betweenValidation)
        validationRegistry.register(FieldTypeResource.DATE_TIME, 'workday', workdayValidation)
        validationRegistry.register(FieldTypeResource.DATE_TIME, 'weekend', weekendValidation)

        validationRegistry.register(FieldTypeResource.I18N, 'required', requiredValidation)
        validationRegistry.register(FieldTypeResource.I18N, 'translationRequired', translationRequiredValidation)
        validationRegistry.register(FieldTypeResource.I18N, 'translationOnly', translationOnlyValidation)
    }
}
