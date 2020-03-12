import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {User} from "./user";
import {SideMenuService} from "../services/side-menu.service";
import {FormControl} from "@angular/forms";
import {UserAssignListComponent} from "./user-assign-list/user-assign-list.component";
import {SnackBarService} from "../../snack-bar/snack-bar.service";
import {UserFieldService} from "../../data-fields/user-field/services/user-field.service";

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

    constructor(private _userFieldService: UserFieldService) {
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
        ]
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this.input.matAutocomplete = this.listComponent.autocomplete;
    }

    public userWasSelected(user: User): void {
        this._currentUser = user;
    }

    public onAssign() {
        this._userFieldService.assignUser(this._currentUser);
    }

}
