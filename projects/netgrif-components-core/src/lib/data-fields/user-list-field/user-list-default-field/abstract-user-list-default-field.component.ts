import {Component, Inject, Optional} from "@angular/core";
import {UserListField} from "../models/user-list-field";
import {SideMenuService} from "../../../side-menu/services/side-menu.service";
import {SnackBarService} from "../../../snack-bar/services/snack-bar.service";
import {TranslateService} from "@ngx-translate/core";
import {SideMenuSize} from "../../../side-menu/models/side-menu-size";
import {UserListInjectedData} from "../../../side-menu/content-components/user-assign/model/user-list-injected-data";
import {UserListValue} from "../models/user-list-value";
import {UserValue} from "../../user-field/models/user-value";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";

@Component({
    selector: 'ncc-abstract-user-list-default-field',
    template: '',
})
export abstract class AbstractUserListDefaultFieldComponent extends AbstractBaseDataFieldComponent<UserListField>{

    protected constructor(protected _sideMenuService: SideMenuService,
                          protected _snackbar: SnackBarService,
                          protected _translate: TranslateService,
                          @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<UserListField>) {
        super(dataFieldPortalData);
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

}