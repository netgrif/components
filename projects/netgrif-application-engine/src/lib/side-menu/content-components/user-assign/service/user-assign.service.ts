import {Injectable} from '@angular/core';
import {LoadingEmitter} from '../../../../utility/loading-emitter';
import {BehaviorSubject, Observable, of, timer} from 'rxjs';
import {Pagination} from '../../../../resources/interface/pagination';
import {LoggerService} from '../../../../logger/services/logger.service';
import {SnackBarService} from '../../../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {catchError, map, mergeMap, scan, tap} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {UserValue} from '../../../../data-fields/user-field/models/user-value';
import {UserResourceService} from '../../../../resources/engine-endpoint/user-resource.service';
import {User} from '../../../../resources/interface/user';

/**
 * Performs paged loading users from backend for [UserAssignComponent]{@link UserAssignComponent}.
 */
@Injectable()
export class UserAssignService {

    /**
     * UserValue array stream, that represents users loading from backend.
     */
    private readonly _users$: Observable<Array<UserValue>>;
    /**
     * Emit users loading status from backend.
     */
    private _loading$: LoadingEmitter;
    /**
     * Number stream of next page users list, that to be requested from backend.
     */
    private _nextPage$: BehaviorSubject<number>;
    /**
     * Signals the end of loaded users.
     */
    private _endOfData: boolean;
    /**
     * Necessary for pagination parameters in user assign loading from backend.
     */
    private _pagination: Pagination;
    /**
     * Signals if response is empty or no.
     */
    private _clear: boolean;
    /**
     * The search content that should be applied to the request
     */
    private _searchQuery: string;

    /**
     * Inject services.
     * Initialize declared attributes.
     *
     * Loading and mapped stream of users.
     * @param _userResourceService Loading users from backend.
     * @param _log Logging action status.
     * @param _snackBarService Display info about loading from backend for user.
     * @param _translate Translate messages for user.
     */
    constructor(private _userResourceService: UserResourceService,
                private _log: LoggerService,
                private _snackBarService: SnackBarService,
                private _translate: TranslateService) {
        this._loading$ = new LoadingEmitter();
        this._endOfData = false;
        this._nextPage$ = new BehaviorSubject<number>(null);
        this._pagination = {
            size: 20,
            totalElements: undefined,
            totalPages: undefined,
            number: -1
        };
        this._clear = false;
        this._searchQuery = '';

        const usersMap = this._nextPage$.pipe(
            mergeMap(p => this.loadPage(p)),
            scan((acc, value) => {
                const result = this._clear ? {} : {...acc, ...value};
                this._clear = false;
                return result;
            }, {})
        );
        this._users$ = usersMap.pipe(
            map(v => Object.values(v))
        );
    }

    public get loading(): boolean {
        return this._loading$.isActive;
    }

    public get loading$(): Observable<boolean> {
        return this._loading$.asObservable();
    }

    public get users$(): Observable<Array<UserValue>> {
        return this._users$;
    }

    /**
     * Get all users from backend and mapped to [UserValue]{@link UserValue} interface with catching errors.
     * @param page Page number that is requested. / Next page users list.
     */
    public loadPage(page: number): Observable<{ [k: string]: UserValue }> {
        if (page === null || page === undefined || this._clear) {
            return of(null);
        }
        let params: HttpParams = new HttpParams();
        params = this._addPageParams(params, page);
        this._loading$.on();
        return this._userResourceService.search({fulltext: this._searchQuery}, params).pipe(
            catchError(err => {
                this._log.error('Loading users has failed!', err);
                this._snackBarService.openErrorSnackBar(this._translate.instant('side-menu.user.err'));
                return of({content: [], pagination: {...this._pagination, number: this._pagination.number - 1}});
            }),
            tap(u => this._endOfData = !Array.isArray(u.content)
                                            || (Array.isArray(u.content) && u.content.length === 0)
                                            || u.pagination.number === u.pagination.totalPages),
            map(users => Array.isArray(users.content) ? users : {...users, content: []}),
            map(users => {
                this._pagination = users.pagination;
                return users.content.reduce((acc, cur: User) => {
                    const userValue = new UserValue(cur.id, cur.name, cur.surname, cur.email);
                    return {...acc, [cur.id]: userValue};
                }, {});
            }),
            tap(_ => this._loading$.off())
        );
    }

    /**
     * Set value to nextPage stream as next page users list.
     * @param lastRendered Last rendered user index.
     * @param totalLoaded Total loaded size users.
     */
    public nextPage(lastRendered, totalLoaded) {
        if (this.loading || this._endOfData) {
            return;
        }

        if (lastRendered === totalLoaded) {
            this._nextPage$.next(this._pagination.number + 1);
        }
    }

    /**
     * Reload page with users.
     */
    public reload(newSearchQuery: string = ''): void {
        if (!this._users$ || !this._pagination) {
            return;
        }
        this._searchQuery = newSearchQuery;
        this._clear = true;
        this._pagination.number = -1;
        this._endOfData = false;
        this.nextPage(0, 0);
        timer(100).subscribe(_ => {
            this._pagination.number = -1;
            this.nextPage(0, 0);
        });
    }

    /**
     * Returns HttpParams with page params addition.
     * @param params Existing HttpParams.
     * @param page Page number that is requested. / Next page users list.
     */
    private _addPageParams(params: HttpParams, page?: number): HttpParams {
        params = params.set('size', this._pagination.size + '');
        page = page !== null ? page : this._pagination.number;
        params = params.set('page', page + '');
        return params;
    }

}
