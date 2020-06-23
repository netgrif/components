import {Injectable} from '@angular/core';
import {LoadingEmitter} from '../../../../utility/loading-emitter';
import {BehaviorSubject, Observable, of, timer} from 'rxjs';
import {Pagination} from '../../../../resources/interface/pagination';
import {SideMenuService} from '../../../services/side-menu.service';
import {LoggerService} from '../../../../logger/services/logger.service';
import {SnackBarService} from '../../../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {catchError, map, mergeMap, scan, tap} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {UserValue} from '../../../../data-fields/user-field/models/user-value';
import {UserResourceService} from '../../../../resources/engine-endpoint/user-resource.service';
import {User} from '../../../../resources/interface/user';

@Injectable()
export class UserAssignService {

    public readonly PAGE_SIZE = 12;

    protected _loading$: LoadingEmitter;
    protected _users$: Observable<Array<UserValue>>;
    protected _nextPage$: BehaviorSubject<number>;
    protected _endOfData: boolean;
    protected _pagination: Pagination;

    private _clear: boolean;

    constructor(protected _sideMenuService: SideMenuService,
                protected _userResourceService: UserResourceService,
                protected _log: LoggerService,
                protected _snackBarService: SnackBarService,
                protected _translate: TranslateService) {
        this._loading$ = new LoadingEmitter();
        this._endOfData = false;
        this._nextPage$ = new BehaviorSubject<number>(null);
        this._pagination = {
            size: this.PAGE_SIZE,
            totalElements: undefined,
            totalPages: undefined,
            number: -1
        };
        this._clear = false;

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

    public loadPage(page: number): Observable<{ [k: string]: UserValue }> {
        if (page === null || page === undefined || this._clear) {
            return of(null);
        }
        let params: HttpParams = new HttpParams();
        params = this.addPageParams(params, page);
        this._loading$.on();
        return this._userResourceService.getAll(params).pipe(
            catchError(err => {
                this._log.error('Loading users has failed!', err);
                this._snackBarService.openErrorSnackBar(this._translate.instant('side-menu.user.err'));
                return of({content: [], pagination: {...this._pagination, number: this._pagination.number - 1}});
            }),
            tap(u => this._endOfData = !Array.isArray(u.content) ||
                (Array.isArray(u.content) && u.content.length === 0) ||
                u.pagination.number === u.pagination.totalPages),
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

    public nextPage(lastRendered, totalLoaded) {
        if (this.loading || this._endOfData) {
            return;
        }

        if (lastRendered === totalLoaded) {
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

}
