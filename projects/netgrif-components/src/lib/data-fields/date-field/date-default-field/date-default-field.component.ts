import {Component, Inject, Optional, ChangeDetectionStrategy} from '@angular/core';
import {
    AbstractDateDefaultFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    DATE_FORMAT, LanguageService, DateField
} from '@netgrif/components-core';
import {TranslateService} from "@ngx-translate/core";
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter} from "@angular/material/core";

@Component({
  selector: 'nc-date-default-field',
  templateUrl: './date-default-field.component.html',
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT}
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DateDefaultFieldComponent extends AbstractDateDefaultFieldComponent {

    constructor(_translate: TranslateService,
                _adapter: DateAdapter<any>,
                @Inject(MAT_DATE_LOCALE) protected _locale: string,
                _languageService: LanguageService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<DateField>) {
        super(_translate, _adapter, _locale, _languageService, dataFieldPortalData);

    }

}
