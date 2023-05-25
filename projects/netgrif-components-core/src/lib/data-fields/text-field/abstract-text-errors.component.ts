import {FormControl} from '@angular/forms';
import {TextField, TextFieldValidation} from './models/text-field';
import {TranslateService} from '@ngx-translate/core';
import {TextAreaField} from './models/text-area-field';
import {Inject, Optional} from "@angular/core";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../models/data-field-portal-data-injection-token";
import {AbstractBaseDataFieldComponent} from "../base-component/abstract-base-data-field.component";

export abstract class AbstractTextErrorsComponent<T extends TextField> extends AbstractBaseDataFieldComponent<T>{

    protected constructor(protected _translate: TranslateService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<T>) {
        super(dataFieldPortalData);
    }

    protected buildErrorMessage(textField: TextField | TextAreaField, formControlRef: FormControl) {
        if (formControlRef.hasError(TextFieldValidation.REQUIRED)) {
            return this._translate.instant('dataField.validations.required');
        }
        if (formControlRef.hasError(TextFieldValidation.VALID_MIN_LENGTH)) {
            return this.resolveErrorMessage(textField, TextFieldValidation.MIN_LENGTH,
                this._translate.instant('dataField.validations.minLength', {length: formControlRef.errors.minlength.requiredLength}));
        }
        if (formControlRef.hasError(TextFieldValidation.VALID_MAX_LENGTH)) {
            return this.resolveErrorMessage(textField, TextFieldValidation.MAX_LENGTH,
                this._translate.instant('dataField.validations.maxLength', {length: formControlRef.errors.maxlength.requiredLength}));
        }
        if (formControlRef.hasError(TextFieldValidation.PATTERN)) {
            return this.resolveErrorMessage(textField, TextFieldValidation.REGEX, this._translate.instant('dataField.validations.pattern'));
        }
        if (formControlRef.hasError(TextFieldValidation.VALID_TEL_NUMBER)) {
            return this.resolveErrorMessage(
                textField, TextFieldValidation.TEL_NUMBER, this._translate.instant('dataField.validations.phone')
            );
        }
        if (formControlRef.hasError(TextFieldValidation.EMAIL)) {
            return this.resolveErrorMessage(textField, TextFieldValidation.EMAIL, this._translate.instant('dataField.validations.email'));
        }
        return '';
    }

    protected resolveErrorMessage(textField: TextField | TextAreaField, search: string, generalMessage: string) {
        const validation = textField.validations.find(value => value.validationRule.includes(search));
        if (validation.validationMessage && validation.validationMessage !== '') {
            return validation.validationMessage;
        }
        return generalMessage;
    }
}
