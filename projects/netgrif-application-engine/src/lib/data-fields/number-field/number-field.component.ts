import {Component, Input} from '@angular/core';
import {NumberField} from './models/number-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';

@Component({
  selector: 'nae-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss']
})
export class NumberFieldComponent extends AbstractDataFieldComponent {

    @Input() public dataField: NumberField;

    constructor() {
        super();
    }

    getErrorMessage() {
        if (this.formControl.hasError('validOdd')) {
            return this.resolveErrorMessage('odd', 'Entered number must be odd');
        }
        if (this.formControl.hasError('validEven')) {
            return this.resolveErrorMessage('even', 'Entered number must be even');
        }
        if (this.formControl.hasError('validPositive')) {
            return this.resolveErrorMessage('positive', 'Entered number must be positive');
        }
        if (this.formControl.hasError('validNegative')) {
            return this.resolveErrorMessage('negative', 'Entered number must be negative');
        }
        if (this.formControl.hasError('validDecimal')) {
            return this.resolveErrorMessage('decimal', 'Entered number must be decimal');
        }
        if (this.formControl.hasError('validInRange')) {
            const tmp = this.dataField.validations.find(value => value.validationRule.includes('inrange')).validationRule.split(' ');
            return this.resolveErrorMessage('inrange', 'Entered number must be in range ' + tmp[1]);
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
