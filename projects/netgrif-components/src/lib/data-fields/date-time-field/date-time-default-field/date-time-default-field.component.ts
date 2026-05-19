import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractDateTimeDefaultFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    DateTimeField,
    DATE_TIME_FORMAT,
    DATE_TIME_SECONDS_FORMAT,
    LanguageService
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';
import {NGX_MAT_DATE_FORMATS, NgxMatDateAdapter} from '@angular-material-components/datetime-picker';
import {MAT_DATE_LOCALE} from '@angular/material/core';

export function dateTimeDefaultFormatsFactory(dataFieldPortalData?: DataFieldPortalData<DateTimeField>) {
    return dataFieldPortalData?.dataField?.showSeconds
        ? DATE_TIME_SECONDS_FORMAT
        : DATE_TIME_FORMAT;
}

@Component({
    selector: 'nc-date-time-default-field',
    templateUrl: './date-time-default-field.component.html',
    styleUrls: ['./date-time-default-field.component.scss'],
    providers: [
        {
            provide: NGX_MAT_DATE_FORMATS,
            useFactory: dateTimeDefaultFormatsFactory,
            deps: [[new Optional(), DATA_FIELD_PORTAL_DATA]]
        }
    ]
})
export class DateTimeDefaultFieldComponent extends AbstractDateTimeDefaultFieldComponent {

    constructor(_translate: TranslateService,
                _adapter: NgxMatDateAdapter<any>,
                @Inject(MAT_DATE_LOCALE) protected _locale: string,
                _languageService: LanguageService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<DateTimeField>) {
        super(_translate, _adapter, _locale, _languageService, dataFieldPortalData);
    }
}
