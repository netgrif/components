import { Component, Input, OnDestroy } from '@angular/core';
import { AbstractViewWithHeadersComponent } from '../abstract/view-with-headers';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { TaskPanelData } from '../../panel/task-panel-list/task-panel-data/task-panel-data';
import { TaskViewService } from './service/task-view.service';
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
    public taskPanelData: ReplaySubject<TaskPanelData>;
    public loading$: Observable<boolean>;
    private transitionId: string;
    private subRoute: Subscription;
    protected subPanelData: Subscription;

    protected constructor(protected taskViewService: TaskViewService,
                          activatedRoute: ActivatedRoute) {
        super(taskViewService, activatedRoute);
        this.subPanelData = new Subscription();
        this.taskPanelData = new ReplaySubject<TaskPanelData>(1);
        this.subRoute = this._activatedRoute.paramMap.subscribe(paramMap => {
            if (!!(paramMap?.['params']?.[TaskConst.TRANSITION_ID])) {
                this.transitionId = paramMap['params'][TaskConst.TRANSITION_ID];
                this.subPanelData.unsubscribe();
                this.subPanelData = this.taskViewService.tasks$.subscribe(tasks =>  {
                    if (!!tasks && tasks.length > 0) {
                        this.taskPanelData.next(this.resolveTransitionTask(tasks));
                    }
                });
            }
        });
        this.loading$ = this.taskViewService.loading$;
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.subRoute.unsubscribe();
        this.subPanelData.unsubscribe();
    }

    get task$(): Observable<TaskPanelData> {
        return this.taskPanelData.asObservable();
    }

    private resolveTransitionTask(tasks: Array<TaskPanelData>): TaskPanelData {
        const transitionTask = tasks.find(t => t.task.transitionId === this.transitionId);
        if (!!transitionTask) {
            transitionTask.initiallyExpanded = transitionTask.task.finishDate === undefined;
        }
        return transitionTask;
    }
}
