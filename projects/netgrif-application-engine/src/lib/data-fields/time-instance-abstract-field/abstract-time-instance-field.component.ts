import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {AbstractTimeInstanceField} from './models/abstract-time-instance-field';
import {TranslateService} from '@ngx-translate/core';

export abstract class AbstractTimeInstanceFieldComponent extends AbstractDataFieldComponent {

    protected constructor(protected _translate: TranslateService) {
        super();
    }

    // TODO correct locale (date format and first day of the week)
    public buildErrorMessage(dataField: AbstractTimeInstanceField) {
        if (this.formControl.hasError('required')) {
            return this._translate.instant('dataField.validations.required');
        }
        if (this.formControl.hasError('validBetween')) {
            const tmp = dataField.validations.find(value => value.validationRule.includes('between')).validationRule.split(' ');
            return this.resolveErrorMessage(dataField, 'between', this._translate.instant('dataField.validations.dateRange') + tmp[1]);
        }
        if (this.formControl.hasError('validWorkday')) {
            return this.resolveErrorMessage(dataField, 'workday', this._translate.instant('dataField.validations.workday'));
        }
        if (this.formControl.hasError('validWeekend')) {
            return this.resolveErrorMessage(dataField, 'weekend', this._translate.instant('dataField.validations.weekend'));
        }
        return '';
    }

    protected resolveErrorMessage(dataField: AbstractTimeInstanceField, search: string, generalMessage: string) {
        const validation = dataField.validations.find(value => value.validationRule.includes(search));
        if (validation.validationMessage && validation.validationMessage !== '') {
            return validation.validationMessage;
        }
        return generalMessage;
    }

}
