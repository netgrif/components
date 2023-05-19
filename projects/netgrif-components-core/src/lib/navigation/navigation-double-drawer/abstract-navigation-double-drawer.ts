import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {MatDrawerMode} from '@angular/material/sidenav';
import {ActivatedRoute, Router} from '@angular/router';
import {ResizeEvent} from 'angular-resizable-element';
import {Observable, of, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {RoleAccess, View} from '../../../commons/schema';
import {AccessService} from '../../authorization/permission/access.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {ImpersonationUserSelectService} from '../../impersonation/services/impersonation-user-select.service';
import {ImpersonationService} from '../../impersonation/services/impersonation.service';
import {LoggerService} from '../../logger/services/logger.service';
import {Case} from '../../resources/interface/case';
import {
    DynamicNavigationRouteProviderService,
} from '../../routing/dynamic-navigation-route-provider/dynamic-navigation-route-provider.service';
import {NAE_ROUTING_CONFIGURATION_PATH} from '../../routing/routing-builder/routing-builder.service';
import {LanguageService} from '../../translate/language.service';
import {User} from '../../user/models/user';
import {UserService} from '../../user/services/user.service';
import {LoadingEmitter} from '../../utility/loading-emitter';
import {UriNodeResource} from '../model/uri-resource';
import {UriService} from '../service/uri.service';
import {I18nFieldValue} from "../../data-fields/i18n-field/models/i18n-field-value";
import {TranslateService} from "@ngx-translate/core";

export interface ConfigDoubleMenu {
    mode: MatDrawerMode;
    opened: boolean;
    disableClose: boolean;
    width: number;
}

export interface NavigationItem extends View {
    id: string;
    resource?: Case;
}

export const MENU_IDENTIFIERS = [
    'preference_item',
];
export const SETTINGS_TRANSITION_ID = 'item_settings';
export const FIELD_ID_DEFAULT_HEADERS = 'default_headers';

const LEFT_DRAWER_DEFAULT_WIDTH = 60;
const RIGHT_DRAWER_DEFAULT_WIDTH = 240;
const RIGHT_DRAWER_DEFAULT_MIN_WIDTH = 180;
const RIGHT_DRAWER_MAX_WIDTH = 460;

@Component({
    selector: 'ncc-abstract-navigation-double-drawer',
    template: '',
})
export abstract class AbstractNavigationDoubleDrawerComponent implements OnInit, OnDestroy {

    @Input() portalLeftMenu: TemplateRef<any>;
    @Input() portalRightMenu: TemplateRef<any>;
    @Input() imageRouterLink: string = '/';
    @Input() imageAlt: string = 'Logo';
    @Input() image: string;
    @Input() profileRouterLink: string = '/profile';
    @Input() includeUser: boolean = true;
    @Input() includeLanguage: boolean = true;
    @Input() includeMoreMenu: boolean = true;
    @Input() includeImpersonation: boolean = true;
    @Input() allClosable: boolean = true;
    @Input() folderIcon: string = 'folder';
    @Input() openedFolderIcon: string = 'folder_open';
    @Input() filterIcon: string = 'filter_alt';
    @Input() foldersCategoryName: string = 'toolbar.menu.folders';
    @Input() viewsCategoryName: string = 'toolbar.menu.views';

    /**
     * List of folders displayed on the left side of menu
     * */
    leftItems: Array<NavigationItem>

    /**
     * List of folders displayed on the right side of menu
     * */
    rightItems: Array<NavigationItem>

    moreMenuItems: Array<NavigationItem>;

    protected _breakpointSubscription: Subscription;
    protected _currentNodeSubscription: Subscription;

    /**
     * Currently display uri
     * Siblings of the node are on the left, children are on the right
     */
    private _currentNode: UriNodeResource;

    leftLoading$: LoadingEmitter;
    rightLoading$: LoadingEmitter;
    nodeLoading$: LoadingEmitter;

    protected _configLeftMenu: ConfigDoubleMenu = {
        mode: 'side',
        opened: true,
        disableClose: false,
        width: LEFT_DRAWER_DEFAULT_WIDTH,
    };
    protected _configRightMenu: ConfigDoubleMenu = {
        mode: 'side',
        opened: true,
        disableClose: false,
        width: RIGHT_DRAWER_DEFAULT_WIDTH,
    };

    protected constructor(protected _router: Router,
                          protected _activatedRoute: ActivatedRoute,
                          protected _breakpoint: BreakpointObserver,
                          protected _languageService: LanguageService,
                          protected _translateService: TranslateService,
                          protected _userService: UserService,
                          protected _accessService: AccessService,
                          protected _log: LoggerService,
                          protected _config: ConfigurationService,
                          protected _uriService: UriService,
                          protected _impersonationUserSelect: ImpersonationUserSelectService,
                          protected _impersonation: ImpersonationService,
                          protected _dynamicRoutingService: DynamicNavigationRouteProviderService) {
        this.leftItems = new Array<NavigationItem>();
        this.rightItems = new Array<NavigationItem>();
        this.leftLoading$ = new LoadingEmitter();
        this.rightLoading$ = new LoadingEmitter();
        this.nodeLoading$ = new LoadingEmitter();
    }

    ngOnInit(): void {
        this._breakpointSubscription = this._breakpoint.observe([Breakpoints.HandsetLandscape]).subscribe(() => {
            if (this._breakpoint.isMatched('(max-width: 959.99px)')) {
                this.resolveLayout(false);
            } else {
                this.resolveLayout(true);
            }
        });
        if (!this._currentNode) {
            this.leftLoading$.on();
            this.rightLoading$.on();
        }
        this._currentNodeSubscription = this._uriService.activeNode$.subscribe(node => {
            this.currentNode = node;
        });

        const viewConfigurationPath = this._activatedRoute.snapshot.data[NAE_ROUTING_CONFIGURATION_PATH];
        if (!!viewConfigurationPath) {
            const viewConfiguration = this._config.getViewByPath(viewConfigurationPath);
            Object.entries(viewConfiguration.children).forEach(([key, childView]) => {
            });
        }
    }

    get currentNode(): UriNodeResource {
        return this._currentNode;
    }

    set currentNode(node: UriNodeResource) {
        if (node === this._currentNode) return;
        this._currentNode = node;
        if (!node) return;
        if (node.parentId && !node.parent) {
            if (node.parentId === this._uriService.root.id) {
                node.parent = this._uriService.root;
            } else {
                this.nodeLoading$.on();
                this._uriService.getNodeByPath(this._uriService.resolveParentPath(node)).subscribe(n => {
                    node.parent = !n ? this._uriService.root : n;
                    this.nodeLoading$.off();
                }, error => {
                    this._log.error(error);
                    this.nodeLoading$.off();
                });
            }
        }

        if (this.leftLoading$.isActive || this.rightLoading$.isActive) {
            this.leftLoading$.off();
            this.rightLoading$.off();
        }
        if (this._uriService.isRoot(node)) {
            this.leftItems = [];
            this.loadRightSide();
            return;
        }
        if (!this.leftItems.find(item => item.resource.immediateData.find(f => f.stringId === 'nodePath')?.value === node.uriPath)) {
            this.loadLeftSide();
        }
        this.loadRightSide();
    }

    ngOnDestroy(): void {
        this._breakpointSubscription?.unsubscribe();
        this._currentNodeSubscription?.unsubscribe();
        this.leftLoading$.complete();
        this.rightLoading$.complete();
        this.nodeLoading$.complete();
    }

    get configLeftMenu() {
        return this._configLeftMenu;
    }

    get configRightMenu() {
        return this._configRightMenu;
    }

    toggleMenu() {
        this.toggleRightMenu();
        if (this.allClosable) {
            this.toggleLeftMenu();
        }
    }

    toggleLeftMenu() {
        this._configLeftMenu.opened = !this._configLeftMenu.opened;
    }

    toggleRightMenu() {
        this._configRightMenu.opened = !this._configRightMenu.opened;
    }

    protected resolveLayout(isLargeScreen: boolean): void {
        this._configLeftMenu = isLargeScreen ? {
            mode: 'side',
            opened: true,
            disableClose: true,
            width: this._configLeftMenu.width,
        } : {
            mode: 'over',
            opened: false,
            disableClose: false,
            width: this._configLeftMenu.width,
        };
        this._configRightMenu = isLargeScreen ? {
            mode: 'side',
            opened: true,
            disableClose: true,
            width: this._configRightMenu.width,
        } : {
            mode: 'over',
            opened: false,
            disableClose: false,
            width: this._configRightMenu.width,
        };
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

    impersonate(): void {
        this._impersonationUserSelect.selectImpersonate();
    }

    stopImpersonating(): void {
        this._impersonation.cease();
    }

    get user(): User {
        return this._userService.user;
    }

    get canGoBackLoading$(): Observable<boolean> {
        return this.nodeLoading$;
    }

    /**
     * On home click, the current level is set to 0, and current parent is
     * set to root node.
     * */
    onHomeClick(): void {
        this.currentNode = this._uriService.root;
    }

    /**
     * On back click, the parent is set to parent of left nodes, that will solve
     * the right side menu (elements that were in left side, after backward
     * navigation will be on the right side).
     * Current level is set to a lower number in order to set the left side menu.
     * */
    onBackClick(): void {
        if (this._uriService.isRoot(this._currentNode)) return;
        this.currentNode = this._currentNode.parent;
    }

    onItemClick(item: NavigationItem): void {
        this._uriService.activeNode = this._currentNode;
        if (this.hasItemChildren(item)) {
            const path = item.resource.immediateData.find(f => f.stringId === 'nodePath')?.value
            this._uriService.getNodeByPath(path).subscribe(node => {
                this.currentNode = node
            }, error => {
                this._log.error(error);
            });
        }
    }

    hasItemChildren(item: NavigationItem): boolean {
        return item.resource.immediateData.find(f => f.stringId === 'hasChildren')?.value
    }

    isItemAndNodeEqual(item: NavigationItem, node: UriNodeResource): boolean {
        return item.resource.immediateData.find(f => f.stringId === 'nodePath')?.value === node.uriPath
    }

    protected loadLeftSide() {
        if (this._uriService.isRoot(this._currentNode)) {
            this.leftItems = [];
            return;
        }
        this.leftLoading$.on();
        this._uriService.getCasesOfNode(this.currentNode.parent, MENU_IDENTIFIERS, 0, 1).subscribe(page => {
            page?.pagination?.totalElements === 0 ? of([]) : this._uriService.getCasesOfNode(this.currentNode.parent, MENU_IDENTIFIERS, 0, page.pagination.totalElements).pipe(
                map(p => p.content),
            ).subscribe(result => {
                this.leftItems = result.filter(folder => folder.immediateData.find(f => f.stringId === 'hasChildren')?.value === true).map(folder => this.resolveItemCaseToNavigationItem(folder)).filter(i => !!i);
                // this.leftItems.sort((a, b) => this.compareStrings(a?.navigation.title, b?.navigation?.title));
                this.leftLoading$.off();
            }, error => {
                this._log.error(error);
                this.leftItems = [];
                this.leftLoading$.off();
            });
        }, error => {
            this._log.error(error);
            this.leftItems = [];
            this.leftLoading$.off();
        });
    }

    protected loadRightSide() {
        this.rightLoading$.on();
        this._uriService.getCasesOfNode(this.currentNode, MENU_IDENTIFIERS, 0, 1).subscribe(page => {
            this._log.debug('Number of items for uri ' + this._currentNode.uriPath + ': ' + page?.pagination?.totalElements);
            (page?.pagination?.totalElements === 0 ? of([]) : this._uriService.getCasesOfNode(this._currentNode, MENU_IDENTIFIERS, 0, page.pagination.totalElements).pipe(
                map(p => p.content),
            )).subscribe(result => {
                this.rightItems = result.map(folder => this.resolveItemCaseToNavigationItem(folder)).filter(i => !!i);
                // @ts-ignore
                this.rightItems.sort((a, b) => this.compareStrings(a?.navigation?.title, b?.navigation?.title));
                this.rightLoading$.off();
            }, error => {
                this._log.error(error);
                this.rightItems = [];
                this.rightLoading$.off();
            });
        }, error => {
            this._log.error(error);
            this.rightItems = [];
            this.rightLoading$.off();
        });
    }

    protected resolveItemCaseToNavigationItem(itemCase: Case): NavigationItem | undefined {
        const item: NavigationItem = {
            access: {},
            navigation: {
                icon: itemCase.immediateData.find(f => f.stringId === 'icon')?.value || this.filterIcon,
                title: this.getTranslation(itemCase.immediateData.find(f => f.stringId === 'name')?.value) || itemCase.title,
            },
            routing: {
                path: this.getItemRoutingPath(itemCase),
            },
            id: itemCase.stringId,
            resource: itemCase,
        };
        const resolvedRoles = this.resolveAccessRoles(itemCase, 'allowed_roles');
        const resolvedBannedRoles = this.resolveAccessRoles(itemCase, 'banned_roles');
        if (!!resolvedRoles) item.access['role'] = resolvedRoles;
        if (!!resolvedBannedRoles) item.access['bannedRole'] = resolvedBannedRoles;
        if (!this._accessService.canAccessView(item, item.routingPath)) return;
        return item;
    }

    private getTranslation(value: I18nFieldValue): string {
        const locale = this._translateService.currentLang.split('-')[0];
        return locale in value.translations ? value.translations[locale] : value.defaultValue;
    }

    protected resolveAccessRoles(filter: Case, roleType: string): Array<RoleAccess> | undefined {
        const allowedRoles = filter.immediateData.find(f => f.stringId === roleType)?.options;
        if (!allowedRoles || Object.keys(allowedRoles).length === 0) return undefined;
        const roles = [];
        Object.keys(allowedRoles).forEach(combined => {
            const parts = combined.split(':');
            roles.push({
                processId: parts[1],
                roleId: parts[0],
            });
        });
        return roles;
    }

    protected getItemRoutingPath(itemCase: Case) {
        const transId = SETTINGS_TRANSITION_ID;
        const taskId = itemCase.tasks.find(taskPair => taskPair.transition === transId).task;
        const url = this._dynamicRoutingService.route;
        return `/${url}/${taskId}`;
    }

    protected compareStrings(a: string, b: string): number {
        if (!a && !b) return 0;
        if (a < b) return -1;
        return a > b ? 1 : 0;
    }

    /**
     * Function to check whether the back button should be displayed
     * @returns boolean if the back button should be displayed
     * */
    isOnZeroLevel(): boolean {
        return !!this._currentNode?.level ? this._currentNode.level == 0 : true;
    }

    isLeftItemsEmpty(): boolean {
        return this.leftItems === undefined || this.leftItems.length === 0;
    }

    isRightItemsEmpty(): boolean {
        return this.rightItems === undefined || this.rightItems.length === 0;
    }

    uriNodeTrackBy(index: number, node: UriNodeResource) {
        return node.id;
    }

    itemsTrackBy(index: number, item: NavigationItem) {
        return item.id;
    }

    onResizeEvent(event: ResizeEvent): void {
        if (event.rectangle.width > RIGHT_DRAWER_MAX_WIDTH) {
            this._configRightMenu.width = RIGHT_DRAWER_MAX_WIDTH;
        } else if (event.rectangle.width < RIGHT_DRAWER_DEFAULT_MIN_WIDTH) {
            this._configRightMenu.width = RIGHT_DRAWER_DEFAULT_MIN_WIDTH;
        } else {
            this._configRightMenu.width = event.rectangle.width;
        }
        // TODO implement saving drawer width to user preferences
        // this.userPreferenceService._drawerWidthChanged$.next(this.width);
        // this.contentWidth.next(this.width);
    }

}
