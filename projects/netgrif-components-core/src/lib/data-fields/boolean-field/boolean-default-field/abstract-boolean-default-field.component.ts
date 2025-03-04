import {Component, Inject, Optional} from "@angular/core";
import {BooleanField} from "../models/boolean-field";
import {TranslateService} from "@ngx-translate/core";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";
import {ValidationRegistryService} from "../../../registry/validation/validation-registry.service";

@Component({
    selector: 'ncc-abstract-boolean-default-field',
    template: ''
})
export abstract class AbstractBooleanDefaultFieldComponent extends AbstractBaseDataFieldComponent<BooleanField> {

    constructor(protected _translate: TranslateService,
                protected _validationRegistry: ValidationRegistryService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<BooleanField>) {
        super(_translate, _validationRegistry, dataFieldPortalData);
    }

    public createValueLabel(): string {
        return this._translate.instant('dataField.values.boolean.' + this.dataField.value);
    }
}
