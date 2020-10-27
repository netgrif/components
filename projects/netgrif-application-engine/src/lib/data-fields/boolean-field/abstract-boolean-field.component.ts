import {Input} from '@angular/core';
import {BooleanField, BooleanFieldValidation} from './models/boolean-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {TranslateService} from '@ngx-translate/core';
import {FormControl} from '@angular/forms';

export abstract class AbstractBooleanFieldComponent extends AbstractDataFieldComponent {

    @Input() dataField: BooleanField;

    constructor(protected _translate: TranslateService) {
        super();
        this._formControl = new FormControl('');
    }

    public getErrorMessage() {
        if (this.formControl.hasError(BooleanFieldValidation.REQUIRED)) {
            return this._translate.instant('dataField.validations.required');
        } else if (this.formControl.hasError(BooleanFieldValidation.REQUIRED_TRUE)) {
            return this.resolveErrorMessage(this.dataField, BooleanFieldValidation.REQUIRED_TRUE,
                this._translate.instant('dataField.validations.requiredTrue'));
        }
        return '';
    }

    public createValueLabel(): string {
        return this._translate.instant('dataField.values.boolean.' + this.dataField.value);
    }

    private resolveErrorMessage(dataField: BooleanField, search: string, generalMessage: string) {
        const validation = dataField.validations.find(value => value.validationRule.includes(search));
        if (validation.validationMessage && validation.validationMessage !== '') {
            return validation.validationMessage;
        }
        return generalMessage;
    }
}
