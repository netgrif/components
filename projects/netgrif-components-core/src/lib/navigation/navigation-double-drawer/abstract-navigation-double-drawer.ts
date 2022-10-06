import {Component, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {LanguageService} from '../../translate/language.service';
import {UserService} from '../../user/services/user.service';
import {LoggerService} from '../../logger/services/logger.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {UriService} from '../service/uri.service';
import {UriNodeResource} from '../model/uri-resource';
import {Case} from '../../resources/interface/case';
import {
    DynamicNavigationRouteProviderService
} from '../../routing/dynamic-navigation-route-provider/dynamic-navigation-route-provider.service';
import {LoadingEmitter} from "../../utility/loading-emitter";
import {MatDrawerMode} from "@angular/material/sidenav";
import {ResizeEvent} from "angular-resizable-element";
import {User} from "../../user/models/user";
import {RoleAccess, View} from "../../../commons/schema";
import {NAE_ROUTING_CONFIGURATION_PATH} from "../../routing/routing-builder/routing-builder.service";
import {AccessService} from "../../authorization/permission/access.service";
import {ImpersonationUserSelectService} from '../../impersonation/services/impersonation-user-select.service';
import {ImpersonationService} from '../../impersonation/services/impersonation.service';

export interface ConfigDoubleMenu {
    mode: MatDrawerMode;
    opened: boolean;
    disableClose: boolean;
    width: number;
}

export interface ViewNavigationItem extends View {
    id: string;
    resource?: Case
}

export const FILTER_IDENTIFIERS = [
    "preference_filter_item"
];
export const FILTER_VIEW_TASK_TRANSITION_ID = 'view';

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
    @Input() imageRouterLink: string = "/";
    @Input() imageAlt: string = "Logo";
    @Input() image: string;
    @Input() profileRouterLink: string = "/profile";
    @Input() includeUser: boolean = true;
    @Input() includeLanguage: boolean = true;
    @Input() includeMoreMenu: boolean = true;
    @Input() includeImpersonation: boolean = true;
    @Input() allClosable: boolean = true;
    @Input() folderIcon: string = "folder";
    @Input() openedFolderIcon: string = "folder_open";
    @Input() filterIcon: string = "filter_alt";
    @Input() foldersCategoryName: string = 'toolbar.menu.folders';
    @Input() viewsCategoryName: string = 'toolbar.menu.views';

    /**
     * Array of folder nodes on left side
     * */
    leftNodes: Array<UriNodeResource>;

    /**
     * Array of folder nodes on right side
     * */
    rightNodes: Array<UriNodeResource>;

    /**
     * Processes that can be displayed under folders on right side menu
     * */
    views: Array<ViewNavigationItem>;

    moreMenuItems: Array<ViewNavigationItem>;

    protected _leftNodesSubscription: Subscription;
    protected _rightNodesSubscription: Subscription;
    protected _filtersSubscription: Subscription;
    protected _breakpointSubscription: Subscription;
    protected _rootSubscription: Subscription;
    protected _currentNodeSubscription: Subscription;

    /**
     * Currently display uri
     * Siblings of the node are on the left, children are on the right
     */
    currentNode: UriNodeResource

    leftLoading$: LoadingEmitter;
    rightLoading$: LoadingEmitter;

    protected _configLeftMenu: ConfigDoubleMenu = {
        mode: 'side',
        opened: true,
        disableClose: false,
        width: LEFT_DRAWER_DEFAULT_WIDTH
    };
    protected _configRightMenu: ConfigDoubleMenu = {
        mode: 'side',
        opened: true,
        disableClose: false,
        width: RIGHT_DRAWER_DEFAULT_WIDTH
    };

    protected _childCustomViews: { [uri: string]: { [key: string]: ViewNavigationItem } }

    protected constructor(protected _router: Router,
                          protected _activatedRoute: ActivatedRoute,
                          protected _breakpoint: BreakpointObserver,
                          protected _languageService: LanguageService,
                          protected _userService: UserService,
                          protected _accessService: AccessService,
                          protected _log: LoggerService,
                          protected _config: ConfigurationService,
                          protected _uriService: UriService,
                          protected _impersonationUserSelect: ImpersonationUserSelectService,
                          protected _impersonation: ImpersonationService,
                          protected _dynamicRoutingService: DynamicNavigationRouteProviderService) {
        this.leftNodes = new Array<UriNodeResource>();
        this.rightNodes = new Array<UriNodeResource>();
        this.views = new Array<ViewNavigationItem>();
        this.leftLoading$ = new LoadingEmitter();
        this.rightLoading$ = new LoadingEmitter();
        this._childCustomViews = {};
        this.moreMenuItems = new Array<ViewNavigationItem>();
    }

    ngOnInit(): void {
        this._breakpointSubscription = this._breakpoint.observe([Breakpoints.HandsetLandscape]).subscribe(() => {
            if (this._breakpoint.isMatched('(max-width: 959.99px)')) {
                this.resolveLayout(false);
            } else {
                this.resolveLayout(true);
            }
        });
        if (!this.currentNode) {
            this.leftLoading$.on();
            this.rightLoading$.on();
        }
        this._currentNodeSubscription = this._uriService.activeNode$.subscribe(node => {
            this.currentNode = node;
            if (!node) return;
            if (this.leftLoading$.isActive || this.rightLoading$.isActive) {
                this.leftLoading$.off();
                this.rightLoading$.off();
            }
            if (this._uriService.isRoot(node)) {
                this.leftNodes = [];
                this.loadRightSide();
                return;
            }
            if (!this.leftNodes.find(n => n.id === node.id)) {
                this.loadLeftSide();
            }
            this.loadRightSide();
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

    protected resolveUriForChildViews(configPath: string, childView: View): void {
        if (!childView.processUri) return;
        if (!this._accessService.canAccessView(childView, configPath)) return;
        if (!this._childCustomViews[childView.processUri]) {
            this._childCustomViews[childView.processUri] = {};
        }
        this._childCustomViews[childView.processUri][configPath] = {
            id: configPath,
            ...childView
        }
    }

    protected resolveHiddenMenuItemFromChildViews(configPath: string, childView: View): void {
        if (!childView.navigation) return;
        if (!this._accessService.canAccessView(childView, configPath)) return;
        // @ts-ignore
        if (!!(childView?.navigation?.hidden)) {
            this.moreMenuItems.push({
                id: configPath,
                ...childView
            });
        }
    }

    ngOnDestroy(): void {
        this._breakpointSubscription?.unsubscribe();
        this._leftNodesSubscription?.unsubscribe();
        this._rightNodesSubscription?.unsubscribe();
        this._filtersSubscription?.unsubscribe();
        this._rootSubscription?.unsubscribe();
        this._currentNodeSubscription?.unsubscribe();
        this.leftLoading$.complete();
        this.rightLoading$.complete();
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
            width: this._configLeftMenu.width
        } : {
            mode: 'over',
            opened: false,
            disableClose: false,
            width: this._configLeftMenu.width
        };
        this._configRightMenu = isLargeScreen ? {
            mode: 'side',
            opened: true,
            disableClose: true,
            width: this._configRightMenu.width
        } : {
            mode: 'over',
            opened: false,
            disableClose: false,
            width: this._configRightMenu.width
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
        return this._uriService.parentNodeLoading$;
    }

    /**
     * On home click, the current level is set to 0, and current parent is
     * set to root node.
     * */
    onHomeClick(): void {
        this._uriService.reset();
    }

    /**
     * On back click, the parent is set to parent of left nodes, that will solve
     * the right side menu (elements that were in left side, after backward
     * navigation will be on the right side).
     * Current level is set to a lower number in order to set the left side menu.
     * */
    onBackClick(): void {
        if (this._uriService.isRoot(this.currentNode)) return;
        this._uriService.activeNode = this.currentNode.parent;
    }

    onNodeClick(node: UriNodeResource): void {
        this._uriService.activeNode = node;
    }

    protected loadLeftSide() {
        if (this._uriService.isRoot(this.currentNode)) {
            this.leftNodes = [];
            return;
        }
        this.leftLoading$.on();
        this._leftNodesSubscription = this._uriService.getSiblingsOfNode(this.currentNode).subscribe(nodes => {
            this.leftNodes = nodes instanceof Array ? nodes : [];
            this.leftNodes.sort((a, b) => this.compareStrings(a.name, b.name));
            this.leftLoading$.off();
        }, error => {
            this._log.error(error);
            this.leftNodes = [];
            this.leftLoading$.off();
        });
    }

    protected loadRightSide() {
        this.rightLoading$.on()
        forkJoin({
            folders: this._uriService.getChildNodes(this.currentNode),
            filters: this._uriService.getCasesOfNode(this.currentNode, FILTER_IDENTIFIERS)
        }).subscribe(result => {
            this.rightNodes = result.folders instanceof Array ? result.folders : [];
            this.rightNodes.sort((a, b) => this.compareStrings(a.name, b.name));
            this.views = (result.filters instanceof Array ? result.filters : []).map(f => this.resolveFilterCaseToViewNavigationItem(f)).filter(i => !!i);
            if (!!this._childCustomViews[this.currentNode.uriPath]) {
                this.views.push(...Object.values(this._childCustomViews[this.currentNode.uriPath]))
            }
            // @ts-ignore
            this.views.sort((a, b) => this.compareStrings(a?.navigation?.title, b?.navigation?.title));
            this.rightLoading$.off();
        }, error => {
            this._log.error(error);
            this.rightNodes = [];
            this.views = [];
            this.rightLoading$.off();
        });
    }

    protected resolveFilterCaseToViewNavigationItem(filter: Case): ViewNavigationItem | undefined {
        const item: ViewNavigationItem = {
            access: {},
            navigation: {
                icon: filter.immediateData.find(f => f.stringId === 'icon_name')?.value || this.filterIcon,
                title: filter.immediateData.find(f => f.stringId === 'entry_name')?.value?.defaultValue || filter.title
            },
            routing: {
                path: this.getFilterRoutingPath(filter)
            },
            id: filter.stringId,
            resource: filter
        };
        const resolvedRoles = this.resolveAccessRoles(filter, 'allowed_roles');
        const resolvedBannedRoles = this.resolveAccessRoles(filter, 'banned_roles');
        if(!!resolvedRoles) item.access['role'] = resolvedRoles;
        if(!!resolvedBannedRoles) item.access['bannedRole'] = resolvedBannedRoles;
        if (!this._accessService.canAccessView(item, item.routingPath)) return;
        return item;
    }

    protected resolveAccessRoles(filter: Case, roleType: string): Array<RoleAccess> | undefined {
        const allowedRoles = filter.immediateData.find(f => f.stringId === roleType)?.options;
        if (!allowedRoles || Object.keys(allowedRoles).length === 0) return undefined;
        const roles = [];
        Object.keys(allowedRoles).forEach(combined => {
            const parts = combined.split(':');
            roles.push({
                processId: parts[1],
                roleId: parts[0]
            });
        });
        return roles;
    }

    protected getFilterRoutingPath(filterCase: Case) {
        const viewTaskId = filterCase.tasks.find(taskPair => taskPair.transition === FILTER_VIEW_TASK_TRANSITION_ID).task;
        const url = this._dynamicRoutingService.route;
        return `/${url}/${viewTaskId}`;
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
        return !!this.currentNode?.level ? this.currentNode.level == 0 : true;
    }

    isLeftNodesEmpty(): boolean {
        return this.leftNodes === undefined || this.leftNodes.length === 0;
    }

    isRightNodesEmpty(): boolean {
        return this.rightNodes === undefined || this.rightNodes.length === 0;
    }

    isViewsEmpty(): boolean {
        return this.views === undefined || this.views.length === 0;
    }

    uriNodeTrackBy(index: number, node: UriNodeResource) {
        return node.id;
    }

    viewsTrackBy(index: number, view: ViewNavigationItem) {
        return view.id;
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
