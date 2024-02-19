import {Component, Inject, Optional} from '@angular/core';
import {MultichoiceField} from '../models/multichoice-field';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";

@Component({
    selector: 'ncc-abstract-multichoice-select-field',
    template: ''
})
export abstract class AbstractMultichoiceSelectFieldComponent extends AbstractBaseDataFieldComponent<MultichoiceField> {

    constructor(@Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<MultichoiceField>) {
        super(undefined, dataFieldPortalData);
    }

}
