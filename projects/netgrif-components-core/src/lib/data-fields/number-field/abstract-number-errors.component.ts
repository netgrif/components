import {NumberField, NumberFieldValidation} from './models/number-field';
import {TranslateService} from '@ngx-translate/core';
import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {WrappedBoolean} from '../data-field-template/models/wrapped-boolean';
import {ValidationRegistryService} from "../../validation/service/validation-registry.service";

@Component({
    selector: 'ncc-abstract-number-errors-field',
    template: ''
})
export abstract class AbstractNumberErrorsComponent {

    @Input() showLargeLayout: WrappedBoolean;
    @Input() formControlRef: FormControl;
    @Input() numberField: NumberField;

    protected constructor(protected _translate: TranslateService,
                          protected _validationRegistry: ValidationRegistryService) {
    }

    getErrorMessage() {
        if (this.formControlRef.hasError(NumberFieldValidation.REQUIRED)) {
            return this._translate.instant('dataField.validations.required');
        }
        if (this.formControlRef.hasError(NumberFieldValidation.VALID_ODD)) {
            return this.resolveErrorMessage(NumberFieldValidation.ODD, this._translate.instant('dataField.validations.odd'));
        }
        if (this.formControlRef.hasError(NumberFieldValidation.VALID_EVEN)) {
            return this.resolveErrorMessage(NumberFieldValidation.EVEN, this._translate.instant('dataField.validations.even'));
        }
        if (this.formControlRef.hasError(NumberFieldValidation.VALID_POSITIVE)) {
            return this.resolveErrorMessage(NumberFieldValidation.POSITIVE, this._translate.instant('dataField.validations.positive'));
        }
        if (this.formControlRef.hasError(NumberFieldValidation.VALID_NEGATIVE)) {
            return this.resolveErrorMessage(NumberFieldValidation.NEGATIVE, this._translate.instant('dataField.validations.negative'));
        }
        if (this.formControlRef.hasError(NumberFieldValidation.VALID_DECIMAL)) {
            return this.resolveErrorMessage(NumberFieldValidation.DECIMAL, this._translate.instant('dataField.validations.decimal'));
        }
        if (this.formControlRef.hasError(NumberFieldValidation.VALID_IN_RANGE)) {
            const tmp = this.numberField.validations.find(value =>
                value.name === NumberFieldValidation.IN_RANGE
            ).arguments;
            return this.resolveErrorMessage(
                NumberFieldValidation.IN_RANGE, this._translate.instant('dataField.validations.inrange', {range: tmp.from.value + ',' + tmp.to.value})
            );
        }
        return '';
    }

    resolveErrorMessage(search: string, generalMessage: string) {
        const validation = this.numberField.validations.find(value => value.name === search);
        if (validation.validationMessage && validation.validationMessage !== '') {
            return validation.validationMessage;
        }
        return generalMessage;
    }
}
