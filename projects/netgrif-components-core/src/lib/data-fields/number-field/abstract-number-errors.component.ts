import {NumberField} from './models/number-field';
import {TranslateService} from '@ngx-translate/core';
import {Component, Inject, Optional} from '@angular/core';
import {AbstractBaseDataFieldComponent} from "../base-component/abstract-base-data-field.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../models/data-field-portal-data-injection-token";
import {ValidationRegistryService} from "../../registry/validation-registry.service";

@Component({
    selector: 'ncc-abstract-number-errors-field',
    template: ''
})
export abstract class AbstractNumberErrorsComponent extends AbstractBaseDataFieldComponent<NumberField>{

    protected constructor(_translate: TranslateService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<NumberField>,
                          _validationRegistry: ValidationRegistryService) {
        super(_translate, dataFieldPortalData, _validationRegistry);
    }
}
