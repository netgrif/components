import {Injectable} from '@angular/core';
import {SortableView} from '../abstract/sortable-view';
import {PetriNetResourceService} from '../../resources/engine-endpoint/petri-net-resource.service';
import {BehaviorSubject, Observable, of, timer} from 'rxjs';
import {Net} from '../../process/net';
import {catchError, concatMap, map, tap} from 'rxjs/operators';
import {LoggerService} from '../../logger/services/logger.service';
import {PetriNetReference} from '../../resources/interface/petri-net-reference';
import {HttpParams} from '@angular/common/http';


@Injectable()
export class WorkflowViewService extends SortableView {

    private _loading$: BehaviorSubject<boolean>;
    private _workflows$: Observable<Array<Net>>;
    private _loadBatch$: BehaviorSubject<number>;
    private _clear: boolean;

    constructor(private _petriNetResource: PetriNetResourceService, private _log: LoggerService) {
        super();
        this._loading$ = new BehaviorSubject<boolean>(null);
        this._loadBatch$ = new BehaviorSubject<number>(null);
        this._clear = false;

        this._workflows$ = this._loadBatch$.pipe(
            concatMap(n => this.loadNets()),
            tap(_ => this._clear = false),
        );
    }

    public get loading(): boolean {
        return this._loading$.getValue();
    }

    public get loading$(): Observable<boolean> {
        return this._loading$.asObservable();
    }

    public get workflows$(): Observable<Array<Net>> {
        return this._workflows$;
    }

    public loadBatch() {
        this._loadBatch$.next(this._loadBatch$.getValue() === 0 ? 1 : 0);
    }

    public reload(): void {
        // TODO 8.4.2020 - allow filtering of petri nets in workflow view
        if (!this._workflows$) {
            return;
        }

        this._clear = true;
        this.loadBatch();
        timer(100).subscribe(_ => this.loadBatch());
    }

    protected getMetaFieldSortId(): string {
        return this._lastHeaderSearchState.fieldIdentifier;
    }

    protected getDefaultSortParam(): string {
        // TODO 7.4.2020 - workflow sorting and searching
        return '';
    }

    private loadNets(): Observable<Array<Net>> {
        if (this.loading || this._clear) {
            return of([]);
        }

        let params: HttpParams = new HttpParams();
        params = this.addSortParams(params);

        this._loading$.next(true);
        return this._petriNetResource.searchPetriNets({}, params).pipe(
            catchError(err => {
                this._log.error('Failed to load Petri nets', err);
                return of([]);
            }),
            map((nets: Array<PetriNetReference>) => {
                    if (Array.isArray(nets)) {
                        const array: Array<Net> = [];
                        nets.forEach(net => {
                            array.push(new Net(net));
                        });
                        return array;
                    }
                    return [];
            }),
            tap(_ =>
                this._loading$.next(false)
            )
        );
    }

    protected addSortParams(params: HttpParams): HttpParams {
        if (this._lastHeaderSearchState.sortDirection !== '') {
            return params.set('sort', `${this.getSortId()},${this._lastHeaderSearchState.sortDirection}`);
        } else {
            return params.set('sort', this.getDefaultSortParam());
        }
    }

}
