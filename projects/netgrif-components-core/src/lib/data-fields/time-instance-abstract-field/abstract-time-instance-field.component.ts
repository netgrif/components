import {AbstractTimeInstanceField} from './models/abstract-time-instance-field';
import {TranslateService} from '@ngx-translate/core';
import {Component, Inject, Optional} from '@angular/core';
import {AbstractBaseDataFieldComponent} from "../base-component/abstract-base-data-field.component";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../models/data-field-portal-data-injection-token";
import {ValidationRegistryService} from "../../registry/validation-registry.service";

@Component({
    selector: 'ncc-abstract-time-instance-field',
    template: ''
})
export abstract class AbstractTimeInstanceFieldComponent<T extends AbstractTimeInstanceField> extends AbstractBaseDataFieldComponent<T> {

    protected constructor(_translate: TranslateService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<T>,
                          _validationRegistry: ValidationRegistryService) {
        super(_translate, dataFieldPortalData, _validationRegistry)
    }

}
