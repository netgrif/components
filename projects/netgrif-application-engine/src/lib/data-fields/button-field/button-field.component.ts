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

  constructor() {
      super();
  }

}
