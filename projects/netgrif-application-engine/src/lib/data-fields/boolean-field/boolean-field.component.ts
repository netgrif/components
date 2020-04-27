import {Component, Input} from '@angular/core';
import {BooleanField} from './models/boolean-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';

@Component({
    selector: 'nae-boolean-field',
    templateUrl: './boolean-field.component.html',
    styleUrls: ['./boolean-field.component.scss']
})
export class BooleanFieldComponent extends AbstractDataFieldComponent {

    @Input() dataField: BooleanField;

    constructor() {
        super();
    }

    public getErrorMessage() {
        if (this.formControl.hasError('required')) {
            return 'This field is required!';
        } else if (this.formControl.hasError('requiredTrue')) {
            return this.resolveErrorMessage(this.dataField, 'requiredTrue',
                'Entered value must be true');
        }
        return '';
    }

    private resolveErrorMessage(dataField: BooleanField, search: string, generalMessage: string) {
        const validation = dataField.validations.find(value => value.validationRule.includes(search));
        if (validation.validationMessage && validation.validationMessage !== '') {
            return validation.validationMessage;
        }
        return generalMessage;
    }

}
