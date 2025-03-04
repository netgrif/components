import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractEnumerationAutocompleteDynamicFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    DynamicEnumerationField, ValidationRegistryService
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'nc-enumeration-autocomplete-dynamic-field',
  templateUrl: './enumeration-autocomplete-dynamic-field.component.html',
  styleUrls: ['./enumeration-autocomplete-dynamic-field.component.scss']
})
export class EnumerationAutocompleteDynamicFieldComponent extends AbstractEnumerationAutocompleteDynamicFieldComponent {

    constructor(protected _translate: TranslateService,
                validationRegistry: ValidationRegistryService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<DynamicEnumerationField>) {
        super(_translate, validationRegistry, dataFieldPortalData);
    }
}
