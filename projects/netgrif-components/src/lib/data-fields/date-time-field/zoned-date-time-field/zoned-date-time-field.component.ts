import { Component, Inject, OnInit, Optional } from '@angular/core';
import {
    AbstractZonedDateTimeFieldComponent,
    NAE_INFORM_ABOUT_INVALID_DATA,
    DATE_TIME_FORMAT
} from '@netgrif/components-core';
import { NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'nc-zoned-date-time-field',
  templateUrl: './zoned-date-time-field.component.html',
  styleUrls: ['./zoned-date-time-field.component.scss'],
    providers: [
        {provide: NGX_MAT_DATE_FORMATS, useValue: DATE_TIME_FORMAT}
    ]
})
export class ZonedDateTimeFieldComponent extends AbstractZonedDateTimeFieldComponent {

    constructor(translate: TranslateService,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(translate, informAboutInvalidData);
    }

}
