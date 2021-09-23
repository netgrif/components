import {Injector, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {TooltipPosition} from '@angular/material/tooltip';
import {Subscription} from 'rxjs';
import {
    AbstractNavigationResizableDrawerComponent
} from '../../../navigation/navigation-drawer/abstract-navigation-resizable-drawer.component';

export type Mode = 'full' | 'horizontal' | 'vertical' | 'icon';
export type IconStyle = 'large' | 'small';

export abstract class AbstractUserCardComponent extends AbstractNavigationResizableDrawerComponent implements OnInit, OnDestroy {

    @Input() public user: User | null;
    @Input() public mode: Mode = 'horizontal';
    @Input() public tooltipPosition: TooltipPosition = 'below';
    @Input() public iconStyle: IconStyle = 'large';
    @Input() public link: string;
    protected subUser: Subscription;

    constructor(protected _injector: Injector) {
        super();
    }

    ngOnInit(): void {
        super.ngOnInit();
        if (!this.user) {
            const userService: UserService = this._injector.get(UserService);
            if (userService) {
                this.user = userService.user;
                this.subUser = userService.user$.subscribe(user => this.user = user);
            }
        }
    }

    ngOnDestroy(): void {
        if (this.subUser) {
            this.subUser.unsubscribe();
        }
    }

    userBannerExists(): boolean {
        return !!this.user && !!this.user.banner;
    }

    get userBanner(): string {
        return this.user?.banner ?? 'assets/default-user-background.jpg';
    }

    get userAvatar(): string {
        return this.user?.avatar ?? 'assets/default-user-avatar.png';
    }

}
