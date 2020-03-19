import {Component, Input, OnInit} from '@angular/core';
import {UserField} from './models/user-field';
import {SideMenuService, SideMenuWidth} from '../../side-menu/services/side-menu.service';
import {UserAssignComponent, UserAssignInjectedData} from '../../side-menu/user-assign/user-assign.component';
import {UserFieldService} from './services/user-field.service';
import {AbstractDataFieldComponent} from '../models/abstract-data-field-component';

@Component({
    selector: 'nae-user-field',
    templateUrl: './user-field.component.html',
    styleUrls: ['./user-field.component.scss'],
    providers: [UserFieldService]
})
export class UserFieldComponent extends AbstractDataFieldComponent implements OnInit {

    @Input() public dataField: UserField;

    constructor(private _userFieldService: UserFieldService, private _sideMenuService: SideMenuService) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this._userFieldService.assignedUser = this.dataField;
    }

    public selectUser() {
        const data: UserAssignInjectedData = {
            userFieldService: this._userFieldService
        };

        this._sideMenuService.open(UserAssignComponent, SideMenuWidth.MEDIUM, data);
    }

}
