import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {UserValue} from '../../../data-fields/user-field/models/user-value';
import {FormControl} from '@angular/forms';
import {UserAssignListComponent} from './user-assign-list/user-assign-list.component';
import {NAE_SIDE_MENU_CONTROL} from '../../side-menu-injection-token.module';
import {SideMenuControl} from '../../models/side-menu-control';

@Component({
    selector: 'nae-user-assign',
    templateUrl: './user-assign.component.html',
    styleUrls: ['./user-assign.component.scss']
})
export class UserAssignComponent implements OnInit, AfterViewInit {

    @ViewChild(UserAssignListComponent) public listComponent: UserAssignListComponent;
    @ViewChild('inputSearch') public input;

    public users: Array<UserValue>;
    public formControl = new FormControl();
    private _currentUser: UserValue;

    constructor(@Inject(NAE_SIDE_MENU_CONTROL) private _sideMenuControl: SideMenuControl) {
        this.users = [];
        // TODO load users
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this.input.matAutocomplete = this.listComponent.autocomplete;
    }

    public userWasSelected(user: UserValue): void {
        this._currentUser = user;
        this._sideMenuControl.publish({
            opened: true,
            message: 'New selected user',
            data: this._currentUser
        });
    }

    public assign(): void {
        this._sideMenuControl.close({
            opened: false,
            message: 'Selected user was confirmed',
            data: this._currentUser
        });
    }

}
