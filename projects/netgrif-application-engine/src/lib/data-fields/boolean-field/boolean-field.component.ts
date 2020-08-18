import {Component, Input} from '@angular/core';
import {BooleanField, BooleanFieldValidation} from './models/boolean-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {TranslateService} from '@ngx-translate/core';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'nae-boolean-field',
    templateUrl: './boolean-field.component.html',
    styleUrls: ['./boolean-field.component.scss']
})
export class BooleanFieldComponent extends AbstractDataFieldComponent {

    @Input() dataField: BooleanField;

    constructor(private _translate: TranslateService) {
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

    private resolveErrorMessage(dataField: BooleanField, search: string, generalMessage: string) {
        const validation = dataField.validations.find(value => value.validationRule.includes(search));
        if (validation.validationMessage && validation.validationMessage !== '') {
            return validation.validationMessage;
        }
        return generalMessage;
    }

}
