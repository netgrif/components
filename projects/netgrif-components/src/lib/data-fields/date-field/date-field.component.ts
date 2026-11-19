import {Component, Inject, Optional, ChangeDetectionStrategy} from '@angular/core';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {AbstractDateFieldComponent, DATE_FORMAT, NAE_INFORM_ABOUT_INVALID_DATA} from '@netgrif/components-core';

/**
 * @deprecated
 * */
@Component({
    selector: 'nc-date-field',
    templateUrl: './date-field.component.html',
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT}
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DateFieldComponent extends AbstractDateFieldComponent {
    constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }
}
