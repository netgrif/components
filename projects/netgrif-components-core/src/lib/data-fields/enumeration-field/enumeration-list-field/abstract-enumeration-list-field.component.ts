import {Component, Inject, Optional} from '@angular/core';
import {EnumerationField} from '../models/enumeration-field';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";
import {TranslateService} from "@ngx-translate/core";
import {ValidationRegistryService} from "../../../registry/validation/validation-registry.service";

@Component({
    selector: 'ncc-abstract-enumeration-list-field',
    template: ''
})
export abstract class AbstractEnumerationListFieldComponent extends AbstractBaseDataFieldComponent<EnumerationField>{

    constructor(protected _translate: TranslateService,
                protected _validationRegistry: ValidationRegistryService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<EnumerationField>) {
        super(_translate, _validationRegistry, dataFieldPortalData);
    }

    resetEnum(): void {
        this.formControlRef.reset();
    }
}
