import {Component, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {ConfigurationService, LanguageService, LoggerService, UserService} from 'netgrif-components-core';

@Component({
  selector: 'nc-navigation-double-drawer',
  templateUrl: './navigation-double-drawer.component.html',
  styleUrls: ['./navigation-double-drawer.component.scss']
})
export class NavigationDoubleDrawerComponent implements OnInit, OnDestroy {

    @Input() portalLeftMenu: TemplateRef<any>;
    @Input() portalRightMenu: TemplateRef<any>;
    @Input() imageRouterLink: String;
    @Input() image: String;

    private _breakpointSubsc: Subscription;

    private _configMenu = {
        mode: 'side',
        opened: true,
        disableClose: true
    };
    private _configMenu2 = {
        mode: 'side',
        opened: true,
        disableClose: true
    };

    constructor(private _router: Router,
                private _breakpoint: BreakpointObserver,
                private _languageService: LanguageService,
                private _userService: UserService,
                private _log: LoggerService,
                private _config: ConfigurationService) {
    }

    ngOnInit(): void {
        this._breakpointSubsc = this._breakpoint.observe([Breakpoints.HandsetLandscape]).subscribe(() => {
            console.log(this._breakpoint.isMatched('(max-width: 959.99px)'));
            if (this._breakpoint.isMatched('(max-width: 959.99px)')) {
                this.resolveLayout(false);
            } else {
                this.resolveLayout(true);
            }
        });
    }

    ngOnDestroy(): void {
        this._breakpointSubsc.unsubscribe();
    }

    get configMenu() {
        return this._configMenu;
    }

    get configMenu2() {
        return this._configMenu2;
    }

    toggleMenu() {
        this._configMenu.opened = !this._configMenu.opened;
    }

    toggleMenu2() {
        this._configMenu2.opened = !this._configMenu2.opened;
    }

    private resolveLayout(bool: boolean): void {
        this._configMenu = bool ? {
            mode: 'side',
            opened: true,
            disableClose: true
        } : {
            mode: 'over',
            opened: false,
            disableClose: false
        };
        this._configMenu2 = bool ? {
            mode: 'side',
            opened: true,
            disableClose: true
        } : this._configMenu;
    }

    getLang() {
        return this._languageService.getLanguage();
    }

    logout(): void {
        this._userService.logout().subscribe(() => {
            this._log.debug('User is logged out');
            if (this._config.get().services && this._config.get().services.auth && this._config.get().services.auth.logoutRedirect) {
                const redirectPath = this._config.get().services.auth.logoutRedirect;
                this._log.info('Redirecting to ' + redirectPath);
                this._router.navigate([redirectPath]);
            }
        });
    }

}
