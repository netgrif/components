import {UserValue} from '../../../data-fields/user-field/models/user-value';
import {FormControl} from '@angular/forms';
import {SideMenuControl} from '../../models/side-menu-control';
import {UserListInjectedData} from './model/user-list-injected-data';
import {ProcessRole} from '../../../resources/interface/process-role';
import {Component} from '@angular/core';

/**
 * Is the main - parent component of the entire user assignment in the side menu.
 *
 * Holds logic link of the [UserAssignListComponent]{@link AbstractUserAssignListComponent}
 * along with searching, selecting, and then assigning to the user field.
 */
@Component({
    selector: 'ncc-abstract-user-assign',
    template: ''
})
export abstract class AbstractUserAssignComponent {
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
    protected constructor(protected _sideMenuControl: SideMenuControl) {
        if (this._sideMenuControl.data) {
            this.injectedData = this._sideMenuControl.data as UserListInjectedData;
        }
    }

    /**
     * The user that is initially selected, or `undefined` if none is
     */
    public get initiallySelectedUser(): UserValue | undefined {
        return this.injectedData ? this.injectedData.value : undefined;
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
        this._sideMenuControl.publish({
            opened: true,
            message: 'New selected user',
            data: this._currentUser
        });
    }

    /**
     * On assign button close side menu with selected user as data and message about confirm.
     */
    public assign(): void {
        if (this._currentUser !== undefined) {
            this._sideMenuControl.close({
                opened: false,
                message: 'Selected user was confirmed',
                data: this._currentUser
            });
        }
    }

    public close(): void {
        this._sideMenuControl.close({
            opened: false,
            message: 'No select user',
            data: null
        });
    }
}
