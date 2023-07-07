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
import {GroupNavigationConstants} from "../model/group-navigation-constants";

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

const LEFT_DRAWER_DEFAULT_WIDTH = 60;
const RIGHT_DRAWER_DEFAULT_WIDTH = 240;
const RIGHT_DRAWER_DEFAULT_MIN_WIDTH = 180;
const RIGHT_DRAWER_MAX_WIDTH = 460;
const RIGHT_SIDE_NEW_PAGE_SIZE = 10
const RIGHT_SIDE_INIT_PAGE_SIZE = 20

enum MenuOrder {
    Ascending,
    Descending
}

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
     * List of displayed items on the left side
     * */
    leftItems: Array<NavigationItem>

    /**
     * List of displayed items on the right side
     * */
    rightItems: Array<NavigationItem>

    /**
     * List of hidden items
     * */
    moreItems: Array<NavigationItem>;

    /**
     * List of custom items in more menu
     * */
    hiddenCustomItems: Array<NavigationItem>;

    itemsOrder: MenuOrder;

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

    protected _childCustomViews: { [uri: string]: { [key: string]: NavigationItem } };

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
        this.itemsOrder = MenuOrder.Ascending;
        this.hiddenCustomItems = [];
        this._childCustomViews = {};
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
                this.resolveUriForChildViews(viewConfigurationPath + '/' + key, childView);
                this.resolveHiddenMenuItemFromChildViews(viewConfigurationPath + '/' + key, childView);
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
        if (!this.leftItems.find(item => item.resource.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_NODE_PATH)?.value === node.uriPath)) {
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
            const path = item.resource.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_NODE_PATH)?.value
            this._uriService.getNodeByPath(path).subscribe(node => {
                this.currentNode = node
            }, error => {
                this._log.error(error);
            });
        }
    }

    hasItemChildren(item: NavigationItem): boolean {
        return item.resource.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_HAS_CHILDREN)?.value
    }

    isItemAndNodeEqual(item: NavigationItem, node: UriNodeResource): boolean {
        return item.resource.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_NODE_PATH)?.value === node.uriPath
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
                this.leftItems = result.filter(folder => folder.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_HAS_CHILDREN)?.value === true).map(folder => this.resolveItemCaseToNavigationItem(folder)).filter(i => !!i);
                this.leftItems.sort((a, b) => (a?.navigation as NavigationItem)?.title.localeCompare((b?.navigation as NavigationItem)?.title));
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
        this.moreItems = [];
        this._uriService.getCasesOfNode(this.currentNode, MENU_IDENTIFIERS, 0, 1).subscribe(page => {
            this._log.debug('Number of items for uri ' + this._currentNode.uriPath + ': ' + page?.pagination?.totalElements);
            (page?.pagination?.totalElements === 0 ? of([]) : this._uriService.getCasesOfNode(this._currentNode, MENU_IDENTIFIERS, 0, page.pagination.totalElements).pipe(
                map(p => p.content),
            )).subscribe(result => {
                result = (result as Case[]).sort((a, b) => a?.title.localeCompare(b?.title));
                if (result.length > RIGHT_SIDE_INIT_PAGE_SIZE) {
                    const rawRightItems: Case[] = result.splice(0, RIGHT_SIDE_INIT_PAGE_SIZE);
                    this.rightItems = rawRightItems.map(folder => this.resolveItemCaseToNavigationItem(folder)).filter(i => !!i);
                    this.moreItems = result.map(folder => this.resolveItemCaseToNavigationItem(folder)).filter(i => !!i);
                } else {
                    this.rightItems = result.map(folder => this.resolveItemCaseToNavigationItem(folder)).filter(i => !!i);
                }
                this.resolveCustomViewsInRightSide()
                this.rightLoading$.off();
            }, error => {
                this._log.error(error);
                this.rightItems = [];
                this.moreItems = [];
                this.resolveCustomViewsInRightSide()
                this.rightLoading$.off();
            });
        }, error => {
            this._log.error(error);
            this.rightItems = [];
            this.moreItems = [];
            this.resolveCustomViewsInRightSide()
            this.rightLoading$.off();
        });
    }

    public loadMoreItems() {
        if (this.moreItems.length > RIGHT_SIDE_NEW_PAGE_SIZE) {
            this.rightItems.push(...this.moreItems.splice(0, RIGHT_SIDE_NEW_PAGE_SIZE))
        } else {
            this.rightItems.push(...this.moreItems)
            this.moreItems = []
        }
    }

    public isAscending() {
        return this.itemsOrder === MenuOrder.Ascending;
    }

    public switchOrder() {
        this.itemsOrder = (this.itemsOrder + 1) % 2;
        let multiplier = 1
        if (this.itemsOrder === MenuOrder.Descending) {
            multiplier = -1
        }
        this.rightItems = this.rightItems.sort((a, b) => multiplier * (a?.navigation as NavigationItem)?.title.localeCompare((b?.navigation as NavigationItem)?.title));
        this.leftItems = this.leftItems.sort((a, b) => multiplier * (a?.navigation as NavigationItem)?.title.localeCompare((b?.navigation as NavigationItem)?.title));
        this.moreItems = this.moreItems.sort((a, b) => multiplier * (a?.navigation as NavigationItem)?.title.localeCompare((b?.navigation as NavigationItem)?.title));
    }

    protected resolveCustomViewsInRightSide() {
        if (!!this._childCustomViews[this._currentNode.uriPath]) {
            this.rightItems.push(...Object.values(this._childCustomViews[this._currentNode.uriPath]));
        }
    }

    protected resolveItemCaseToNavigationItem(itemCase: Case): NavigationItem | undefined {
        const item: NavigationItem = {
            access: {},
            navigation: {
                icon: itemCase.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_MENU_ICON)?.value || this.filterIcon,
                title: this.getTranslation(itemCase.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_MENU_NAME)?.value) || itemCase.title,
            },
            routing: {
                path: this.getItemRoutingPath(itemCase),
            },
            id: itemCase.stringId,
            resource: itemCase,
        };
        const resolvedRoles = this.resolveAccessRoles(itemCase, GroupNavigationConstants.ITEM_FIELD_ID_ALLOWED_ROLES);
        const resolvedBannedRoles = this.resolveAccessRoles(itemCase, GroupNavigationConstants.ITEM_FIELD_ID_BANNED_ROLES);
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

    protected resolveUriForChildViews(configPath: string, childView: View): void {
        if (!childView.processUri) return;
        if (!this._accessService.canAccessView(childView, configPath)) return;
        if (!this._childCustomViews[childView.processUri]) {
            this._childCustomViews[childView.processUri] = {};
        }
        this._childCustomViews[childView.processUri][configPath] = {
            id: configPath,
            ...childView,
        };
    }

    protected resolveHiddenMenuItemFromChildViews(configPath: string, childView: View): void {
        if (!childView.navigation) return;
        if (!this._accessService.canAccessView(childView, configPath)) return;
        if (!!((childView?.navigation as any)?.hidden)) {
            this.hiddenCustomItems.push({
                id: configPath,
                ...childView,
            });
        }
    }

}
