import {Component, Inject, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
    AbstractDateDefaultFieldComponent
} from "../../date-field/date-default-field/abstract-date-default-field.component";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {LanguageService} from "../../../translate/language.service";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {DateField} from "../../date-field/models/date-field";
import {DateTimeField} from "../models/date-time-field";
import {
    AbstractDateTimeDefaultFieldComponent
} from "../date-time-default-field/abstract-date-time-default-field.component";
import {NgxMatDateAdapter} from "@angular-material-components/datetime-picker";


@Component({
    selector: 'ncc-abstract-date-time-field',
    template: ''
})
export abstract class AbstractZonedDateTimeFieldComponent extends AbstractDateTimeDefaultFieldComponent {

    public timeZone: string;

    constructor(_translate: TranslateService,
                _adapter: NgxMatDateAdapter<any>,
                @Inject(MAT_DATE_LOCALE) _locale: string,
                _languageService: LanguageService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<DateTimeField>) {
        super(_translate, _adapter, _locale, _languageService, dataFieldPortalData)
        this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
}
