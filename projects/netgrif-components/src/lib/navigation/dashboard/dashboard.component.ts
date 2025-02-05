import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {
    Case,
    CaseResourceService,
    CaseSearchRequestBody,
    FilterExtractionService,
    FilterType,
    GroupNavigationConstants,
    LoadingEmitter,
    LoggerService,
    NavigationItem,
    SETTINGS_TRANSITION_ID,
    SimpleFilter,
    TaskResourceService,
    UriService,
    NavigationUtilsService,
    DashboardNavigationItem
} from '@netgrif/components-core';
import {Observable, of, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';


@Component({
    selector: 'nc-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    // TODO load dynamically from child menu items
    public static CUSTOM_VIEWS = [
        {
            identifier: 'search_all',
            showCounter: false,
        },
        {
            identifier: 'inbox',
            showCounter: false,
        },
        {
            identifier: 'my_tickets',
            showCounter: true,
        },
        {
            identifier: 'it',
            showCounter: true,
        },
        {
            identifier: 'hr',
            filter: new SimpleFilter('hr', FilterType.CASE, {query: 'processIdentifier:"ticket_vacation"'} as CaseSearchRequestBody),
            showCounter: true,
        },
        {
            identifier: 'procurement',
            filter: new SimpleFilter('procurement', FilterType.CASE, {query: 'processIdentifier:"Orders/objednavka"'} as CaseSearchRequestBody),
            showCounter: true,
        }
    ];

    public loading$: LoadingEmitter = new LoadingEmitter();
    public customViews: Array<DashboardNavigationItem> = [];
    protected _counters: Map<string, number> = new Map<string, number>();

    private _sub: Subscription;

    constructor(
        private _caseResource: CaseResourceService,
        private _navigationUtils: NavigationUtilsService,
        private _log: LoggerService,
        private _uriService: UriService,
        private _taskResource: TaskResourceService,
        private _router: Router,
        private _filterExtraction: FilterExtractionService,
    ) {
    }

    ngOnInit(): void {
        this.loadContent();
    }

    protected loadContent() {
        this.loading$.on();
        this.customViews = [];
        this._sub = this._uriService.rootLoaded$.pipe(filter(isLoading => !isLoading)).subscribe(() => {
            this._uriService.getItemCaseByNodePath(this._uriService.root).subscribe(page => {
                let childCases$: Observable<any[]>;
                let targetItem: Case;
                let orderedChildCaseIds: string | string[];

                if (page?.pagination?.totalElements === 0) {
                    childCases$ = of([])
                } else {
                    targetItem = page.content[0]
                    orderedChildCaseIds = this._navigationUtils.extractChildCaseIds(targetItem)
                    childCases$ = this._navigationUtils.getItemCasesByIdsInOnePage(orderedChildCaseIds).pipe(
                        map(p => p.content),
                    )
                }
                childCases$.subscribe(result => {
                    result = (result as Case[]).sort((a, b) => orderedChildCaseIds.indexOf(a.stringId) - orderedChildCaseIds.indexOf(b.stringId));
                    this.customViews = result
                        .filter(it => DashboardComponent.CUSTOM_VIEWS.some(customView => customView.identifier === this.getMenuItemIdentifier(it)))
                        .sort((a, b) => this.getViewOrder(a) - this.getViewOrder(b))
                        .map(folder => this._navigationUtils.resolveItemCaseToNavigationItem(folder, this.getViewCounter(folder)))
                        .filter(i => !!i);
                    this.getCountForViews(this.customViews);
                    this.loading$.off();
                }, error => {
                    this._log.error(error);
                    this.customViews = [];
                    this.loading$.off();
                });
            }, error => {
                this._log.error(error);
                this.customViews = [];
                this.loading$.off();
            });
        });
    }

    public openView(item: NavigationItem): void {
        const path = item.resource.immediateData.find(f => f.stringId === GroupNavigationConstants.ITEM_FIELD_ID_NODE_PATH)?.value
        this._uriService.getNodeByPath(path).subscribe(node => {
            if (node.childrenId && node.childrenId['length']) {
                this._uriService.activeNode = node;
                if (this._navigationUtils.shouldOpenFirstItem(item)) {
                    this._navigationUtils.redirectToFirstChildItem(item);

                } else {
                    this._router.navigate([item.routing.path]);
                }

            } else {
                this._uriService.activeNode = this._uriService.root;
                this._router.navigate([item.routing.path]);
            }
        }, error => {
            this._log.error(error);
        });
    }

    public countView(view: NavigationItem) {
        return this.isCountLoaded(view) ? this._counters.get(view.id) : 0;
    }

    public isCountLoaded(view: NavigationItem) {
        return this._counters.has(view.id);
    }

    public getCountForViews(customViews: Array<NavigationItem>) {
        if (!customViews) {
            return;
        }
        customViews.forEach(view => {
            const taskId = view.resource.tasks.find(taskPair => taskPair.transition === SETTINGS_TRANSITION_ID).task;
            const staticFilter = DashboardComponent.CUSTOM_VIEWS.find(it => it.identifier === this.getMenuItemIdentifier(view.resource));
            if (staticFilter?.filter) {
                this._caseResource.count(staticFilter.filter).subscribe(count => {
                    this._counters.set(view.id, count.count);
                });
            } else {
                this._taskResource.getData(taskId).subscribe(taskData => {
                    const filter = this._filterExtraction.extractCompleteFilterFromData(taskData);
                    this._caseResource.count(filter).subscribe(count => {
                        this._counters.set(view.id, count.count);
                    });
                });
            }
        });
    }

    /* util */
    private getViewOrder(caze: Case) {
        return DashboardComponent.CUSTOM_VIEWS.map(it => it.identifier).indexOf(this.getMenuItemIdentifier(caze));
    }

    private getViewCounter(caze: Case) {
        return DashboardComponent.CUSTOM_VIEWS.find(it => it.identifier == this.getMenuItemIdentifier(caze)).showCounter;
    }

    protected getMenuItemIdentifier(caze: Case): string {
        return caze.immediateData.find(f => f.stringId === 'menu_item_identifier')?.value;
    }

    ngOnDestroy(): void {
        this._sub && this._sub.unsubscribe();
    }

    public navigate(link: string) {
        window.open(link, "_blank");
    }
}
