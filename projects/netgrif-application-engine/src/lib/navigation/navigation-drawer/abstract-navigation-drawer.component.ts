import {AfterViewInit, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {User} from '../../user/models/user';
import 'hammerjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatDrawerToggleResult, MatSidenav} from '@angular/material/sidenav';
import {LoggerService} from '../../logger/services/logger.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ResizeEvent} from 'angular-resizable-element';
import {UserPreferenceService} from '../../user/services/user-preference.service';
import {QuickPanelItem} from '../quick-panel/components/abstract-quick-panel.component';

const DRAWER_DEFAULT_MIN_WIDTH = 200;
const DRAWER_MAX_WIDTH = 450;

export abstract class AbstractNavigationDrawerComponent implements OnInit, AfterViewInit, OnDestroy {


    @Input('user') public showUser: boolean;
    @Input('userObject') public user: User;
    @Input('quickPanel') public showQuickPanel: boolean;
    @Input('panelItems') public quickPanelItems: Array<QuickPanelItem>;
    @Input() public navigation: boolean;

    @Output() public openedChange: EventEmitter<boolean>;

    @ViewChild('sidenav') protected _sideNav: MatSidenav;

    public opened: boolean;
    protected _fixed: boolean;
    protected subBreakpoint: Subscription;

    public width: number;
    public contentWidth: BehaviorSubject<number>;

    protected _config = {
        mode: 'over',
        opened: false,
        disableClose: false
    };

    constructor(protected breakpoint: BreakpointObserver,
                protected _log: LoggerService,
                protected userPreferenceService: UserPreferenceService) {
        this.openedChange = new EventEmitter<boolean>();
        this._fixed = true;
        this.opened = true;
        this.quickPanelItems = ['language', 'settings', 'logout'];
        this.contentWidth = new BehaviorSubject<number>(this.getWidthFromPreferences());
    }

    ngOnInit(): void {
        this.resolveLayout(this._fixed);
        this.subBreakpoint = this.breakpoint.observe([Breakpoints.HandsetLandscape]).subscribe( result => {
            this._log.info('BreakpointObserver matches width of window: ' + this.breakpoint.isMatched('(max-width: 959.99px)'));
            if (this.breakpoint.isMatched('(max-width: 959.99px)')) {
                this.resolveLayout(false);
                this.opened = this._config.opened;
            } else {
                this.resolveLayout(this._fixed);
                this.opened = this._config.opened;
            }
        });
        this.opened = this._config.opened;
        this.userPreferenceService.preferencesChanged$.subscribe(() => {
            this.width = this.getWidthFromPreferences();
            this.contentWidth.next(this.width);
        });
    }

    ngAfterViewInit(): void {
        this.openedChange = this._sideNav.openedChange;
    }

    ngOnDestroy(): void {
        this.subBreakpoint.unsubscribe();
        this.openedChange.complete();
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
        this.resolveLayout(this._fixed);
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

    private resolveLayout(bool: boolean): void {
        this._config = bool ? {
            mode: 'side',
            opened: true,
            disableClose: true
        } : {
            mode: 'over',
            opened: false,
            disableClose: false
        };
        if (bool && this._sideNav) {
            this._sideNav.open();
        }
    }

    swipeRight() {
        if (this.breakpoint.isMatched('(max-width: 959.99px)')) {
            this._sideNav.open();
        }
    }

    swipeLeft() {
        if (this.breakpoint.isMatched('(max-width: 959.99px)')) {
            this._sideNav.close();
        }
    }

    onResizeEvent(event: ResizeEvent): void {
        const width = event.rectangle.width;
        if (width === undefined) {
            this._log.warn('Resize event has no width! Drawer width will remain unchanged.');
        } else if (width > DRAWER_MAX_WIDTH) {
            this.width = DRAWER_MAX_WIDTH;
        } else if (width < DRAWER_DEFAULT_MIN_WIDTH) {
            this.width = DRAWER_DEFAULT_MIN_WIDTH;
        } else {
            this.width = width;
        }
        this.userPreferenceService._drawerWidthChanged$.next(this.width);
        this.contentWidth.next(this.width);
    }

    protected getWidthFromPreferences(): number {
        return this.userPreferenceService.getDrawerWidth() ?? DRAWER_DEFAULT_MIN_WIDTH;
    }
}
