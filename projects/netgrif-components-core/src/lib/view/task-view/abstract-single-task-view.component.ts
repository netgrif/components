import { Component, Input, OnDestroy } from '@angular/core';
import { AbstractViewWithHeadersComponent } from '../abstract/view-with-headers';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { TaskPanelData } from '../../panel/task-panel-list/task-panel-data/task-panel-data';
import { TaskViewService } from './service/task-view.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/models/user';

export class TaskConst {
    public static readonly TRANSITION_ID = 'transitionId';
}

@Component({
    selector: 'ncc-abstract-single-task-view',
    template: ''
})
export abstract class AbstractSingleTaskViewComponent extends AbstractViewWithHeadersComponent implements OnDestroy {

    @Input() initiallyExpanded: boolean = true;
    @Input() preventCollapse: boolean = true;
    public task$: Observable<TaskPanelData>;
    public loading$: Observable<boolean>;
    private transitionId: string;
    private subRoute: Subscription;

    protected constructor(protected taskViewService: TaskViewService,
                          protected activatedRoute: ActivatedRoute) {
        super(taskViewService);
        this.subRoute = this.activatedRoute.paramMap.subscribe(paramMap => {
            if (!!paramMap && !!paramMap['params'] && !!paramMap['params'][TaskConst.TRANSITION_ID]) {
                this.transitionId = paramMap['params'][TaskConst.TRANSITION_ID];
                this.task$ = this.taskViewService.tasks$.pipe(map<Array<TaskPanelData>, TaskPanelData>(tasks => {
                    return this.resolveTransitionTask(tasks);
                }));
            }
        });
        this.loading$ = this.taskViewService.loading$;
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.subRoute.unsubscribe();
    }

    private resolveTransitionTask(tasks: Array<TaskPanelData>): TaskPanelData {
        const transitionTask = tasks.find(t => t.task.transitionId === this.transitionId);
        if (!!transitionTask) {
            transitionTask.initiallyExpanded = transitionTask.task.finishDate === undefined;
        }
        return transitionTask;
    }
}
