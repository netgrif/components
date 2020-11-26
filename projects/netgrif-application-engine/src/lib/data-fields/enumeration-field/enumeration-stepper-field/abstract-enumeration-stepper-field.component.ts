import {Input, OnInit} from '@angular/core';
import {EnumerationField} from '../models/enumeration-field';
import {FormControl} from '@angular/forms';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';

export class AbstractEnumerationStepperFieldComponent implements OnInit {

    @Input() enumerationField: EnumerationField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

    ngOnInit() {
    }

    canShowDoneIcon(index: number) {
        return index <= this.enumerationField.choices.findIndex(choice => choice.key === this.enumerationField.value);
    }
}
