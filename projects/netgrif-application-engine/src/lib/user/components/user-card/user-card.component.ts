import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {TooltipPosition} from '@angular/material';
import {User} from '../../models/user';

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

    constructor() {

    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
    }

    get userBanner(): string {
        return this.user['banner'] ? this.user['banner'] : 'assets/default-user-background.jpg';
    }

    get userAvatar(): string {
        return this.user['avatar'] ? this.user['avatar'] : 'assets/avatardefault.png';
    }

}
