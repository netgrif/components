import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from 'netgrif-application-engine';
import Role from "../models/role";

@Component({
    selector: 'nae-user-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    constructor(private userService: UserService) {
    }

    private _user: User;
    public userFirstName: string;
    public userLastName: string;
    public email: string;
    public fill_percentage: number;
    public groups: string[];
    public systemRoles: Role[];
    public organisations: string[];

    ngOnInit(): void {
        this._user = new User('1', 'bla@bla', 'Jozo', 'Priez', [], [], ['aaa', 'bbb'], null);
        this.setUser();
    }

    setUser(): void {

        // this._user = this.userService.user;
        this.userFirstName = this._user.firstName;
        this.userLastName = this._user.lastName;
        this.email = this._user.email;
        this.groups = this._user.groups;
        this.systemRoles = this._user.roles;
        this.organisations = this._user.authorities;
        this.fill_percentage = this.fillPercentage();
    }

    fillPercentage(): number {
        let percentage = null;
        (this.userFirstName !== undefined && this.userLastName !== undefined) ? percentage = 20 : percentage = 0;
        if (this.email !== undefined) {
            percentage += 20;
        }
        [this.groups, this.systemRoles, this.organisations].forEach(
            element => {
                if (element !== undefined && element.length !== 0)
                    percentage += 20;
            }
        );
        return percentage;
    }
}
