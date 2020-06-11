import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';

@Component({
    selector: 'nae-user-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    @Input() public user: User;

    constructor(private _userService: UserService) {
    }

    ngOnInit(): void {
        if (!this.user) {
            this.user = this._userService.user;
            this._userService.user$.subscribe(user => {
                this.user = user;
            });
        }
    }

    get userBanner(): string {
        return this.user && this.user['banner'] ? this.user['banner'] : 'assets/default-user-background.jpg';
    }

    get userAvatar(): string {
        return this.user && this.user['avatar'] ? this.user['avatar'] : 'assets/default-user-avatar.png';
    }
}
