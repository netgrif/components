import {Component, Input} from '@angular/core';
import {MultichoiceField} from './models/multichoice-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';

@Component({
  selector: 'nae-multichoice-field',
  templateUrl: './multichoice-field.component.html',
  styleUrls: ['./multichoice-field.component.scss']
})
export class MultichoiceFieldComponent extends AbstractDataFieldComponent {

  @Input() dataField: MultichoiceField;

  constructor() {
      super();
  }

}
