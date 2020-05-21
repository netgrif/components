import {Component, Input} from '@angular/core';
import {DateField} from './models/date-field';
import {MAT_DATE_FORMATS} from '@angular/material';
import {DATE_FORMAT} from '../../moment/time-formats';
import {AbstractTimeInstanceFieldComponent} from '../time-instance-abstract-field/abstract-time-instance-field.component';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../translate/language.service';


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

    constructor(protected _translate: TranslateService, private _lang: LanguageService) {
        super(_translate);
    }

    getErrorMessage() {
        return this.buildErrorMessage(this.dataField);
    }
}
