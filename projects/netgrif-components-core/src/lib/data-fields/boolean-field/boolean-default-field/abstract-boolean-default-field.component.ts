import {Component, Inject, Optional} from "@angular/core";
import {BooleanField, BooleanFieldValidation} from "../models/boolean-field";
import {TranslateService} from "@ngx-translate/core";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";

@Component({
    selector: 'ncc-abstract-boolean-default-field',
    template: ''
})
export abstract class AbstractBooleanDefaultFieldComponent extends AbstractBaseDataFieldComponent<BooleanField> {

    constructor(protected _translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<BooleanField>) {
        super(dataFieldPortalData);
    }

    public getErrorMessage() {
        if (this.formControlRef.hasError(BooleanFieldValidation.REQUIRED)) {
            return this._translate.instant('dataField.validations.required');
        } else if (this.formControlRef.hasError(BooleanFieldValidation.REQUIRED_TRUE)) {
            return this.resolveErrorMessage(this.dataField, BooleanFieldValidation.REQUIRED_TRUE,
                this._translate.instant('dataField.validations.requiredTrue'));
        }
        return '';
    }

    public createValueLabel(): string {
        return this._translate.instant('dataField.values.boolean.' + this.dataField.value);
    }

    private resolveErrorMessage(dataField: BooleanField, search: string, generalMessage: string) {
        const validation = dataField.validations.find(value => value.validationRule.includes(search));
        if (validation.validationMessage && validation.validationMessage !== '') {
            return validation.validationMessage;
        }
        return generalMessage;
    }
}
