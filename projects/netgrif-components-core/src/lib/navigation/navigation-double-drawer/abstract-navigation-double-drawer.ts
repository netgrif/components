import {Component, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {LanguageService} from '../../translate/language.service';
import {UserService} from '../../user/services/user.service';
import {LoggerService} from '../../logger/services/logger.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import { UriService } from '../service/uri.service';
import { UriNodeResource } from '../model/uri-resource';

export interface ConfigDoubleMenu {
    mode: string;
    opened: boolean;
    disableClose: boolean;
}

@Component({
    selector: 'ncc-abstract-navigation-double-drawer',
    template: '',
})
export abstract class AbstractNavigationDoubleDrawerComponent implements OnInit, OnDestroy {

    @Input() portalLeftMenu: TemplateRef<any>;
    @Input() portalRightMenu: TemplateRef<any>;
    @Input() imageRouterLink: string;
    @Input() imageAlt: string = "Icon";
    @Input() image: string;
    _leftNodes: Array<UriNodeResource>;
    _rightNodes: Array<UriNodeResource>;

    protected _leftNodesSubscription: Subscription;
    protected _rightNodesSubscription: Subscription;
    protected _breakpointSubsc: Subscription;

    protected _configMenu: ConfigDoubleMenu = {
        mode: 'side',
        opened: true,
        disableClose: true
    };
    protected _configMenu2: ConfigDoubleMenu = {
        mode: 'side',
        opened: true,
        disableClose: true
    };

    constructor(protected _router: Router,
                protected _breakpoint: BreakpointObserver,
                protected _languageService: LanguageService,
                protected _userService: UserService,
                protected _log: LoggerService,
                protected _config: ConfigurationService,
                protected _uriService: UriService) {
        this._leftNodes = new Array<UriNodeResource>();
        this._rightNodes = new Array<UriNodeResource>();
    }

    ngOnInit(): void {
        this._leftNodesSubscription = this._uriService.leftNodes.subscribe(nodes => {
            this._leftNodes = nodes instanceof Array ? nodes : [];
        });
        this._rightNodesSubscription = this._uriService.rightNodes.subscribe(nodes => {
            this._rightNodes = nodes instanceof Array ? nodes : [];
        });
        this._breakpointSubsc = this._breakpoint.observe([Breakpoints.HandsetLandscape]).subscribe(() => {
            if (this._breakpoint.isMatched('(max-width: 959.99px)')) {
                this.resolveLayout(false);
            } else {
                this.resolveLayout(true);
            }
        });

        this._uriService.$currentLevel.next(1);
    }

    ngOnDestroy(): void {
        this._breakpointSubsc.unsubscribe();
        this._leftNodesSubscription.unsubscribe();
        this._rightNodesSubscription.unsubscribe();
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

    protected resolveLayout(bool: boolean): void {
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

    onBackClick(): void {
        this._uriService.$currentParent.next(this._leftNodes[0].parentId);
        this._uriService.$currentLevel.next(this._uriService.$currentLevel.value - 1);
    }

    onLeftSideClick(nodeId: string): void {
        this._uriService.resolveRightNodes(nodeId);
    }

    onRightSideClick(nodeId: string): void {
        this._uriService.$currentLevel.next(this._uriService.$currentLevel.value + 1)
        this.onLeftSideClick(nodeId);
    }

    isOnZeroLevel(): boolean {
        return this._uriService.$currentLevel.value > 0;
    }

}
