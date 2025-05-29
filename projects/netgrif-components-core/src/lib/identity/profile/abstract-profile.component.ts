import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Identity} from '../models/Identity';
import {IdentityService} from '../services/identity.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'ncc-abstract-profile',
    template: ''
})
export abstract class AbstractProfileComponent implements OnInit, OnDestroy {

    @Input() public user: Identity;
    protected subUser: Subscription;

    constructor(protected _userService: IdentityService) {
    }

    ngOnInit(): void {
        if (!this.user) {
            this.user = this._userService.identity;
            this.subUser = this._userService.identity$.subscribe(user => {
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
