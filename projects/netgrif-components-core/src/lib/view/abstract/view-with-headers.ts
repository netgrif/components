import {Observable, ReplaySubject} from 'rxjs';
import {HeaderColumn} from '../../header/models/header-column';
import {AbstractHeaderComponent} from '../../header/abstract-header.component';
import {SortableView} from './sortable-view';
import {OnDestroy} from '@angular/core';


export abstract class ViewWithHeaders implements OnDestroy {
    protected _selectedHeaders$: ReplaySubject<Array<HeaderColumn>>;

    protected constructor(private _sortableView?: SortableView) {
        this._selectedHeaders$ = new ReplaySubject<Array<HeaderColumn>>(1);
    }

    public get selectedHeaders$(): Observable<Array<HeaderColumn>> {
        return this._selectedHeaders$.asObservable();
    }

    protected initializeHeader(headerComponent: AbstractHeaderComponent): void {
        headerComponent.headerService.selectedHeaders$.subscribe(selectedHeaders => this._selectedHeaders$.next(selectedHeaders));
        if (!!this._sortableView) {
            this._sortableView.registerHeaderChange(headerComponent.headerService.headerChange$);
        }
    }

    ngOnDestroy(): void {
        this._selectedHeaders$.complete();
    }
}
