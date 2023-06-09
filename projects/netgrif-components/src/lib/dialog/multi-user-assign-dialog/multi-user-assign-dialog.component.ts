import {Component, Inject} from '@angular/core';
import {ProcessRole, UserListInjectedData, UserListService, UserListValue, UserValue} from 'netgrif-components-core';
import {FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'nc-multi-user-assign-dialog',
    templateUrl: './multi-user-assign-dialog.component.html',
    styleUrls: ['./multi-user-assign-dialog.component.scss'],
    providers: [UserListService]
})
export class MultiUserAssignDialogComponent {

    public searchUserControl = new FormControl();

    public injectedData: UserListInjectedData;

    protected _currentUsers: Array<UserValue>;

    constructor(protected _dialogRef: MatDialogRef<MultiUserAssignDialogComponent>,
                          @Inject(MAT_DIALOG_DATA) protected _data: UserListInjectedData) {
        this._currentUsers = [];
        if (this._data) {
            this.injectedData = this._data as UserListInjectedData;
            this._currentUsers.push(...(this.injectedData.value as UserListValue).userValues.values());
        }
    }

    public get initiallySelectedUsers(): Array<UserValue> | undefined {
        return this.injectedData && this.injectedData.value ? [...(this.injectedData.value as UserListValue).userValues.values()] : undefined;
    }

    public get roles(): Array<string> | Array<ProcessRole> {
        return this.injectedData ? this.injectedData.roles : [];
    }

    public get negativeRoles(): Array<string> | Array<ProcessRole> {
        return this.injectedData ? this.injectedData.negativeRoles : [];
    }

    public get currentUsers(): Array<UserValue> {
        return this._currentUsers;
    }

    public userWasUnselected(user: UserValue): void {
        const index = this._currentUsers.findIndex(v => v.id === user.id);
        if (index > -1) {
            this._currentUsers.splice(index, 1);
        }
    }

    public userWasSelected(user: UserValue): void {
        this._currentUsers.push(user);
    }

    /**
     * On save button close side menu with selected user as data and message about confirm.
     */
    public save(): void {
        if (this._currentUsers !== undefined) {
            this._dialogRef.close({
                opened: false,
                message: 'Selected users were confirmed',
                data: this._currentUsers
            });
        }
    }

}
