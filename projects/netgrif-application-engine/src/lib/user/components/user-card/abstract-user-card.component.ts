import {AfterViewInit, Injector, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {TooltipPosition} from '@angular/material/tooltip';
import {BehaviorSubject, Subscription} from 'rxjs';

export type Mode = 'full' | 'horizontal' | 'vertical' | 'icon';
export type IconStyle = 'large' | 'small';

export abstract class AbstractUserCardComponent implements OnInit, OnDestroy {

    @Input() public user: User;
    @Input() public mode: Mode = 'horizontal';
    @Input() public tooltipPosition: TooltipPosition = 'below';
    @Input() public iconStyle: IconStyle = 'large';
    @Input() public link: string;
    @Input() public contentWidth: BehaviorSubject<number>;
    public width: number;
    protected subUser: Subscription;

    constructor(protected _injector: Injector) {

    }

    ngOnInit(): void {
        if (!this.user) {
            const userService: UserService = this._injector.get(UserService);
            if (userService) {
                this.user = userService.user;
                this.subUser = userService.user$.subscribe(user => this.user = user);
            }
        }
        if (!!this.contentWidth) {
            this.contentWidth.subscribe(newWidth => this.width = newWidth);
        }
    }

    ngOnDestroy(): void {
        if (this.subUser) {
            this.subUser.unsubscribe();
        }
    }

    userBannerExists(): boolean {
        return this.user && this.user['banner'];
    }

    get userBanner(): string {
        return this.user['banner'];
    }

    get userAvatar(): string {
        return this.user && this.user['avatar'] ? this.user['avatar'] : 'assets/default-user-avatar.png';
    }

}
