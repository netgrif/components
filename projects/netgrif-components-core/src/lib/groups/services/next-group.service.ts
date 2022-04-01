import {Injectable, OnDestroy} from '@angular/core';
import {UserService} from '../../user/services/user.service';
import {CaseResourceService} from '../../resources/engine-endpoint/case-resource.service';
import {SimpleFilter} from '../../filter/models/simple-filter';
import {HttpParams} from '@angular/common/http';
import {map, switchMap} from 'rxjs/operators';
import {Case} from '../../resources/interface/case';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';

/**
 * This service allows access to information about the groups of the currently logged user.
 *
 * If no user is logged an empty array is provided.
 *
 * If a user can be owner of at most one group, this service provides utility methods to access this group directly.
 *
 * The groups are assumed to be instances of the engine group process, this is never checked nor enforced.
 */
@Injectable({
  providedIn: 'root'
})
export class NextGroupService implements OnDestroy {

    protected _memberGroups$: BehaviorSubject<Array<Case>>;
    protected _ownerGroups$: BehaviorSubject<Array<Case>>;

    private _userSub: Subscription;

    constructor(protected _userService: UserService, protected _caseResourceService: CaseResourceService) {
        this._ownerGroups$ = new BehaviorSubject<Array<Case>>([]);
        this._memberGroups$ = new BehaviorSubject<Array<Case>>([]);

        this._userSub = this._userService.user$.pipe(
            switchMap(user => {
                if (!user || user.id === '') {
                    return of([]);
                }

                const params = new HttpParams();
                params.set('size', `${(user as any).nextGroups.length}`);

                return this._caseResourceService.searchCases(SimpleFilter.fromCaseQuery({stringId: (user as any).nextGroups}), params)
                    .pipe(
                        map(page => page.content ? page.content : []),
                        map(groups => groups.filter(group => group.author.fullName !== 'application engine'))
                    );
            })
        ).subscribe(groups => {
            const ownerGroups = groups.filter(g => g.author.email === this._userService.user.email);
            this._ownerGroups$.next(ownerGroups);
            this._memberGroups$.next(groups);
        });
    }

    ngOnDestroy(): void {
        this._userSub.unsubscribe();
        this._memberGroups$.complete();
        this._ownerGroups$.complete();
    }

    /**
     * @returns an Observable of all the groups the currently logged user is a member of
     */
    public get memberGroups$(): Observable<Array<Case>> {
        return this._memberGroups$.asObservable();
    }

    /**
     * @returns an Observable of all the groups the currently logged user is an owner of
     */
    public get ownerGroups$(): Observable<Array<Case>> {
        return this._ownerGroups$.asObservable();
    }

    /**
     * @returns an Array of all the groups the currently logged user is a member of
     */
    public get memberGroups(): Array<Case> {
        return this._memberGroups$.getValue();
    }

    /**
     * @returns an Array of all the groups the currently logged user is an owner of
     */
    public get ownerGroups(): Array<Case> {
        return this._ownerGroups$.getValue();
    }

    /**
     * @returns an Observable containing the first element of the [ownerGroups$]{@link NextGroupService#ownerGroups$} observable,
     * or `undefined` if the contained array is empty
     */
    public get firstOwnerGroup$(): Observable<Case | undefined> {
        return this._ownerGroups$.pipe(map(array => array.length > 0 ? array[0] : undefined));
    }

    /**
     * @returns the first element of the [ownerGroups]{@link NextGroupService#ownerGroups} array, or `undefined` if the array is empty
     */
    public get firstOwnerGroup(): Case | undefined {
        const ownerGroups = this.ownerGroups;
        return ownerGroups.length > 0 ? ownerGroups[0] : undefined;
    }

    /**
     * @deprecated in NAE 5.6.0 - use [ownerGroups]{@link NextGroupService#ownerGroups} instead
     */
    get groupOfUser(): Array<Case> {
        return this.ownerGroups;
    }
}
