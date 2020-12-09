import {Injectable, OnDestroy} from '@angular/core';
import {Case} from '../../resources/interface/case';
import {BehaviorSubject, Observable} from 'rxjs';

/**
 * Holds information about the currently selected {@link Case}.
 *
 * Services that handle various task operations, can use this service to take into consideration changes in frontend data in
 * between backend call and backend response.
 *
 * This service is used by Tree Case View's {@link TreeTaskContentService}.
 */
@Injectable()
export class SelectedCaseService implements OnDestroy {

    /**
     * Stores the currently selected {@link Case}.
     *
     * The initial value is `undefined`.
     *
     * Beware that setting new values doesn't make copies of the provided {@link Case} object,
     * so it is possible that any subscriber could modify the shared object.
     * Subscribed library services don't modify the provided {@link Case}, only the owner ({@link TreeTaskContentService})
     * of the {@link Case} object performs modifications of it.
     */
    protected _selectedCase$: BehaviorSubject<Case>;

    constructor() {
        this._selectedCase$ = new BehaviorSubject<Case>(undefined);
    }

    ngOnDestroy(): void {
        this._selectedCase$.complete();
    }

    public get selectedCase$(): Observable<Case> {
        return this._selectedCase$.asObservable();
    }

    /**
     * @param selectedCase the new value, that is emitted into the underlying stream
     */
    public set selectedCase(selectedCase: Case) {
        this._selectedCase$.next(selectedCase);
    }

    /**
     * @returns the current value of the underlying stream
     */
    public get selectedCase(): Case {
        return this._selectedCase$.getValue();
    }
}
