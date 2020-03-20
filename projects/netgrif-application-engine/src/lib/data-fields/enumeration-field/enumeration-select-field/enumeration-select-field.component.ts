import {Component, Input, OnInit} from '@angular/core';
import {EnumerationField} from '../models/enumeration-field';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'nae-enumeration-select-field',
  templateUrl: './enumeration-select-field.component.html',
  styleUrls: ['./enumeration-select-field.component.scss']
})
export class EnumerationSelectFieldComponent implements OnInit {

    @Input() enumerationField: EnumerationField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

    ngOnInit() {
    }

}

