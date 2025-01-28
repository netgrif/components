import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {HttpParams} from '@angular/common/http';
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ResizeEvent} from 'angular-resizable-element';
import {Observable, of, Subscription} from 'rxjs';
import {filter, map, take} from 'rxjs/operators';
import {RoleAccess, View} from '../../../commons/schema';
import {AccessService} from '../../authorization/permission/access.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {I18nFieldValue} from '../../data-fields/i18n-field/models/i18n-field-value';
import {CaseSearchRequestBody, PetriNetSearchRequest} from '../../filter/models/case-search-request-body';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {ImpersonationUserSelectService} from '../../impersonation/services/impersonation-user-select.service';
import {ImpersonationService} from '../../impersonation/services/impersonation.service';
import {LoggerService} from '../../logger/services/logger.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {Case} from '../../resources/interface/case';
import {Page} from '../../resources/interface/page';
import {
    DynamicNavigationRouteProviderService,
} from '../../routing/dynamic-navigation-route-provider/dynamic-navigation-route-provider.service';
import { RedirectService } from '../../routing/redirect-service/redirect.service';
import {NAE_ROUTING_CONFIGURATION_PATH} from '../../routing/routing-builder/routing-builder.service';
import {LanguageService} from '../../translate/language.service';
import {User} from '../../user/models/user';
import {UserService} from '../../user/services/user.service';
import {LoadingEmitter} from '../../utility/loading-emitter';
import {PaginationParams} from '../../utility/pagination/pagination-params';
import {GroupNavigationConstants} from '../model/group-navigation-constants';
import {
    ConfigDoubleMenu,
    LEFT_DRAWER_DEFAULT_WIDTH,
    MENU_IDENTIFIERS,
    MenuOrder,
    NavigationItem,
    RIGHT_DRAWER_DEFAULT_MIN_WIDTH,
    RIGHT_DRAWER_DEFAULT_WIDTH,
    RIGHT_DRAWER_MAX_WIDTH,
    RIGHT_SIDE_INIT_PAGE_SIZE,
    RIGHT_SIDE_NEW_PAGE_SIZE,
    SETTINGS_TRANSITION_ID,
} from '../model/navigation-configs';
import {
    MenuItemClickEvent,
    MenuItemLoadedEvent,
    MenuResizeEvent,
    MenuStateChangeEvent,
} from '../model/navigation-menu-events';
import {UriNodeResource} from '../model/uri-resource';
import {UriService} from '../service/uri.service';

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

    @Output() loggedOut = new EventEmitter<any>(true); // on logout
    @Output() stateChanged = new EventEmitter<MenuStateChangeEvent>(); // on menu state change
    @Output() itemClicked = new EventEmitter<MenuItemClickEvent>(); // on item click
    @Output() resized = new EventEmitter<MenuResizeEvent>(true); // on menu resize
    @Output() itemLoaded = new EventEmitter<MenuItemLoadedEvent>(true); // on item loaded


    /**
     * List of displayed items on the left side
     * */
    leftItems: Array<NavigationItem>;

    /**
     * List of displayed items on the right side
     * */
    rightItems: Array<NavigationItem>;

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
    protected _currentNode: UriNodeResource;

    /**
     * Currently selected navigation item
     */
    protected _currentNavigationItem: NavigationItem;

    leftLoading$: LoadingEmitter;
    rightLoading$: LoadingEmitter;
    nodeLoading$: LoadingEmitter;
    isRightSideInitialized: boolean;

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
                          protected _caseResourceService: CaseResourceService,
                          protected _impersonationUserSelect: ImpersonationUserSelectService,
                          protected _impersonation: ImpersonationService,
                          protected _dynamicRoutingService: DynamicNavigationRouteProviderService,
                          protected _redirectService: RedirectService) {
        this.leftItems = new Array<NavigationItem>();
        this.rightItems = new Array<NavigationItem>();
        this.leftLoading$ = new LoadingEmitter();
        this.rightLoading$ = new LoadingEmitter();
        this.nodeLoading$ = new LoadingEmitter();
        this.isRightSideInitialized = false;
        this.itemsOrder = MenuOrder.Ascending;
        this.hiddenCustomItems = [];
        this.moreItems = new Array<NavigationItem>();
        this._currentNavigationItem = null;
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

        this._currentNodeSubscription = this._uriService.activeNode$.subscribe(node => {
            this.currentNode = node;
        });

        this.rightLoading$.pipe(
            filter(() => this.isRightSideInitialized === true),
            filter(isRightLoading => isRightLoading === false),
            take(1)
        ).subscribe(()=> {
            this.openAvailableView();
        })

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
        if (node === this._currentNode || this.leftLoading$.isActive || this.rightLoading$.isActive) {
            return;
        }
        this._currentNode = node;
        if (!node) {
            return;
        }
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
        if (this.nodeLoading$.isActive) {
            this.nodeLoading$.subscribe(() => {
                this.resolveMenuItems(node);
            });
        } else {
            this.resolveMenuItems(node);
        }
    }

    protected resolveMenuItems(node: UriNodeResource) {
        if (this._uriService.isRoot(node)) {
            this.leftItems = [];
            this.loadRightSide();
        } else {
            if (!this.leftItems.find(item => item.resource?.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_NODE_PATH)?.value === node.uriPath)) {
                this.loadLeftSide();
            }
            this.loadRightSide();
        }
    }

    ngOnDestroy(): void {
        this._breakpointSubscription?.unsubscribe();
        this._currentNodeSubscription?.unsubscribe();
        this.leftLoading$.complete();
        this.rightLoading$.complete();
        this.nodeLoading$.complete();
        this.loggedOut.complete();
        this.stateChanged.complete();
        this.itemClicked.complete();
        this.resized.complete();
        this.itemLoaded.complete();
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
        this.stateChanged.emit({menu: 'left', isOpened: this._configLeftMenu.opened});
    }

    toggleRightMenu() {
        this._configRightMenu.opened = !this._configRightMenu.opened;
        this.stateChanged.emit({menu: 'right', isOpened: this._configRightMenu.opened});
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
        this._userService.logout().subscribe(response => {
            this._log.debug('User is logged out');
            this.loggedOut.emit(response);
            if (this._config.get().services && this._config.get().services.auth && this._config.getOnLogoutPath()) {
                const redirectPath = this._config.getOnLogoutPath();
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
        if (this.leftLoading$.isActive || this.rightLoading$.isActive) {
            return;
        }
        this._uriService.activeNode = this._uriService.root;
        this.itemClicked.emit({uriNode: this._uriService.activeNode, isHome: true});
    }

    /**
     * On back click, the parent is set to parent of left nodes, that will solve
     * the right side menu (elements that were in left side, after backward
     * navigation will be on the right side).
     * Current level is set to a lower number in order to set the left side menu.
     * */
    onBackClick(): void {
        if (this.leftLoading$.isActive || this.rightLoading$.isActive || this._uriService.isRoot(this._currentNode)) {
            return;
        }
        this._uriService.activeNode = this._currentNode.parent;
        this.itemClicked.emit({uriNode: this._uriService.activeNode, isHome: false});
    }

    onItemClick(item: NavigationItem): void {
        this._currentNavigationItem = item;
        if (item.resource === undefined) {
            // custom view represented only in nae.json
            if (item.processUri === this.currentNode.uriPath) {
                this._uriService.activeNode = this._currentNode;
            } else {
                this._uriService.activeNode = this._currentNode.parent;
            }
            this.itemClicked.emit({uriNode: this._uriService.activeNode, isHome: false});
        } else {
            const path = item.resource.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_NODE_PATH)?.value;
            if (this.hasItemChildren(item) && !this.leftLoading$.isActive && !this.rightLoading$.isActive) {
                this._uriService.getNodeByPath(path).subscribe(node => {
                    this._uriService.activeNode = node;
                    this.itemClicked.emit({uriNode: this._uriService.activeNode, isHome: false});
                    this.rightLoading$.pipe(
                        filter(isRightLoading => isRightLoading === false),
                        take(1)
                    ).subscribe(()=> {
                        this.openAvailableView();
                    })
                }, error => {
                    this._log.error(error);
                });
            } else if (!path.includes(this.currentNode.uriPath)) {
                this._uriService.activeNode = this._currentNode.parent;
                this.itemClicked.emit({uriNode: this._uriService.activeNode, isHome: false});
            } else {
                this._uriService.activeNode = this._currentNode;
                this.itemClicked.emit({uriNode: this._uriService.activeNode, isHome: false});
            }
        }
    }

    protected openAvailableView() {
        let allItems: Array<NavigationItem> = this.rightItems.concat(this.moreItems);

        let autoOpenItems: Array<NavigationItem> = allItems.filter(item => this.hasItemAutoOpenView(item));
        if (autoOpenItems.length > 0) {
            this._redirectService.redirect(autoOpenItems[0].routing.path);
            return;
        }

        if (this.hasItemView(this._currentNavigationItem)) {
            // is routed by routerLink on item click
            return;
        }

        let itemsWithView: Array<NavigationItem> = allItems.filter(item => this.hasItemView(item));
        if (itemsWithView.length > 0) {
            this._redirectService.redirect(autoOpenItems[0].routing.path);
            return;
        }
    }

    hasItemChildren(item: NavigationItem): boolean {
        return item.resource?.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_HAS_CHILDREN)?.value;
    }

    protected hasItemAutoOpenView(item: NavigationItem): boolean {
        return item.resource?.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_IS_AUTO_SELECT)?.value;
    }

    protected hasItemView(item: NavigationItem): boolean {
        return item?.resource?.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_CONTAINS_FILTER)?.value;
    }

    isItemAndNodeEqual(item: NavigationItem, node: UriNodeResource): boolean {
        return item.resource?.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_NODE_PATH)?.value === node.uriPath;
    }

    protected loadLeftSide() {
        if (this._uriService.isRoot(this._currentNode)) {
            this.leftItems = [];
            return;
        }
        this.leftLoading$.on();
        this._uriService.getItemCaseByNodePath(this.currentNode.parent).subscribe(page => {
            let childCases$;
            let targetItem;
            let orderedChildCaseIds;

            if (page?.pagination?.totalElements === 0) {
                childCases$ = of([]);
            } else {
                targetItem = page.content[0];
                orderedChildCaseIds = this.extractChildCaseIds(targetItem);
                childCases$ = this.getItemCasesByIdsInOnePage(orderedChildCaseIds).pipe(
                    map(p => p.content),
                );
            }

            childCases$.subscribe(result => {
                result = result.map(folder => this.resolveItemCaseToNavigationItem(folder)).filter(i => !!i);
                this.leftItems = result.sort((a, b) => orderedChildCaseIds.indexOf(a.resource.stringId) - orderedChildCaseIds.indexOf(b.resource.stringId));
                this.resolveCustomViewsInLeftSide();
                this.leftLoading$.off();
                this.itemLoaded.emit({menu: 'left', items: this.leftItems});
            }, error => {
                this._log.error(error);
                this.leftItems = [];
                this.resolveCustomViewsInLeftSide();
                this.leftLoading$.off();
            });
        }, error => {
            this._log.error(error);
            this.leftItems = [];
            this.resolveCustomViewsInLeftSide();
            this.leftLoading$.off();
        });
    }

    protected loadRightSide() {
        this.rightLoading$.on();
        this.moreItems = [];
        this._uriService.getItemCaseByNodePath(this.currentNode).subscribe(page => {
            let childCases$;
            let targetItem;
            let orderedChildCaseIds;

            if (page?.pagination?.totalElements === 0) {
                childCases$ = of([]);
            } else {
                targetItem = page.content[0];
                orderedChildCaseIds = this.extractChildCaseIds(targetItem);
                childCases$ = this.getItemCasesByIdsInOnePage(orderedChildCaseIds).pipe(
                    map(p => p.content),
                );
            }

            childCases$.subscribe(result => {
                result = (result as Case[]).sort((a, b) => orderedChildCaseIds.indexOf(a.stringId) - orderedChildCaseIds.indexOf(b.stringId));
                if (result.length > RIGHT_SIDE_INIT_PAGE_SIZE) {
                    const rawRightItems: Case[] = result.splice(0, RIGHT_SIDE_INIT_PAGE_SIZE);
                    this.rightItems = rawRightItems.map(folder => this.resolveItemCaseToNavigationItem(folder)).filter(i => !!i);
                    this.moreItems = result.map(folder => this.resolveItemCaseToNavigationItem(folder)).filter(i => !!i);
                } else {
                    this.rightItems = result.map(folder => this.resolveItemCaseToNavigationItem(folder)).filter(i => !!i);
                }
                this.resolveCustomViewsInRightSide();
                this.isRightSideInitialized = true;
                this.rightLoading$.off();
                this.itemLoaded.emit({menu: 'right', items: this.rightItems});
            }, error => {
                this._log.error(error);
                this.rightItems = [];
                this.moreItems = [];
                this.resolveCustomViewsInRightSide();
                this.rightLoading$.off();
            });
        }, error => {
            this._log.error(error);
            this.rightItems = [];
            this.moreItems = [];
            this.resolveCustomViewsInRightSide();
            this.rightLoading$.off();
        });
    }

    protected extractChildCaseIds(item: Case): string[] {
        return item.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_CHILD_ITEM_IDS)?.value;
    }

    protected getItemCasesByIdsInOnePage(caseIds: string[]): Observable<Page<Case>> {
        return this.getItemCasesByIds(caseIds, 0, caseIds.length);
    }

    protected getItemCasesByIds(caseIds: string[], pageNumber: number, pageSize: string | number): Observable<Page<Case>> {
        const searchBody: CaseSearchRequestBody = {
            stringId: caseIds,
            process: MENU_IDENTIFIERS.map(id => ({identifier: id} as PetriNetSearchRequest)),
        };

        let httpParams = new HttpParams()
            .set(PaginationParams.PAGE_SIZE, pageSize)
            .set(PaginationParams.PAGE_NUMBER, pageNumber);
        return this._caseResourceService.searchCases(SimpleFilter.fromCaseQuery(searchBody), httpParams);
    }

    public loadMoreItems() {
        if (this.moreItems.length > RIGHT_SIDE_NEW_PAGE_SIZE) {
            this.rightItems.push(...this.moreItems.splice(0, RIGHT_SIDE_NEW_PAGE_SIZE));
        } else {
            this.rightItems.push(...this.moreItems);
            this.moreItems = [];
        }
    }

    public isAscending() {
        return this.itemsOrder === MenuOrder.Ascending;
    }

    public switchOrder() {
        this.itemsOrder = (this.itemsOrder + 1) % 2;
        let multiplier = 1;
        if (this.itemsOrder === MenuOrder.Descending) {
            multiplier = -1;
        }
        this.rightItems.sort((a, b) => multiplier * (a?.navigation as NavigationItem)?.title.localeCompare((b?.navigation as NavigationItem)?.title));
        this.leftItems.sort((a, b) => multiplier * (a?.navigation as NavigationItem)?.title.localeCompare((b?.navigation as NavigationItem)?.title));
    }

    protected resolveCustomViewsInRightSide() {
        if (!!this._childCustomViews[this._currentNode.uriPath]) {
            this.rightItems.push(...Object.values(this._childCustomViews[this._currentNode.uriPath]));
        }
    }

    protected resolveCustomViewsInLeftSide() {
        if (!!this._childCustomViews[this._currentNode.parent.uriPath]) {
            this.leftItems.push(...Object.values(this._childCustomViews[this._currentNode.parent.uriPath]));
        }
    }

    protected resolveItemCaseToNavigationItem(itemCase: Case): NavigationItem | undefined {
        if (this.representsRootNode(itemCase)) {
            return;
        }
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

    protected representsRootNode(item: Case): boolean {
        return item.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_NODE_PATH).value === '/';
    }

    protected getTranslation(value: I18nFieldValue): string {
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
        this.resized.emit({width: this._configRightMenu.width});
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
