import {Component, Inject, Optional} from '@angular/core';
import {TextField} from '../models/text-field';
import {TranslateService} from '@ngx-translate/core';
import {AbstractTextErrorsComponent} from '../abstract-text-errors.component';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {ValidationRegistryService} from "../../../validation/service/validation-registry.service";

@Component({
    selector: 'ncc-abstract-simple-text-field',
    template: ''
})
export abstract class AbstractSimpleTextFieldComponent extends AbstractTextErrorsComponent<TextField> {

    constructor(protected _translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextField>,
                _validationRegistry: ValidationRegistryService) {
        super(_translate, dataFieldPortalData, _validationRegistry);
    }

    public getErrorMessage() {
        return this.buildErrorMessage(this.dataField, this.formControlRef);
    }
}
