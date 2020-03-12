import {Component, Input, OnInit} from '@angular/core';
import {NumberField} from "./number-field";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'nae-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss']
})
export class NumberFieldComponent implements OnInit {

    @Input() public numberField: NumberField;

    ngOnInit() {
    }
}
