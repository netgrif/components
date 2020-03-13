import {Component, Input, OnInit} from '@angular/core';
import {DateTimeField} from "./models/date-time-field";
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

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
