import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractDateDefaultFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    DateField,
    ValidationRegistryService,
    DATE_FORMAT,
    LanguageService
} from '@netgrif/components-core';
import {TranslateService} from "@ngx-translate/core";
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {NgxMatDateAdapter} from "@angular-material-components/datetime-picker";

@Component({
  selector: 'nc-date-default-field',
  templateUrl: './date-default-field.component.html',
  styleUrls: ['./date-default-field.component.scss'],
    providers: [
        {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT}
    ]
})
export class DateDefaultFieldComponent extends AbstractDateDefaultFieldComponent {

    constructor(_translate: TranslateService,
                _adapter: NgxMatDateAdapter<any>,
                @Inject(MAT_DATE_LOCALE) protected _locale: string,
                _languageService: LanguageService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<DateField>,
                _validationRegistry: ValidationRegistryService) {
        super(_translate, _adapter, _locale, _languageService, dataFieldPortalData, _validationRegistry);

    }

}
