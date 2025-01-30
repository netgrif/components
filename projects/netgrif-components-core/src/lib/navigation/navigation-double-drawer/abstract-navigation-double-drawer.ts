import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ResizeEvent} from 'angular-resizable-element';
import {Observable, Subscription} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {AccessService} from '../../authorization/permission/access.service';
import {ConfigurationService} from '../../configuration/configuration.service';
import {ImpersonationUserSelectService} from '../../impersonation/services/impersonation-user-select.service';
import {ImpersonationService} from '../../impersonation/services/impersonation.service';
import {LoggerService} from '../../logger/services/logger.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {
    DynamicNavigationRouteProviderService,
} from '../../routing/dynamic-navigation-route-provider/dynamic-navigation-route-provider.service';
import { RedirectService } from '../../routing/redirect-service/redirect.service';
import {NAE_ROUTING_CONFIGURATION_PATH} from '../../routing/routing-builder/routing-builder.service';
import {LanguageService} from '../../translate/language.service';
import {User} from '../../user/models/user';
import {UserService} from '../../user/services/user.service';
import {
    ConfigDoubleMenu,
    LEFT_DRAWER_DEFAULT_WIDTH,
    NavigationItem,
    RIGHT_DRAWER_DEFAULT_MIN_WIDTH,
    RIGHT_DRAWER_DEFAULT_WIDTH,
    RIGHT_DRAWER_MAX_WIDTH,
} from '../model/navigation-configs';
import {
    MenuItemClickEvent,
    MenuItemLoadedEvent,
    MenuResizeEvent,
    MenuStateChangeEvent,
} from '../model/navigation-menu-events';
import {UriNodeResource} from '../model/uri-resource';
import {UriService} from '../service/uri.service';
import {DoubleDrawerNavigationService} from "./service/double-drawer-navigation.service";
import {DoubleDrawerUtils} from "./util/double-drawer-utils";

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

    protected _breakpointSubscription: Subscription;

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

    protected configUrl: string;

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
                          protected _redirectService: RedirectService,
                          protected _navigationService: DoubleDrawerNavigationService) {
        let configUrl: string = this._config.getServicesConfiguration()?.doubleDrawer?.url;
        if (configUrl !== undefined && !configUrl.startsWith('/')) {
            configUrl = '/' + configUrl;
        }
        this.configUrl = configUrl;

        this._navigationService.itemClicked$.subscribe((itemClickEvent: MenuItemClickEvent) => {
            this.itemClicked.emit(itemClickEvent);
        })
    }

    public ngOnInit(): void {
        this._breakpointSubscription = this._breakpoint.observe([Breakpoints.HandsetLandscape]).subscribe(() => {
            if (this._breakpoint.isMatched('(max-width: 959.99px)')) {
                this.resolveLayout(false);
            } else {
                this.resolveLayout(true);
            }
        });

        if (this.canApplyAutoSelect()) {
            this.rightItems$.pipe(
                filter(rightItems => rightItems.length > 0),
                take(1)
            ).subscribe(()=> {
                this.openAvailableView();
            })
        }

        const viewConfigurationPath = this._activatedRoute.snapshot.data[NAE_ROUTING_CONFIGURATION_PATH];
        if (!!viewConfigurationPath) {
            const viewConfiguration = this._config.getViewByPath(viewConfigurationPath);
            this._navigationService.initializeCustomViewsOfView(viewConfiguration, viewConfigurationPath);
        }
    }

    public ngOnDestroy(): void {
        this._breakpointSubscription?.unsubscribe();
        this.loggedOut.complete();
        this.stateChanged.complete();
        this.itemClicked.complete();
        this.resized.complete();
        this.itemLoaded.complete();
    }

    public get currentNode(): UriNodeResource {
        return this._navigationService.currentNode;
    }

    public get configLeftMenu() {
        return this._configLeftMenu;
    }

    public get configRightMenu() {
        return this._configRightMenu;
    }

    public get leftItems$() {
        return this._navigationService.leftItems$;
    }

    public get rightItems$() {
        return this._navigationService.rightItems$;
    }

    public get moreItems$() {
        return this._navigationService.moreItems$;
    }

    public get moreItems() {
        return this._navigationService.moreItems;
    }

    public get hiddenCustomItems$() {
        return this._navigationService.hiddenCustomItems$;
    }

    public get hiddenCustomItems() {
        return this._navigationService.hiddenCustomItems;
    }

    public get leftLoading$() {
        return this._navigationService.leftLoading$;
    }

    public get rightLoading$() {
        return this._navigationService.rightLoading$;
    }

    public toggleMenu() {
        this.toggleRightMenu();
        if (this.allClosable) {
            this.toggleLeftMenu();
        }
    }

    public toggleLeftMenu() {
        this._configLeftMenu.opened = !this._configLeftMenu.opened;
        this.stateChanged.emit({menu: 'left', isOpened: this._configLeftMenu.opened});
    }

    public toggleRightMenu() {
        this._configRightMenu.opened = !this._configRightMenu.opened;
        this.stateChanged.emit({menu: 'right', isOpened: this._configRightMenu.opened});
    }

    public getLang() {
        return this._languageService.getLanguage();
    }

    public logout(): void {
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

    public impersonate(): void {
        this._impersonationUserSelect.selectImpersonate();
    }

    public stopImpersonating(): void {
        this._impersonation.cease();
    }

    public get user(): User {
        return this._userService.user;
    }

    public get canGoBackLoading$(): Observable<boolean> {
        return this._navigationService.canGoBackLoading$;
    }

    /**
     * On home click, the current level is set to 0, and current parent is
     * set to root node.
     * */
    public onHomeClick(): void {
        this._navigationService.onHomeClick();
    }

    /**
     * On back click, the parent is set to parent of left nodes, that will solve
     * the right side menu (elements that were in left side, after backward
     * navigation will be on the right side).
     * Current level is set to a lower number in order to set the left side menu.
     * */
    public onBackClick(): void {
        this._navigationService.onBackClick()
    }

    public onItemClick(item: NavigationItem): void {
        this._navigationService.onItemClick(item);
    }

    public loadMoreItems() {
        this._navigationService.loadMoreItems();
    }

    public isAscending() {
        return this._navigationService.isAscending();
    }

    public switchOrder() {
        this._navigationService.switchOrder();
    }

    /**
     * Function to check whether the back button should be displayed
     * @returns boolean if the back button should be displayed
     * */
    public isOnZeroLevel(): boolean {
        return !!this._navigationService.currentNode?.level ? this._navigationService.currentNode.level == 0 : true;
    }

    public isLeftItemsEmpty(): boolean {
        return this._navigationService.leftItems === undefined || this._navigationService.leftItems.length === 0;
    }

    public isRightItemsEmpty(): boolean {
        return this._navigationService.rightItems === undefined || this._navigationService.rightItems.length === 0;
    }

    public uriNodeTrackBy(index: number, node: UriNodeResource) {
        return node.id;
    }

    public itemsTrackBy(index: number, item: NavigationItem) {
        return item.id;
    }

    public onResizeEvent(event: ResizeEvent): void {
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

    public isItemAndNodeEqual(item: NavigationItem, node: UriNodeResource): boolean {
        return DoubleDrawerUtils.isItemAndNodeEqual(item, node);
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

    protected canApplyAutoSelect(): boolean {
        return this.configUrl === this._router.url;
    }

    protected openAvailableView() {
        this._navigationService.openAvailableView();
    }
}
