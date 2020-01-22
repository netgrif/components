import { Component, OnInit } from '@angular/core';
import {NumberField} from "./number-field";

@Component({
  selector: 'nae-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss']
})
export class NumberFieldComponent implements OnInit {

    private backedField: NumberField;

  constructor() { }

  ngOnInit() {
  }

}
