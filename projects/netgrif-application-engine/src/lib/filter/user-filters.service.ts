import {Injectable, OnDestroy} from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs';
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
import {TaskSetDataRequestBody} from '../resources/interface/task-set-data-request-body';
import {FieldTypeResource} from '../task-content/model/field-type-resource';

/**
 * Service that manages filters created by users of the application.
 */
@Injectable({
    providedIn: 'root'
})
export class UserFiltersService implements OnDestroy {

    protected static readonly FILTER_NET_IDENTIFIER = 'filter';

    protected _initialized$: ReplaySubject<boolean>;
    protected _filterNetId: string;

    constructor(protected _caseService: CaseResourceService,
                protected _taskService: TaskResourceService,
                protected _processService: ProcessService,
                protected _callChainService: CallChainService,
                protected _log: LoggerService) {
        this._initialized$ = new ReplaySubject<boolean>(1);
        this._processService.getNet(UserFiltersService.FILTER_NET_IDENTIFIER).subscribe(net => {
            this._filterNetId = net.stringId;
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
     * Saves the predicate filter contained in the provided {@link SearchService} instance.
     *
     * The base filter of the search service is not saved.
     *
     * @param searchService search service containing a predicate filter, we want to save
     * @param allowedNets allowed nets of the view, that contains the search service
     * @returns an observable that emits the id of the created Filter case instance
     */
    public save(searchService: SearchService, allowedNets: readonly string[]): Observable<string> {
        const result = new ReplaySubject<string>(1);
        this.whenInitialized( () => {
            this._caseService.createCase({netId: this._filterNetId}).subscribe(filterCase => {
                this._taskService.getTasks(SimpleFilter.fromTaskQuery({case: {id: filterCase.stringId}})).subscribe(page => {
                    if (!hasContent(page)) {
                        throw new Error('Expected filter process to contain tasks, but none were found!');
                    }

                    const initTask = page.content[0];
                    this.assignSetDataFinish(initTask, {
                            filter_type: {
                                type: FieldTypeResource.ENUMERATION_MAP,
                                value: searchService.filterType
                            },
                            filter: {
                                type: FieldTypeResource.FILTER,
                                value: searchService.rootPredicate.query.value,
                                allowedNets,
                                filterMetadata: searchService.createMetadata()
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
