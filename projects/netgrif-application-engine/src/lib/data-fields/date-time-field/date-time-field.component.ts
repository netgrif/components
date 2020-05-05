import {Component, Input} from '@angular/core';
import {DateTimeField} from './models/date-time-field';
import {DATE_TIME_FORMAT} from '../../moment/time-formats';
import {NGX_MAT_DATE_FORMATS} from '@angular-material-components/datetime-picker';
import {AbstractTimeInstanceFieldComponent} from '../time-instance-abstract-field/abstract-time-instance-field.component';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../translate/language.service';


@Component({
    selector: 'nae-date-time-field',
    templateUrl: './date-time-field.component.html',
    styleUrls: ['./date-time-field.component.scss'],
    providers: [
        {provide: NGX_MAT_DATE_FORMATS, useValue: DATE_TIME_FORMAT}
    ]
})
export class DateTimeFieldComponent extends AbstractTimeInstanceFieldComponent {

    @Input() public dataField: DateTimeField;

    constructor(protected _translate: TranslateService, private _lang: LanguageService) {
        super(_translate);
    }

    getErrorMessage() {
        return this.buildErrorMessage(this.dataField);
    }
}
