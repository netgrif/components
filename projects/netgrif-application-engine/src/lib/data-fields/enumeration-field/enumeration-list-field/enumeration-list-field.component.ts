import {Component, Input, OnInit} from '@angular/core';
import {EnumerationField} from '../models/enumeration-field';
import {FormControl} from '@angular/forms';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';

@Component({
  selector: 'nae-enumeration-list-field',
  templateUrl: './enumeration-list-field.component.html',
  styleUrls: ['./enumeration-list-field.component.scss']
})
export class EnumerationListFieldComponent implements OnInit {

    @Input() enumerationField: EnumerationField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

    ngOnInit() {
    }

}
