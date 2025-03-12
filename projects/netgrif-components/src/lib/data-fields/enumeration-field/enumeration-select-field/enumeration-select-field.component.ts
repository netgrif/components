import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractEnumerationSelectFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData, EnumerationField, ValidationRegistryService
} from '@netgrif/components-core';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'nc-enumeration-select-field',
    templateUrl: './enumeration-select-field.component.html',
    styleUrls: ['./enumeration-select-field.component.scss']
})
export class EnumerationSelectFieldComponent extends AbstractEnumerationSelectFieldComponent {
    constructor(translate: TranslateService,
                validationRegistry: ValidationRegistryService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<EnumerationField>) {
        super(translate, validationRegistry, dataFieldPortalData);
    }
}
