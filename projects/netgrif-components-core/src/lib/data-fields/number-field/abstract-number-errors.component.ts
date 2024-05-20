import {NumberField, NumberFieldValidation} from './models/number-field';
import {TranslateService} from '@ngx-translate/core';
import {Component, Inject, Optional} from '@angular/core';
import {AbstractBaseDataFieldComponent} from "../base-component/abstract-base-data-field.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../models/data-field-portal-data-injection-token";
import {NAE_SAVE_DATA_INFORM} from "../models/save-data-inform-token";

@Component({
    selector: 'ncc-abstract-number-errors-field',
    template: ''
})
export abstract class AbstractNumberErrorsComponent extends AbstractBaseDataFieldComponent<NumberField>{

    protected constructor(protected _translate: TranslateService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<NumberField>,
                          @Optional() @Inject(NAE_SAVE_DATA_INFORM) _saveDataInform: boolean | null = false) {
        super(dataFieldPortalData, _saveDataInform);
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
            const tmp = this.dataField.validations.find(value =>
                value.validationRule.includes(NumberFieldValidation.IN_RANGE)
            ).validationRule.split(' ');
            return this.resolveErrorMessage(
                NumberFieldValidation.IN_RANGE, this._translate.instant('dataField.validations.inrange', {range: tmp[1]})
            );
        }
        return '';
    }

    resolveErrorMessage(search: string, generalMessage: string) {
        const validation = this.dataField.validations.find(value => value.validationRule.includes(search));
        if (validation.validationMessage && validation.validationMessage !== '') {
            return validation.validationMessage;
        }
        return generalMessage;
    }
}
