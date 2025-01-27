import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@ngbracket/ngx-layout';
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
import {
    validBetween,
    validDecimal, validEmail,
    validEven, validInRange,
    validMaxLength,
    validMinLength, validNegative,
    validOdd, validPositive,
    validRegex, validTelNumber, validTranslationOnly, validTranslationRequired, validWeekend, validWorkday
} from "../registry/validation/model/default-validation-definitions";
import {ValidationRegistryService} from "../registry/validation/validation-registry.service";

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
        //TextField
        validationRegistry.register('minLength', validMinLength);
        validationRegistry.register('maxLength', validMaxLength);
        validationRegistry.register('regex', validRegex);
        validationRegistry.register('email', validEmail);
        validationRegistry.register('telNumber', validTelNumber);
        //NumberField
        validationRegistry.register('validOdd', validOdd);
        validationRegistry.register('validEven', validEven);
        validationRegistry.register('validNegative', validNegative);
        validationRegistry.register('validPositive', validPositive);
        validationRegistry.register('validDecimal', validDecimal);
        validationRegistry.register('validInRange', validInRange);
        //DateFields
        validationRegistry.register('validBetween', validBetween);
        validationRegistry.register('validWorkday', validWorkday);
        validationRegistry.register('validWeekend', validWeekend);
        //i18nField
        validationRegistry.register('validTranslationRequired', validTranslationRequired);
        validationRegistry.register('validTranslationOnly', validTranslationOnly);
    }
}
