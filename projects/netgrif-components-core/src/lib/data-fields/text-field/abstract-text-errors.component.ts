import {FormControl} from '@angular/forms';
import {TextField, TextFieldValidation} from './models/text-field';
import {TranslateService} from '@ngx-translate/core';
import {TextAreaField} from './models/text-area-field';
import {ValidationRegistryService} from "../../validation/service/validation-registry.service";
import {FieldTypeResource} from "../../task-content/model/field-type-resource";

export abstract class AbstractTextErrorsComponent {

    protected constructor(protected _translate: TranslateService,
                          protected _validationRegistry: ValidationRegistryService) {

    }

    protected buildErrorMessage(textField: TextField | TextAreaField, formControlRef: FormControl) {

        const validators = [...this._validationRegistry.registry.values()].filter(v => v.fieldType === FieldTypeResource.TEXT);

        validators.forEach(validator => {
            if (formControlRef.hasError(validator.validityError)) {
                return this.resolveErrorMessage(textField, validator.key, this._translate.instant('dataField.validations.pattern'));
            }
        })


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
        const validation = textField.validations.find(value => value.name === search);
        if (validation.validationMessage && validation.validationMessage !== '') {
            return validation.validationMessage;
        }
        return generalMessage;
    }
}
