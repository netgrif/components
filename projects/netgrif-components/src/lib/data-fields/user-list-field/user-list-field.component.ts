import { Component, Inject, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
    AbstractUserListFieldComponent,
    NAE_INFORM_ABOUT_INVALID_DATA,
    SnackBarService
} from '@netgrif/components-core';
import {MatDialog} from '@angular/material/dialog';
import {MultiUserAssignDialogComponent} from '../../dialog/multi-user-assign-dialog/multi-user-assign-dialog.component';

@Component({
  selector: 'nc-user-list-field',
  templateUrl: './user-list-field.component.html',
  styleUrls: ['./user-list-field.component.scss']
})
export class UserListFieldComponent extends AbstractUserListFieldComponent {

    constructor(dialog: MatDialog,
                snackbar: SnackBarService,
                translate: TranslateService,
                @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(dialog, snackbar, translate, informAboutInvalidData);
    }

    public selectUser() {
        this.selectAbstractUser(MultiUserAssignDialogComponent);
    }

    public deleteUser(userId: string) {
        this.removeAbstractUser(userId);
    }
}
