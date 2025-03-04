import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractEnumerationListFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData, EnumerationField, ValidationRegistryService
} from '@netgrif/components-core';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'nc-enumeration-list-field',
    templateUrl: './enumeration-list-field.component.html',
    styleUrls: ['./enumeration-list-field.component.scss']
})
export class EnumerationListFieldComponent extends AbstractEnumerationListFieldComponent {
    constructor(translate: TranslateService,
                validationRegistry: ValidationRegistryService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<EnumerationField>) {
        super(translate, validationRegistry, dataFieldPortalData);
    }
}
