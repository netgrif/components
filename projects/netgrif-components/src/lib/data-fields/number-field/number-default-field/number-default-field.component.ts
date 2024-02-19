import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractDefaultNumberFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    NumberField,
    ValidationRegistryService
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-number-default-field',
    templateUrl: './number-default-field.component.html',
    styleUrls: ['./number-default-field.component.scss']
})
export class NumberDefaultFieldComponent extends AbstractDefaultNumberFieldComponent {
    constructor(translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<NumberField>,
                _validationRegistry: ValidationRegistryService) {
        super(translate, dataFieldPortalData, _validationRegistry);
    }
}
