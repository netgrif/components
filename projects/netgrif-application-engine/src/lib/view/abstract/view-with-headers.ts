import {Observable, ReplaySubject} from 'rxjs';
import {HeaderColumn} from '../../header/models/header-column';
import {HeaderComponent} from '../../header/header.component';
import {SortableView} from './sortable-view';


export abstract class ViewWithHeaders {
    protected _selectedHeaders$: ReplaySubject<Array<HeaderColumn>>;

    protected constructor(private _sortableView?: SortableView) {
        this._selectedHeaders$ = new ReplaySubject<Array<HeaderColumn>>(1);
    }

    public get selectedHeaders$(): Observable<Array<HeaderColumn>> {
        return this._selectedHeaders$.asObservable();
    }

    protected initializeHeader(headerComponent: HeaderComponent): void {
        headerComponent.headerService.selectedHeaders$.subscribe(selectedHeaders => this._selectedHeaders$.next(selectedHeaders));
        if (!!this._sortableView) {
            this._sortableView.registerHeaderChange(headerComponent.headerService.headerChange$);
        }
    }
}
