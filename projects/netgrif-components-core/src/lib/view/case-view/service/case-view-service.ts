import {Inject, Injectable, OnDestroy, Optional} from '@angular/core';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {Case} from '../../../resources/interface/case';
import {LoggerService} from '../../../logger/services/logger.service';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {SearchService} from '../../../search/search-service/search.service';
import {TranslateService} from '@ngx-translate/core';
import {catchError, concatMap, filter, map, mergeMap, scan, switchMap, tap} from 'rxjs/operators';
import {Pagination} from '../../../resources/interface/pagination';
import {CaseMetaField} from '../../../header/case-header/case-menta-enum';
import {PageLoadRequestContext} from '../../abstract/page-load-request-context';
import {Filter} from '../../../filter/models/filter';
import {ListRange} from '@angular/cdk/collections';
import {LoadingWithFilterEmitter} from '../../../utility/loading-with-filter-emitter';
import {CasePageLoadRequestResult} from '../models/case-page-load-request-result';
import {UserService} from '../../../user/services/user.service';
import {arrayToObservable} from '../../../utility/array-to-observable';
import {PermissionType} from '../../../process/permissions';
import {NAE_NEW_CASE_CONFIGURATION} from '../models/new-case-configuration-injection-token';
import {NewCaseConfiguration} from '../models/new-case-configuration';
import {ProcessService} from '../../../process/process.service';
import {PetriNetReferenceWithPermissions} from '../../../process/petri-net-reference-with-permissions';
import {
    SearchIndexResolverService
} from '../../../search/search-keyword-resolver-service/search-index-resolver.service';
import {AllowedNetsService} from '../../../allowed-nets/services/allowed-nets.service';
import {AbstractSortableViewComponent} from '../../abstract/sortable-view';
import {
    NewCaseCreationConfigurationData
} from '../../../side-menu/content-components/new-case/model/new-case-injection-data';
import {PermissionService} from '../../../authorization/permission/permission.service';
import {EventOutcomeMessageResource} from '../../../resources/interface/message-resource';
import {CreateCaseEventOutcome} from '../../../event/model/event-outcomes/case-outcomes/create-case-event-outcome';
import {PaginationParams} from '../../../utility/pagination/pagination-params';
import {createSortParam, PaginationSort} from '../../../utility/pagination/pagination-sort';
import {MatDialog} from '@angular/material/dialog';
import {NAE_NEW_CASE_DIALOG_COMPONENT} from '../../../dialog/injection-tokens';

@Injectable()
export class CaseViewService extends AbstractSortableViewComponent implements OnDestroy {

    readonly DEFAULT_NEW_CASE_CONFIGURATION: NewCaseConfiguration = {
        useCachedProcesses: true
    };

    protected _loading$: LoadingWithFilterEmitter;
    protected _cases$: Observable<Array<Case>>;
    protected _cases: Array<Case>;
    protected _nextPage$: BehaviorSubject<PageLoadRequestContext>;
    protected _endOfData: boolean;
    protected _pagination: Pagination;
    protected _newCaseConfiguration: NewCaseConfiguration;
    protected _paginationView: boolean = false;

    constructor(protected _allowedNetsService: AllowedNetsService,
                protected _dialog: MatDialog,
                protected _caseResourceService: CaseResourceService,
                protected _log: LoggerService,
                protected _snackBarService: SnackBarService,
                protected _searchService: SearchService,
                protected _translate: TranslateService,
                protected _user: UserService,
                protected _processService: ProcessService,
                resolver: SearchIndexResolverService,
                @Optional() @Inject(NAE_NEW_CASE_DIALOG_COMPONENT) protected _newCaseComponent: any,
                @Optional() @Inject(NAE_NEW_CASE_CONFIGURATION) newCaseConfig: NewCaseConfiguration,
                protected _permissionService: PermissionService) {
        super(resolver);
        this._cases = [];
        this._newCaseConfiguration = {...this.DEFAULT_NEW_CASE_CONFIGURATION};
        if (newCaseConfig !== null) {
            Object.assign(this._newCaseConfiguration, newCaseConfig);
        }
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
            map(pageLoadResult => {
                if (pageLoadResult.requestContext && pageLoadResult.requestContext.clearLoaded) {
                    // we set an empty value to the virtual scroll and then replace it by the real value forcing it to redraw its content
                    const results = [{cases: {}, requestContext: null}, pageLoadResult];
                    return arrayToObservable(results);
                } else {
                    return of(pageLoadResult);
                }
            }),
            concatMap(o => o),
            scan((acc, pageLoadResult) => {
                if (pageLoadResult.requestContext === null) {
                    return pageLoadResult.cases;
                } else {
                    this._loading$.off(pageLoadResult.requestContext.filter);
                }
                Object.assign(this._pagination, pageLoadResult.requestContext.pagination);
                if (this._paginationView) {
                    return pageLoadResult.cases;
                }
                return {...acc, ...pageLoadResult.cases};
            }, {})
        );
        this._cases$ = casesMap.pipe(
            map(v => Object.values(v) as Array<Case>),
            tap(cases => this._cases = cases as Array<Case>),
        );
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
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

    public get cases(): Array<Case> {
        return this._cases;
    }

    public get pagination(): Pagination {
        return this._pagination;
    }

    protected get activeFilter(): Filter {
        return this._searchService.activeFilter;
    }

    public set paginationView(value: boolean) {
        this._paginationView = value;
    }

    public loadPage(requestContext: PageLoadRequestContext): Observable<CasePageLoadRequestResult> {
        if (requestContext === null || requestContext.pageNumber < 0) {
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
            map(cases => ({cases, requestContext}))
        );
    }

    public nextPage(renderedRange: ListRange, totalLoaded: number, requestContext?: PageLoadRequestContext) {
        if (requestContext === undefined) {
            requestContext = new PageLoadRequestContext(this.activeFilter, this._pagination);
            requestContext.pagination.number += 1;
        }

        if (this.isLoadingRelevantFilter(requestContext) || this._endOfData) {
            return;
        }

        if (renderedRange.end === totalLoaded) {
            this._nextPage$.next(requestContext);
        }
    }

    public nextPagePagination(length: number, pageIndex: number, requestContext?: PageLoadRequestContext) {
        if (requestContext === undefined) {
            requestContext = new PageLoadRequestContext(this.activeFilter, this._pagination);
            requestContext.pagination.size = length;
            requestContext.pagination.number = pageIndex;
        }

        if (this.isLoadingRelevantFilter(requestContext) || this._endOfData) {
            return;
        }
        this._nextPage$.next(requestContext);
    }

    private isLoadingRelevantFilter(requestContext?: PageLoadRequestContext): boolean {
        return requestContext === undefined || this._loading$.isActiveWithFilter(requestContext.filter);
    }

    public createNewCase(newCaseCreationConfiguration: NewCaseCreationConfigurationData = {
        enableCaseTitle: true,
        isCaseTitleRequired: true
    }): Observable<Case> {
        const myCase = new Subject<Case>();
        const dialogRef = this._dialog.open(this._newCaseComponent, {
            width: '40%',
            minWidth: '300px',
            panelClass: "dialog-responsive",
            data: {
                allowedNets$: this.getNewCaseAllowedNets(newCaseCreationConfiguration.blockNets),
                newCaseCreationConfiguration
            },
        });
        dialogRef.afterClosed().subscribe($event => {
            if ($event?.data) {
                this._log.debug($event.message, $event.data);
                this.reload();
                myCase.next($event.data);
            }
            myCase.complete();
        });
        return myCase.asObservable();
    }

    public createDefaultNewCase(newCaseCreationConfiguration: NewCaseCreationConfigurationData = {
        enableCaseTitle: true,
        isCaseTitleRequired: true
    }): Observable<Case> {
        const myCase = new Subject<Case>();
        this.getNewCaseAllowedNets(newCaseCreationConfiguration.blockNets).subscribe((nets: Array<PetriNetReferenceWithPermissions>) => {
            if (!nets || nets.length === 0) {
                const errorMessage = this._translate.instant('side-menu.new-case.noNets');
                this._snackBarService.openErrorSnackBar(errorMessage);
                this._log.error('No nets available for case creation. Ensure the allowed nets configuration is correct.');
                return;
            }
            this._caseResourceService.createCase({
                title: null,
                color: 'panel-primary-icon',
                netId: nets[0].stringId
            }).subscribe((response: EventOutcomeMessageResource) => {
                this._snackBarService.openSuccessSnackBar(this._translate.instant('side-menu.new-case.createCase')
                    + ' ' + this._translate.instant('side-menu.new-case.defaultCaseName'));
                this.reload();
                myCase.next((response.outcome as CreateCaseEventOutcome).aCase);
                myCase.complete();
            }, error => {
                const errorMessage = error.message ? error.message : this._translate.instant('side-menu.new-case.createCaseError');
                this._snackBarService.openErrorSnackBar(errorMessage);
                this._log.error('Error occurred during case creation: ' + errorMessage);
            });
        }, error => {
            const errorMessage = error.message || this._translate.instant('side-menu.new-case.errorCreate');
            this._log.error('Failed to fetch allowed nets. Error: ' + errorMessage);
            this._snackBarService.openErrorSnackBar(errorMessage);
        });
        return myCase;
    }

    public getNewCaseAllowedNets(blockNets: string[] = []): Observable<Array<PetriNetReferenceWithPermissions>> {
        if (this._newCaseConfiguration.useCachedProcesses) {
            return this._allowedNetsService.allowedNets$.pipe(
                map(net => net.filter(n => blockNets.indexOf(n.identifier) === -1)),
                map(net => net.filter(n => this._permissionService.hasNetPermission(PermissionType.CREATE, n)))
            );
        } else {
            return this._allowedNetsService.allowedNets$.pipe(
                switchMap(allowedNets => {
                    return this._processService.getNetReferences(allowedNets.map(net => net.identifier)).pipe(
                        map(net => net.filter(n => blockNets.indexOf(n.identifier) === -1)),
                        map(net => net.filter(n => this._permissionService.hasNetPermission(PermissionType.CREATE, n)))
                    );
                })
            );
        }
    }

    /**
     * Returns number of allowed nets of case view
     * @returns length of allowedNets array if it is defined, 0 if it is undefined
     */
    public getAllowedNetsCount(): number {
        return this._allowedNetsService.allowedNets === undefined ? 0 : this._allowedNetsService.allowedNets.length;
    }

    protected addPageParams(params: HttpParams, pagination: Pagination): HttpParams {
        params = params.set(PaginationParams.PAGE_SIZE, `${pagination.size}`);
        params = params.set(PaginationParams.PAGE_NUMBER, `${pagination.number}`);
        return params;
    }

    protected getDefaultSortParam(): string {
        return createSortParam('stringId', PaginationSort.DESCENDING);
    }

    protected getMetaFieldSortId(): string {
        switch (this._lastHeaderSearchState.fieldIdentifier) {
            case CaseMetaField.TITLE:
                return 'title.keyword';
            case CaseMetaField.VISUAL_ID:
                return 'visualId.keyword';
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

    public hasAuthority(authority: Array<string> | string): boolean {
        return this._user.hasAuthority(authority);
    }

    /**
     * Determines whether the current user has the [VIEW]{@link PermissionType#VIEW} permission on the current case
     * @param aCase the tested case
     * @returns `true` if the current user has the `VIEW` permission on the tested case, `false` otherwise.
     */
    public viewEnabled(aCase: Case): boolean {
        return this._permissionService.hasCasePermission(aCase, PermissionType.VIEW);
    }
}
