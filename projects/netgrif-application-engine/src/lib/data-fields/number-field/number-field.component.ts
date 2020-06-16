import {Component, Input} from '@angular/core';
import {NumberField} from './models/number-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'nae-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss']
})
export class NumberFieldComponent extends AbstractDataFieldComponent {

    @Input() public dataField: NumberField;

    constructor(private _translate: TranslateService) {
        super();
    }

    getErrorMessage() {
        if (this.formControl.hasError('required')) {
            return this._translate.instant('dataField.validations.required');
        }
        if (this.formControl.hasError('validOdd')) {
            return this.resolveErrorMessage('odd', this._translate.instant('dataField.validations.odd'));
        }
        if (this.formControl.hasError('validEven')) {
            return this.resolveErrorMessage('even', this._translate.instant('dataField.validations.even'));
        }
        if (this.formControl.hasError('validPositive')) {
            return this.resolveErrorMessage('positive', this._translate.instant('dataField.validations.positive'));
        }
        if (this.formControl.hasError('validNegative')) {
            return this.resolveErrorMessage('negative', this._translate.instant('dataField.validations.negative'));
        }
        if (this.formControl.hasError('validDecimal')) {
            return this.resolveErrorMessage('decimal', this._translate.instant('dataField.validations.decimal'));
        }
        if (this.formControl.hasError('validInRange')) {
            const tmp = this.dataField.validations.find(value => value.validationRule.includes('inrange')).validationRule.split(' ');
            return this.resolveErrorMessage('inrange', this._translate.instant('dataField.validations.inrange', {range: tmp[1]}));
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
