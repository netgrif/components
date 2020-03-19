import {Component, Input} from '@angular/core';
import {DateField} from './models/date-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';

@Component({
    selector: 'nae-date-field',
    templateUrl: './date-field.component.html',
    styleUrls: ['./date-field.component.scss']
})
export class DateFieldComponent extends AbstractDataFieldComponent {

    @Input() public dataField: DateField;

    constructor() {
        super();
    }

    // TODO correct locale (date format and first day of the week)
}
