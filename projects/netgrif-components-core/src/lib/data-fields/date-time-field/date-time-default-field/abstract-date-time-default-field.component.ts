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
import {ValidationRegistryService} from "../../../registry/validation-registry.service";

@Component({
    selector: 'ncc-abstract-date-time-default-field',
    template: ''
})
export abstract class AbstractDateTimeDefaultFieldComponent extends AbstractTimeInstanceFieldComponent<DateTimeField> {

    constructor(_translate: TranslateService,
                _adapter: NgxMatDateAdapter<any>,
                @Inject(MAT_DATE_LOCALE) _locale: string,
                _languageService: LanguageService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<DateTimeField>,
                _validationRegistry: ValidationRegistryService) {
        super(_translate, _adapter, _locale, _languageService, dataFieldPortalData, _validationRegistry);
    }
}
