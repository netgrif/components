import {Component, Input, OnInit} from '@angular/core';
import {UserField} from './models/user-field';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {UserAssignComponent} from '../../side-menu/content-components/user-assign/user-assign.component';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';
import {SideMenuSize} from '../../side-menu/models/side-menu-size';
import {SnackBarService} from '../../snack-bar/snack-bar.service';
import {UserValue} from './models/user-value';

@Component({
    selector: 'nae-user-field',
    templateUrl: './user-field.component.html',
    styleUrls: ['./user-field.component.scss']
})
export class UserFieldComponent extends AbstractDataFieldComponent implements OnInit {

    @Input() public dataField: UserField;

    constructor(private _sideMenuService: SideMenuService,
                private _snackbar: SnackBarService) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
    }

    public selectUser() {
        this._sideMenuService.open(UserAssignComponent, SideMenuSize.MEDIUM, {roles: this.dataField.roles}).onClose.subscribe($event => {
            if ($event.data) {
                this.dataField.value = $event.data as UserValue;
                this._snackbar.openInfoSnackBar('User ' + this.dataField.value.fullName + ' was assigned');
            } else {
                this._snackbar.openWarningSnackBar('No user has been selected');
            }
        });
    }

}
