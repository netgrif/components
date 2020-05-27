import {Injectable} from '@angular/core';
import {SideMenuService} from '../../../side-menu/services/side-menu.service';
import {CaseResourceService} from '../../../resources/engine-endpoint/case-resource.service';
import {BehaviorSubject, Observable, of, timer} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {Case} from '../../../resources/interface/case';
import {NewCaseComponent} from '../../../side-menu/content-components/new-case/new-case.component';
import {CaseMetaField} from '../../../header/case-header/case-header.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {SearchService} from '../../../search/search-service/search.service';
import {Net} from '../../../process/net';
import {SideMenuSize} from '../../../side-menu/models/side-menu-size';
import {TranslateService} from '@ngx-translate/core';
import {catchError, map, mergeMap, scan, tap} from 'rxjs/operators';
import {Pagination} from '../../../resources/interface/pagination';
import {SortableViewWithAllowedNets} from '../../abstract/sortable-view-with-allowed-nets';
import {LoadingEmitter} from '../../../utility/loading-emitter';


@Injectable()
export class CaseViewService extends SortableViewWithAllowedNets {

    protected _loading$: LoadingEmitter;
    protected _cases$: Observable<Array<Case>>;
    protected _nextPage$: BehaviorSubject<number>;
    protected _endOfData: boolean;
    protected _pagination: Pagination;

    private _clear: boolean;

    constructor(allowedNets: Observable<Array<Net>>,
                protected _sideMenuService: SideMenuService,
                protected _caseResourceService: CaseResourceService,
                protected _log: LoggerService,
                protected _snackBarService: SnackBarService,
                protected _searchService: SearchService,
                protected _translate: TranslateService) {
        super(allowedNets);
        this._loading$ = new LoadingEmitter();
        this._searchService.activeFilter$.subscribe(() => {
            this.reload();
        });
        this._endOfData = false;
        this._nextPage$ = new BehaviorSubject<number>(null);
        this._pagination = {
            size: 25,
            totalElements: undefined,
            totalPages: undefined,
            number: -1
        };
        this._clear = false;

        const casesMap = this._nextPage$.pipe(
            mergeMap(p => this.loadPage(p)),
            scan((acc, value) => {
                const result = this._clear ? {} : {...acc, ...value};
                this._clear = false;
                return result;
            }, {})
        );
        this._cases$ = casesMap.pipe(
            map(v => Object.values(v))
        );
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

    public loadPage(page: number): Observable<{ [k: string]: Case }> {
        if (page === null || page === undefined || this._clear) {
            return of({});
        }
        let params: HttpParams = new HttpParams();
        params = this.addSortParams(params);
        params = this.addPageParams(params, page);
        this._loading$.on();
        return this._caseResourceService.searchCases(this._searchService.activeFilter, params).pipe(
            catchError(err => {
                this._log.error('Loading cases has failed!', err);
                return of({content: [], pagination: {...this._pagination, number: this._pagination.number - 1}});
            }),
            tap(c => this._endOfData = !Array.isArray(c.content) ||
                (Array.isArray(c.content) && c.content.length === 0) ||
                c.pagination.number === c.pagination.totalPages),
            map(cases => Array.isArray(cases.content) ? cases : {...cases, content: []}),
            map(cases => {
                this._pagination = cases.pagination;
                return cases.content.reduce((acc, cur) => {
                    return {...acc, [cur.stringId]: cur};
                }, {});
            }),
            tap(_ => this._loading$.off())
        );
    }

    public nextPage(lastRendered, totalLoaded) {
        if (this.loading || this._endOfData) {
            return;
        }

        if (lastRendered === totalLoaded) {
            this._nextPage$.next(this._pagination.number + 1);
        }
    }

    public createNewCase(): void {
        this._sideMenuService.open(NewCaseComponent, SideMenuSize.MEDIUM, {allowedNets$: this.allowedNets$}).onClose.subscribe($event => {
            this._log.debug($event.message, $event.data);
            if ($event.data) {
                this.reload();
            }
        });
    }

    protected addPageParams(params: HttpParams, page?: number): HttpParams {
        params = params.set('size', this._pagination.size + '');
        page = page !== null ? page : this._pagination.number;
        params = params.set('page', page + '');
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
        this._clear = true;
        this._pagination.number = -1;
        this._endOfData = false;
        this.nextPage(0, 0);
        timer(100).subscribe(_ => {
            this._pagination.number = -1;
            this.nextPage(0, 0);
        });
    }

}
