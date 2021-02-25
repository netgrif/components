import {Component, Input, OnInit} from '@angular/core';
import {EnumerationField, WrappedBoolean} from '@netgrif/application-engine';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'nc-enumeration-icon-field',
    templateUrl: './enumeration-icon-field.component.html',
    styleUrls: ['./enumeration-icon-field.component.scss']
})
export class EnumerationIconFieldComponent implements OnInit {

    @Input() enumerationField: EnumerationField;
    @Input() formControlRef: FormControl;
    @Input() showLargeLayout: WrappedBoolean;

    constructor() {
    }

    ngOnInit(): void {
    }

}
