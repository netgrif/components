import {TextField} from './models/text-field';
import {TranslateService} from '@ngx-translate/core';
import {Component, Inject, Optional} from "@angular/core";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../models/data-field-portal-data-injection-token";
import {AbstractBaseDataFieldComponent} from "../base-component/abstract-base-data-field.component";
import {ValidationRegistryService} from "../../registry/validation-registry.service";

@Component({
    selector: 'ncc-text-errors',
    template: ''
})
export abstract class AbstractTextErrorsComponent<T extends TextField> extends AbstractBaseDataFieldComponent<T>{

    protected constructor(_translate: TranslateService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<T>,
                          _validationRegistry: ValidationRegistryService) {
        super(_translate, dataFieldPortalData, _validationRegistry);
    }
}
