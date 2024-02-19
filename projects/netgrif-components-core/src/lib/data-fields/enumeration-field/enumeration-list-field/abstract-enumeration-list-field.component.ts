import {Component, Inject, Optional} from '@angular/core';
import {EnumerationField} from '../models/enumeration-field';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";

@Component({
    selector: 'ncc-abstract-enumeration-list-field',
    template: ''
})
export abstract class AbstractEnumerationListFieldComponent extends AbstractBaseDataFieldComponent<EnumerationField>{

    constructor(@Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<EnumerationField>) {
        super(undefined, dataFieldPortalData);
    }

    resetEnum(): void {
        this.formControlRef.reset();
    }
}
