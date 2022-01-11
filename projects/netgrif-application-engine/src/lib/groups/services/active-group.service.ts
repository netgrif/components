import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Case} from '../../resources/interface/case';
import {NextGroupService} from './next-group.service';
import {map} from 'rxjs/operators';

/**
 * This service to the groups that are "active" for the logged user.
 *
 * The meaning of "active" can wary from application to application. And this service provides the utility to track this state.
 *
 * The active groups are assumed to be a subset of the groups the logged user is a member of,
 * but this assumption is not enforced nor checked.
 *
 * If at most one group can be active at a time, this service provides utility methods to access this group directly.
 *
 * The groups are assumed to be instances of the engine group process, this is never checked nor enforced.
 *
 * In the default implementation the initially active groups are all the groups the logged user is a member of.
 */
@Injectable({
    providedIn: 'root'
})
export class ActiveGroupService implements OnDestroy {

    protected _activeGroups$: BehaviorSubject<Array<Case>>;

    private _groupSub: Subscription;

    constructor(protected _groupService: NextGroupService) {
        this._activeGroups$ = new BehaviorSubject<Array<Case>>([]);
        this._groupSub = this._groupService.memberGroups$.subscribe(groups => {
            this._activeGroups$.next(groups);
        });
    }

    ngOnDestroy(): void {
        this._groupSub.unsubscribe();
        this._activeGroups$.complete();
    }

    /**
     * In the default implementation this stream copies the values of the [memberGroups$]{@link NextGroupService#memberGroups$} stream
     * of the {@link NextGroupService}. Whenever the copies stream emits, the underlying stream in this class emits the same value.
     *
     * @returns an Observable of all the groups that are currently active
     */
    get activeGroups$(): Observable<Array<Case>> {
        return this._activeGroups$.asObservable();
    }

    get activeGroups(): Array<Case> {
        return this._activeGroups$.getValue();
    }

    set activeGroups(activeGroups: Array<Case>) {
        this._activeGroups$.next(activeGroups);
    }

    /**
     * @returns an Observable containing the first element of the [activeGroups$]{@link ActiveGroupService#activeGroups$} observable,
     * or `undefined` if the contained array is empty
     */
    get activeGroup$(): Observable<Case | undefined> {
        return this.activeGroups$.pipe(map(array => array.length > 0 ? array[0] : undefined));
    }

    /**
     * @returns the first element of the [activeGroups]{@link ActiveGroupService#activeGroups} array, or `undefined` if the array is empty
     */
    get activeGroup(): Case | undefined {
        const activeGroups = this.activeGroups;
        return activeGroups.length > 0 ? activeGroups[0] : undefined;
    }

    /**
     * Emits a new array into the [activeGroups$]{@link ActiveGroupService#activeGroups$} observable, that contains only
     * the provided {@link Case} object. If `undefined` is passed as argument, an empty array will be pushed into the observable.
     * @param activeGroup the new active group case reference
     */
    set activeGroup(activeGroup: Case) {
        if (activeGroup === undefined) {
            this._activeGroups$.next([]);
        } else {
            this._activeGroups$.next([activeGroup]);
        }
    }
}
