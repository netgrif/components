import { Component, Inject, OnInit, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
    AbstractSimpleDateTimeFieldComponent,
    DATE_TIME_FORMAT,
    NAE_INFORM_ABOUT_INVALID_DATA
} from 'netgrif-components-core';
import { NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';

@Component({
  selector: 'nc-simple-date-time-field',
  templateUrl: './simple-date-time-field.component.html',
  styleUrls: ['./simple-date-time-field.component.scss'],
    providers: [
        {provide: NGX_MAT_DATE_FORMATS, useValue: DATE_TIME_FORMAT}
    ]
})
export class SimpleDateTimeFieldComponent extends AbstractSimpleDateTimeFieldComponent {

    constructor(translate: TranslateService,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(translate, informAboutInvalidData);
    }

}
