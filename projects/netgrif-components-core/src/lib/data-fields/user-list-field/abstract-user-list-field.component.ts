import {Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {NAE_INFORM_ABOUT_INVALID_DATA} from '../models/invalid-data-policy-token';
import {UserListField} from './models/user-list-field';

/**
 * @deprecated
 * */
@Component({
  selector: 'ncc-abstract-user-list-field',
  template: '',
})
export abstract class AbstractUserListFieldComponent extends AbstractDataFieldComponent implements OnInit {
    /**
     * Represents info about user from backend.
     */
    @Input() public dataField: UserListField;

    protected constructor(@Optional() @Inject(NAE_INFORM_ABOUT_INVALID_DATA) informAboutInvalidData: boolean | null) {
        super(informAboutInvalidData);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    /**
     * Call after click on user field button.
     *
     * Open [UserAssignComponent]{@link AbstractUserAssignComponent} in side menu with data represents preselected user from backend.
     *
     * After close side menu, the snackbar info will be displayed either for the unselected user or the selected one.
     */
    public selectAbstractUser(component) {
        let valueReturned = false;
        this._sideMenuService.open(component, SideMenuSize.MEDIUM,
            {roles: this.dataField.roles, value: this.dataField.value} as UserListInjectedData).onClose.subscribe($event => {
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

    public removeAll() {
        this.dataField.value = new UserListValue(new Map<string, UserValue>())
    }

}
