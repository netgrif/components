import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractBooleanDefaultFieldComponent,
    BooleanField,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    ValidationRegistryService,
} from '@netgrif/components-core';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'nc-boolean-default-field',
    templateUrl: './boolean-default-field.component.html',
    styleUrls: ['./boolean-default-field.component.scss']
})
export class BooleanDefaultFieldComponent extends AbstractBooleanDefaultFieldComponent {

    constructor(_translate: TranslateService,
                _validationRegistry: ValidationRegistryService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<BooleanField>) {
        super(_translate, _validationRegistry, dataFieldPortalData);
    }

}
