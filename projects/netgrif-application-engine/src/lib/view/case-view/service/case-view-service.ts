import {Inject, Injectable, OnDestroy, Optional} from '@angular/core';
import {SideMenuService} from '../../../side-menu/services/side-menu.service';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {Case} from '../../../resources/interface/case';
import {LoggerService} from '../../../logger/services/logger.service';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {SearchService} from '../../../search/search-service/search.service';
import {Net} from '../../../process/net';
import {SideMenuSize} from '../../../side-menu/models/side-menu-size';
import {TranslateService} from '@ngx-translate/core';
import {catchError, filter, map, mergeMap, scan, tap} from 'rxjs/operators';
import {Pagination} from '../../../resources/interface/pagination';
import {SortableViewWithAllowedNets} from '../../abstract/sortable-view-with-allowed-nets';
import {CaseMetaField} from '../../../header/case-header/case-menta-enum';
import {NAE_NEW_CASE_COMPONENT} from '../../../side-menu/content-components/injection-tokens';
import {PageLoadRequestContext} from '../../abstract/page-load-request-context';
import {Filter} from '../../../filter/models/filter';
import {ListRange} from '@angular/cdk/collections';
import {LoadingWithFilterEmitter} from '../../../utility/loading-with-filter-emitter';
import {CasePageLoadRequestResult} from '../models/case-page-load-request-result';

@Injectable()
export class CaseViewService extends SortableViewWithAllowedNets implements OnDestroy {

    protected _loading$: LoadingWithFilterEmitter;
    protected _cases$: Observable<Array<Case>>;
    protected _nextPage$: BehaviorSubject<PageLoadRequestContext>;
    protected _endOfData: boolean;
    protected _pagination: Pagination;

    constructor(allowedNets: Observable<Array<Net>>,
                protected _sideMenuService: SideMenuService,
                protected _caseResourceService: CaseResourceService,
                protected _log: LoggerService,
                protected _snackBarService: SnackBarService,
                protected _searchService: SearchService,
                protected _translate: TranslateService,
                @Optional() @Inject(NAE_NEW_CASE_COMPONENT) protected _newCaseComponent: any) {
        super(allowedNets);
        this._loading$ = new LoadingWithFilterEmitter();
        this._searchService.activeFilter$.subscribe(() => {
            this.reload();
        });
        this._endOfData = false;
        this._pagination = {
            size: 25,
            totalElements: undefined,
            totalPages: undefined,
            number: -1
        };
        this._nextPage$ = new BehaviorSubject<PageLoadRequestContext>(
            new PageLoadRequestContext(this.activeFilter, Object.assign({}, this._pagination, {number: 0}))
        );

        const casesMap = this._nextPage$.pipe(
            mergeMap(p => this.loadPage(p)),
            scan((acc, pageLoadResult) => {
                if (pageLoadResult.requestContext === null) {
                    return pageLoadResult.cases;
                }
                Object.assign(this._pagination, pageLoadResult.requestContext.pagination);
                return pageLoadResult.requestContext.clearLoaded ? {...pageLoadResult.cases} : {...acc, ...pageLoadResult.cases};
            }, {})
        );
        this._cases$ = casesMap.pipe(
            map(v => Object.values(v))
        );
    }

    ngOnDestroy(): void {
        this._loading$.complete();
        this._nextPage$.complete();
    }

    public get loading(): boolean {
        return this._loading$.isActive;
    }

    public get loading$(): Observable<boolean> {
        return this._loading$.asObservable();
    }

    public get cases$(): Observable<Array<Case>> {
        return this._cases$;
    }

    protected get activeFilter(): Filter {
        return this._searchService.activeFilter;
    }

    public loadPage(requestContext: PageLoadRequestContext): Observable<CasePageLoadRequestResult> {
        if (requestContext === null
            || requestContext.pageNumber < 0) {
            return of({cases: {}, requestContext});
        }
        let params: HttpParams = new HttpParams();
        params = this.addSortParams(params);
        params = this.addPageParams(params, requestContext.pagination);
        this._loading$.on(requestContext.filter);

        return this._caseResourceService.searchCases(requestContext.filter, params).pipe(
            catchError(err => {
                this._log.error('Loading cases has failed!', err);
                this._loading$.off(requestContext.filter);
                return of({content: [], pagination: {...this._pagination}});
            }),
            filter(() => {
                const r = requestContext.filter === this._searchService.activeFilter;
                if (!r) {
                    this._loading$.off(requestContext.filter);
                    this._log.debug('Received cases page is no longer relevant since the active filter has changed before it could arrive.'
                        + ' Discarding...');
                }
                return r;
            }),
            tap(c => {
                Object.assign(requestContext.pagination, c.pagination);
            }),
            tap(c => {
                this._endOfData = !Array.isArray(c.content)
                    || c.content.length === 0
                    || c.pagination.number === c.pagination.totalPages;
            }),
            map(cases => Array.isArray(cases.content) ? cases : {...cases, content: []}),
            map(cases => {
                return cases.content.reduce((acc, cur) => {
                    return {...acc, [cur.stringId]: cur};
                }, {});
            }),
            map(cases => ({cases, requestContext})),
            tap(_ => this._loading$.off(requestContext.filter))
        );
    }

    public nextPage(renderedRange: ListRange, totalLoaded: number, requestContext?: PageLoadRequestContext) {
        if (this.isLoadingRelevantFilter(requestContext) || this._endOfData) {
            return;
        }

        if (renderedRange.end === totalLoaded) {
            if (requestContext === undefined) {
                requestContext = new PageLoadRequestContext(this.activeFilter, this._pagination);
                requestContext.pagination.number += 1;
            }
            this._nextPage$.next(requestContext);
        }
    }

    private isLoadingRelevantFilter(requestContext?: PageLoadRequestContext): boolean {
        return requestContext === undefined || this._loading$.isActiveWithFilter(requestContext.filter);
    }

    public createNewCase(): Observable<Case> {
        const myCase = new Subject<Case>();
        this._sideMenuService.open(this._newCaseComponent, SideMenuSize.MEDIUM,
            {allowedNets$: this.allowedNets$}).onClose.subscribe($event => {
            this._log.debug($event.message, $event.data);
            if ($event.data) {
                this.reload();
                myCase.next($event.data);
            }
            myCase.complete();
        });
        return myCase.asObservable();
    }

    protected addPageParams(params: HttpParams, pagination: Pagination): HttpParams {
        params = params.set('size', pagination.size + '');
        params = params.set('page', pagination.number + '');
        return params;
    }

    protected getDefaultSortParam(): string {
        return 'stringId,desc';
    }

    protected getMetaFieldSortId(): string {
        switch (this._lastHeaderSearchState.fieldIdentifier) {
            case CaseMetaField.TITLE:
                return 'titleSortable';
            case CaseMetaField.CREATION_DATE:
                return 'creationDateSortable';
            default:
                return this._lastHeaderSearchState.fieldIdentifier;
        }
    }

    public reload(): void {
        if (!this._cases$ || !this._pagination) {
            return;
        }

        this._endOfData = false;
        const requestContext = new PageLoadRequestContext(this.activeFilter, this._pagination, true);
        requestContext.pagination.number = 0;
        const range = {
            start: -1,
            end: 0
        };

        this.nextPage(range, 0, requestContext);
    }

}
