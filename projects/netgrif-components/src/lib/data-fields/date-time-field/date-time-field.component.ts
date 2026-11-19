import {MAT_DATE_FORMATS} from '@angular/material/core';
import {Component, Inject, Optional, ChangeDetectionStrategy} from '@angular/core';
import {AbstractDateTimeFieldComponent, DATE_TIME_FORMAT, NAE_INFORM_ABOUT_INVALID_DATA} from '@netgrif/components-core';

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-date-time-field',
    templateUrl: './date-time-field.component.html',
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: DATE_TIME_FORMAT}
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DateTimeFieldComponent extends AbstractDateTimeFieldComponent {

    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}
