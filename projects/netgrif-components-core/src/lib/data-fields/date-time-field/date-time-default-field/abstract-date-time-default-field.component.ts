import {Component, Inject, Optional} from "@angular/core";
import {
    AbstractTimeInstanceFieldComponent
} from "../../time-instance-abstract-field/abstract-time-instance-field.component";
import {TranslateService} from "@ngx-translate/core";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {DateTimeField} from "../models/date-time-field";
import {NgxMatDateAdapter} from "@angular-material-components/datetime-picker";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {LanguageService} from "../../../translate/language.service";

@Component({
    selector: 'ncc-abstract-date-time-default-field',
    template: ''
})
export abstract class AbstractDateTimeDefaultFieldComponent extends AbstractTimeInstanceFieldComponent<DateTimeField> {

    constructor(protected _translate: TranslateService,
                protected _adapter: NgxMatDateAdapter<any>,
                @Inject(MAT_DATE_LOCALE) protected _locale: string,
                protected _languageService: LanguageService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<DateTimeField>) {
        super(_translate, _adapter, _locale, _languageService, dataFieldPortalData);
    }

    public get showSeconds(): boolean {
        return this.dataField?.showSeconds ?? false;
    }

    public get stepHour(): number {
        return this.dataField?.stepHour ?? 1;
    }

    public get stepMinute(): number {
        return this.dataField?.stepMinute ?? 5;
    }

    public get stepSecond(): number {
        return this.dataField?.stepSecond ?? 1;
    }

    public get enableMeridian(): boolean {
        return this.dataField?.enableMeridian ?? false;
    }

    getErrorMessage() {
        return this.buildErrorMessage(this.dataField);
    }
}
