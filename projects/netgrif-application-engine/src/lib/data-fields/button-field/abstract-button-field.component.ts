import {Input} from '@angular/core';
import {ButtonField, ButtonFieldValidation} from './models/button-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {TranslateService} from '@ngx-translate/core';

export abstract class AbstractButtonFieldComponent extends AbstractDataFieldComponent {

    @Input() dataField: ButtonField;

    constructor(protected _translate: TranslateService) {
        super();
    }

    public getErrorMessage() {
        if (this.formControl.hasError(ButtonFieldValidation.REQUIRED)) {
            return this._translate.instant('dataField.validations.required');
        }
    }
}
