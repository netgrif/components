import {Component, Inject, Optional} from '@angular/core';
import {MultichoiceField} from '../models/multichoice-field';
import {FormControl} from '@angular/forms';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";

@Component({
    selector: 'ncc-abstract-multichoice-list-field',
    template: ''
})
export abstract class AbstractMultichoiceListFieldComponent extends AbstractBaseDataFieldComponent<MultichoiceField> {

    selected: Array<string>;
    validate: FormControl;

    constructor(@Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<MultichoiceField>) {
        super(undefined, dataFieldPortalData);
    }
}
