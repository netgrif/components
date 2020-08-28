import {Input, OnInit} from '@angular/core';
import {EnumerationField} from '../models/enumeration-field';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {FormControl} from '@angular/forms';

export abstract class AbstractEnumerationSelectFieldComponent implements OnInit {

    @Input() enumerationField: EnumerationField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

    ngOnInit() {
    }
}

