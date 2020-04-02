import {HeaderMode} from './models/header-mode';
import {BehaviorSubject, Observable} from 'rxjs';
import {Column} from 'netgrif-application-engine';
import {OnDestroy} from '@angular/core';


/**
 * Keeps the current state of the header
 */
export class HeaderState implements OnDestroy {

    public mode: HeaderMode = HeaderMode.SORT;

    private _lastMode: HeaderMode = HeaderMode.SORT;
    private _selectedHeaders$: BehaviorSubject<Array<Column>>;
    private _lastSelectedHeaders: Array<Column>;

    public get selectedHeaders$(): Observable<Array<Column>> {
        return this._selectedHeaders$.asObservable();
    }

    constructor(initialHeaders: Array<Column>) {
        this._selectedHeaders$ = new BehaviorSubject<Array<Column>>(initialHeaders);
    }

    public saveState(): void {
        this._lastMode = this.mode;
        this._lastSelectedHeaders = this._selectedHeaders$.getValue();
    }

    public restoreLastState(): void {
        this.mode = this._lastMode;
        this._selectedHeaders$.next(this._lastSelectedHeaders);
    }

    ngOnDestroy(): void {
        this._selectedHeaders$.complete();
    }
}
