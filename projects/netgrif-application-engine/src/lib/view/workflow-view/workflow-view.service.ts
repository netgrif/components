import {Injectable} from '@angular/core';
import {SortableView} from '../abstract/sortable-view';
import {PetriNetResourceService} from '../../resources/engine-endpoint/petri-net-resource-service';
import {Observable, ReplaySubject} from 'rxjs';
import {PetriNetReference} from '../../resources/interface/petri-net-reference';


@Injectable({
    providedIn: 'root'
})
export class WorkflowViewService extends SortableView {

    private _workflows$: ReplaySubject<Array<PetriNetReference>>;

    constructor(public petriNetResourceService: PetriNetResourceService) {
        super();
        this._workflows$ = new ReplaySubject<Array<PetriNetReference>>(1);
    }

    public get workflows$(): Observable<Array<PetriNetReference>> {
        return this._workflows$.asObservable();
    }

    public reload(): void {
        // TODO 8.4.2020 - allow filtering of petri nets in workflow view
        this.petriNetResourceService.getAll().subscribe(petriNet => this._workflows$.next(petriNet.petriNetReferences));
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
