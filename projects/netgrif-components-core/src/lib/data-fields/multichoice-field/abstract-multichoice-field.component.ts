import {Inject, Input, Optional} from '@angular/core';
import {MultichoiceField} from './models/multichoice-field';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {FormControl} from '@angular/forms';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';

export abstract class AbstractMultichoiceFieldComponent extends AbstractDataFieldComponent {

  @Input() dataField: MultichoiceField;

  protected constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
      super(informAboutInvalidData);
      this._formControl = new FormControl('');
  }
}
