import {Component, Input} from '@angular/core';
import {DateField} from './models/date-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';

@Component({
    selector: 'nae-date-field',
    templateUrl: './date-field.component.html',
    styleUrls: ['./date-field.component.scss']
})
export class DateFieldComponent extends AbstractDataFieldComponent {

    @Input() public dataField: DateField;

    constructor() {
        super();
    }

    // TODO correct locale (date format and first day of the week)

    getErrorMessage() {
        if (this.formControl.hasError('validBetween')) {
            const tmp = this.dataField.validations.find(value => value.validationRule.includes('between')).validationRule.split(' ');
            return this.resolveErrorMessage('between', 'Entered date must be in range ' + tmp[1]);
        }
        if (this.formControl.hasError('validWorkday')) {
            return this.resolveErrorMessage('workday', 'Entered date must be weekend day');
        }
        if (this.formControl.hasError('validWeekend')) {
            return this.resolveErrorMessage('weekend', 'Entered date must be week day');
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
