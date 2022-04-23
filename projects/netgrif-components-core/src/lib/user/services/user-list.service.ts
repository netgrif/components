import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, of, Subject, timer} from 'rxjs';
import {LoadingEmitter} from '../../utility/loading-emitter';
import {Pagination} from '../../resources/interface/pagination';
import {UserResourceService} from '../../resources/engine-endpoint/user-resource.service';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {catchError, map, mergeMap, scan, tap} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {MessageResource} from '../../resources/interface/message-resource';
import {Page} from '../../resources/interface/page';
import {UserResource} from '../../resources/interface/user-resource';
import {PaginationParams} from '../../utility/pagination/pagination-params';

export interface UserListItem extends UserResource {
    selected: boolean;
    roles: Set<string>;

    toggle(): void;
}

export interface RolesObject {
    [k: string]: RoleObject;
}

interface RoleObject {
    perform?: boolean;
    delegate?: boolean;
    view?: boolean;
}

/**
 * Performs paged loading users from backend for [UserAssignComponent]{@link AbstractUserAssignComponent}.
 */
@Injectable()
export class UserListService implements OnDestroy {

    /**
     * UserValue array stream, that represents users loading from backend.
     */
    private readonly _users$: Observable<Array<UserListItem>>;
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
     * Roles that should be applied to the request
     */
    public rolesQuery: Array<string>;
    /**
     * negative Roles that should be applied to the request
     */
    public negativeRolesQuery: Array<string>;
    private _updateProgress$: LoadingEmitter;
    private _usersReload$: Subject<void>;

    /**
     * Inject services.
     * Initialize declared attributes.
     *
     * Loading and mapped stream of users.
     * @param _resources Loading users from backend.
     * @param _log Logging action status.
     * @param _snackbar Display info about loading from backend for user.
     * @param _translate Translate messages for user.
     */
    constructor(private _resources: UserResourceService,
                private _log: LoggerService,
                private _snackbar: SnackBarService,
                private _translate: TranslateService) {
        this._loading$ = new LoadingEmitter();
        this._updateProgress$ = new LoadingEmitter();
        this._usersReload$ = new Subject<void>();
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
        this.rolesQuery = new Array<string>();
        this.negativeRolesQuery = new Array<string>();

        const usersMap = this._nextPage$.pipe(
            mergeMap(p => this.loadPage(p)),
            tap(() => {
                if (!this._clear) { this._usersReload$.next(); }
            }),
            scan((acc, value) => {
                const result = this._clear ? {} : {...acc, ...value};
                this._clear = false;
                return result;
            }, {})
        );
        this._users$ = usersMap.pipe(
            map(v => Object.values(v) as Array<UserListItem>),
        );
    }

    ngOnDestroy(): void {
        this._loading$.complete();
        this._updateProgress$.complete();
        this._usersReload$.complete();
        this._nextPage$.complete();
    }

    public get loading(): boolean {
        return this._loading$.isActive;
    }

    public get loading$(): Observable<boolean> {
        return this._loading$.asObservable();
    }

    public get usersReload$(): Observable<void> {
        return this._usersReload$.asObservable();
    }

    public get users$(): Observable<Array<UserListItem>> {
        return this._users$;
    }

    public get updating$(): Observable<boolean> {
        return this._updateProgress$.asObservable();
    }

    public get totalUsers(): number {
        return this._pagination.totalElements ? this._pagination.totalElements : 0;
    }

    /**
     * Get all users from backend and mapped to [UserValue]{@link UserValue} interface with catching errors.
     * @param page Page number that is requested. / Next page users list.
     */
    public loadPage(page: number): Observable<{ [k: string]: UserListItem }> {
        if (page === null || page === undefined || this._clear) {
            return of({});
        }
        let params: HttpParams = new HttpParams();
        params = this.addPageParams(params, page);
        this._loading$.on();
        return this._resources.search(
            {fulltext: this._searchQuery, roles: this.rolesQuery, negativeRoles: this.negativeRolesQuery}, params).pipe(
            catchError(err => {
                this._log.error('Loading users has failed on page ' + this._pagination.number, err);
                return of({content: [], pagination: {...this._pagination, number: this._pagination.number - 1}});
            }),
            tap(u => this._endOfData = !Array.isArray(u.content) ||
                (Array.isArray(u.content) && u.content.length === 0) ||
                u.pagination.number === u.pagination.totalPages),
            map(users => (Array.isArray(users.content) ? users : {...users, content: []}) as Page<UserResource>),
            map(users => {
                this._pagination = users.pagination;
                return users.content.reduce((acc, curr) => {
                    const item = curr as UserListItem;
                    item.roles = new Set<string>(curr.processRoles.map(pr => pr.stringId));
                    item.processRoles = undefined;
                    item.selected = false;
                    item.toggle = function() {
                        this.selected = !this.selected;
                    };
                    return {...acc, [curr.id]: item};
                }, {});
            }),
            tap(_ => this._loading$.off())
        );
    }

    /**
     * Set value to nextPage stream as next page users list.
     * @param lastRendered Last rendered user index.
     * @param totalRendered Total loaded size users.
     */
    public nextPage(lastRendered: number, totalRendered: number) {
        if (this.loading || this._endOfData) {
            return;
        }

        if (lastRendered === totalRendered) {
            this._nextPage$.next(this._pagination.number + 1);
        }
    }

    /**
     * Reload page with users.
     */
    public reload(newSearchQuery = ''): void {
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

    public updateRoles(selectedUsers: Array<UserListItem>, selectedRoles: Array<string> = []): Observable<Array<MessageResource>> {
        if (!selectedUsers || selectedUsers.length === 0) {
            return of([]);
        }
        this._updateProgress$.on();
        return forkJoin(selectedUsers.map(user => this._resources.assignRoles(user.id + '', selectedRoles))).pipe(
            tap(messages => {
                messages.forEach((message, idx) => {
                    if (message.error) {
                        this._log.error(message.error, message);
                        this._snackbar.openErrorSnackBar(message.error);
                    } else {
                        this._log.info(message.success);
                        selectedUsers[idx].roles = new Set<string>(selectedRoles);
                        this._snackbar.openSuccessSnackBar(this._translate.instant('tasks.snackbar.rolesSuccessAssign'));
                    }
                });
                this._updateProgress$.off();
            }));
    }

    /**
     * Returns HttpParams with page params addition.
     * @param params Existing HttpParams.
     * @param page Page number that is requested. / Next page users list.
     */
    private addPageParams(params: HttpParams, page?: number): HttpParams {
        params = params.set(PaginationParams.PAGE_SIZE, `${this._pagination.size}`);
        page = page !== null ? page : this._pagination.number;
        params = params.set(PaginationParams.PAGE_NUMBER, `${page}`);
        return params;
    }

}
