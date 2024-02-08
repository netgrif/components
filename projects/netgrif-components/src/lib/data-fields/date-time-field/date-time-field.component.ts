import {Component, Inject, Optional} from '@angular/core';
import {NGX_MAT_DATE_FORMATS} from '@angular-material-components/datetime-picker';
import {AbstractDateTimeFieldComponent, DATE_TIME_FORMAT, NAE_INFORM_ABOUT_INVALID_DATA} from '@netgrif/components-core';

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-date-time-field',
    templateUrl: './date-time-field.component.html',
    styleUrls: ['./date-time-field.component.scss'],
    providers: [
        {provide: NGX_MAT_DATE_FORMATS, useValue: DATE_TIME_FORMAT}
    ]
})
export class DateTimeFieldComponent extends AbstractDateTimeFieldComponent {

    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}
