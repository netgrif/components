import {Component, Inject, Optional} from '@angular/core';
import {
    AbstractUserListDefaultFieldComponent,
    DATA_FIELD_PORTAL_DATA,
    DataFieldPortalData,
    SnackBarService,
    UserListField, ValidationRegistryService
} from "@netgrif/components-core";
import {TranslateService} from "@ngx-translate/core";
import {
    MultiUserAssignDialogComponent
} from '../../../dialog/multi-user-assign-dialog/multi-user-assign-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'nc-user-list-default-field',
  templateUrl: './user-list-default-field.component.html',
  styleUrls: ['./user-list-default-field.component.scss']
})
export class UserListDefaultFieldComponent extends AbstractUserListDefaultFieldComponent{

    constructor(dialog: MatDialog,
                snackbar: SnackBarService,
                translate: TranslateService,
                validationRegistry: ValidationRegistryService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<UserListField>) {
        super(dialog, snackbar, translate, validationRegistry, dataFieldPortalData);
    }

    public selectUser() {
        this.selectAbstractUser(MultiUserAssignDialogComponent);
    }

    public deleteUser(userId: string) {
        this.removeAbstractUser(userId);
    }

}
