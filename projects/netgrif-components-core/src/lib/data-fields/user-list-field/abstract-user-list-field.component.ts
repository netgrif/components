import {Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {UserListInjectedData} from '../../side-menu/content-components/user-assign/model/user-list-injected-data';
import {UserValue} from '../user-field/models/user-value';
import {UserListField} from './models/user-list-field';
import {UserListValue} from './models/user-list-value';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'ncc-abstract-user-list-field',
  template: '',
})
export abstract class AbstractUserListFieldComponent extends AbstractDataFieldComponent implements OnInit {
    /**
     * Represents info about user from backend.
     */
    @Input() public dataField: UserListField;

    /**
     * Inject services.
     * @param _dialog Service to open and close [MultiUserAssignDialogComponent]{@link MultiUserAssignDialogComponent} with user data.
     * @param _snackbar Service to displaying information to the user.
     * @param _translate Service to translate text.
     * @param informAboutInvalidData whether the backend should be notified about invalid values.
     * Option injected trough `NAE_INFORM_ABOUT_INVALID_DATA` InjectionToken
     */
    protected constructor(protected _dialog: MatDialog,
                          protected _snackbar: SnackBarService,
                          protected _translate: TranslateService,
                          @Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    /**
     * Call after click on user field button.
     *
     * Open [MultiUserAssignDialogComponent]{@link MultiUserAssignDialogComponent} in side menu with data represents preselected user from backend.
     *
     * After close side menu, the snackbar info will be displayed either for the unselected user or the selected one.
     */
    public selectAbstractUser(component) {
        let valueReturned = false;
        const dialogRef = this._dialog.open(component, {
            panelClass: "dialog-responsive",
            data: {roles: this.dataField.roles, value: this.dataField.value} as UserListInjectedData,
        });
        dialogRef.afterClosed().subscribe($event => {
            if ($event.data) {
                this.dataField.value = new UserListValue(new Map<string, UserValue>(($event.data as Array<UserValue>).map(v => [v.id, v])));
                this._snackbar.openGenericSnackBar(
                    this._translate.instant('dataField.snackBar.userListAssigned',
                    {userNames: this.dataField.value.toString()}),
                    'how_to_reg'
                );
                valueReturned = true;
            } else if (!valueReturned) {
                this._snackbar.openWarningSnackBar(this._translate.instant('dataField.snackBar.notSelectedUser'));
            }
        });
    }

    public removeAbstractUser(userId: string) {
        const existingUsers = new UserListValue(new Map<string, UserValue>(this.dataField.value.userValues));
        existingUsers.removeUserValue(userId);
        this.dataField.value = existingUsers;
    }

}
