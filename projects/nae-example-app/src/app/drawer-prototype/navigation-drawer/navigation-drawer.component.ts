import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {MatDrawerToggleResult, MatSidenav} from '@angular/material';

@Component({
    selector: 'nae-app-navigation-drawer',
    templateUrl: './navigation-drawer.component.html',
    styleUrls: ['./navigation-drawer.component.scss']
})
export class NavigationDrawerComponent implements OnInit, AfterViewInit {

    @Input() public mainContent: TemplateRef<any> | null;
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
        if (this._fixed) {
            this._sideNav.open();
        }
    }
}
