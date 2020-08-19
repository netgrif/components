import {Input} from '@angular/core';
import {MultichoiceField} from '../models/multichoice-field';
import {FormControl} from '@angular/forms';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';

export abstract class AbstractMultichoiceSelectFieldComponent {

    @Input() multichoiceField: MultichoiceField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

}
