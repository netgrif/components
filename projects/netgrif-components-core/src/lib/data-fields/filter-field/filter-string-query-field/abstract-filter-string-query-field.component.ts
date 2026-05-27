import {Component, Inject, Injector, OnInit, Optional} from "@angular/core";
import {FilterField, FilterFieldValidation} from "../models/filter-field";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {FormControl} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'ncc-abstract-filter-string-query-field',
    template: ''
})
export abstract class AbstractFilterStringQueryFieldComponent extends AbstractBaseDataFieldComponent<FilterField> {

    constructor(protected _translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<FilterField>) {
        super(dataFieldPortalData);
    }

    public getErrorMessage() {
        if (this.formControlRef.hasError(FilterFieldValidation.REQUIRED)) {
            return this._translate.instant('dataField.validations.required');
        }
        return '';
    }
}
