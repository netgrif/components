import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { AbstractDataFieldComponent } from '../models/abstract-data-field-component';
import { SideMenuService } from '../../side-menu/services/side-menu.service';
import { SnackBarService } from '../../snack-bar/services/snack-bar.service';
import { TranslateService } from '@ngx-translate/core';
import { NAE_INFORM_ABOUT_INVALID_DATA } from '../models/invalid-data-policy-token';
import { SideMenuSize } from '../../side-menu/models/side-menu-size';
import { UserListInjectedData } from '../../side-menu/content-components/user-assign/model/user-list-injected-data';
import { UserValue } from '../user-field/models/user-value';
import { UserListField } from './models/user-list-field';

@Component({
  selector: 'ncc-abstract-user-list-field',
  template: '',
})
export abstract class AbstractUserListFieldComponent  extends AbstractDataFieldComponent implements OnInit {
    /**
     * Represents info about user from backend.
     */
    @Input() public dataField: UserListField;

    /**
     * Inject services.
     * @param _sideMenuService Service to open and close [UserAssignComponent]{@link AbstractUserAssignComponent} with user data.
     * @param _snackbar Service to displaying information to the user.
     * @param _translate Service to translate text.
     * @param informAboutInvalidData whether the backend should be notified about invalid values.
     * Option injected trough `NAE_INFORM_ABOUT_INVALID_DATA` InjectionToken
     */
    protected constructor(protected _sideMenuService: SideMenuService,
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
     * Open [UserAssignComponent]{@link AbstractUserAssignComponent} in side menu with data represents preselected user from backend.
     *
     * After close side menu, the snackbar info will be displayed either for the unselected user or the selected one.
     */
    public selectAbstractUser(component) {
        let valueReturned = false;
        this._sideMenuService.open(component, SideMenuSize.MEDIUM,
            {value: this.dataField.value} as UserListInjectedData).onClose.subscribe($event => {
            if ($event.data) {
                if (!this.dataField.value) {
                    this.dataField.value = new Array<UserValue>();
                }
                const existingValue = [...this.dataField.value];
                existingValue.push($event.data as UserValue);
                this.dataField.value = existingValue;
                this._snackbar.openGenericSnackBar(
                    this._translate.instant('dataField.snackBar.userAssigned', {userName: this.dataField.value[this.dataField.value.length - 1].fullName}),
                    'how_to_reg'
                );
                valueReturned = true;
            } else if (!valueReturned) {
                this._snackbar.openWarningSnackBar(this._translate.instant('dataField.snackBar.notSelectedUser'));
            }
        });
    }

    public removeAbstractUser(userId: string) {
        const existingValue = [...this.dataField.value];
        const index = existingValue.findIndex(user => user.id === userId);
        if (index > -1) {
            existingValue.splice(index, 1);
            this.dataField.value = existingValue;
        }
    }

}
