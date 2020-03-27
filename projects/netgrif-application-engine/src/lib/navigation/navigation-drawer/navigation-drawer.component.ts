import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatDrawerToggleResult, MatSidenav} from '@angular/material';
import {User} from '../../user/models/user';
import {QuickPanelItem} from '../quick-panel/components/quick-panel.component';

@Component({
    selector: 'nae-navigation-drawer',
    templateUrl: './navigation-drawer.component.html',
    styleUrls: ['./navigation-drawer.component.scss']
})
export class NavigationDrawerComponent implements OnInit, AfterViewInit {


    @Input('user') public showUser: boolean;
    @Input('userObject') public user: User;
    @Input('quickPanel') public showQuickPanel: boolean;
    @Input('panelItems') public quickPanelItems: Array<QuickPanelItem>;
    @Input() public navigation: boolean;

    @Output() public openedChange: EventEmitter<boolean>;

    @ViewChild('sidenav') private _sideNav: MatSidenav;

    public opened: boolean;
    private _fixed: boolean;

    private _config = {
        mode: 'over',
        opened: false,
        disableClose: false
    };

    constructor() {
        this.openedChange = new EventEmitter<boolean>();
        this._fixed = true;
        this.opened = true;
        this.quickPanelItems = ['language', 'settings', 'logout'];
    }

    ngOnInit(): void {
        this.resolveFixed();
        this.opened = this._config.opened;
    }

    ngAfterViewInit(): void {
        this.openedChange = this._sideNav.openedChange;
    }

    get config() {
        return this._config;
    }

    get fixed(): boolean {
        return this._fixed;
    }

    @Input('fixed')
    set fixed(value: boolean) {
        this._fixed = value;
        this.resolveFixed();
    }

    open(): Promise<MatDrawerToggleResult> {
        if (this._fixed) {
            return Promise.resolve('open');
        }
        return this._sideNav.open();
    }

    close(): Promise<MatDrawerToggleResult> {
        if (this._fixed) {
            return Promise.resolve('open');
        }
        return this._sideNav.close();
    }

    toggle(): Promise<MatDrawerToggleResult> {
        if (this._fixed) {
            return Promise.resolve('open');
        }
        return this._sideNav.toggle();
    }

    private resolveFixed(): void {
        this._config = this._fixed ? {
            mode: 'side',
            opened: true,
            disableClose: true
        } : {
            mode: 'over',
            opened: false,
            disableClose: false
        };
        if (this._fixed && this._sideNav) {
            this._sideNav.open();
        }
    }

}
