import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {User} from '@netgrif/application-engine';
import {TooltipPosition} from '@angular/material';

export type Mode = 'full' | 'horizontal' | 'vertical' | 'icon';
export type IconStyle = 'large' | 'small';

@Component({
    selector: 'nae-app-user-showcase',
    templateUrl: './user-showcase.component.html',
    styleUrls: ['./user-showcase.component.scss']
})
export class UserShowcaseComponent implements OnInit, AfterViewInit {

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
