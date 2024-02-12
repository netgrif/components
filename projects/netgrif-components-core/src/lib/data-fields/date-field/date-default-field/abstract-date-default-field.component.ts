import {Component, Inject, Optional} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {DateField} from "../models/date-field";
import {
    AbstractTimeInstanceFieldComponent
} from "../../time-instance-abstract-field/abstract-time-instance-field.component";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {LanguageService} from "../../../translate/language.service";

@Component({
    selector: 'ncc-abstract-date-default-field',
    template: ''
})
export abstract class AbstractDateDefaultFieldComponent extends AbstractTimeInstanceFieldComponent<DateField> {

    constructor(protected _translate: TranslateService,
                protected _adapter: DateAdapter<any>,
                @Inject(MAT_DATE_LOCALE) protected _locale: string,
                protected _languageService: LanguageService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<DateField>) {
        super(_translate, _adapter, _locale, _languageService, dataFieldPortalData)
    }

    getErrorMessage() {
        return this.buildErrorMessage(this.dataField);
    }
}
