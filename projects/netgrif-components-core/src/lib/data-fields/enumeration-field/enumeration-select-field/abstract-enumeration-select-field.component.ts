import {Component, Input, OnInit} from '@angular/core';
import {EnumerationField} from '../models/enumeration-field';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'ncc-abstract-enumeration-select-field',
    template: ''
})
export abstract class AbstractEnumerationSelectFieldComponent {

    @Input() enumerationField: EnumerationField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;
}

