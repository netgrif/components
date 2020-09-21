import {Component} from '@angular/core';
import {NGX_MAT_DATE_FORMATS} from '@angular-material-components/datetime-picker';
import {TranslateService} from '@ngx-translate/core';
import {AbstractDateTimeFieldComponent, DATE_TIME_FORMAT} from '@netgrif/application-engine';

@Component({
    selector: 'nc-date-time-field',
    templateUrl: './date-time-field.component.html',
    styleUrls: ['./date-time-field.component.scss'],
    providers: [
        {provide: NGX_MAT_DATE_FORMATS, useValue: DATE_TIME_FORMAT}
    ]
})
export class DateTimeFieldComponent extends AbstractDateTimeFieldComponent {

    constructor(protected _translate: TranslateService) {
        super(_translate);
    }
}
