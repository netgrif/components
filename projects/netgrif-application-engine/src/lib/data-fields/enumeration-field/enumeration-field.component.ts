import {Component, Input, OnInit} from '@angular/core';
import {EnumerationField} from './models/enumeration-field';

@Component({
    selector: 'nae-enumeration-field',
    templateUrl: './enumeration-field.component.html',
    styleUrls: ['./enumeration-field.component.scss']
})
export class EnumerationFieldComponent implements OnInit {

    @Input() enumerationField: EnumerationField;

    ngOnInit() {
    }

}
