import {HeaderMode} from './models/header-mode';
import {BehaviorSubject, Observable} from 'rxjs';
import {HeaderColumn} from './models/header-column';


export interface HeaderStateInterface {
    mode: HeaderMode;
    readonly selectedHeaders$: Observable<Array<HeaderColumn>>;
    readonly selectedHeaders: Array<HeaderColumn>;
    readonly lastSelectedHeaders: Array<HeaderColumn>;
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
    private _selectedHeaders$: BehaviorSubject<Array<HeaderColumn>>;
    private _lastSelectedHeaders: Array<HeaderColumn>;

    constructor(initialHeaders: Array<HeaderColumn>) {
        this._lastSelectedHeaders = new Array<HeaderColumn>();
        this._selectedHeaders$ = new BehaviorSubject<Array<HeaderColumn>>(initialHeaders);
    }

    public get selectedHeaders$(): Observable<Array<HeaderColumn>> {
        return this._selectedHeaders$.asObservable();
    }

    public get selectedHeaders(): Array<HeaderColumn> {
        return this._selectedHeaders$.getValue();
    }

    get lastSelectedHeaders(): Array<HeaderColumn> {
        return this._lastSelectedHeaders;
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

    public restoreLastHeadersToIndex(count: number): void {
        this._selectedHeaders$.next(this._lastSelectedHeaders.slice(0, count))
    }

    public updateSelectedHeaders(newSelectedHeaders: Array<HeaderColumn>): void {
        this._selectedHeaders$.next(newSelectedHeaders);
    }

    public asInterface(): HeaderStateInterface {
        return {
            mode: this.mode,
            selectedHeaders$: this.selectedHeaders$,
            selectedHeaders: this.selectedHeaders,
            lastSelectedHeaders: this.lastSelectedHeaders,
            saveState: this.saveState,
            restoreLastState: this.restoreLastState,
            restoreLastMode: this.restoreLastMode
        };
    }
}
