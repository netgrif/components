import {Component, Inject, Optional} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
    AbstractPasswordTextFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData, NAE_SAVE_DATA_INFORM, TextField
} from '@netgrif/components-core';

@Component({
  selector: 'nc-password-text-field',
  templateUrl: './password-text-field.component.html',
  styleUrls: ['./password-text-field.component.scss']
})
export class PasswordTextFieldComponent extends AbstractPasswordTextFieldComponent {

    hide: boolean;

    constructor(protected _translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<TextField>,
                @Optional() @Inject(NAE_SAVE_DATA_INFORM) _saveDataInform: boolean | null = false) {
        super(_translate, dataFieldPortalData, _saveDataInform);
        this.hide = true;
    }
}
