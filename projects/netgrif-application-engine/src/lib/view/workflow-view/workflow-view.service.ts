import {Injectable} from '@angular/core';
import {SortableView} from '../abstract/sortable-view';
import {PetriNetResourceService} from '../../resources/engine-endpoint/petri-net-resource-service';
import {Observable, of, ReplaySubject} from 'rxjs';
import {Net} from '../../process/net';
import {catchError, flatMap, map, tap} from 'rxjs/operators';
import {LoggerService} from '../../logger/services/logger.service';


@Injectable()
export class WorkflowViewService extends SortableView {

    private _workflows$: ReplaySubject<Array<Net>>;

    constructor(private _petriNetResource: PetriNetResourceService, private _log: LoggerService) {
        super();
        this._workflows$ = new ReplaySubject<Array<Net>>(1);
    }

    public get workflows$(): Observable<Array<Net>> {
        return this._workflows$.asObservable();
    }

    public reload(): void {
        // TODO 8.4.2020 - allow filtering of petri nets in workflow view
        this.loadNets().subscribe(petriNet => this._workflows$.next(petriNet));
    }

    protected getMetaFieldSortId(): string {
        // TODO 7.4.2020 - workflow sorting and searching
        return this._lastHeaderSearchState.fieldIdentifier;
    }

    protected getDefaultSortParam(): string {
        // TODO 7.4.2020 - workflow sorting and searching
        return '';
    }

    private loadNets(force = false): Observable<Array<Net>> {
            return this._petriNetResource.getAll().pipe(
                map( nets => {
                    if (nets instanceof Array) {
                        return nets.map( net => new Net(net));
                    }
                    return [];
                }),
                catchError(err => {
                    this._log.error('Failed to load Petri nets', err);
                    throw err;
                })
            );
        }

}
