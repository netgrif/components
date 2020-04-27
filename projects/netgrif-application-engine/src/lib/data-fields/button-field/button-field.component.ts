import {Component, Input} from '@angular/core';
import {ButtonField} from './models/button-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';

@Component({
    selector: 'nae-button-field',
    templateUrl: './button-field.component.html',
    styleUrls: ['./button-field.component.scss']
})
export class ButtonFieldComponent extends AbstractDataFieldComponent {

    @Input() dataField: ButtonField;

    // TODO BUG - disabled dont working on init, due ngDefaultControl

    constructor() {
        super();
    }

    public getErrorMessage() {
        if (this.formControl.hasError('required')) {
            return 'This field is required!';
        }
    }
}
