import {Input, OnInit} from '@angular/core';
import {UserField} from './models/user-field';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {SideMenuSize} from '../../side-menu/models/side-menu-size';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {UserValue} from './models/user-value';
import {UserListInjectedData} from '../../side-menu/content-components/user-assign/model/user-list-injected-data';

/**
 * Component that is created in the body of the task panel accord on the Petri Net, which must be bind properties.
 */
export abstract class AbstractUserFieldComponent extends AbstractDataFieldComponent implements OnInit {
    /**
     * Represents info about user from backend.
     */
    @Input() public dataField: UserField;

    /**
     * Inject services.
     * @param _sideMenuService Service to open and close [UserAssignComponent]{@link AbstractUserAssignComponent} with user data.
     * @param _snackbar Service to displaying information to the user.
     */
    constructor(protected _sideMenuService: SideMenuService,
                protected _snackbar: SnackBarService) {
        super();
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
                this.dataField.value = $event.data as UserValue;
                this._snackbar.openGenericSnackBar('User ' + this.dataField.value.fullName + ' was assigned', 'how_to_reg');
                valueReturned = true;
            } else if (!valueReturned) {
                this._snackbar.openWarningSnackBar('No user has been selected');
            }
        });
    }

}