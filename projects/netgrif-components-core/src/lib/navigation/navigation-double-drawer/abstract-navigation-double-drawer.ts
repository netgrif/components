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
import { Case } from '../../resources/interface/case';

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

    /**
     * Array of folder nodes on left side
     * */
    _leftNodes: Array<UriNodeResource>;

    /**
     * Array of folder nodes on right side
     * */
    _rightNodes: Array<UriNodeResource>;

    /**
     * Processes that can be displayed under folders on right side menu
     * */
    _filters: Array<Case>;

    protected _leftNodesSubscription: Subscription;
    protected _rightNodesSubscription: Subscription;
    protected _filtersSubscription: Subscription;
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
        this._filters = new Array<Case>();
    }

    ngOnInit(): void {
        this._leftNodesSubscription = this._uriService.leftNodes.subscribe(nodes => {
            this._leftNodes = nodes instanceof Array ? nodes : [];
        });
        this._rightNodesSubscription = this._uriService.rightNodes.subscribe(nodes => {
            this._rightNodes = nodes instanceof Array ? nodes : [];
        });
        this._filtersSubscription = this._uriService.filters.subscribe(cases => {
            this._filters = cases instanceof Array ? cases : [];
        });
        this._breakpointSubsc = this._breakpoint.observe([Breakpoints.HandsetLandscape]).subscribe(() => {
            if (this._breakpoint.isMatched('(max-width: 959.99px)')) {
                this.resolveLayout(false);
            } else {
                this.resolveLayout(true);
            }
        });
    }

    ngOnDestroy(): void {
        this._breakpointSubsc.unsubscribe();
        this._leftNodesSubscription.unsubscribe();
        this._rightNodesSubscription.unsubscribe();
        this._filtersSubscription.unsubscribe();
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

    /**
     * On home click, the current level is set to 0, and current parent is
     * set to root node.
     * */
    onHomeClick(): void {
        this._uriService.resetToRoot();
    }

    /**
     * On back click, the parent is set to parent of left nodes, that will solve
     * the right side menu (elements that were in left side, after backward
     * navigation will be on the right side).
     * Current level is set to a lower number in order to set the left side menu.
     * */
    onBackClick(): void {
        const leftParent = this._uriService.$backStack.pop();
        this._uriService.decLevel();
        this._uriService.$rightParent.next(this._uriService.$leftParent.value);
        this._uriService.$leftParent.next(leftParent);
    }

    /**
     * The function calls the UriService.resolveRightNodes(parentID: string)
     * function in order to load all nodes by parent ID.
     * @param node the object of node that was clicked
     * */
    onLeftSideClick(node: UriNodeResource): void {
        this._uriService.$rightParent.next(node.id);
    }

    /**
     * The function increases the level to load right side nodes into left side
     * and calls the UriService.resolveRightNodes(parentID: string) function
     * to load all nodes by parent ID.
     * @param node the object of node that was clicked
     * */
    onRightSideClick(node: UriNodeResource): void {
        this._uriService.$backStack.push(this._uriService.$leftParent.value);
        this._uriService.incLevel();
        this._uriService.$leftParent.next(node.parentId);
        this._uriService.$rightParent.next(node.id);
    }

    /**
     * Function to check whether the back button should be displayed
     * @returns boolean if the back button should be displayed
     * */
    isOnZeroLevel(): boolean {
        return this._uriService.$currentLevel == 0;
    }

    isLeftNodesEmpty(): boolean {
        return !this._leftNodes || this._leftNodes.length === 0;
    }

    isRightNodesEmpty(): boolean {
        return !this._rightNodes || this._rightNodes.length === 0;
    }

    isFiltersEmpty(): boolean {
        return !this._filters || this._filters.length === 0;
    }

    isRightParent(nodeId: string): boolean {
        return this._uriService.$rightParent.value === nodeId;
    }

}
