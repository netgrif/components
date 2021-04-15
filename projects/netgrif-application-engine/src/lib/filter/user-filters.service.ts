import {Inject, Injectable, OnDestroy, Optional} from '@angular/core';
import {Observable, of, ReplaySubject, Subject} from 'rxjs';
import {CaseResourceService} from '../resources/engine-endpoint/case-resource.service';
import {TaskResourceService} from '../resources/engine-endpoint/task-resource.service';
import {SearchService} from '../search/search-service/search.service';
import {ProcessService} from '../process/process.service';
import {LoggerService} from '../logger/services/logger.service';
import {filter, take} from 'rxjs/operators';
import {SimpleFilter} from './models/simple-filter';
import {hasContent} from '../utility/pagination/page-has-content';
import {Task} from '../resources/interface/task';
import {CallChainService} from '../utility/call-chain/call-chain.service';
import {TaskSetDataRequestBody} from '../resources/interface/task-set-data-request-body';
import {FieldTypeResource} from '../task-content/model/field-type-resource';
import {Category} from '../search/models/category/category';
import {Net} from '../process/net';
import {UserFilterConstants} from './models/user-filter-constants';
import {SideMenuSize} from '../side-menu/models/side-menu-size';
import {SaveFilterInjectionData} from '../side-menu/content-components/save-filter/model/save-filter-injection-data';
import {SideMenuService} from '../side-menu/services/side-menu.service';
import {NAE_LOAD_FILTER_COMPONENT, NAE_SAVE_FILTER_COMPONENT} from '../side-menu/content-components/injection-tokens';
import {ComponentType} from '@angular/cdk/portal';
import {LoadFilterInjectionData} from '../side-menu/content-components/load-filter/model/load-filter-injection-data';
import {FilterType} from './models/filter-type';

/**
 * Service that manages filters created by users of the application.
 */
@Injectable({
    providedIn: 'root'
})
export class UserFiltersService implements OnDestroy {

    protected _initialized$: ReplaySubject<boolean>;
    protected _filterNet: Net;

    constructor(protected _caseService: CaseResourceService,
                protected _taskService: TaskResourceService,
                protected _processService: ProcessService,
                protected _callChainService: CallChainService,
                protected _sideMenuService: SideMenuService,
                protected _log: LoggerService,
                @Optional() @Inject(NAE_SAVE_FILTER_COMPONENT) protected _saveFilterComponent: ComponentType<unknown>,
                @Optional() @Inject(NAE_LOAD_FILTER_COMPONENT) protected _loadFilterComponent: ComponentType<unknown>) {
        this._initialized$ = new ReplaySubject<boolean>(1);
        this._processService.getNet(UserFilterConstants.FILTER_NET_IDENTIFIER).subscribe(net => {
            this._filterNet = net;
            this._initialized$.next(true);
        }, error => {
            this._log.error(`Filter net could not be loaded with error`, error);
            this._initialized$.next(false);
        });
    }

    ngOnDestroy(): void {
        this._initialized$.complete();
    }

    /**
     * Deletes the specified filter case by its case id.
     * @param filterCaseId StringId of the filter case that should be deleted
     * @returns an Observable that emits `true` if the case was successfully deleted and `false` otherwise
     */
    public delete(filterCaseId: string): Observable<boolean> {
        const result$ = new ReplaySubject<boolean>(1);
        this._caseService.deleteCase(filterCaseId).subscribe(response => {
            if (response.success) {
                this._log.debug('Filter case delete success', response);
                result$.next(true);
                result$.complete();
            } else {
                this._log.error('Filter case delete failure', response);
                result$.next(false);
                result$.complete();
            }
        }, e => {
            this._log.error('Filter case delete error', e);
            result$.next(false);
            result$.complete();
        });
        return result$.asObservable();
    }

    /**
     * Opens a side menu with filter cases and allows the user to select one of them.
     *
     * @returns an Observable that emits the data necessary to reconstruct the selected filter, or `undefined` if no filter was selected
     */
    public load(filterType: FilterType): Observable<any> {
        const result = new ReplaySubject<any>(1);
        const ref = this._sideMenuService.open(this._loadFilterComponent, SideMenuSize.LARGE, {
            filter: SimpleFilter.fromCaseQuery({
                process: {
                    identifier: UserFilterConstants.FILTER_NET_IDENTIFIER
                },
                data: {
                    [UserFilterConstants.FILTER_TYPE_FIELD_ID]: filterType
                }
            })
        } as LoadFilterInjectionData);
        ref.onClose.pipe(filter(e => !e.opened), take(1)).subscribe(event => {
            if (event.message === 'Side menu closed unexpectedly') {
                result.next(undefined);
            } else {
                result.next(event.data);
            }
            result.complete();
        });
        return result.asObservable();
    }

    /**
     * Saves the predicate filter contained in the provided {@link SearchService} instance.
     *
     * The base filter of the search service is not saved.
     *
     * A new filter case is created and the necessary filter information is set into it.
     *
     * Then a side menu with the filter is opened for the user to enter the name and other properties.
     * The user can confirm or cancel the save by finishing the task in the side menu, or by canceling/closing.
     *
     * @param searchService search service containing a predicate filter, we want to save
     * @param allowedNets allowed nets of the view, that contains the search service
     * @param searchCategories search categories available in the saved advanced search component
     * @param viewId the viewId of the view which contained the filter
     * @returns an observable that emits the id of the created Filter case instance or `undefined` if the user canceled the save process,
     * or the filter could not be saved
     */
    public save(searchService: SearchService, allowedNets: readonly string[],
                searchCategories: readonly Category<any>[], viewId: string): Observable<string> {
        if (!searchService.additionalFiltersApplied) {
            this._log.warn('The provided SearchService contains no filter besides the base filter. Nothing to save.');
            return of(undefined);
        }

        const result = new ReplaySubject<string>(1);
        this.createFilterCaseAndSetData(searchService, allowedNets, searchCategories, viewId).subscribe(filterCaseId => {
            const ref = this._sideMenuService.open(this._saveFilterComponent, SideMenuSize.LARGE, {
                newFilterCaseId: filterCaseId
            } as SaveFilterInjectionData);
            ref.onClose.pipe(filter(e => !e.opened), take(1)).subscribe(event => {
                if (event.message === 'Side menu closed unexpectedly') {
                    this.delete(filterCaseId);
                    result.next(undefined);
                } else {
                    result.next(filterCaseId);
                }
                result.complete();
            });
        });
        return result.asObservable();
    }

    /**
     * Saves the predicate filter contained in the provided {@link SearchService} instance.
     *
     * The base filter of the search service is not saved.
     *
     * A new filter case is created and the necessary filter information is set into it.
     *
     * @param searchService search service containing a predicate filter, we want to save
     * @param allowedNets allowed nets of the view, that contains the search service
     * @param searchCategories search categories available in the saved advanced search component
     * @param viewId the viewId of the view which contained the filter
     * @returns an observable that emits the id of the created Filter case instance
     */
    public createFilterCaseAndSetData(searchService: SearchService, allowedNets: readonly string[],
                                      searchCategories: readonly Category<any>[], viewId: string): Observable<string> {
        const result = new ReplaySubject<string>(1);
        this.whenInitialized(() => {
            this._caseService.createCase({
                title: this._filterNet.defaultCaseName,
                netId: this._filterNet.stringId
            }).subscribe(filterCase => {
                this._taskService.getTasks(SimpleFilter.fromTaskQuery({case: {id: filterCase.stringId}})).subscribe(page => {
                    if (!hasContent(page)) {
                        throw new Error('Expected filter process to contain tasks, but none were found!');
                    }

                    const initTask = page.content[0];
                    this.assignSetDataFinish(initTask, {
                        [UserFilterConstants.FILTER_TYPE_FIELD_ID]: {
                            type: FieldTypeResource.ENUMERATION_MAP,
                            value: searchService.filterType
                        },
                        [UserFilterConstants.FILTER_FIELD_ID]: {
                            type: FieldTypeResource.FILTER,
                            value: searchService.rootPredicate.query.value,
                            allowedNets,
                            filterMetadata: {
                                filterType: searchService.filterType,
                                predicateMetadata: searchService.createPredicateMetadata(),
                                searchCategories: searchCategories.map(c => c.serializeClass())
                            }
                        },
                        [UserFilterConstants.ORIGIN_VIEW_ID_FIELD_ID]: {
                            type: FieldTypeResource.TEXT,
                            value: viewId
                        }
                    }, this._callChainService.create(success => {
                        if (!success) {
                            throw new Error('Filter instance could not be initialized');
                        }

                        result.next(filterCase.stringId);
                        result.complete();
                    }));
                });
            });
        }, 'saveWithSideMenu');
        return result.asObservable();
    }

    protected whenInitialized(onSuccess: () => void,
                              method?: string,
                              onFailure: () => void = () => {
                                  this._log.error(`UserFilterService failed to initialize and the called method${
                                      method ? ' (' + method + ')' : ''
                                  } cannot be performed`);
                              }) {
        this._initialized$.asObservable().pipe(take(1)).subscribe(initialized => {
            initialized ? onSuccess() : onFailure();
        });
    }

    // TODO 6.4.2021 IMPROVEMENT - extract similar method into some utility service
    protected assignSetDataFinish(task: Task, data: TaskSetDataRequestBody, callChain: Subject<boolean>): void {
        this._taskService.assignTask(task.stringId).subscribe(assignOutcome => {
            if (assignOutcome.error) {
                this._log.error(`Could not assign task '${task.title}'`, task, assignOutcome.error);
                callChain.next(false);
            }

            this._taskService.setData(task.stringId, data).subscribe(() => {
                this._taskService.finishTask(task.stringId).subscribe(finishOutcome => {
                    if (finishOutcome.error) {
                        this._log.error(`Could not finish task '${task.title}'`, task, finishOutcome.error);
                        callChain.next(false);
                    }

                    callChain.next(true);
                }, error => {
                    this._log.error(`Could not finish task '${task.title}'`, task, error);
                    callChain.next(false);
                });
            }, error => {
                this._log.error(`Could not set data of task '${task.title}'`, task, data, error);
                callChain.next(false);
            });
        }, error => {
            this._log.error(`Could not assign task '${task.title}'`, task, error);
            callChain.next(false);
        });
    }
}
