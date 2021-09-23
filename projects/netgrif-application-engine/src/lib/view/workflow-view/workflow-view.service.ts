import {Inject, Injectable, OnDestroy, Optional} from '@angular/core';
import {SortableView} from '../abstract/sortable-view';
import {PetriNetResourceService} from '../../resources/engine-endpoint/petri-net-resource.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Net} from '../../process/net';
import {catchError, concatMap, map, mergeMap, scan, tap} from 'rxjs/operators';
import {LoggerService} from '../../logger/services/logger.service';
import {PetriNetReference} from '../../resources/interface/petri-net-reference';
import {HttpParams} from '@angular/common/http';
import {Pagination} from '../../resources/interface/pagination';
import {LoadingEmitter} from '../../utility/loading-emitter';
import {Page} from '../../resources/interface/page';
import {ListRange} from '@angular/cdk/collections';
import {hasContent} from '../../utility/pagination/page-has-content';
import {PetriNetRequestBody} from '../../resources/interface/petri-net-request-body';
import {NAE_WORKFLOW_SERVICE_CONFIRM_DELETE, NAE_WORKFLOW_SERVICE_FILTER} from './models/injection-token-workflow-service';
import {DialogService} from '../../dialog/services/dialog.service';
import {SnackBarService} from '../../snack-bar/services/snack-bar.service';
import {TranslateService} from '@ngx-translate/core';
import {arrayToObservable} from '../../utility/array-to-observable';
import {SearchIndexResolverService} from '../../search/search-keyword-resolver-service/search-index-resolver.service';


@Injectable()
export class WorkflowViewService extends SortableView implements OnDestroy {

    // TODO 19.10.2020 - Add support for requests with context (filter), same as Case- and TaskViewServices
    protected _loading$: LoadingEmitter;
    protected _workflows$: Observable<Array<Net>>;
    protected _clear: boolean;
    protected _nextPage$: BehaviorSubject<Pagination>;
    protected _endOfData: boolean;
    protected _pagination: Pagination;
    protected _baseFilter: PetriNetRequestBody;
    protected _showDeleteConfirmationDialog: boolean;

    constructor(protected _petriNetResource: PetriNetResourceService,
                protected _log: LoggerService,
                protected _dialogService: DialogService,
                protected _snackBarService: SnackBarService,
                protected _translate: TranslateService,
                resolver: SearchIndexResolverService,
                @Optional() @Inject(NAE_WORKFLOW_SERVICE_FILTER) injectedBaseFilter: PetriNetRequestBody,
                @Optional() @Inject(NAE_WORKFLOW_SERVICE_CONFIRM_DELETE) confirmDelete: boolean) {
        super(resolver);
        this._loading$ = new LoadingEmitter();
        this._clear = false;
        this._endOfData = false;
        this._pagination = {
            size: 25,
            totalElements: -1,
            totalPages: -1,
            number: -1
        };
        this._nextPage$ = new BehaviorSubject<Pagination>(
            Object.assign({}, this._pagination, {number: 0})
        );

        this._baseFilter = injectedBaseFilter !== null ? injectedBaseFilter : {};
        this._showDeleteConfirmationDialog = confirmDelete === null || confirmDelete;

        const workflowsMap = this._nextPage$.pipe(
            mergeMap(p => this.loadPage(p)),
            map(petriNets => {
                if (this._clear) {
                    // we set an empty value to the virtual scroll and then replace it by the real value forcing it to redraw its content
                    const results = [{content: [], stopLoading: false}, {content: petriNets, stopLoading: true}];
                    return arrayToObservable(results);
                } else {
                    return of({content: petriNets, stopLoading: true});
                }
            }),
            concatMap(o => o),
            map(o => {
                if (o.stopLoading) {
                    this._loading$.off();
                }
                return o.content;
            }),
            map(petriNets => {
                return petriNets.reduce((acc, cur) => {
                    return {...acc, [cur.stringId]: cur};
                }, {});
            }),
            scan((acc, petriNetsMap) => {
                if (this._clear) {
                    this._clear = false;
                    return {...petriNetsMap};
                }
                return {...acc, ...petriNetsMap};
            }, {})
        );

        this._workflows$ = workflowsMap.pipe(
            map(v => Object.values(v))
        );
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
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

        return this._petriNetResource.searchPetriNets(this._baseFilter, params).pipe(
            catchError(err => {
                this._log.error('Loading Petri nets has failed!', err);
                return of({content: [], pagination: {...this._pagination}});
            }),
            tap(res => {
                Object.assign(this._pagination, res.pagination);
            }),
            tap(res => {
                this._endOfData = !hasContent(res)
                    || res.pagination.number === res.pagination.totalPages - 1;
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
            })
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

    /**
     * Opens a dialog (if configured) and then asks the service to delete the selected workflow.
     * @param workflow the workflow that should be deleted
     */
    public deleteWorkflow(workflow: Net): void {
        if (this._showDeleteConfirmationDialog) {
            const confirmationText = this._translate.instant('workflow.delete').toUpperCase();

            this._dialogService.openPromptDialog(
                this._translate.instant('workflow.dialog.header', {name: workflow.title, version: workflow.version}),
                this._translate.instant('workflow.dialog.content'),
                this._translate.instant('workflow.dialog.typeToConfirm', {delete: confirmationText}))
                .afterClosed().subscribe(result => {
                if (result !== undefined && result.prompt === confirmationText) {
                    this._deleteWorkflow(workflow);
                } else {
                    this._snackBarService.openGenericSnackBar(this._translate.instant('workflow.snackBar.deleteCanceled'), 'info');
                }
            });
        } else {
            this._deleteWorkflow(workflow);
        }
    }

    /**
     * Sends the workflow delete to backend and processes the result.
     * @param workflow the workflow that should be deleted
     */
    protected _deleteWorkflow(workflow: Net): void {
        this._petriNetResource.deletePetriNet(workflow.stringId).subscribe(response => {
                this._snackBarService.openSuccessSnackBar(this._translate.instant('workflow.snackBar.deleteSuccess'));
                this._log.info('Process delete success. Server response: ' + response.success);
                this.reload();
            },
            error => {
                this._snackBarService.openErrorSnackBar(this._translate.instant('workflow.snackBar.deleteError'));
                this._log.error('Process delete failed. Server response: ' + error);
            }
        );
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
