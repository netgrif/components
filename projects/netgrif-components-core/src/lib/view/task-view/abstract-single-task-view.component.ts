import { Component, Input, OnDestroy } from '@angular/core';
import { AbstractViewWithHeadersComponent } from '../abstract/view-with-headers';
import { Observable, Subject, Subscription } from 'rxjs';
import { TaskPanelData } from '../../panel/task-panel-list/task-panel-data/task-panel-data';
import { TaskViewService } from './service/task-view.service';
import { map, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

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
    protected unsubscribe$: Subject<void>;

    protected constructor(protected taskViewService: TaskViewService,
                          protected activatedRoute: ActivatedRoute) {
        super(taskViewService);
        this.unsubscribe$ = new Subject<void>();
        this.subRoute = this.activatedRoute.paramMap.subscribe(paramMap => {
            if (!!(paramMap?.['params']?.[TaskConst.TRANSITION_ID])) {
                this.transitionId = paramMap['params'][TaskConst.TRANSITION_ID];
                this.task$ = this.taskViewService.tasks$.pipe(map<Array<TaskPanelData>, TaskPanelData>(tasks => {
                    return this.resolveTransitionTask(tasks);
                }), takeUntil(this.unsubscribe$));
            }
        });
        this.loading$ = this.taskViewService.loading$;
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.subRoute.unsubscribe();
        this.unsubscribe$.complete();
    }

    private resolveTransitionTask(tasks: Array<TaskPanelData>): TaskPanelData {
        const transitionTask = tasks.find(t => t.task.transitionId === this.transitionId);
        if (!!transitionTask) {
            transitionTask.initiallyExpanded = transitionTask.task.finishDate === undefined;
        }
        return transitionTask;
    }
}
