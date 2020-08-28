import {Input} from '@angular/core';
import {TextField} from './models/text-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';

export abstract class AbstractTextFieldComponent extends AbstractDataFieldComponent {

    @Input() dataField: TextField;

    constructor() {
        super();
    }
}
