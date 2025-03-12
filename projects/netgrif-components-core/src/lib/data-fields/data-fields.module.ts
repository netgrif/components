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
    validDecimal,
    validEmail,
    validEven,
    validInRange,
    validMaxLength,
    validMinLength,
    validNegative,
    validOdd,
    validPositive,
    validRegex, validRequiredI18n,
    validRequiredTrue,
    validTelNumber,
    validTranslationOnly,
    validTranslationRequired,
    validWeekend,
    validWorkday
} from "../registry/validation/model/default-validation-definitions";
import {ValidationRegistryService} from "../registry/validation/validation-registry.service";
import {
    AbstractTimeInstanceFieldValidation, BooleanFieldValidation, I18nFieldValidation,
    NumberFieldValidation,
    TextFieldValidation
} from '../registry/validation/model/validation-enums';

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
    constructor(protected _validationRegistry: ValidationRegistryService) {
        this.initializeValidations();
        this.initializeTranslations();
    }

    initializeValidations() {
        //TextField
        this._validationRegistry.register(TextFieldValidation.MIN_LENGTH, validMinLength);
        this._validationRegistry.register(TextFieldValidation.MAX_LENGTH, validMaxLength);
        this._validationRegistry.register(TextFieldValidation.REGEX, validRegex);
        this._validationRegistry.register(TextFieldValidation.EMAIL, validEmail);
        this._validationRegistry.register(TextFieldValidation.TEL_NUMBER, validTelNumber);
        //NumberField
        this._validationRegistry.register(NumberFieldValidation.ODD, validOdd);
        this._validationRegistry.register(NumberFieldValidation.EVEN, validEven);
        this._validationRegistry.register(NumberFieldValidation.NEGATIVE, validNegative);
        this._validationRegistry.register(NumberFieldValidation.POSITIVE, validPositive);
        this._validationRegistry.register(NumberFieldValidation.DECIMAL, validDecimal);
        this._validationRegistry.register(NumberFieldValidation.IN_RANGE, validInRange);
        //DateFields
        this._validationRegistry.register(AbstractTimeInstanceFieldValidation.BETWEEN, validBetween);
        this._validationRegistry.register(AbstractTimeInstanceFieldValidation.WORKDAY, validWorkday);
        this._validationRegistry.register(AbstractTimeInstanceFieldValidation.WEEKEND, validWeekend);
        //i18nField
        this._validationRegistry.register(I18nFieldValidation.TRANSLATION_REQUIRED, validTranslationRequired);
        this._validationRegistry.register(I18nFieldValidation.TRANSLATION_ONLY, validTranslationOnly);
        this._validationRegistry.register(I18nFieldValidation.REQUIRED_I18N, validRequiredI18n);
        //boolean
        this._validationRegistry.register(BooleanFieldValidation.REQUIRED_TRUE, validRequiredTrue);
    }

    initializeTranslations() {
        this._validationRegistry.registerTranslation(TextFieldValidation.MIN_LENGTH, 'dataField.validations.minLength');
        this._validationRegistry.registerTranslation(TextFieldValidation.MAX_LENGTH, 'dataField.validations.maxLength');
        this._validationRegistry.registerTranslation(TextFieldValidation.REGEX, 'dataField.validations.pattern');
        this._validationRegistry.registerTranslation(TextFieldValidation.EMAIL, 'dataField.validations.email');
        this._validationRegistry.registerTranslation(TextFieldValidation.TEL_NUMBER, 'dataField.validations.phone');
        //NumberField
        this._validationRegistry.registerTranslation(NumberFieldValidation.ODD, 'dataField.validations.odd');
        this._validationRegistry.registerTranslation(NumberFieldValidation.EVEN, 'dataField.validations.even');
        this._validationRegistry.registerTranslation(NumberFieldValidation.NEGATIVE, 'dataField.validations.negative');
        this._validationRegistry.registerTranslation(NumberFieldValidation.POSITIVE, 'dataField.validations.positive');
        this._validationRegistry.registerTranslation(NumberFieldValidation.DECIMAL, 'dataField.validations.decimal');
        this._validationRegistry.registerTranslation(NumberFieldValidation.IN_RANGE, 'dataField.validations.inrange');
        //DateFields
        this._validationRegistry.registerTranslation(AbstractTimeInstanceFieldValidation.BETWEEN, 'dataField.validations.dateRange');
        this._validationRegistry.registerTranslation(AbstractTimeInstanceFieldValidation.WORKDAY, 'dataField.validations.workday');
        this._validationRegistry.registerTranslation(AbstractTimeInstanceFieldValidation.WEEKEND, 'dataField.validations.weekend');
        //i18nField
        this._validationRegistry.registerTranslation(I18nFieldValidation.TRANSLATION_REQUIRED, 'dataField.validations.translationRequired');
        this._validationRegistry.registerTranslation(I18nFieldValidation.TRANSLATION_ONLY, 'dataField.validations.translationOnly');
        this._validationRegistry.registerTranslation(I18nFieldValidation.REQUIRED_I18N, 'dataField.validations.requiredI18n');
        //boolean
        this._validationRegistry.registerTranslation(BooleanFieldValidation.REQUIRED_TRUE, 'dataField.validations.requiredTrue');
    }
}
