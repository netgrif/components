import {Component, Input} from '@angular/core';
import {DateTimeField} from './models/date-time-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';

@Component({
  selector: 'nae-date-time-field',
  templateUrl: './date-time-field.component.html',
  styleUrls: ['./date-time-field.component.scss']
})
export class DateTimeFieldComponent extends AbstractDataFieldComponent {

    @Input() public dataField: DateTimeField;

  constructor() {
      super();
  }

}
