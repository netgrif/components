import {HeaderMode} from './models/header-mode';
import {BehaviorSubject, Observable} from 'rxjs';
import {HeaderColumn} from './models/header-column';


export interface HeaderStateInterface {
    mode: HeaderMode;
    readonly selectedHeaders$: Observable<Array<HeaderColumn | null>>;
    readonly selectedHeaders: Array<HeaderColumn | null>;
    saveState: () => void;
    restoreLastState: () => void;
    restoreLastMode: () => void;
}

/**
 * Keeps the current state of the header
 */
export class HeaderState implements HeaderStateInterface {

    public mode: HeaderMode = HeaderMode.SORT;

    private _lastMode: HeaderMode = HeaderMode.SORT;
    private _selectedHeaders$: BehaviorSubject<Array<HeaderColumn | null>>;
    private _lastSelectedHeaders: Array<HeaderColumn | null>;

    constructor(initialHeaders: Array<HeaderColumn | null>) {
        this._selectedHeaders$ = new BehaviorSubject<Array<HeaderColumn | null>>(initialHeaders);
    }

    public get selectedHeaders$(): Observable<Array<HeaderColumn | null>> {
        return this._selectedHeaders$.asObservable();
    }

    public get selectedHeaders(): Array<HeaderColumn | null> {
        return this._selectedHeaders$.getValue();
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

    public updateSelectedHeaders(newSelectedHeaders: Array<HeaderColumn | null>): void {
        this._selectedHeaders$.next(newSelectedHeaders);
    }

    public asInterface(): HeaderStateInterface {
        return {
            mode: this.mode,
            selectedHeaders$: this.selectedHeaders$,
            selectedHeaders: this.selectedHeaders,
            saveState: this.saveState,
            restoreLastState: this.restoreLastState,
            restoreLastMode: this.restoreLastMode
        };
    }
}
