import {Component, Input, OnInit} from '@angular/core';
import {BooleanField} from './models/boolean-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';

@Component({
  selector: 'nae-boolean-field',
  templateUrl: './boolean-field.component.html',
  styleUrls: ['./boolean-field.component.scss']
})
export class BooleanFieldComponent extends AbstractDataFieldComponent {

  @Input() dataField: BooleanField;

  constructor() {
      super();
  }

}
