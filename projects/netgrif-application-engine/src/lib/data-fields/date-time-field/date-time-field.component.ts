import {Component, Input, OnInit} from '@angular/core';
import {DateTimeField} from "./date-time-field";

@Component({
  selector: 'nae-date-time-field',
  templateUrl: './date-time-field.component.html',
  styleUrls: ['./date-time-field.component.scss']
})
export class DateTimeFieldComponent implements OnInit {

    @Input() public dateTimeField: DateTimeField;

  ngOnInit() {
  }

}
