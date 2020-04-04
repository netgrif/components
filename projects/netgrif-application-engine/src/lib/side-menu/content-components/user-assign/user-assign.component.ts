import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {UserValue} from '../../../data-fields/user-field/models/user-value';
import {FormControl} from '@angular/forms';
import {UserAssignListComponent} from './user-assign-list/user-assign-list.component';
import {UserFieldService} from '../../../data-fields/user-field/services/user-field.service';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {SideMenuControl} from '../../models/side-menu-control';

export interface UserAssignInjectedData {
    userFieldService: UserFieldService;
}

@Component({
    selector: 'nae-user-assign',
    templateUrl: './user-assign.component.html',
    styleUrls: ['./user-assign.component.scss']
})
export class UserAssignComponent implements OnInit, AfterViewInit {

    @ViewChild(UserAssignListComponent) listComponent: UserAssignListComponent;
    @ViewChild('inputSearch') input;

    public users: UserValue[];
    public control = new FormControl();
    private _currentUser: UserValue;
    private _userFieldService: UserFieldService;

    constructor(@Inject(NAE_SIDE_MENU_CONTROL) injectedData: SideMenuControl) {
        // this._userFieldService = injectedData.userFieldService;

        // TODO load users
        this.users = [
            new UserValue(
                '4',
                'Fero',
                'Galamboši',
                'ferinko123@gmail.com'
            ),
            new UserValue(
                '4',
                'Laco',
                'Kováč',
                'kovy789@centrum.sk'
            ),
            new UserValue(
                '4',
                'Maťo',
                'Novák',
                'martin456@yahoo.com'
            )
        ];
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this.input.matAutocomplete = this.listComponent.autocomplete;
    }

    public userWasSelected(user: UserValue): void {
        this._currentUser = user;
    }

    public assign(): void {
        this._userFieldService.assignUser(this._currentUser);
    }

}
