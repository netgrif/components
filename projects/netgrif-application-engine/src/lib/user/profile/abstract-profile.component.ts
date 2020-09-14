import {Input, OnDestroy, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {Subscription} from 'rxjs';

export abstract class AbstractProfileComponent implements OnInit, OnDestroy {

    @Input() public user: User;
    protected subUser: Subscription;

    constructor(protected _userService: UserService) {
    }

    ngOnInit(): void {
        if (!this.user) {
            this.user = this._userService.user;
            this.subUser = this._userService.user$.subscribe(user => {
                this.user = user;
            });
        }
    }

    ngOnDestroy(): void {
        if (this.subUser) {
            this.subUser.unsubscribe();
        }
    }

    get userBanner(): string {
        return this.user && this.user['banner'] ? this.user['banner'] : 'assets/default-user-background.jpg';
    }

    get userAvatar(): string {
        return this.user && this.user['avatar'] ? this.user['avatar'] : 'assets/default-user-avatar.png';
    }
}
