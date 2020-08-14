import {Component, Input} from '@angular/core';
import {EnumerationField} from './models/enumeration-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'nae-enumeration-field',
    templateUrl: './enumeration-field.component.html',
    styleUrls: ['./enumeration-field.component.scss']
})
export class EnumerationFieldComponent extends AbstractDataFieldComponent {

    @Input() dataField: EnumerationField;

    constructor() {
        super();
        this._formControl = new FormControl('');
    }

}
