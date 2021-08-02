import {Input} from '@angular/core';
import {EnumerationField} from '../models/enumeration-field';
import {FormControl} from '@angular/forms';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';

export abstract class AbstractEnumerationListFieldComponent {

    @Input() enumerationField: EnumerationField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

}
