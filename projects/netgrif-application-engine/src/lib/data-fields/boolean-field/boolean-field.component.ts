import {Component, Input, OnInit} from '@angular/core';
import {BooleanField} from "./models/boolean-field";

@Component({
  selector: 'nae-boolean-field',
  templateUrl: './boolean-field.component.html',
  styleUrls: ['./boolean-field.component.scss']
})
export class BooleanFieldComponent implements OnInit {

  @Input() booleanField: BooleanField;

  ngOnInit() {
  }

}
