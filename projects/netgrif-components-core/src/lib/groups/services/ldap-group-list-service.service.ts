import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, of, Subject, timer} from 'rxjs';
import {LoadingEmitter} from '../../utility/loading-emitter';
import {Pagination} from '../../resources/interface/pagination';
import {LoggerService} from '../../logger/services/logger.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {catchError, map, mergeMap, scan, tap} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {PaginationParams} from '../../utility/pagination/pagination-params';
import {LdapGroup, LdapGroupResponseBody} from '../../resources/interface/ldapGroupResponseBody';
import {LdapGroupResourceServiceService} from '../../resources/engine-endpoint/ldap-group-resource-service.service';
import {MessageResource} from '../../resources/interface/message-resource';
import {Page} from '../../resources/interface/page';
import {UserResource} from '../../resources/interface/user-resource';

export interface LdapGroupListItem extends LdapGroup {
    selected: boolean;
    roles: Set<string>;

    toggle(): void;
}

@Injectable()
export class LdapGroupListServiceService implements OnDestroy {

    /**
     * Ldap Group Value array stream, that represents ldap group loading from backend.
     */
    private readonly _ldapGroups$: Observable<Array<LdapGroupListItem>>;
    /**
     * Emit ldap group loading status from backend.
     */
    private _loading$: LoadingEmitter;
    /**
     * Number stream of next page ldap group list, that to be requested from backend.
     */
    private _nextPage$: BehaviorSubject<number>;
    /**
     * Signals the end of loaded ldap groups.
     */
    private _endOfData: boolean;
    /**
     * Necessary for pagination parameters in ldap group assign loading from backend.
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
    private _ldapGroupsReload$: Subject<void>;


    /**
     * Inject services.
     * Initialize declared attributes.
     *
     * Loading and mapped stream of ldap groups.
     * @param _resources Loading ldap groups from backend.
     * @param _log Logging action status.
     * @param _snackbar Display info about loading from backend for ldap group.
     * @param _translate Translate messages for ldap group.
     */
    constructor(private _resources: LdapGroupResourceServiceService,
                private _log: LoggerService,
                private _snackbar: SnackBarService,
                private _translate: TranslateService) {
        this._loading$ = new LoadingEmitter();
        this._updateProgress$ = new LoadingEmitter();
        this._ldapGroupsReload$ = new Subject<void>();
        this._nextPage$ = new BehaviorSubject<number>(null);
        this._endOfData = false;
        this._pagination = {
            size: 20,
            totalElements: undefined,
            totalPages: undefined,
            number: -1
        };
        this._searchQuery = '';
        this._clear = false;
        this.negativeRolesQuery = new Array<string>();
        this.rolesQuery = new Array<string>();

        const ldapGroupsMap = this._nextPage$.pipe(
            mergeMap(p => this.loadPage(p)),
            tap(() => {
                if (!this._clear) {
                    this._ldapGroupsReload$.next();
                }
            }),
            scan((acc, value) => {
                const result = this._clear ? {} : {...acc, ...value};
                this._clear = false;
                return result;
            }, {})
        );
        this._ldapGroups$ = ldapGroupsMap.pipe(
            map(v => Object.values(v) as Array<LdapGroupListItem>),
        );
    }

    ngOnDestroy(): void {
        this._loading$.complete();
        this._updateProgress$.complete();
        this._ldapGroupsReload$.complete();
        this._nextPage$.complete();
    }

    public get loading(): boolean {
        return this._loading$.isActive;
    }

    public get loading$(): Observable<boolean> {
        return this._loading$.asObservable();
    }

    public get ldapGroupsReload$(): Observable<void> {
        return this._ldapGroupsReload$.asObservable();
    }

    public get ldapGroups$(): Observable<Array<LdapGroupListItem>> {
        return this._ldapGroups$;
    }

    public get updating$(): Observable<boolean> {
        return this._updateProgress$.asObservable();
    }

    public get totalLdapGroups(): number {
        return this._pagination.totalElements ? this._pagination.totalElements : 0;
    }

    /**
     * Get all ldapGroups from backend and mapped to [ldapGroupValue]{@link ldapGroupValue} interface with catching errors.
     * @param page Page number that is requested. / Next page ldapGroups list.
     */
    public loadPage(page: number): Observable<{ [k: string]: LdapGroupListItem }> {
        if (page === null || page === undefined || this._clear) {
            return of({});
        }
        let params: HttpParams = new HttpParams();
        params = this.addPageParams(params, page);
        this._loading$.on();
        return this._resources.searchLdapGroups({fulltext: this._searchQuery}).pipe(
            catchError(err => {
                this._log.error('Loading ldap groups has failed on page ' + this._pagination.number, err);
                return of({ldapGroupResponseBodies: [], pagination: {...this._pagination, number: this._pagination.number - 1}});
            }),
            tap(ldapGroupResponseBody => this._endOfData = !Array.isArray(ldapGroupResponseBody.ldapGroupResponseBodies) ||
                (Array.isArray(ldapGroupResponseBody.ldapGroupResponseBodies)
                    && ldapGroupResponseBody.ldapGroupResponseBodies.length === 0)),
            map(ldapGroupResponseBody => (Array.isArray(ldapGroupResponseBody.ldapGroupResponseBodies) ?
                ldapGroupResponseBody : {...ldapGroupResponseBody, ldapGroupResponseBodies: []})),
            map( ldapGroupResponseBody => {
                const result = {};
                ldapGroupResponseBody.ldapGroupResponseBodies.forEach( ldapGroup => {
                    const item = ldapGroup as LdapGroupListItem;
                    item.roles = new Set<string>(ldapGroup.processRoles.map(pr => pr.stringId));
                    item.processRoles = undefined;
                    item.selected = false;
                    item.toggle = function() {
                        this.selected = !this.selected;
                    };
                    result[ldapGroup.dn] = item;
                });
                return result;
            }),
            tap(_ => this._loading$.off())
        );
    }

    /**
     * Set value to nextPage stream as next page ldapGroups list.
     * @param lastRendered Last rendered ldapGroup index.
     * @param totalRendered Total loaded size ldapGroups.
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
     * Reload page with ldapGroups.
     */
    public reload(newSearchQuery = ''): void {
        if (!this._ldapGroups$ || !this._pagination) {
            return;
        }
        this._clear = true;
        this._endOfData = false;
        this._pagination.number = -1;
        this._searchQuery = newSearchQuery;
        this.nextPage(0, 0);
        timer(100).subscribe(_ => {
            this._pagination.number = -1;
            this.nextPage(0, 0);
        });
    }

    public updateRoles(selectedLdapGroups: Array<LdapGroupListItem>, selectedRoles: Array<string> = []):
    Observable<Array<MessageResource>> {
        if (!selectedLdapGroups || selectedLdapGroups.length === 0) {
            return of([]);
        }
        this._updateProgress$.on();
        return forkJoin(selectedLdapGroups.map(ldapGroup => this._resources.assignRolesToLdapGroup({groupDn: ldapGroup.dn, roleIds: selectedRoles}))).pipe(
            tap(messages => {
                messages.forEach((message, idx) => {
                    if (message.error) {
                        this._log.error(message.error, message);
                        this._snackbar.openErrorSnackBar(message.error);
                    } else {
                        this._log.info(message.success);
                        selectedLdapGroups[idx].roles = new Set<string>(selectedRoles);
                        this._snackbar.openSuccessSnackBar(this._translate.instant('tasks.snackbar.rolesSuccessAssign'));
                    }
                });
                this._updateProgress$.off();
            }));
    }

    /**
     * Returns HttpParams with page params addition.
     * @param params Existing HttpParams.
     * @param page Page number that is requested. / Next page ldapGroups list.
     */
    private addPageParams(params: HttpParams, page?: number): HttpParams {
        params = params.set(PaginationParams.PAGE_SIZE, `${this._pagination.size}`);
        page = page !== null ? page : this._pagination.number;
        params = params.set(PaginationParams.PAGE_NUMBER, `${page}`);
        return params;
    }
}
