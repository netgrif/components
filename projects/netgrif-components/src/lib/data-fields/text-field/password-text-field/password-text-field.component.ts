import {Component, Inject, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
    AbstractPasswordTextFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData, TextField, ValidationRegistryService
} from '@netgrif/components-core';

@Component({
  selector: 'nc-password-text-field',
  templateUrl: './password-text-field.component.html',
  styleUrls: ['./password-text-field.component.scss']
})
export class PasswordTextFieldComponent extends AbstractPasswordTextFieldComponent {

    hide: boolean;

    constructor(translate: TranslateService,
                validationRegistry: ValidationRegistryService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextField>) {
        super(translate, validationRegistry, dataFieldPortalData);
        this.hide = true;
    }
}
