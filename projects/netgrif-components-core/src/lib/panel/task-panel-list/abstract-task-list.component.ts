import {Component, Inject, Input, Optional, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {TaskViewService} from '../../view/task-view/service/task-view.service';
import {LoggerService} from '../../logger/services/logger.service';
import {NAE_TAB_DATA} from '../../tabs/tab-data-injection-token/tab-data-injection-token';
import {InjectedTabData} from '../../tabs/interfaces';
import {ActivatedRoute} from '@angular/router';
import {AbstractDefaultTaskList} from './default-task-panel-list/abstract-default-task-list';
import {Observable} from 'rxjs';
import {TaskPanelData} from './task-panel-data/task-panel-data';
import { map } from 'rxjs/operators';

@Component({
    selector: 'ncc-abstract-task-list',
    template: ''
})
export abstract class AbstractTaskListComponent extends AbstractDefaultTaskList {

    private readonly TRANSITION_ID = 'transitionId';

    private transitionId: string;

    @Input() singleTask = false;

    @Input()
    set tasks$(tasks: Observable<Array<TaskPanelData>>) {
        this.resolveTaskArray(tasks);
    }

    get tasks$(): Observable<Array<TaskPanelData>> {
        return this._tasks$;
    }
    @ViewChild(CdkVirtualScrollViewport) public viewport: CdkVirtualScrollViewport;

    protected constructor(protected _taskViewService: TaskViewService,
                          protected _log: LoggerService,
                          @Optional() @Inject(NAE_TAB_DATA) injectedTabData: InjectedTabData,
                          protected route?: ActivatedRoute) {
        super(_taskViewService, _log, injectedTabData, route);
    }

    get transitionId$(): string {
        return this.transitionId;
    }

    set transitionId$(id: string ) {
        this.transitionId = id;
    }

    public loadNextPage(): void {
        if (!this.viewport) {
            return;
        }
        this._taskViewService.nextPage(this.viewport.getRenderedRange(), this.viewport.getDataLength());
    }

    public resolveTaskArray(tasks: Observable<Array<TaskPanelData>>): void {
        if (!this.singleTask) {
            this._tasks$ = tasks;
        } else {
            this.route.paramMap.subscribe(params => {
                if (params.has(this.TRANSITION_ID))
                    this.transitionId = params.get(this.TRANSITION_ID);
            });
            this._tasks$ = this._taskViewService.tasks$.pipe(map(tasks => {
                if (!!this.transitionId) {
                    let reducedTasks = tasks.filter(t => t.task.transitionId === this.transitionId);
                    if (!!reducedTasks && !!reducedTasks[0]) {
                        reducedTasks[0].initiallyExpanded = true;
                    }
                    return reducedTasks;
                }
            }));
        }
    }
}
