import {Inject, Injectable, OnDestroy, Optional, Type} from '@angular/core';
import {Observable, of, ReplaySubject, Subject} from 'rxjs';
import {CaseResourceService} from '../resources/engine-endpoint/case-resource.service';
import {TaskResourceService} from '../resources/engine-endpoint/task-resource.service';
import {SearchService} from '../search/search-service/search.service';
import {ProcessService} from '../process/process.service';
import {LoggerService} from '../logger/services/logger.service';
import {take} from 'rxjs/operators';
import {SimpleFilter} from './models/simple-filter';
import {hasContent} from '../utility/pagination/page-has-content';
import {Task} from '../resources/interface/task';
import {CallChainService} from '../utility/call-chain/call-chain.service';
import {FieldTypeResource} from '../task-content/model/field-type-resource';
import {Category} from '../search/models/category/category';
import {Net} from '../process/net';
import {UserFilterConstants} from './models/user-filter-constants';
import {SaveFilterInjectionData} from '../side-menu/content-components/save-filter/model/save-filter-injection-data';
import {SideMenuService} from '../side-menu/services/side-menu.service';
import {ComponentType} from '@angular/cdk/portal';
import {LoadFilterInjectionData} from '../side-menu/content-components/load-filter/model/load-filter-injection-data';
import {FilterType} from './models/filter-type';
import {Filter} from './models/filter';
import {MergeOperator} from './models/merge-operator';
import {SavedFilterMetadata} from '../search/models/persistance/saved-filter-metadata';
import {FilterMetadata} from '../search/models/persistance/filter-metadata';
import {CreateCaseEventOutcome} from '../event/model/event-outcomes/case-outcomes/create-case-event-outcome';
import {CategoryResolverService} from '../search/category-factory/category-resolver.service';
import {DataGroup} from '../resources/interface/data-groups';
import {getFieldFromDataGroups} from '../utility/get-field';
import {EventOutcomeMessageResource} from '../resources/interface/message-resource';
import {MatDialog} from '@angular/material/dialog';
import {NAE_LOAD_FILTER_DIALOG_COMPONENT, NAE_SAVE_FILTER_DIALOG_COMPONENT} from '../dialog/injection-tokens';
import {DataSet, TaskDataSets} from '../resources/interface/task-data-sets';
import {DataFieldResource, DataFieldValue} from '../task-content/model/resource-interfaces';

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
                protected _categoryResolverService: CategoryResolverService,
                protected _dialog: MatDialog,
                @Optional() @Inject(NAE_SAVE_FILTER_DIALOG_COMPONENT) protected _saveFilterComponent: ComponentType<unknown>,
                @Optional() @Inject(NAE_LOAD_FILTER_DIALOG_COMPONENT) protected _loadFilterComponent: ComponentType<unknown>) {
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
        this._caseService.deleteCase(filterCaseId).subscribe((response: EventOutcomeMessageResource) => {
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
     * The default filter constrains the cases to be instances of the filter process and to be filters of the specified type
     * (`Case` or `Task`).
     *
     * @param filterType whether `Case` or `Task` user filters should be loaded
     * @param additionalFilter additional constrains on the displayed user filter cases. Must be of type `Case`
     * otherwise the method throws an error. If it is a {@link MergedFilter} must use the `AND` {@link MergeOperator} otherwise an error
     * will be thrown
     * @returns an Observable that emits the data necessary to reconstruct the selected filter, or `undefined` if no filter was selected
     */
    public load(filterType: FilterType, additionalFilter?: Filter): Observable<any> {
        if (additionalFilter?.type === FilterType.TASK) {
            this._log.error('The additional filter applied to UserFiltersService.load() must be of type Case', additionalFilter);
            throw Error('The additional filter applied to UserFiltersService.load() must be of type Case');
        }

        let filterCasesFilter = SimpleFilter.fromCaseQuery({
            process: {
                identifier: UserFilterConstants.FILTER_NET_IDENTIFIER
            },
            query: `dataSet.${UserFilterConstants.FILTER_TYPE_FIELD_ID}.keyValue:${filterType}`
        });
        if (!!additionalFilter) {
            filterCasesFilter = filterCasesFilter.merge(additionalFilter, MergeOperator.AND);
        }

        const result = new ReplaySubject<any>(1);
        const ref = this._dialog.open(this._loadFilterComponent, {
            panelClass: "dialog-responsive",
            data: {
                filter: filterCasesFilter
            } as LoadFilterInjectionData,
        });
        ref.afterClosed().subscribe(event => {
            if (event.message === 'Side menu closed unexpectedly') {
                result.next();
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
     * @param viewId the viewId of the view which contained the filter.
     * If neither the `viewId` nor the `navigationItemTaskData` attribute is set the filter will be created as a new root filter
     * without any parent filter link. This will most likely result in the filter being less restrictive than what
     * the user sees in the current view, since the base filter of the view will NOT be saved alongside the saved filter.
     * @param additionalData set data request body, that is sent to the filter in addition to the default body.
     * The default body is applied first and can be overridden by this argument.
     * @param withDefaultCategories Whether the saved filter should be saved with
     * the [defaultSearchCategories]{@link FilterMetadata#defaultSearchCategories} flag set to `true`, or `false`.
     * @param inheritAllowedNets Whether the saved filter should merge its allowed nets with the allowed nets provided by
     * the {@link BaseAllowedNetsService}.
     * @param navigationItemTaskData if provided then it implies the filter has a parent filter that created its host dynamic view.
     * If this is the case the case ID of the parent filter will be set into the newly created filter case.
     * If not set it implies this is a filter originating in an in-app view and its view id will be set into the created filter.
     * @returns an observable that emits the id of the created Filter case instance or `undefined` if the user canceled the save process,
     * or the filter could not be saved
     */
    public save(searchService: SearchService,
                allowedNets: ReadonlyArray<string>,
                searchCategories: ReadonlyArray<Type<Category<any>>>,
                viewId?: string,
                additionalData: DataSet = { fields: {} } as DataSet,
                withDefaultCategories = true,
                inheritAllowedNets = true,
                navigationItemTaskData: Array<DataGroup> = null): Observable<SavedFilterMetadata> {
        if (!searchService.additionalFiltersApplied) {
            this._log.warn('The provided SearchService contains no filter besides the base filter. Nothing to save.');
            return of(undefined);
        }

        const result = new ReplaySubject<SavedFilterMetadata>(1);
        this.createFilterCaseAndSetData(
            searchService,
            allowedNets,
            searchCategories,
            viewId,
            additionalData,
            withDefaultCategories,
            inheritAllowedNets,
            navigationItemTaskData
        ).subscribe(filterCaseId => {
            const ref = this._dialog.open(this._saveFilterComponent, {
                panelClass: "dialog-responsive",
                data: {
                    newFilterCaseId: filterCaseId
                } as SaveFilterInjectionData,
            });
            ref.afterClosed().subscribe(event => {
                if (event.message === 'Side menu closed unexpectedly') {
                    this.delete(filterCaseId);
                    result.next();
                } else {
                    result.next({
                        filterCaseId,
                        allowedNets: [...allowedNets],
                        originViewId: viewId,
                        filterMetadata: this.filterMetadataFromSearchService(
                            searchService,
                            searchCategories,
                            withDefaultCategories,
                            inheritAllowedNets
                        ),
                        filter: SimpleFilter.fromQuery({query: searchService.rootPredicate.query.value}, searchService.filterType)
                    });
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
     * @param viewId the viewId of the view which contained the filter.
     * If neither the `viewId` nor the `navigationItemTaskData` attribute is set the filter will be created as a new root filter
     * without any parent filter link. This will most likely result in the filter being less restrictive than what
     * the user sees in the current view, since the base filter of the view will NOT be saved alongside the saved filter.
     * @param additionalData set data request body, that is sent to the filter in addition to the default body.
     * The default body is applied first and can be overridden by this argument.
     * @param withDefaultCategories Whether the saved filter should be saved with
     * the [defaultSearchCategories]{@link FilterMetadata#defaultSearchCategories} flag set to `true`, or `false`.
     * @param inheritAllowedNets Whether the saved filter should merge its allowed nets with the allowed nets provided by
     * the {@link BaseAllowedNetsService}.
     * @param navigationItemTaskData if provided then it implies the filter has a parent filter that created its host dynamic view.
     * If this is the case the case ID of the parent filter will be set into the newly created filter case.
     * If not set it implies this is a filter originating in an in-app view and its view id will be set into the created filter.
     * @returns an observable that emits the id of the created Filter case instance
     */
    public createFilterCaseAndSetData(searchService: SearchService,
                                      allowedNets: ReadonlyArray<string>,
                                      searchCategories: ReadonlyArray<Type<Category<any>>>,
                                      viewId?: string,
                                      additionalData: DataSet = { fields: {} } as DataSet,
                                      withDefaultCategories = true,
                                      inheritAllowedNets = true,
                                      navigationItemTaskData: Array<DataGroup> = null): Observable<string> {
        const result = new ReplaySubject<string>(1);
        this.whenInitialized(() => {
            this._caseService.createCase({
                title: this._filterNet.defaultCaseName,
                netId: this._filterNet.stringId
            }).subscribe(filterCase => {
                this._taskService.getTasks(SimpleFilter.fromTaskQuery({
                    case: {
                        id: (filterCase.outcome as CreateCaseEventOutcome).case.stringId
                    }
                })).subscribe(page => {
                    if (!hasContent(page)) {
                        throw new Error('Expected filter process to contain tasks, but none were found!');
                    }

                    const initTask = page.content.find(task => task.transitionId === UserFilterConstants.SET_FILTER_METADATA_TRANSITION_ID);
                    if (initTask === undefined) {
                        throw new Error(`Expected filter process to contain task '${UserFilterConstants.SET_FILTER_METADATA_TRANSITION_ID
                        }', but none was found!`);
                    }

                    const requestBody = {
                        fields: {
                            [UserFilterConstants.FILTER_TYPE_FIELD_ID]: {
                                stringId: UserFilterConstants.FILTER_TYPE_FIELD_ID,
                                type: FieldTypeResource.ENUMERATION_MAP,
                                value: {
                                    value: searchService.filterType
                                } as DataFieldValue
                            } as DataFieldResource,
                            [UserFilterConstants.FILTER_FIELD_ID]: {
                                type: FieldTypeResource.FILTER,
                                value: {
                                    value: searchService.rootPredicate.query.value
                                } as DataFieldValue,
                                allowedNets,
                                filterMetadata: this.filterMetadataFromSearchService(
                                    searchService,
                                    searchCategories,
                                    withDefaultCategories,
                                    inheritAllowedNets
                                )
                            } as DataFieldResource,
                        }
                    } as DataSet;

                    let parentFilterCaseIdField;
                    if (navigationItemTaskData !== null && navigationItemTaskData !== undefined) {
                        parentFilterCaseIdField = getFieldFromDataGroups(navigationItemTaskData,
                            UserFilterConstants.FILTER_CASE_ID_FIELD_ID);
                    }

                    if (parentFilterCaseIdField !== undefined) {
                        requestBody[UserFilterConstants.PARENT_FILTER_CASE_ID_FIELD_ID] = {
                            type: FieldTypeResource.TEXT,
                            value: {
                                value: parentFilterCaseIdField.value
                            } as DataFieldValue
                        } as DataFieldResource;
                    } else if (viewId !== undefined || viewId !== '') {
                        requestBody[UserFilterConstants.ORIGIN_VIEW_ID_FIELD_ID] = {
                            type: FieldTypeResource.TEXT,
                            value: {
                                value: viewId
                            } as DataFieldValue
                        } as DataFieldResource;
                    }

                    this.assignSetDataFinish(initTask, {
                        body: {
                            [initTask.stringId]: {
                                ...requestBody,
                                ...additionalData
                            } as DataSet
                        }
                    } as TaskDataSets, this._callChainService.create(success => {
                        if (!success) {
                            throw new Error('Filter instance could not be initialized');
                        }

                        result.next((filterCase.outcome as CreateCaseEventOutcome).case.stringId);
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
    protected assignSetDataFinish(task: Task, data: TaskDataSets, callChain: Subject<boolean>): void {
        this._taskService.assignTask(task.stringId).subscribe(assignOutcome => {
            if (assignOutcome.error) {
                this._log.error(`Could not assign task '${task.title}'`, task, assignOutcome.error);
                callChain.next(false);
                return;
            }

            this._taskService.setData(task.stringId, data).subscribe(() => {
                this._taskService.finishTask(task.stringId).subscribe(finishOutcome => {
                    if (finishOutcome.error) {
                        this._log.error(`Could not finish task '${task.title}'`, task, finishOutcome.error);
                        callChain.next(false);
                        return;
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

    protected filterMetadataFromSearchService(searchService: SearchService,
                                              searchCategories: ReadonlyArray<Type<Category<any>>>,
                                              withDefaultCategories: boolean,
                                              inheritAllowedNets: boolean): FilterMetadata {
        return {
            filterType: searchService.filterType,
            predicateMetadata: searchService.createPredicateMetadata(),
            searchCategories: searchCategories.map(c => this._categoryResolverService.serialize(c)),
            defaultSearchCategories: withDefaultCategories,
            inheritAllowedNets
        };
    }
}
