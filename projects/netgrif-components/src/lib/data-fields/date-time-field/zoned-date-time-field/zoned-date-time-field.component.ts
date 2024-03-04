import { Component, Inject, Optional } from '@angular/core';
import {
    AbstractZonedDateTimeFieldComponent,
    DATE_TIME_FORMAT, LanguageService, DATA_FIELD_PORTAL_DATA, DataFieldPortalData, DateTimeField
} from '@netgrif/components-core';
import {NGX_MAT_DATE_FORMATS, NgxMatDateAdapter} from '@angular-material-components/datetime-picker';
import { TranslateService } from '@ngx-translate/core';
import {MAT_DATE_LOCALE} from "@angular/material/core";

@Component({
  selector: 'nc-zoned-date-time-field',
  templateUrl: './zoned-date-time-field.component.html',
  styleUrls: ['./zoned-date-time-field.component.scss'],
    providers: [
        {provide: NGX_MAT_DATE_FORMATS, useValue: DATE_TIME_FORMAT}
    ]
})
export class ZonedDateTimeFieldComponent extends AbstractZonedDateTimeFieldComponent {

    constructor(_translate: TranslateService,
                _adapter: NgxMatDateAdapter<any>,
                @Inject(MAT_DATE_LOCALE) protected _locale: string,
                _languageService: LanguageService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<DateTimeField>) {
        super(_translate, _adapter, _locale, _languageService, dataFieldPortalData);
    }

}
