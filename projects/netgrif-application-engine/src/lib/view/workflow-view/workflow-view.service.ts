import {Injectable, OnDestroy} from '@angular/core';
import {SortableView} from '../abstract/sortable-view';
import {PetriNetResourceService} from '../../resources/engine-endpoint/petri-net-resource.service';
import {BehaviorSubject, Observable, of, timer} from 'rxjs';
import {Net} from '../../process/net';
import {catchError, concatMap, map, mergeMap, scan, take, tap} from 'rxjs/operators';
import {LoggerService} from '../../logger/services/logger.service';
import {PetriNetReference} from '../../resources/interface/petri-net-reference';
import {HttpParams} from '@angular/common/http';
import {Pagination} from '../../resources/interface/pagination';
import {LoadingEmitter} from '../../utility/loading-emitter';
import {hasContent} from 'netgrif-application-engine';
import {Page} from '../../resources/interface/page';
import {ListRange} from '@angular/cdk/collections';


@Injectable()
export class WorkflowViewService extends SortableView implements OnDestroy {

    // TODO 19.10.2020 - Add support for requests with context (filter), same as Case- and TaskViewServices
    protected _loading$: LoadingEmitter;
    protected _workflows$: Observable<Array<Net>>;
    protected _clear: boolean;
    protected _nextPage$: BehaviorSubject<Pagination>;
    protected _endOfData: boolean;
    protected _pagination: Pagination;

    constructor(private _petriNetResource: PetriNetResourceService, private _log: LoggerService) {
        super();
        this._loading$ = new LoadingEmitter();
        this._clear = false;
        this._endOfData = false;
        this._pagination = {
            size: 25,
            totalElements: undefined,
            totalPages: undefined,
            number: -1
        };
        this._nextPage$ = new BehaviorSubject<Pagination>(
            Object.assign({}, this._pagination, {number: 0})
        );

        const workflowsMap = this._nextPage$.pipe(
            mergeMap(p => this.loadPage(p)),
            map(petriNets => {
                if (this._clear) {
                    this._clear = false;
                    // we set an empty value to the virtual scroll and then replace it by the real value forcing it to redraw its content
                    const results = [[], petriNets];
                    return timer(0, 1).pipe(take(2), map(i => results[i]));
                } else {
                    return of(petriNets);
                }
            }),
            concatMap(o => o),
            map(petriNets => {
                return petriNets.reduce((acc, cur) => {
                    return {...acc, [cur.stringId]: cur};
                }, {});
            }),
            scan((acc, petriNetsMap) => {
                return {...acc, ...petriNetsMap};
            }, {})
        );

        this._workflows$ = workflowsMap.pipe(
            map(v => Object.values(v))
        );
    }

    ngOnDestroy(): void {
        this._loading$.complete();
        this._nextPage$.complete();
    }

    public get loading(): boolean {
        return this._loading$.isActive;
    }

    public get loading$(): Observable<boolean> {
        return this._loading$.asObservable();
    }

    public get workflows$(): Observable<Array<Net>> {
        return this._workflows$;
    }

    public loadPage(pageRequest: Pagination): Observable<Array<Net>> {
        if (pageRequest.number < 0) {
            return of([]);
        }
        let params: HttpParams = new HttpParams();
        params = this.addSortParams(params);
        params = this.addPageParams(params, pageRequest);
        this._loading$.on();

        return this._petriNetResource.searchPetriNets({}, params).pipe(
            catchError(err => {
                this._log.error('Loading Petri nets has failed!', err);
                return of({content: [], pagination: {...this._pagination}});
            }),
            tap(res => {
                Object.assign(this._pagination, res.pagination);
            }),
            tap(res => {
                this._endOfData = !hasContent(res)
                    || res.pagination.number === res.pagination.totalPages;
            }),
            map((netsPage: Page<PetriNetReference>) => {
                if (hasContent(netsPage)) {
                    const array: Array<Net> = [];
                    netsPage.content.forEach(net => {
                        array.push(new Net(net));
                    });
                    return array;
                }
                return [];
            }),
            tap(() => this._loading$.off())
        );
    }

    public nextPage(renderedRange: ListRange, totalLoaded: number, pagination?: Pagination) {
        if (this._endOfData) {
            return;
        }

        if (renderedRange.end === totalLoaded) {
            let p = pagination;
            if (p === undefined) {
                p = Object.assign({}, this._pagination);
                p.number += 1;
            }
            this._nextPage$.next(p);
        }
    }

    public reload(): void {
        if (!this._workflows$ || !this._pagination) {
            return;
        }

        this._endOfData = false;
        this._clear = true;
        const p = Object.assign({}, this._pagination);
        p.number = 0;
        const range = {
            start: -1,
            end: 0
        };
        this.nextPage(range, 0, p);
    }

    protected getMetaFieldSortId(): string {
        return this._lastHeaderSearchState.fieldIdentifier;
    }

    protected getDefaultSortParam(): string {
        // TODO 7.4.2020 - workflow sorting and searching
        return '';
    }

    protected addSortParams(params: HttpParams): HttpParams {
        if (this._lastHeaderSearchState.sortDirection !== '') {
            return params.set('sort', `${this.getSortId()},${this._lastHeaderSearchState.sortDirection}`);
        } else {
            return params.set('sort', this.getDefaultSortParam());
        }
    }

    protected addPageParams(params: HttpParams, pagination: Pagination): HttpParams {
        params = params.set('size', pagination.size + '');
        params = params.set('page', pagination.number + '');
        return params;
    }

}
