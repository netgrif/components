import {Component, Input, OnInit} from '@angular/core';
import {EnumerationField} from '../models/enumeration-field';
import {FormControl, Validators} from '@angular/forms';
import {WrappedBoolean} from '../../data-field-template/models/wrapped-boolean';

@Component({
  selector: 'nae-enumeration-select-field',
  templateUrl: './enumeration-select-field.component.html',
  styleUrls: ['./enumeration-select-field.component.scss']
})
export class EnumerationSelectFieldComponent implements OnInit {

    @Input() enumerationField: EnumerationField;
    @Input() showLargeLayout: WrappedBoolean;
    selected: string;
    validate: FormControl;

    ngOnInit() {
        this.validate = new FormControl(this.enumerationField.value.key, [Validators.required]);
        this.selected = this.enumerationField.value.key;
    }

}

