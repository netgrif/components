import {Component, Inject, Input, OnDestroy} from '@angular/core';
import {TaskRefDashboardTile} from '../../model/task-ref-dashboard-tile';
import {CaseResourceService} from '../../../../resources/engine-endpoint/case-resource.service';
import {TaskRefField} from '../../model/task-ref-field';
import {TaskRefDashboardConstants} from '../../model/task-ref-dashboard-constants';
import {TaskRefDashboardTileConstants} from '../../model/task-ref-dashboard-tile-constants';
import {Subject, Subscription} from 'rxjs';
import {ProcessService} from '../../../../process/process.service';
import {switchMap} from 'rxjs/operators';
import {CreateCaseEventOutcome} from '../../../../event/model/event-outcomes/case-outcomes/create-case-event-outcome';
import {FormControl} from '@angular/forms';
import {LoggerService} from '../../../../logger/services/logger.service';
import {TaskResourceService} from '../../../../resources/engine-endpoint/task-resource.service';
import {CallChainService} from '../../../../utility/call-chain/call-chain.service';
import {FieldTypeResource} from '../../../../task-content/model/field-type-resource';
import {TaskContentService} from '../../../../task-content/services/task-content.service';
import {TaskOperations} from '../../../../task/interfaces/task-operations';
import {NAE_TASK_OPERATIONS} from '../../../../task/models/task-operations-injection-token';
import {TaskDataService} from '../../../../task/services/task-data.service';
import {AfterAction} from '../../../../utility/call-chain/after-action';
import {DataSet, TaskDataSets} from '../../../../resources/interface/task-data-sets';
import {DataFieldResource, DataFieldValue} from '../../../../task-content/model/resource-interfaces';

@Component({
    selector: 'ncc-abstract-task-ref-dashboard-tile',
    template: '',
})
export abstract class AbstractTaskRefDashboardTileComponent implements OnDestroy {

    @Input() tile: TaskRefDashboardTile;
    @Input() taskRef: TaskRefField;
    @Input() fc: FormControl;

    private _sub: Subscription;
    private caseCreating = false;

    protected constructor(protected _caseResourceService: CaseResourceService,
                          protected _processService: ProcessService,
                          protected _logger: LoggerService,
                          protected _taskResourceService: TaskResourceService,
                          protected _callChainService: CallChainService,
                          protected _parentTaskContentService: TaskContentService,
                          protected _taskDataService: TaskDataService,
                          @Inject(NAE_TASK_OPERATIONS) protected _taskOperations: TaskOperations) {
    }

    ngOnDestroy(): void {
        if (this._sub !== undefined) {
            this._sub.unsubscribe();
        }
    }

    public createNewDashboardTile(): void {
        if (this.caseCreating) {
            return;
        }
        this.caseCreating = true;
        this._sub = this._processService.getNet(TaskRefDashboardTileConstants.DASHBOARD_TILE_PROCESS_IDENTIFIER).pipe(
            switchMap(net => this._caseResourceService.createCase({
                netId: net.stringId,
                title: `tile (${this.tile.x}, ${this.tile.y})`
            }))
        ).subscribe(outcome => {
            if (outcome.error) {
                this._logger.error(`Could not create task ref dashboard tile case`, outcome.error);
                return;
            }
            const _case = (outcome.outcome as CreateCaseEventOutcome).case;

            // set tile info
            this.assignSetData(_case.tasks[0].task, {
                body: {
                    [_case.tasks[0].task]: {
                        fields: {
                            [TaskRefDashboardTileConstants.DASHBOARD_TILE_X]: {
                                type: FieldTypeResource.NUMBER,
                                value: {
                                    value: this.tile.x
                                } as DataFieldValue
                            } as DataFieldResource,
                            [TaskRefDashboardTileConstants.DASHBOARD_TILE_Y]: {
                                type: FieldTypeResource.NUMBER,
                                value: {
                                    value: this.tile.y
                                } as DataFieldValue
                            } as DataFieldResource,
                            [TaskRefDashboardTileConstants.DASHBOARD_TILE_ROWS]: {
                                type: FieldTypeResource.NUMBER,
                                value: {
                                    value: this.tile.rows
                                } as DataFieldValue
                            } as DataFieldResource,
                            [TaskRefDashboardTileConstants.DASHBOARD_TILE_COLS]: {
                                type: FieldTypeResource.NUMBER,
                                value: {
                                    value: this.tile.cols
                                } as DataFieldValue
                            } as DataFieldResource,
                            [TaskRefDashboardTileConstants.DASHBOARD_TILE_PARENT_ID]: {
                                type: FieldTypeResource.TEXT,
                                value: {
                                    value: this._parentTaskContentService.task.caseId
                                } as DataFieldValue
                            } as DataFieldResource
                        }
                    } as DataSet
                }
            }, this._callChainService.create(success => {
                if (!success) {
                    return;
                }

                // reference new tile in task ref
                this._taskResourceService.setData(this._parentTaskContentService.task.stringId, {
                    body: {
                        [this._parentTaskContentService.task.stringId]: {
                            fields: {
                                [TaskRefDashboardConstants.DASHBOARD_TASK_REF]: {
                                    type: FieldTypeResource.TASK_REF,
                                    value: {
                                        value: [...this.taskRef.value, _case.tasks[0].task]
                                    } as DataFieldValue
                                } as DataFieldResource
                            }
                        } as DataSet
                    }
                }).subscribe(outcome => {
                    if (outcome.error) {
                        this._logger.error(`Could not reference created task ref dashboard tile in the task ref`, outcome.error);
                        return;
                    }
                    this._taskDataService.initializeTaskDataFields(new AfterAction(), true);
                }, error => {
                    this._logger.error(`Could not reference created task ref dashboard tile in the task ref`, error);
                });
            }));
        }, error => {
            this._logger.error(`Could not create task ref dashboard tile case`, error);
        });
    }

    // TODO copy of a similar method found in UserFilterService
    protected assignSetData(taskId: string, data: TaskDataSets, callChain: Subject<boolean>): void {
        this._taskResourceService.assignTask(taskId).subscribe(assignOutcome => {
            if (assignOutcome.error) {
                this._logger.error(`Could not assign task '${taskId}'`, assignOutcome.error);
                callChain.next(false);
                return;
            }

            this._taskResourceService.setData(taskId, data).subscribe(setDataOutcome => {
                if (setDataOutcome.error) {
                    this._logger.error(`Could not set data of task '${taskId}'`, data, setDataOutcome.error);
                    callChain.next(false);
                    return;
                }

                callChain.next(true);

            }, error => {
                this._logger.error(`Could not set data of task '${taskId}'`, data, error);
                callChain.next(false);
            });
        }, error => {
            this._logger.error(`Could not assign task '${taskId}'`, error);
            callChain.next(false);
        });
    }
}
