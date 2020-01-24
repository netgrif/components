import {Component, Input, OnInit} from '@angular/core';
import {EnumerationField} from "../enumeration-field";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'nae-enumeration-list-field',
  templateUrl: './enumeration-list-field.component.html',
  styleUrls: ['./enumeration-list-field.component.scss']
})
export class EnumerationListFieldComponent implements OnInit {

    @Input() enumerationField: EnumerationField;
    selected: string;
    validate: FormControl;

    ngOnInit() {
        this.validate = new FormControl(this.enumerationField.value.key, [Validators.required]);
        this.selected = this.enumerationField.value.key;
    }

}
