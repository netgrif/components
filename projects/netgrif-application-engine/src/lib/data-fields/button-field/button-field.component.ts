import {Component, Input, OnInit} from '@angular/core';
import {ButtonField} from "./models/button-field";

@Component({
  selector: 'nae-button-field',
  templateUrl: './button-field.component.html',
  styleUrls: ['./button-field.component.scss']
})
export class ButtonFieldComponent implements OnInit {

  @Input() buttonField: ButtonField;

  ngOnInit() {
  }

}
