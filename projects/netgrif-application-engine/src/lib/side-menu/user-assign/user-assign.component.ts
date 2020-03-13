import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {User} from './user';
import {SideMenuService} from '../side-menu.service';
import {FormControl} from '@angular/forms';
import {UserAssignListComponent} from './user-assign-list/user-assign-list.component';

@Component({
    selector: 'nae-user-assign',
    templateUrl: './user-assign.component.html',
    styleUrls: ['./user-assign.component.scss']
})
export class UserAssignComponent implements OnInit, AfterViewInit {

    @ViewChild(UserAssignListComponent) listComponent: UserAssignListComponent;
    @ViewChild('inputSearch') input;

    public users: User[];
    public control = new FormControl();
    private _currentUser: User;

    constructor(private _sideMenuService: SideMenuService) {
        this.users = [
            new User(
                'Fero',
                'Galamboši',
                'ferinko123@gmail.com'
            ),
            new User(
                'Laco',
                'Kováč',
                'kovy789@centrum.sk'
            ),
            new User(
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

    userWasAssigned(user: User): void {
        this._currentUser = user;
    }

    public assign(): User {
        // TODO: Assign user
        console.log('User was assigned', this._currentUser);
        if (this._currentUser !== undefined) {
            this._sideMenuService.close();
            return this._currentUser;
        } else {
            return null;
        }
    }

}
