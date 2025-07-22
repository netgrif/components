import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {UriService} from "../../service/uri.service";
import {LoadingEmitter} from "../../../utility/loading-emitter";
import {filter, map, take} from "rxjs/operators";
import {Case} from "../../../resources/interface/case";
import {LoggerService} from "../../../logger/services/logger.service";
import {DoubleDrawerUtils} from "../util/double-drawer-utils";
import {Page} from "../../../resources/interface/page";
import {CaseSearchRequestBody, PetriNetSearchRequest} from "../../../filter/models/case-search-request-body";
import {HttpParams} from "@angular/common/http";
import {PaginationParams} from "../../../utility/pagination/pagination-params";
import {SimpleFilter} from "../../../filter/models/simple-filter";
import {CaseResourceService} from "../../../resources/engine-endpoint/case-resource.service";
import {I18nFieldValue} from "../../../data-fields/i18n-field/models/i18n-field-value";
import {TranslateService} from "@ngx-translate/core";
import {
    DynamicNavigationRouteProviderService
} from "../../../routing/dynamic-navigation-route-provider/dynamic-navigation-route-provider.service";
import {RedirectService} from "../../../routing/redirect-service/redirect.service";
import {AccessService} from "../../../authorization/permission/access.service";
import {ActivatedRoute} from "@angular/router";
import {ConfigurationService} from "../../../configuration/configuration.service";
import {View} from "../../../../commons/schema";
import {
    MENU_IDENTIFIERS,
    MenuOrder,
    NavigationItem, RIGHT_SIDE_INIT_PAGE_SIZE,
    RIGHT_SIDE_NEW_PAGE_SIZE,
    SETTINGS_TRANSITION_ID
} from '../../model/navigation-configs';
import { UriNodeResource } from '../../model/uri-resource';
import {MenuItemClickEvent, MenuItemLoadedEvent} from '../../model/navigation-menu-events';
import {GroupNavigationConstants} from "../../model/group-navigation-constants";

/**
 * Service for managing navigation in double-drawer
 * */
@Injectable({
    providedIn: 'root',
})
export class DoubleDrawerNavigationService implements OnDestroy {

    /**
     * List of displayed items on the left side
     * */
    protected _leftItems$: BehaviorSubject<Array<NavigationItem>>;
    /**
     * List of displayed items on the right side
     * */
    protected _rightItems$: BehaviorSubject<Array<NavigationItem>>;
    /**
     * List of hidden items
     * */
    protected _moreItems$: BehaviorSubject<Array<NavigationItem>>;
    /**
     * List of custom items in more menu
     * */
    protected _hiddenCustomItems$: BehaviorSubject<Array<NavigationItem>>;
    /**
     * List of custom items
     * */
    protected _childCustomViews: { [uri: string]: { [key: string]: NavigationItem } };
    protected itemsOrder: MenuOrder;
    protected _leftLoading$: LoadingEmitter;
    protected _rightLoading$: LoadingEmitter;
    protected _nodeLoading$: LoadingEmitter;
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
    protected defaultViewIcon: string = 'filter_alt';
    protected customItemsInitialized: boolean;
    protected hiddenCustomItemsInitialized: boolean;
    protected itemClicked: EventEmitter<MenuItemClickEvent>;
    protected itemLoaded: EventEmitter<MenuItemLoadedEvent>;

    constructor(protected _uriService: UriService,
                protected _log: LoggerService,
                protected _config: ConfigurationService,
                protected _activatedRoute: ActivatedRoute,
                protected _caseResourceService: CaseResourceService,
                protected _accessService: AccessService,
                protected _translateService: TranslateService,
                protected _dynamicRoutingService: DynamicNavigationRouteProviderService,
                protected _redirectService: RedirectService) {
        this._leftItems$ = new BehaviorSubject([]);
        this._rightItems$ = new BehaviorSubject([]);
        this._moreItems$ = new BehaviorSubject([]);
        this._hiddenCustomItems$ = new BehaviorSubject([]);
        this._childCustomViews = {};
        this._leftLoading$ = new LoadingEmitter();
        this._rightLoading$ = new LoadingEmitter();
        this._nodeLoading$ = new LoadingEmitter();
        this._currentNavigationItem = null;
        this.itemsOrder = MenuOrder.Ascending;
        this.customItemsInitialized = false;
        this.hiddenCustomItemsInitialized = false;
        this.itemClicked = new EventEmitter<MenuItemClickEvent>();
        this.itemLoaded = new EventEmitter<MenuItemLoadedEvent>();

        this._currentNodeSubscription = this._uriService.activeNode$.subscribe(node => {
            this.currentNode = node;
        });
    }

    public ngOnDestroy(): void {
        this._currentNodeSubscription?.unsubscribe();
        this._leftLoading$.complete();
        this._rightLoading$.complete();
        this._nodeLoading$.complete();
        this.itemClicked.complete();
        this.itemLoaded.complete();
    }

    public get canGoBackLoading$(): Observable<boolean> {
        return this._nodeLoading$;
    }

    public get currentNode(): UriNodeResource {
        return this._currentNode;
    }

    public set currentNode(node: UriNodeResource) {
        if (node === this._currentNode || this._leftLoading$.isActive || this._rightLoading$.isActive) {
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
                this._nodeLoading$.on();
                this._uriService.getNodeByPath(this._uriService.resolveParentPath(node)).subscribe(n => {
                    node.parent = !n ? this._uriService.root : n;
                    this._nodeLoading$.off();
                }, error => {
                    this._log.error(error);
                    this._nodeLoading$.off();
                });
            }
        }
        if (this._nodeLoading$.isActive) {
            this._nodeLoading$.subscribe(() => {
                this.loadNavigationItems(node);
            });
        } else {
            this.loadNavigationItems(node);
        }
    }

    public get itemClicked$(): EventEmitter<MenuItemClickEvent> {
        return this.itemClicked;
    }

    public get itemLoaded$(): EventEmitter<MenuItemLoadedEvent> {
        return this.itemLoaded;
    }

    public get rightItems$(): BehaviorSubject<Array<NavigationItem>> {
        return this._rightItems$;
    }

    public get leftItems$(): BehaviorSubject<Array<NavigationItem>> {
        return this._leftItems$;
    }

    public get moreItems$(): BehaviorSubject<Array<NavigationItem>> {
        return this._moreItems$;
    }

    public get hiddenCustomItems$(): BehaviorSubject<Array<NavigationItem>> {
        return this._hiddenCustomItems$;
    }

    public get rightItems(): Array<NavigationItem> {
        return this._rightItems$.getValue();
    }

    public get leftItems(): Array<NavigationItem> {
        return this._leftItems$.getValue();
    }

    public get moreItems(): Array<NavigationItem> {
        return this._moreItems$.getValue();
    }

    public get hiddenCustomItems(): Array<NavigationItem> {
        return this._hiddenCustomItems$.getValue();
    }

    public get leftLoading$(): LoadingEmitter {
        return this._leftLoading$;
    }

    public get rightLoading$(): LoadingEmitter {
        return this._rightLoading$;
    }

    public get nodeLoading$(): LoadingEmitter {
        return this._nodeLoading$;
    }

    public loadNavigationItems(node: UriNodeResource) {
        if (this._uriService.isRoot(node)) {
            this._leftItems$.next([]);
            this.loadRightSide();
        } else {
            if (!this._leftItems$.getValue().find(item => DoubleDrawerUtils.isNodeCorrespondingToItem(node, item))) {
                this.loadLeftSide();
            }
            this.loadRightSide();
        }
    }

    /**
     * On home click, the current level is set to 0, and current parent is
     * set to root node.
     * */
    public onHomeClick(): void {
        if (this._leftLoading$.isActive || this._rightLoading$.isActive) {
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
    public onBackClick(): void {
        if (this._leftLoading$.isActive || this._rightLoading$.isActive || this._uriService.isRoot(this._currentNode)) {
            return;
        }
        this._uriService.activeNode = this._currentNode.parent;
        this.itemClicked.emit({uriNode: this._uriService.activeNode, isHome: false});
    }

    /**
     * On item click, the selected item's view is rendered (by routerLink). If the selected item has children items, the menu is updated
     * and view, that is rendered is selected by the defined rule. The rule is: On first check for default view in children.
     * On second check if the clicked item has a view. On third, pick any other children's view, else show nothing.
     * */
    public onItemClick(item: NavigationItem): void {
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
            if (DoubleDrawerUtils.hasItemChildren(item) && !this._leftLoading$.isActive && !this._rightLoading$.isActive) {
                this._uriService.getNodeByPath(path).subscribe(node => {
                    this._uriService.activeNode = node;
                    this.itemClicked.emit({uriNode: this._uriService.activeNode, isHome: false});
                    this._rightLoading$.pipe(
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

    /**
     * Opens a view of the current right items in the menu by defined rule. The rule is: On first check for default
     * view in children. On second check if the clicked item has a view. On third, pick any other children's view, else
     * show nothing.
     * */
    public openAvailableView() {
        let allItems: Array<NavigationItem> = this.rightItems.concat(this.moreItems);

        let autoOpenItems: Array<NavigationItem> = allItems.filter(item => DoubleDrawerUtils.hasItemAutoOpenView(item));
        if (autoOpenItems.length > 0) {
            this._redirectService.redirect(autoOpenItems[0].routing.path);
            return;
        }

        if (DoubleDrawerUtils.hasItemView(this._currentNavigationItem)) {
            // is routed by routerLink on item click
            return;
        }

        let itemsWithView: Array<NavigationItem> = allItems.filter(item => DoubleDrawerUtils.hasItemView(item));
        if (itemsWithView.length > 0) {
            this._redirectService.redirect(autoOpenItems[0].routing.path);
        }
    }

    public loadMoreItems() {
        if (this.moreItems.length > RIGHT_SIDE_NEW_PAGE_SIZE) {
            let currentRightItems = this.rightItems;
            let currentMoreItems = this.moreItems;
            currentRightItems.push(...currentMoreItems.splice(0, RIGHT_SIDE_NEW_PAGE_SIZE));
            this.rightItems$.next(currentRightItems);
            this.moreItems$.next(currentMoreItems);
        } else {
            let currentRightItems = this.rightItems;
            currentRightItems.push(...this.moreItems);
            this.rightItems$.next(currentRightItems);
            this.moreItems$.next([]);
        }
    }

    public initializeCustomViewsOfView(view: View, viewConfigPath: string): void {
        if (!view || this.customItemsInitialized || this.hiddenCustomItemsInitialized) return;

        Object.entries(view.children).forEach(([key, childView]) => {
            const childViewConfigPath: string = viewConfigPath + '/' + key;
            this.resolveUriForChildViews(childViewConfigPath, childView);
            this.resolveHiddenMenuItemFromChildViews(childViewConfigPath, childView);
        });

        this.resolveCustomViewsInRightSide();
        this.resolveCustomViewsInLeftSide();

        this.customItemsInitialized = true;
        this.hiddenCustomItemsInitialized = true;
    }

    public switchOrder(): void {
        this.itemsOrder = (this.itemsOrder + 1) % 2;
        let multiplier = 1;
        if (this.itemsOrder === MenuOrder.Descending) {
            multiplier = -1;
        }
        let currentRightItems = this.rightItems;
        let currentLeftItems = this.leftItems;
        currentRightItems.sort((a, b) => multiplier * (a?.navigation as NavigationItem)?.title.localeCompare((b?.navigation as NavigationItem)?.title));
        currentLeftItems.sort((a, b) => multiplier * (a?.navigation as NavigationItem)?.title.localeCompare((b?.navigation as NavigationItem)?.title));
        this.rightItems$.next(currentRightItems);
        this.leftItems$.next(currentLeftItems);
    }

    public isAscending(): boolean {
        return this.itemsOrder === MenuOrder.Ascending;
    }

    protected loadLeftSide() {
        if (this._uriService.isRoot(this._currentNode)) {
            this._leftItems$.next([])
            return;
        }
        this._leftLoading$.on();
        this._uriService.getItemCaseByNodePath(this.currentNode.parent).subscribe(page => {
            let childCases$;
            let targetItem;
            let orderedChildCaseIds;

            if (page?.pagination?.totalElements === 0) {
                childCases$ = of([]);
            } else {
                targetItem = page.content[0];
                orderedChildCaseIds = DoubleDrawerUtils.extractChildCaseIds(targetItem);
                childCases$ = this.getItemCasesByIdsInOnePage(orderedChildCaseIds).pipe(
                    map(p => p.content),
                );
            }

            childCases$.subscribe(result => {
                result = result.map(folder => this.resolveItemCaseToNavigationItem(folder)).filter(i => !!i);
                this._leftItems$.next(result.sort((a, b) => orderedChildCaseIds.indexOf(a.resource.stringId) - orderedChildCaseIds.indexOf(b.resource.stringId)));
                this.resolveCustomViewsInLeftSide();
                this._leftLoading$.off();
                this.itemLoaded.emit({menu: 'left', items: this.leftItems});
            }, error => {
                this._log.error(error);
                this._leftItems$.next([])
                this.resolveCustomViewsInLeftSide();
                this._leftLoading$.off();
            });
        }, error => {
            this._log.error(error);
            this._leftItems$.next([])
            this.resolveCustomViewsInLeftSide();
            this._leftLoading$.off();
        });
    }

    protected loadRightSide() {
        this._rightLoading$.on();
        this._moreItems$.next([])
        this._uriService.getItemCaseByNodePath(this.currentNode).subscribe(page => {
            let childCases$;
            let targetItem;
            let orderedChildCaseIds;

            if (page?.pagination?.totalElements === 0) {
                childCases$ = of([]);
            } else {
                targetItem = page.content[0];
                orderedChildCaseIds = DoubleDrawerUtils.extractChildCaseIds(targetItem);
                childCases$ = this.getItemCasesByIdsInOnePage(orderedChildCaseIds).pipe(
                    map(p => p.content),
                );
            }

            childCases$.subscribe(result => {
                result = (result as Case[]).sort((a, b) => orderedChildCaseIds.indexOf(a.stringId) - orderedChildCaseIds.indexOf(b.stringId));
                if (result.length > RIGHT_SIDE_INIT_PAGE_SIZE) {
                    const rawRightItems: Case[] = result.splice(0, RIGHT_SIDE_INIT_PAGE_SIZE);
                    this._rightItems$.next(rawRightItems.map(folder => this.resolveItemCaseToNavigationItem(folder)).filter(i => !!i));
                    this._moreItems$.next(result.map(folder => this.resolveItemCaseToNavigationItem(folder)).filter(i => !!i));
                } else {
                    this._rightItems$.next(result.map(folder => this.resolveItemCaseToNavigationItem(folder)).filter(i => !!i));
                }
                this.resolveCustomViewsInRightSide();
                this._rightLoading$.off();
                this.itemLoaded.emit({menu: 'right', items: this.rightItems});
            }, error => {
                this._log.error(error);
                this._rightItems$.next([]);
                this._moreItems$.next([]);
                this.resolveCustomViewsInRightSide();
                this._rightLoading$.off();
            });
        }, error => {
            this._log.error(error);
            this._rightItems$.next([]);
            this._moreItems$.next([]);
            this.resolveCustomViewsInRightSide();
            this._rightLoading$.off();
        });
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

    public resolveItemCaseToNavigationItem(itemCase: Case): NavigationItem | undefined {
        if (DoubleDrawerUtils.representsRootNode(itemCase)) {
            return;
        }
        const item: NavigationItem = {
            access: {},
            navigation: {
                icon: itemCase.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_MENU_ICON)?.value || this.defaultViewIcon,
                title: this.getTranslation(itemCase.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_MENU_NAME)?.value) || itemCase.title,
            },
            routing: {
                path: this.getItemRoutingPath(itemCase),
            },
            id: itemCase.stringId,
            resource: itemCase,
        };
        const resolvedRoles = DoubleDrawerUtils.resolveAccessRoles(itemCase, GroupNavigationConstants.ITEM_FIELD_ID_ALLOWED_ROLES);
        const resolvedBannedRoles = DoubleDrawerUtils.resolveAccessRoles(itemCase, GroupNavigationConstants.ITEM_FIELD_ID_BANNED_ROLES);
        if (!!resolvedRoles) item.access['role'] = resolvedRoles;
        if (!!resolvedBannedRoles) item.access['bannedRole'] = resolvedBannedRoles;
        if (!this._accessService.canAccessView(item, item.routingPath)) return;
        return item;
    }

    protected resolveCustomViewsInLeftSide() {
        if (!!this._currentNode?.parent && !!this._childCustomViews[this._currentNode.parent.uriPath]) {
            let currentLeftItems = this._leftItems$.getValue();
            currentLeftItems.push(...Object.values(this._childCustomViews[this._currentNode.parent.uriPath]));
            this._leftItems$.next(currentLeftItems);
        }
    }

    protected resolveCustomViewsInRightSide() {
        if (!!this._currentNode && !!this._childCustomViews[this._currentNode.uriPath]) {
            let currentRightItems = this._rightItems$.getValue();
            currentRightItems.push(...Object.values(this._childCustomViews[this._currentNode.uriPath]));
            this._rightItems$.next(currentRightItems);
        }
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
            let currentHiddenCustomItems = this._hiddenCustomItems$.getValue();
            currentHiddenCustomItems.push({
                id: configPath,
                ...childView,
            });
            this._hiddenCustomItems$.next(currentHiddenCustomItems);
        }
    }

    protected getTranslation(value: I18nFieldValue): string {
        const locale = this._translateService.currentLang.split('-')[0];
        return locale in value.translations ? value.translations[locale] : value.defaultValue;
    }

    public getItemRoutingPath(itemCase: Case) {
        const taskId = DoubleDrawerUtils.findTaskIdInCase(itemCase, SETTINGS_TRANSITION_ID);
        const url = this._dynamicRoutingService.route;
        return `/${url}/${taskId}`;
    }
}
