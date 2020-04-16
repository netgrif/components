import {Injectable} from '@angular/core';
import {SortableView} from '../abstract/sortable-view';
import {Observable, ReplaySubject} from 'rxjs';
import {ProcessService} from '../../process/process.service';
import {Net} from '../../process/net';


@Injectable()
export class WorkflowViewService extends SortableView {

    private _workflows$: ReplaySubject<Array<Net>>;

    constructor(private _processService: ProcessService) {
        super();
        this._workflows$ = new ReplaySubject<Array<Net>>(1);
    }

    public get workflows$(): Observable<Array<Net>> {
        return this._workflows$.asObservable();
    }

    public reload(): void {
        // TODO 8.4.2020 - allow filtering of petri nets in workflow view
        this._processService.loadNets().subscribe(petriNet => this._workflows$.next(petriNet));
    }

    protected getMetaFieldSortId(): string {
        // TODO 7.4.2020 - workflow sorting and searching
        return this._lastHeaderSearchState.fieldIdentifier;
    }

    protected getDefaultSortParam(): string {
        // TODO 7.4.2020 - workflow sorting and searching
        return '';
    }

}
