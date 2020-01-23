import {Component, Input, OnInit} from '@angular/core';
import {NumberField} from "./number-field";

@Component({
  selector: 'nae-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss']
})
export class NumberFieldComponent implements OnInit {

    @Input() public backedField: NumberField;

    ngOnInit() {
    }
}
