import {LoadingEmitter} from '../../../utility/loading-emitter';
import {BehaviorSubject, forkJoin, Observable, of, timer} from 'rxjs';
import {User} from '../../../resources/interface/user';
import {Pagination} from '../../../resources/interface/pagination';
import {catchError, map, mergeMap, scan, tap} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {UserResourceService} from '../../../resources/engine-endpoint/user-resource.service';
import {LoggerService} from '../../../logger/services/logger.service';
import {Page} from '../../../resources/interface/page';
import {SnackBarService} from '../../../snack-bar/services/snack-bar.service';
import {MessageResource} from '../../../resources/interface/message-resource';

export interface UserListItem extends User {
    selected: boolean;
    roles: Set<string>;

    toggle(): void;
}

export class UserList {

    private _loading$: LoadingEmitter;
    private _users$: Observable<Array<UserListItem>>;
    private _nextPage$: BehaviorSubject<number>;
    private _endOfData: boolean;
    private _pagination: Pagination;
    private _clear: boolean;
    private _updateProgress$: LoadingEmitter;

    constructor(private _resources: UserResourceService, private _snackbar: SnackBarService, private _log: LoggerService) {
        this._loading$ = new LoadingEmitter();
        this._updateProgress$ = new LoadingEmitter();
        this._nextPage$ = new BehaviorSubject<number>(null);
        this._pagination = {
            size: 25,
            totalElements: undefined,
            totalPages: undefined,
            number: -1
        };
        this._endOfData = false;
        this._clear = false;

        const userMap = this._nextPage$.pipe(
            mergeMap(p => this.loadPage(p)),
            scan((acc, value) => {
                const result = this._clear ? {} : {...acc, ...value};
                this._clear = false;
                return result;
            }, {})
        );
        this._users$ = userMap.pipe(
            map(v => Object.values(v))
        );
    }

    public get loading(): boolean {
        return this._loading$.getValue();
    }

    public get loading$(): Observable<boolean> {
        return this._loading$.asObservable();
    }

    public get updating$(): Observable<boolean> {
        return this._updateProgress$.asObservable();
    }

    public get users$(): Observable<Array<UserListItem>> {
        return this._users$;
    }

    public get totalUsers(): number {
        return this._pagination.totalElements ? this._pagination.totalElements : 0;
    }

    public loadPage(page: number): Observable<{ [k: string]: UserListItem }> {
        if (page === null || page === undefined || this._clear) {
            return of({});
        }
        let params: HttpParams = new HttpParams();
        params = this.addPageParams(params, page);
        this._loading$.on();
        return this._resources.getAll(params).pipe(
            catchError(err => {
                this._log.error('Loading users has failed on page ' + this._pagination.number, err);
                return of({content: [], pagination: {...this._pagination, number: this._pagination.number - 1}});
            }),
            tap(u => this._endOfData = !Array.isArray(u.content) ||
                (Array.isArray(u.content) && u.content.length === 0) ||
                u.pagination.number === u.pagination.totalPages),
            map(users => (Array.isArray(users.content) ? users : {...users, content: []}) as Page<User>),
            map(users => {
                this._pagination = users.pagination;
                return users.content.reduce((acc, curr) => {
                    const item = curr as UserListItem;
                    item.roles = new Set<string>(curr.processRoles.map(pr => pr.stringId));
                    item.processRoles = undefined;
                    item.userProcessRoles = undefined;
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

    public nextPage(lastRendered: number, totalRendered: number) {
        if (this.loading || this._endOfData) {
            return;
        }

        if (lastRendered === totalRendered) {
            this._nextPage$.next(this._pagination.number + 1);
        }
    }

    protected addPageParams(params: HttpParams, page?: number): HttpParams {
        params = params.set('size', this._pagination.size + '');
        page = page !== null ? page : this._pagination.number;
        params = params.set('page', page + '');
        return params;
    }

    public reload(): void {
        if (!this._users$ || !this._pagination) {
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
                        this._snackbar.openSuccessSnackBar('Roles successfully assigned to selected users');
                    }
                });
                this._updateProgress$.off();
            }));
    }

}
