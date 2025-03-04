import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractEnumerationIconFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData, EnumerationField, ValidationRegistryService
} from '@netgrif/components-core';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'nc-enumeration-icon-field',
    templateUrl: './enumeration-icon-field.component.html',
    styleUrls: ['./enumeration-icon-field.component.scss']
})
export class EnumerationIconFieldComponent extends AbstractEnumerationIconFieldComponent {

    constructor(translate: TranslateService,
                validationRegistry: ValidationRegistryService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<EnumerationField>) {
        super(translate, validationRegistry, dataFieldPortalData);
    }
}
