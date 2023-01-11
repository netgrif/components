import {Component} from "@angular/core";
import {FormControl} from "@angular/forms";
import {UserListInjectedData} from "./model/user-list-injected-data";
import {UserValue} from "../../../data-fields/user-field/models/user-value";
import {SideMenuControl} from "../../models/side-menu-control";
import {ProcessRole} from "../../../resources/interface/process-role";
import {UserListValue} from "../../../data-fields/user-list-field/models/user-list-value";

@Component({
    selector: 'ncc-abstract-multi-user-assign',
    template: ''
})
export abstract class AbstractMultiUserAssignComponent {

    public searchUserControl = new FormControl();

    public injectedData: UserListInjectedData;

    protected _currentUsers: Array<UserValue>;

    protected constructor(protected _sideMenuControl: SideMenuControl) {
        this._currentUsers = new Array<UserValue>();
        if (this._sideMenuControl.data) {
            this.injectedData = this._sideMenuControl.data as UserListInjectedData;
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

    public userWasUnselected(user: UserValue): void {
        const index = this._currentUsers.findIndex(v => v.id === user.id);
        if (index > -1) {
            this._currentUsers.splice(index, 1);
        }
        this._sideMenuControl.publish({
            opened: true,
            message: 'New selected user',
            data: this._currentUsers
        });
    }

    public userWasSelected(user: UserValue): void {
        this._currentUsers.push(user);
        this._sideMenuControl.publish({
            opened: true,
            message: 'User was unselected',
            data: this._currentUsers
        });
    }

    /**
     * On assign button close side menu with selected user as data and message about confirm.
     */
    public save(): void {
        if (this._currentUsers !== undefined) {
            this._sideMenuControl.close({
                opened: false,
                message: 'Selected user was confirmed',
                data: this._currentUsers
            });
        }
    }
}
