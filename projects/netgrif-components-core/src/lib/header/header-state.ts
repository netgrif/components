import {HeaderMode} from './models/header-mode';
import {BehaviorSubject, Observable} from 'rxjs';
import {HeaderColumn} from './models/header-column';


export interface HeaderStateInterface {
    mode: HeaderMode;
    readonly selectedHeaders$: Observable<Array<HeaderColumn>>;
    readonly selectedHeaders: Array<HeaderColumn>;
    readonly lastSelectedHeaders: Array<HeaderColumn>;
    readonly selectedSorts$: Observable<Array<HeaderColumn>>;
    readonly selectedSorts: Array<HeaderColumn>;
    readonly lastSelectedSorts: Array<HeaderColumn>;
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
    protected _selectedSorts$: BehaviorSubject<Array<HeaderColumn>>;
    private _lastSelectedHeaders: Array<HeaderColumn>;
    private _lastSelectedSorts: Array<HeaderColumn>;

    constructor(initialHeaders: Array<HeaderColumn>) {
        this._lastSelectedHeaders = new Array<HeaderColumn>();
        this._lastSelectedSorts = new Array<HeaderColumn>();
        this._selectedHeaders$ = new BehaviorSubject<Array<HeaderColumn>>(initialHeaders);
        this._selectedSorts$ = new BehaviorSubject<Array<HeaderColumn>>([]);
    }

    public get selectedHeaders$(): Observable<Array<HeaderColumn>> {
        return this._selectedHeaders$.asObservable();
    }

    public get selectedHeaders(): Array<HeaderColumn> {
        return this._selectedHeaders$.getValue();
    }

    public get selectedSorts$(): Observable<Array<HeaderColumn>> {
        return this._selectedSorts$.asObservable();
    }

    public get selectedSorts(): Array<HeaderColumn> {
        return this._selectedSorts$.getValue();
    }

    get lastSelectedHeaders(): Array<HeaderColumn> {
        return this._lastSelectedHeaders;
    }

    get lastSelectedSorts(): Array<HeaderColumn> {
        return this._lastSelectedSorts;
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
        this._selectedSorts$.next(this._lastSelectedSorts);
    }

    public restoreLastHeadersToIndex(count: number): void {
        this._selectedHeaders$.next(this._lastSelectedHeaders.slice(0, count))
    }

    public updateSelectedHeaders(newSelectedHeaders: Array<HeaderColumn>): void {
        this._selectedHeaders$.next(newSelectedHeaders);
    }

    public updateSelectedSorts(newSelectedSorts: Array<HeaderColumn>): void {
        this._selectedSorts$.next(newSelectedSorts);
    }

    public asInterface(): HeaderStateInterface {
        return {
            mode: this.mode,
            selectedHeaders$: this.selectedHeaders$,
            selectedHeaders: this.selectedHeaders,
            selectedSorts$: this.selectedSorts$,
            selectedSorts: this.selectedSorts,
            lastSelectedHeaders: this.lastSelectedHeaders,
            lastSelectedSorts: this.lastSelectedSorts,
            saveState: this.saveState,
            restoreLastState: this.restoreLastState,
            restoreLastMode: this.restoreLastMode
        };
    }
}
