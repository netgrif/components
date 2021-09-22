import {NumberField, NumberFieldValidation} from './models/number-field';
import {TranslateService} from '@ngx-translate/core';
import {Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {WrappedBoolean} from '../data-field-template/models/wrapped-boolean';

export abstract class AbstractNumberErrorsComponent {

    @Input() showLargeLayout: WrappedBoolean;
    @Input() formControlRef: FormControl;
    @Input() numberField: NumberField;

    protected constructor(protected _translate: TranslateService) {
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
            const tmp = this.numberField?.validations?.find(value =>
                value.validationRule.includes(NumberFieldValidation.IN_RANGE)
            )?.validationRule?.split(' ');

            if (tmp === undefined) {
                throw new Error(`An IN_RANGE error was generated, but the number field '${this.numberField.stringId
                }' has no IN_RANGE validation!`);
            }

            return this.resolveErrorMessage(
                NumberFieldValidation.IN_RANGE, this._translate.instant('dataField.validations.inrange', {range: tmp[1]})
            );
        }
        return '';
    }

    resolveErrorMessage(search: string, generalMessage: string) {
        const validation = this.numberField?.validations?.find(value => value.validationRule.includes(search));
        if (validation !== undefined && validation.validationMessage && validation.validationMessage !== '') {
            return validation.validationMessage;
        }
        return generalMessage;
    }
}
