import {Component, Input} from '@angular/core';
import {DateField} from './models/date-field';
import {DATE_FORMAT} from '../../moment/time-formats';
import {AbstractTimeInstanceFieldComponent} from '../time-instance-abstract-field/abstract-time-instance-field.component';
import {TranslateService} from '@ngx-translate/core';
import {MAT_DATE_FORMATS} from '@angular/material/core';


@Component({
    selector: 'nae-date-field',
    templateUrl: './date-field.component.html',
    styleUrls: ['./date-field.component.scss'],
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT}
    ]
})
export class DateFieldComponent extends AbstractTimeInstanceFieldComponent {

    @Input() public dataField: DateField;

    constructor(protected _translate: TranslateService) {
        super(_translate);
    }

    getErrorMessage() {
        return this.buildErrorMessage(this.dataField);
    }
}
