import {Component, Inject, Optional} from "@angular/core";
import {SideMenuService} from "../../../side-menu/services/side-menu.service";
import {SnackBarService} from "../../../snack-bar/services/snack-bar.service";
import {TranslateService} from "@ngx-translate/core";
import {DATA_FIELD_PORTAL_DATA, DataFieldPortalData} from "../../models/data-field-portal-data-injection-token";
import {SideMenuSize} from "../../../side-menu/models/side-menu-size";
import {UserListInjectedData} from "../../../side-menu/content-components/user-assign/model/user-list-injected-data";
import {UserValue} from "../models/user-value";
import {UserField} from "../models/user-field";
import {AbstractBaseDataFieldComponent} from "../../base-component/abstract-base-data-field.component";

@Component({
    selector: 'ncc-abstract-user-default-field',
    template: ''
})
export abstract class AbstractUserDefaultFieldComponent extends AbstractBaseDataFieldComponent<UserField>{

    constructor(protected _sideMenuService: SideMenuService,
                protected _snackbar: SnackBarService,
                protected _translate: TranslateService,
                @Optional() @Inject(DATA_FIELD_PORTAL_DATA) dataFieldPortalData: DataFieldPortalData<UserField>) {
        super(dataFieldPortalData);
    }

    public selectAbstractUser(component) {
        let valueReturned = false;
        this._sideMenuService.open(component, SideMenuSize.MEDIUM,
            {roles: this.dataField.roles, value: this.dataField.value} as UserListInjectedData).onClose.subscribe($event => {
            if ($event.data) {
                this.dataField.value = $event.data as UserValue;
                this._snackbar.openGenericSnackBar(
                    this._translate.instant('dataField.snackBar.userAssigned', {userName: this.dataField.value.fullName}),
                    'how_to_reg'
                );
                valueReturned = true;
            } else if (!valueReturned) {
                this._snackbar.openWarningSnackBar(this._translate.instant('dataField.snackBar.notSelectedUser'));
            }
        });
    }


}
