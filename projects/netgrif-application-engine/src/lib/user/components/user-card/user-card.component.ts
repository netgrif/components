import {AfterViewInit, Component, Injector, Input, OnInit} from '@angular/core';
import {TooltipPosition} from '@angular/material';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

export type Mode = 'full' | 'horizontal' | 'vertical' | 'icon';
export type IconStyle = 'large' | 'small';

@Component({
    selector: 'nae-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit, AfterViewInit {

    @Input() public user: User;
    @Input() public mode: Mode = 'horizontal';
    @Input() public tooltipPosition: TooltipPosition = 'below';
    @Input() public iconStyle: IconStyle = 'large';
    @Input() public link: string;

    constructor(private _injector: Injector) {

    }

    ngOnInit(): void {
        if (!this.user) {
            const userService: UserService = this._injector.get(UserService);
            if (userService) {
                this.user = userService.user;
            }
        }
    }

    ngAfterViewInit(): void {
    }

    get userBanner(): string {
        return this.user && this.user['banner'] ? this.user['banner'] : 'assets/default-user-background.jpg';
    }

    get userAvatar(): string {
        return this.user && this.user['avatar'] ? this.user['avatar'] : 'assets/default-user-avatar.png';
    }

}
