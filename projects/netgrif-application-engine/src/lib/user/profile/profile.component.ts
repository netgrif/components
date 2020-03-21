import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from 'netgrif-application-engine';

@Component({
    selector: 'nae-user-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    constructor(private userService: UserService) {
    }

    public _user: User;
    public fill_percentage: number;
    isEditable = false;

    ngOnInit(): void {
        this._user = new User('1', 'bla@bla', 'Jozo', 'Priez', ['Auth1', 'Auth2'],
            [{
                id: 'id1',
                name: 'name1',
                description: '',
                net: 'net1'
            }], ['aaa', 'bbb'], null);
        this.fill_percentage = this.fillPercentage();
    }

    fillPercentage(): number {
        let percentage = null;
        (this._user.firstName !== undefined && this._user.lastName !== undefined) ? percentage = 20 : percentage = 0;
        if (this._user.email !== undefined) {
            percentage += 20;
        }
        [this._user.authorities, this._user.roles, this._user.groups].forEach(
            element => {
                if (element !== undefined && element.length !== 0)
                    percentage += 20;
            }
        );
        return percentage;
    }
    changeName($event: Event) {
        console.log($event);
    }
}
