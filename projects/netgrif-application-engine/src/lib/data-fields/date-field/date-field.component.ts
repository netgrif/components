import {Component, Input, OnInit} from '@angular/core';
import {DateField} from "./date-field";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'nae-date-field',
    templateUrl: './date-field.component.html',
    styleUrls: ['./date-field.component.scss']
})
export class DateFieldComponent implements OnInit {

    @Input() public dateField: DateField;

    public validate: FormControl;

    ngOnInit() {
        this.validate = new FormControl(this.dateField.value);
    }

    // TODO correct locale (date format and first day of the week)
}
