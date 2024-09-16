import {Component, Inject, Optional} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {
    DATA_FIELD_PORTAL_DATA,
    SnackBarService,
    DataFieldPortalData,
    UserField,
    AbstractUserDefaultFieldComponent,
    ValidationRegistryService
} from '@netgrif/components-core';
import {UserAssignDialogComponent} from '../../../dialog/user-assign-dialog/user-assign-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'nc-user-default-field',
  templateUrl: './user-default-field.component.html',
  styleUrls: ['./user-default-field.component.scss']
})
export class UserDefaultFieldComponent extends AbstractUserDefaultFieldComponent {

    constructor(dialog: MatDialog,
                snackbar: SnackBarService,
                translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<UserField>,
                _validationRegistry: ValidationRegistryService) {
        super(dialog, snackbar, translate, dataFieldPortalData, _validationRegistry);
    }

    public selectUser() {
        super.selectAbstractUser(UserAssignDialogComponent);
    }

}
