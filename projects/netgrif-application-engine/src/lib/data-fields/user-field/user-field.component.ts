import {Component, Input, OnInit} from '@angular/core';
import {UserField} from './models/user-field';
import {SideMenuService} from '../../side-menu/services/side-menu.service';
import {UserAssignComponent} from '../../side-menu/user-assign/user-assign.component';
import {UserFieldService} from './services/user-field.service';

@Component({
    selector: 'nae-user-field',
    templateUrl: './user-field.component.html',
    styleUrls: ['./user-field.component.scss']
})
export class UserFieldComponent implements OnInit {

    @Input() public userField: UserField;

    constructor(private _sideMenuService: SideMenuService,
                private _userFieldService: UserFieldService) {
    }

    ngOnInit() {
        this._userFieldService.assignedUser = this.userField;
    }

    public selectUser() {
        this._sideMenuService.open(UserAssignComponent);
    }

}
