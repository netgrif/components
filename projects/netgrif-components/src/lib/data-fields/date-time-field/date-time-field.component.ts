import {Component, Inject, Optional} from '@angular/core';
import {NGX_MAT_DATE_FORMATS, NgxMatDateAdapter} from '@angular-material-components/datetime-picker';
import {TranslateService} from '@ngx-translate/core';
import {AbstractDateTimeFieldComponent, DATE_TIME_FORMAT, NAE_INFORM_ABOUT_INVALID_DATA, LanguageService} from '@netgrif/components-core';
import {MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
    selector: 'nc-date-time-field',
    templateUrl: './date-time-field.component.html',
    styleUrls: ['./date-time-field.component.scss'],
    providers: [
        {provide: NGX_MAT_DATE_FORMATS, useValue: DATE_TIME_FORMAT}
    ]
})
export class DateTimeFieldComponent extends AbstractDateTimeFieldComponent {

    constructor(translate: TranslateService,
                protected _adapter: NgxMatDateAdapter<any>,
                @Inject(MAT_DATE_LOCALE) protected _locale: string,
                protected _languageService: LanguageService,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(translate, _adapter, _locale, _languageService, informAboutInvalidData);
    }
}
