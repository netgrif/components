import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import { AbstractViewWithHeadersComponent } from '../abstract/view-with-headers';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { TaskPanelData } from '../../panel/task-panel-list/task-panel-data/task-panel-data';
import { TaskViewService } from './service/task-view.service';
import { ActivatedRoute } from '@angular/router';
import {AsyncPipe} from "@angular/common";

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

    @Output() noTaskPresent: EventEmitter<void>;
    public taskPanelData: ReplaySubject<TaskPanelData>;
    public loading$: Observable<boolean>;
    private transitionId: string;
    private subRoute: Subscription | undefined;
    protected subPanelData: Subscription | undefined;
    protected subLoading: Subscription | undefined;

    protected constructor(protected taskViewService: TaskViewService,
                          activatedRoute: ActivatedRoute, async: AsyncPipe) {
        super(taskViewService, activatedRoute);
        this.noTaskPresent = new EventEmitter<void>();
        this.taskPanelData = new ReplaySubject<TaskPanelData>(1);
        this.subRoute = this._activatedRoute.paramMap.subscribe(paramMap => {
            if (!!(paramMap?.['params']?.[TaskConst.TRANSITION_ID])) {
                this.transitionId = paramMap['params'][TaskConst.TRANSITION_ID];
                this.subPanelData = this.taskViewService.tasks$.subscribe(tasks =>  {
                    if (!!tasks && tasks.length > 0) {
                        this.taskPanelData.next(this.resolveTransitionTask(tasks));
                    } else {
                        const isLoading = async.transform(this.loading$);
                        if (!isLoading) {
                            this.taskPanelData.next(undefined);
                            this.noTaskPresent.next();
                        }
                    }
                });
            }
        });
        this.loading$ = this.taskViewService.loading$;
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (!!this.subRoute) {
            this.subRoute.unsubscribe();
        }
        if (!!this.subPanelData) {
            this.subPanelData.unsubscribe();
        }
        if (!!this.taskPanelData) {
            this.taskPanelData.complete();
        }
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
