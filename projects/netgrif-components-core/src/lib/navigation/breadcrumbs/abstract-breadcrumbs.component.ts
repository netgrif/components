import {AfterViewInit, Component, Input, OnDestroy, OnInit, ChangeDetectionStrategy, inject} from '@angular/core';
import {UriService} from '../service/uri.service';
import {CaseResourceService} from "../../resources/engine-endpoint/case-resource.service";
import {CaseSearchRequestBody} from "../../filter/models/case-search-request-body";
import {HttpParams} from "@angular/common/http";
import {PaginationParams} from "../../utility/pagination/pagination-params";
import {SimpleFilter} from "../../filter/models/simple-filter";
import {debounceTime, distinctUntilChanged, filter, map, skip, switchMap, take} from "rxjs/operators";
import {BehaviorSubject, combineLatest, EMPTY, merge, of, Subscription} from "rxjs";
import {LoadingEmitter} from "../../utility/loading-emitter";
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router} from "@angular/router";
import {
    DynamicNavigationRouteProviderService
} from "../../routing/dynamic-navigation-route-provider/dynamic-navigation-route-provider.service";
import {Case} from "../../resources/interface/case";
import {I18nFieldValue} from "../../data-fields/i18n-field/models/i18n-field-value";
import {TranslateService} from "@ngx-translate/core";
import {encodeBase64, decodeBase64} from "../../utility/base64";
import {LoggerService} from "../../logger/services/logger.service";
import {DoubleDrawerNavigationService} from "../navigation-double-drawer/service/double-drawer-navigation.service";
import {GroupNavigationConstants} from "../model/group-navigation-constants";
import {ConfigurationService} from '../../configuration/configuration.service';
import {NAE_ROUTING_CONFIGURATION_PATH} from '../../routing/routing-builder/routing-builder.service';
import {BreadcrumbsDetailService} from './breadcrumbs-detail.service';

@Component({
    selector: 'ncc-breadcrumbs-component',
    template: '',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export abstract class AbstractBreadcrumbsComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input() showHome: boolean = true;
    @Input() showFilter: boolean = true;
    @Input() redirectOnClick: boolean = true;
    @Input() lengthOfPath: number = 30;
    @Input() partsAfterDots: number = 2;

    itemName: string;
    breadcrumbsParts: Array<string>;

    /** the current route is a menu item (the breadcrumbs have something to show) */
    active: boolean = false;

    private static DOTS: string = '...';
    private static DELIMETER: string = '/';
    private _showPaths: boolean = false;
    private nicePath: BehaviorSubject<Array<string>>;
    private redirectUrls: Map<string, Array<string>>;
    private nicePathSubscription: Subscription;
    private navigationSubscription: Subscription;
    /** the level of the menu (active node) of the resolved breadcrumbs */
    /** the search of the menu item cases of the last resolution (a newer one cancels it) */
    private searchSubscription: Subscription;
    /** the item and the path of the last search (running or done): the same one is not searched again */
    private _searchKey: string | undefined;
    /** the menu items found by the last search */
    private _found: {key: string, itemCaseId: string, fullPath: Array<string>, cases: Array<Case>} | undefined;
    private langChangeSubscription: Subscription;

    protected _configService = inject(ConfigurationService);
    /** the detail opened in the view (e.g. a case): the last part, the view before it closes it */
    public readonly detailService = inject(BreadcrumbsDetailService);

    protected constructor(protected _uriService: UriService,
                          protected _caseResourceService: CaseResourceService,
                          protected _activatedRoute: ActivatedRoute,
                          protected _router: Router,
                          protected _dynamicRoutingService: DynamicNavigationRouteProviderService,
                          protected _translateService: TranslateService,
                          protected _navigationService: DoubleDrawerNavigationService,
                          protected _log: LoggerService) {
        this.nicePath = new BehaviorSubject<Array<string>>(undefined);
        this.redirectUrls = new Map<string, Array<string>>();
        this.initNicePath();
        this.navigationSubscription = merge(
            this._router?.events?.pipe(filter(event => event instanceof NavigationEnd)) ?? EMPTY,
            this._uriService?.activeNode$?.pipe(
                map(node => node?.uriPath),
                distinctUntilChanged(),
                skip(1),
            ) ?? EMPTY
        ).pipe(debounceTime(0)).subscribe(() => this.resolveBreadcrumbs());
        this.langChangeSubscription = this._translateService?.onLangChange?.subscribe(() => this.resolveBreadcrumbs(true));
    }

    ngOnInit(): void {
        this.resolveBreadcrumbs();
    }

    /**
     * The breadcrumbs are resolved in `ngOnInit`, kept for the subclasses that call `super.ngAfterViewInit()`.
     */
    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
    ngAfterViewInit() {
    }

    ngOnDestroy(): void {
        if (!!this.nicePathSubscription) {
            this.nicePathSubscription.unsubscribe();
        }
        this.navigationSubscription?.unsubscribe();
        this.searchSubscription?.unsubscribe();
        this.langChangeSubscription?.unsubscribe();
    }

    /**
     * Resolves the breadcrumbs of the shown page.
     * @param translateOnly only the language changed: the last found menu items are translated again when they are the
     * ones of the shown page, they are searched only otherwise
     */
    public resolveBreadcrumbs(translateOnly = false) {
        const encodedItemCaseId = this.findItemCaseId();
        if (!encodedItemCaseId) {
            this.searchSubscription?.unsubscribe();
            this._searchKey = undefined;
            this.itemName = this.findConfiguredViewTitle();
            this.active = !!this.itemName;
            if (this.active) {
                this.nicePath.next(['']);
            } else {
                this._log.debug('No menu item in the route, breadcrumbs are not resolved.');
            }
            return;
        }
        this.active = true;
        const decodedItemCaseId = decodeBase64(encodedItemCaseId);
        const splitPath = this._uriService.splitNodePath(this._uriService.activeNode) ?? [];
        const fullPath = this.createFullPath(splitPath);
        const fullPathQueries = fullPath.map(p => '(processIdentifier:menu_item AND dataSet.nodePath.textValue.keyword:\"' + p + '\")')
        fullPathQueries.push('(stringId:\"' + decodedItemCaseId + '\")')

        const key = decodedItemCaseId + '|' + fullPath.join(',');
        if (key === this._searchKey) {
            if (translateOnly && this._found?.key === key) {
                this.applyFound(this._found);
            }
            return;
        }
        this.searchSubscription?.unsubscribe();
        this._searchKey = key;
        const searchBody: CaseSearchRequestBody = {
            query: fullPathQueries.join(" OR ")
        };
        let httpParams = new HttpParams()
            .set(PaginationParams.PAGE_SIZE, 25)
            .set(PaginationParams.PAGE_NUMBER, 0);

        this.searchSubscription = this._caseResourceService.searchCases(SimpleFilter.fromCaseQuery(searchBody), httpParams).pipe(take(1)).subscribe({
            next: result => {
                this._found = {key, itemCaseId: decodedItemCaseId, fullPath, cases: result.content ?? []};
                this.applyFound(this._found);
            },
            error: () => this._searchKey = undefined
        });
    }

    /** the names of the found menu items (translated now), the item itself is the last part */
    protected applyFound(found: {itemCaseId: string, fullPath: Array<string>, cases: Array<Case>}): void {
        const cases = [...found.cases];
        const isItem = (c: Case) => c.stringId === found.itemCaseId
            && !found.fullPath.includes(this.immediateValue(c, GroupNavigationConstants.ITEM_FIELD_ID_NODE_PATH));
        const itemCaseIndex = cases.findIndex(isItem);
        this.itemName = itemCaseIndex >= 0
            ? this.getTranslation(this.immediateValue(cases.splice(itemCaseIndex, 1)[0], GroupNavigationConstants.ITEM_FIELD_ID_MENU_NAME))
            : undefined;
        cases.sort((a, b) => found.fullPath.indexOf(this.immediateValue(a, GroupNavigationConstants.ITEM_FIELD_ID_NODE_PATH))
            - found.fullPath.indexOf(this.immediateValue(b, GroupNavigationConstants.ITEM_FIELD_ID_NODE_PATH)));
        if (this.redirectOnClick) {
            cases.forEach(c => this.redirectUrls.set(this.immediateValue(c, GroupNavigationConstants.ITEM_FIELD_ID_NODE_PATH), [this._dynamicRoutingService.route, encodeBase64(c.stringId)]));
        }
        this.nicePath.next(["", ...cases.map(c => this.getTranslation(this.immediateValue(c, GroupNavigationConstants.ITEM_FIELD_ID_MENU_NAME)))]);
    }

    /** id of the menu item case: own route first, then the deepest route of the router (breadcrumbs in the layout) */
    protected findItemCaseId(): string | undefined {
        const param = GroupNavigationConstants.GROUP_NAVIGATION_ROUTER_PARAM;
        const own = this._activatedRoute?.snapshot?.params?.[param];
        if (own) {
            return own;
        }
        let route: ActivatedRouteSnapshot | null = this._router?.routerState?.snapshot?.root ?? null;
        let found: string | undefined;
        while (route) {
            found = route.params?.[param] ?? found;
            route = route.firstChild;
        }
        return found;
    }

    /**
     * Title of the view of the configuration (nae.json) of the deepest route, when the view has a navigation title
     * (`navigation: {title, translate}`, e.g. the views shown in the navigation drawer by their `processUri`).
     */
    protected findConfiguredViewTitle(): string | undefined {
        let route: ActivatedRouteSnapshot | null = this._router?.routerState?.snapshot?.root ?? null;
        let configPath: string | undefined;
        while (route) {
            configPath = route.data?.[NAE_ROUTING_CONFIGURATION_PATH] ?? configPath;
            route = route.firstChild;
        }
        if (!configPath) {
            return undefined;
        }
        const navigation = this._configService.getViewByPath(configPath)?.navigation;
        if (!navigation || typeof navigation !== 'object' || !navigation.title) {
            return undefined;
        }
        return navigation.translate ? this._translateService.instant(navigation.title) : navigation.title;
    }

    public initNicePath() {
        this.nicePathSubscription = this.nicePath.subscribe(np => {
            if (!!np) {
                const path = np;
                if (path?.length > this.partsAfterDots + 1 && this._uriService.activeNode?.uriPath.length > this.lengthOfPath && !this._showPaths) {
                    const newPath = [path[0], AbstractBreadcrumbsComponent.DOTS];
                    for (let i = path.length - this.partsAfterDots; i < path.length; i++) {
                        newPath.push(path[i]);
                    }
                    this.breadcrumbsParts = newPath;
                    return;
                }
                this.breadcrumbsParts = path === undefined ? [] : path;
            }
        });
    }

    public redirect() {
        if (!this.redirectOnClick) {
            return;
        }
        this._router.navigate(this.redirectUrls.get(this._uriService.activeNode.uriPath)).then(r => {})
    }

    /**
     * Home: closes an opened detail of the view (e.g. a case), moves the navigation to the root node and opens its
     * view when the navigation has one to open. The breadcrumbs are resolved again for the page that is shown (a view
     * of the root stays shown, its name must not disappear).
     */
    public reset(): void {
        this.detailService.detail?.close();
        this.itemName = undefined;
        this._uriService.reset();
        this.nicePath.next([""]);
        if (this.redirectOnClick) {
            this.openRootView();
        }
        this.resolveBreadcrumbs();
    }

    /**
     * Opens a view of the active node (the root after Home) once its items are loaded: the items of the previous node
     * would open a view of that node (the same as a click on a folder of the navigation drawer). A load still running
     * (e.g. Home clicked while a folder is loading) is waited for; the navigation skips a node set during a load, so the
     * active node is set to it again and its items are waited for.
     */
    protected openRootView(): void {
        const navigation = this._navigationService;
        if (!navigation?.rightLoading$) {
            return;
        }
        const idle = (loading: LoadingEmitter | undefined) => (loading ?? of(false)).pipe(filter(isLoading => !isLoading), take(1));
        combineLatest([idle(navigation.nodeLoading$), idle(navigation.leftLoading$), idle(navigation.rightLoading$)]).pipe(
            take(1),
            switchMap(() => {
                const target = this._uriService.activeNode;
                if (!!target && navigation.currentNode !== target) {
                    navigation.currentNode = target;
                    return idle(navigation.rightLoading$);
                }
                return of(false);
            })
        ).subscribe(() => navigation.openAvailableView());
    }

    public changePath(path: string, count: number) {
        if (path === AbstractBreadcrumbsComponent.DOTS && count === 1) {
            this._showPaths = true;
            this.nicePath.next(this.nicePath.value);
            return;
        }
        let fullPath: string = '';
        const tmp = this._uriService.splitNodePath(this._uriService.activeNode);
        if (tmp === undefined) return;
        const control = this.resultCounter(count, tmp);
        for (let i = 0; i <= control; i++) {
            fullPath += tmp[i];
            if (i !== control) fullPath += AbstractBreadcrumbsComponent.DELIMETER;
        }
        this._uriService.getNodeByPath(fullPath).subscribe(node => {
            this._uriService.activeNode = node;
            this.itemName = undefined;
            this.nicePath.next(this.nicePath.value.slice(0, control + 1))
            this.redirect();
            if (this.redirectOnClick) {
                this._navigationService.openAvailableView();
            }
        })
    }

    private resultCounter(count: number, tmp: string[]): number {
        if (tmp?.length > this.partsAfterDots + 1 && this._uriService.activeNode?.uriPath.length > this.lengthOfPath && !this._showPaths) {
            return tmp.length - this.partsAfterDots + (count - 2);
        }
        return count;
    }

    private createFullPath(splitPath: Array<string>): Array<string> {
        let tmp = '';
        return splitPath.filter(s => s !== "").map((value) => {
            tmp += AbstractBreadcrumbsComponent.DELIMETER + value;
            return tmp?.replace("//", AbstractBreadcrumbsComponent.DELIMETER)
        });
    }

    private immediateValue(aCase: Case, fieldId: string): any {
        return aCase.immediateData.find(s => s.stringId === fieldId)?.value
    }

    private getTranslation(value: I18nFieldValue): string {
        const locale = this._translateService.currentLang.split('-')[0];
        return locale in value.translations ? value.translations[locale] : value.defaultValue;
    }
}
