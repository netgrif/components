import {HeaderMode} from './models/header-mode';
import {BehaviorSubject, Observable} from 'rxjs';
import {OnDestroy} from '@angular/core';
import {HeaderColumn} from './models/header-column';


/**
 * Keeps the current state of the header
 */
export class HeaderState implements OnDestroy {

    public mode: HeaderMode = HeaderMode.SORT;

    private _lastMode: HeaderMode = HeaderMode.SORT;
    private _selectedHeaders$: BehaviorSubject<Array<HeaderColumn>>;
    private _lastSelectedHeaders: Array<HeaderColumn>;

    public get selectedHeaders$(): Observable<Array<HeaderColumn>> {
        return this._selectedHeaders$.asObservable();
    }

    constructor(initialHeaders: Array<HeaderColumn>) {
        this._selectedHeaders$ = new BehaviorSubject<Array<HeaderColumn>>(initialHeaders);
    }

    public saveState(): void {
        this._lastMode = this.mode;
        this._lastSelectedHeaders = this._selectedHeaders$.getValue();
    }

    public restoreLastMode(): void {
        this.mode = this._lastMode;
    }

    public restoreLastState(): void {
        this.mode = this._lastMode;
        this._selectedHeaders$.next(this._lastSelectedHeaders);
    }

    ngOnDestroy(): void {
        this._selectedHeaders$.complete();
    }
}
