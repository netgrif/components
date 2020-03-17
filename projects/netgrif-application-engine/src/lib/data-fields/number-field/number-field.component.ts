import {Component, Input} from '@angular/core';
import {NumberField} from './models/number-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';

@Component({
  selector: 'nae-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss']
})
export class NumberFieldComponent extends AbstractDataFieldComponent {

    @Input() public dataField: NumberField;

    constructor() {
        super();
    }

}
