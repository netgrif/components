import {Component, Inject} from '@angular/core';
import {UserValue} from '../../../data-fields/user-field/models/user-value';
import {FormControl} from '@angular/forms';
import {UserAssignListComponent} from './user-assign-list/user-assign-list.component';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {SideMenuControl} from '../../models/side-menu-control';
import {UserListInjectedData} from './model/user-list-injected-data';
import {UserListService} from '../../../user/services/user-list.service';

/**
 * Is the main - parent component of the entire user assignment in the side menu.
 *
 * Holds logic link of the [UserAssignListComponent]{@link UserAssignListComponent}
 * along with searching, selecting, and then assigning to the user field.
 */
@Component({
    selector: 'nae-user-assign',
    templateUrl: './user-assign.component.html',
    styleUrls: ['./user-assign.component.scss'],
    providers: [UserListService]
})
export class UserAssignComponent {
    /**
     * Form control for user search value.
     */
    public searchUserControl = new FormControl();

    /**
     * Data about preselected user send from [UserFieldComponent]{@link UserFieldComponent}.
     */
    public injectedData: UserListInjectedData;

    /**
     * Value of the current selected user.
     */
    private _currentUser: UserValue;

    /**
     * Inject and set data send from [UserFieldComponent]{@link UserFieldComponent} if the user is preselected.
     * @param _sideMenuControl Contains [Roles]{@link Role} and [UserValue]{@link UserValue}.
     */
    constructor(@Inject(NAE_SIDE_MENU_CONTROL) private _sideMenuControl: SideMenuControl) {
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
}
