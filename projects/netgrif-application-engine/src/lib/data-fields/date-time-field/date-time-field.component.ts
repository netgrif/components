import {Component, Input} from '@angular/core';
import {DateTimeField} from './models/date-time-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {DATE_TIME_FORMAT} from '../../moment/time-formats';
import {NGX_MAT_DATE_FORMATS} from '@angular-material-components/datetime-picker';


@Component({
    selector: 'nae-date-time-field',
    templateUrl: './date-time-field.component.html',
    styleUrls: ['./date-time-field.component.scss'],
    providers: [
        {provide: NGX_MAT_DATE_FORMATS, useValue: DATE_TIME_FORMAT}
    ]
})
export class DateTimeFieldComponent extends AbstractDataFieldComponent {

    @Input() public dataField: DateTimeField;

    constructor() {
        super();
    }

    getErrorMessage(): string {
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
