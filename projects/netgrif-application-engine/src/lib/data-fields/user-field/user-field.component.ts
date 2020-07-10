import {Component, Input, OnInit} from '@angular/core';
import {UserField} from './models/user-field';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {UserAssignComponent} from '../../side-menu/content-components/user-assign/user-assign.component';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {SideMenuSize} from '../../side-menu/models/side-menu-size';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {UserValue} from './models/user-value';
import {UserAssignInjectedData} from '../../side-menu/content-components/user-assign/model/user-assign-injected-data';

/**
 * Component that is created in the body of the task panel accord on the Petri Net, which must be bind properties.
 */
@Component({
    selector: 'nae-user-field',
    templateUrl: './user-field.component.html',
    styleUrls: ['./user-field.component.scss']
})
export class UserFieldComponent extends AbstractDataFieldComponent implements OnInit {
    /**
     * Represents info about user from backend.
     */
    @Input() public dataField: UserField;

    /**
     * Inject services.
     * @param _sideMenuService Service to open and close [UserAssignComponent]{@link UserAssignComponent} with user data.
     * @param _snackbar Service to displaying information to the user.
     */
    constructor(private _sideMenuService: SideMenuService,
                private _snackbar: SnackBarService) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
    }

    /**
     * Call after click on user field button.
     *
     * Open [UserAssignComponent]{@link UserAssignComponent} in side menu with data represents preselected user from backend.
     *
     * After close side menu, the snackbar info will be displayed either for the unselected user or the selected one.
     */
    public selectUser() {
        let valueReturned = false;
        this._sideMenuService.open(UserAssignComponent, SideMenuSize.MEDIUM,
            {roles: this.dataField.roles, value: this.dataField.value} as UserAssignInjectedData).onClose.subscribe($event => {
            if ($event.data) {
                this.dataField.value = $event.data as UserValue;
                this._snackbar.openGenericSnackBar('User ' + this.dataField.value.fullName + ' was assigned', 'how_to_reg');
                valueReturned = true;
            } else if (!valueReturned) {
                this._snackbar.openWarningSnackBar('No user has been selected');
            }
        });
    }

}
