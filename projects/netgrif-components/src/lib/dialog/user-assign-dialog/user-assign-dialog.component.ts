import {Component, Inject} from '@angular/core';
import {
    ProcessRole,
    UserListInjectedData, UserListService,
    UserValue
} from '@netgrif/components-core';
import {FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'nc-user-assign-dialog',
    templateUrl: './user-assign-dialog.component.html',
    styleUrls: ['./user-assign-dialog.component.scss'],
    providers: [UserListService]
})
export class UserAssignDialogComponent {
    /**
     * Form control for user search value.
     */
    public searchUserControl = new FormControl();

    /**
     * Data about preselected user send from [UserFieldComponent]{@link AbstractUserFieldComponent}.
     */
    public injectedData: UserListInjectedData;

    /**
     * Value of the current selected user.
     */
    protected _currentUser: UserValue;

    /**
     * Inject and set data send from [UserFieldComponent]{@link AbstractUserFieldComponent} if the user is preselected.
     * @param _sideMenuControl Contains [Roles]{@link ProcessRole} and [UserValue]{@link UserValue}.
     */
    constructor(protected _dialogRef: MatDialogRef<UserAssignDialogComponent>,
                @Inject(MAT_DIALOG_DATA) protected _data: UserListInjectedData) {
        if (this._data) {
            this.injectedData = this._data as UserListInjectedData;
        }
    }

    /**
     * The user that is initially selected, or `undefined` if none is
     */
    public get initiallySelectedUser(): UserValue | undefined {
        return this.injectedData ? this.injectedData.value as UserValue : undefined;
    }

    public get roles(): Array<string> | Array<ProcessRole> {
        return this.injectedData ? this.injectedData.roles : [];
    }

    public get negativeRoles(): Array<string> | Array<ProcessRole> {
        return this.injectedData ? this.injectedData.negativeRoles : [];
    }

    /**
     * On select user from users assign list publish side menu with selected user as data and message about selection.
     * @param user Select current user as [UserValue]{@link UserValue}
     */
    public userWasSelected(user: UserValue): void {
        this._currentUser = user;
    }

    /**
     * On assign button close side menu with selected user as data and message about confirm.
     */
    public assign(): void {
        if (this._currentUser !== undefined) {
            this._dialogRef.close({
                opened: false,
                message: 'Selected user was confirmed',
                data: this._currentUser
            });
        }
    }
}
