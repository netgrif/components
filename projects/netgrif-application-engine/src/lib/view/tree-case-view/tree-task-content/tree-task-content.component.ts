import {Component, OnDestroy, OnInit} from '@angular/core';
import {TreeCaseViewService} from '../tree-case-view.service';
import {TaskResourceService} from '../../../resources/engine-endpoint/task-resource.service';
import {HttpParams} from '@angular/common/http';
import {TaskContentService} from '../../../task-content/services/task-content.service';
import {TreeTaskContentService} from './tree-task-content.service';
import {TaskDataService} from '../../../task/services/task-data.service';
import {AssignTaskService} from '../../../task/services/assign-task.service';
import {Subject} from 'rxjs';
import {tsBooleanKeyword} from '@babel/types';
import {TaskEventService} from '../../../task-content/services/task-event.service';
import {CancelTaskService} from '../../../task/services/cancel-task.service';
import {FinishTaskService} from '../../../task/services/finish-task.service';
import {TaskRequestStateService} from '../../../task/services/task-request-state.service';
import {TaskViewService} from '../../task-view/service/task-view.service';

@Component({
    selector: 'nae-tree-task-content',
    templateUrl: './tree-task-content.component.html',
    styleUrls: ['./tree-task-content.component.scss'],
    providers: [
        {provide: TaskContentService, useClass: TreeTaskContentService},
        AssignTaskService,
        TaskDataService,
        TaskEventService,
        CancelTaskService,
        FinishTaskService,
        TaskRequestStateService
    ]
})
export class TreeTaskContentComponent implements OnInit, OnDestroy {

    public show = false;
    public loading = false;

    constructor(private _treeCaseService: TreeCaseViewService,
                private  _taskResourceService: TaskResourceService,
                private _taskContentService: TaskContentService,
                private _taskDataService: TaskDataService,
                private _assign: AssignTaskService,
                private _taskEventService: TaskEventService,
                private _cancel: CancelTaskService,
                private _finish: FinishTaskService) {
        _taskDataService.changedFields$.subscribe( changedFields => {
            this._taskContentService.updateFromChangedFields(changedFields);
        });
    }

    ngOnInit(): void {
        this._treeCaseService.caseId.subscribe(kaze => {
            this.show = false;
            this.loading = true;
            if (this._taskContentService.task && this.canCancel()) {
                this._cancel.cancel();
            }
            if (kaze && kaze.immediateData && kaze.immediateData.find(imData => imData.stringId === 'treeTaskTransitionId')) {
                this._taskResourceService.getTasks({case: kaze.stringId,
                    transition: kaze.immediateData.find(imData => imData.stringId === 'treeTaskTransitionId').value})
                    .subscribe(tasks => {
                    if (tasks && tasks.content && Array.isArray(tasks.content)) {
                        this._taskContentService.task = tasks.content[0];
                        const after = new Subject<boolean>();
                        const afterSecond = new Subject<boolean>();
                        after.subscribe(bool => {
                            if (bool) {
                                this._taskDataService.initializeTaskDataFields(afterSecond);
                            } else {
                                this.loading = false;
                            }
                            after.complete();
                        });
                        afterSecond.subscribe(bool => {
                            if (bool) {
                                this.show = true;
                            }
                            this.loading = false;
                            afterSecond.complete();
                        });
                        this._assign.assign(after);
                    } else {
                        this.loading = false;
                    }
                });
            } else {
                this.loading = false;
            }
        });
    }

    public canCancel(): boolean {
        return this._taskEventService.canCancel();
    }

    public canFinish(): boolean {
        return this._taskEventService.canFinish();
    }

    public cancel(): void {
        this.loading = true;
        const after = new Subject<boolean>();
        after.subscribe(bool => {
            if (bool) {
               this.show = false;
            }
            this.loading = false;
            after.complete();
        });
        this._cancel.cancel(after);
    }

    public finish(): void {
        this.loading = true;
        const after = new Subject<boolean>();
        after.subscribe(bool => {
            if (bool) {
                this.show = false;
            }
            this.loading = false;
            after.complete();
        });
        this._finish.validateDataAndFinish(after);
    }

    ngOnDestroy(): void {
        if (this._taskContentService.task && this.canCancel()) {
            this._cancel.cancel();
        }
    }
}
