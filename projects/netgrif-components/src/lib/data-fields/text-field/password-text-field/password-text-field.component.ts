import {Component, Inject, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
    AbstractPasswordTextFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData, TextField
} from '@netgrif/components-core';

@Component({
  selector: 'nc-password-text-field',
  templateUrl: './password-text-field.component.html',
  styleUrls: ['./password-text-field.component.scss'],
    standalone: false
})
export class PasswordTextFieldComponent extends AbstractPasswordTextFieldComponent {

    hide: boolean;

    constructor(protected _translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextField>) {
        super(_translate, dataFieldPortalData);
        this.hide = true;
    }
}
