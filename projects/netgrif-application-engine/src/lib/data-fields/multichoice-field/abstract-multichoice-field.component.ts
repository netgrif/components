import {Input} from '@angular/core';
import {MultichoiceField} from './models/multichoice-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {FormControl} from '@angular/forms';

export abstract class AbstractMultichoiceFieldComponent extends AbstractDataFieldComponent {

  @Input() dataField: MultichoiceField;

  constructor() {
      super();
      this._formControl = new FormControl('');
  }
}
