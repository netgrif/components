import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {AbstractTimeInstanceField} from './models/abstract-time-instance-field';

export abstract class AbstractTimeInstanceFieldComponent extends AbstractDataFieldComponent {

    protected constructor() {
        super();
    }

    // TODO correct locale (date format and first day of the week)
    public buildErrorMessage(dataField: AbstractTimeInstanceField) {
        if (this.formControl.hasError('validBetween')) {
            const tmp = dataField.validations.find(value => value.validationRule.includes('between')).validationRule.split(' ');
            return this.resolveErrorMessage(dataField, 'between', 'Entered date must be in range ' + tmp[1]);
        }
        if (this.formControl.hasError('validWorkday')) {
            return this.resolveErrorMessage(dataField, 'workday', 'Entered date must be weekend day');
        }
        if (this.formControl.hasError('validWeekend')) {
            return this.resolveErrorMessage(dataField, 'weekend', 'Entered date must be week day');
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
