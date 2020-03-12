import {Component, Input, OnInit} from '@angular/core';
import {EnumerationField} from '../enumeration-field';
import {FormControl, Validators} from '@angular/forms';
import {WrappedBoolean} from '../../data-field-template/wrapped-boolean';

@Component({
  selector: 'nae-enumeration-list-field',
  templateUrl: './enumeration-list-field.component.html',
  styleUrls: ['./enumeration-list-field.component.scss']
})
export class EnumerationListFieldComponent implements OnInit {

    @Input() enumerationField: EnumerationField;
    @Input() showLargeLayout: WrappedBoolean;
    selected: string;
    validate: FormControl;

    ngOnInit() {
        this.validate = new FormControl('', [Validators.required]);
        this.selected = this.enumerationField.value.key;
    }

}
