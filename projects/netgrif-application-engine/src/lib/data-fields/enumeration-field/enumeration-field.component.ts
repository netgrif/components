import {Component, Input, OnInit} from '@angular/core';
import {EnumerationField} from './models/enumeration-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';

@Component({
    selector: 'nae-enumeration-field',
    templateUrl: './enumeration-field.component.html',
    styleUrls: ['./enumeration-field.component.scss']
})
export class EnumerationFieldComponent extends AbstractDataFieldComponent {

    @Input() dataField: EnumerationField;

    constructor() {
        super();
    }

}
