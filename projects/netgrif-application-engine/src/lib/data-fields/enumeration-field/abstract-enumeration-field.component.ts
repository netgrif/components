import {Input} from '@angular/core';
import {EnumerationField} from './models/enumeration-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {FormControl} from '@angular/forms';

export abstract class AbstractEnumerationFieldComponent extends AbstractDataFieldComponent {

    @Input() dataField: EnumerationField;

    constructor() {
        super();
        this._formControl = new FormControl('');
    }
}
