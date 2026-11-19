import {Component, Inject, Optional, ChangeDetectionStrategy} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {
    DATA_FIELD_PORTAL_DATA,
    SnackBarService,
    DataFieldPortalData,
    UserField,
    AbstractUserDefaultFieldComponent,
    userInitials,
    UserInitialsSource
} from '@netgrif/components-core';
import {UserAssignDialogComponent} from '../../../dialog/user-assign-dialog/user-assign-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'nc-user-default-field',
  templateUrl: './user-default-field.component.html',
  styleUrls: ['./user-default-field.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class UserDefaultFieldComponent extends AbstractUserDefaultFieldComponent {

    constructor(dialog: MatDialog,
                snackbar: SnackBarService,
                translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<UserField>) {
        super(dialog, snackbar, translate, dataFieldPortalData);
    }

    public selectUser() {
        super.selectAbstractUser(UserAssignDialogComponent);
    }

    /** initials of the user for the avatar (first letters of the name and of the surname) */
    public initials(user: UserInitialsSource | undefined): string {
        return userInitials(user);
    }
}
