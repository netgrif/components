import {Component, Input} from '@angular/core';
import {ButtonField, ButtonFieldValidation} from './models/button-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nae-button-field',
    templateUrl: './button-field.component.html',
    styleUrls: ['./button-field.component.scss']
})
export class ButtonFieldComponent extends AbstractDataFieldComponent {

    @Input() dataField: ButtonField;

    constructor(private _translate: TranslateService) {
        super();
    }

    public getErrorMessage() {
        if (this.formControl.hasError(ButtonFieldValidation.REQUIRED)) {
            return this._translate.instant('dataField.validations.required');
        }
    }
}
