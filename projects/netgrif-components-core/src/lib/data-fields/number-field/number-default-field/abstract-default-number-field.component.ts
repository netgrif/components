import {TranslateService} from '@ngx-translate/core';
import {AbstractNumberErrorsComponent} from '../abstract-number-errors.component';
import {Component, Inject, Optional} from '@angular/core';
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {NumberField} from "../models/number-field";
import {ValidationRegistryService} from "../../../validation/service/validation-registry.service";

@Component({
    selector: 'ncc-abstract-number-default-field',
    template: ''
})
export abstract class AbstractDefaultNumberFieldComponent extends AbstractNumberErrorsComponent {

    protected constructor(translateService: TranslateService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<NumberField>,
                          _validationRegistry: ValidationRegistryService) {
        super(translateService, dataFieldPortalData, _validationRegistry);
    }
}
