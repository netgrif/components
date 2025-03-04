import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractSimpleTextFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    TextField, ValidationRegistryService
} from '@netgrif/components-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'nc-simple-text-field',
    templateUrl: './simple-text-field.component.html',
    styleUrls: ['./simple-text-field.component.scss']
})
export class SimpleTextFieldComponent extends AbstractSimpleTextFieldComponent {
    constructor(translate: TranslateService,
                validationRegistry: ValidationRegistryService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextField>) {
        super(translate, validationRegistry, dataFieldPortalData);
    }
}
