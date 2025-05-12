import {Component, Injector, Input, OnDestroy, OnInit} from '@angular/core';
import {Identity} from '../../models/Identity';
import {IdentityService} from '../../services/identity.service';
import {TooltipPosition} from '@angular/material/tooltip';
import {Subscription} from 'rxjs';
import {
    AbstractNavigationResizableDrawerComponent
} from '../../../navigation/navigation-drawer/abstract-navigation-resizable-drawer.component';

export type Mode = 'full' | 'horizontal' | 'vertical' | 'icon';
export type IconStyle = 'large' | 'small';

@Component({
    selector: 'ncc-abstract-user-card',
    template: ''
})
export abstract class AbstractUserCardComponent extends AbstractNavigationResizableDrawerComponent implements OnInit, OnDestroy {

    @Input() public user: Identity;
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
            const userService: IdentityService = this._injector.get(IdentityService);
            if (userService) {
                this.user = userService.identity;
                this.subUser = userService.identity$.subscribe(user => this.user = user);
            }
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
        return this.user && this.user['banner'] ? this.user['banner'] : 'assets/default-user-background.jpg';
    }

    get userAvatar(): string {
        return this.user && this.user['avatar'] ? this.user['avatar'] : 'assets/default-user-avatar.png';
    }

}
