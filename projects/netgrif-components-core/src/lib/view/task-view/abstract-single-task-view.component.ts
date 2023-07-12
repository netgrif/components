import {Component, EventEmitter, Inject, Input, OnDestroy, Optional, Output} from '@angular/core';
import {AbstractViewWithHeadersComponent} from '../abstract/view-with-headers';
import {Observable, Subscription} from 'rxjs';
import {TaskPanelData} from '../../panel/task-panel-list/task-panel-data/task-panel-data';
import {TaskViewService} from './service/task-view.service';
import {ActivatedRoute} from '@angular/router';
import {AsyncPipe} from "@angular/common";
import {BaseFilter} from "../../search/models/base-filter";
import {SimpleFilter} from "../../filter/models/simple-filter";
import {TaskSearchRequestBody} from "../../filter/models/task-search-request-body";
import {NAE_BASE_FILTER} from "../../search/models/base-filter-injection-token";
import {map, tap} from "rxjs/operators";

export class TaskConst {
    public static readonly TRANSITION_ID = 'transitionId';
}

export enum SingleTaskMode {
    ACTIVATED_ROUTE,
    TASK_ID
}

@Component({
    selector: 'ncc-abstract-single-task-view',
    template: ''
})
export abstract class AbstractSingleTaskViewComponent extends AbstractViewWithHeadersComponent implements OnDestroy {

    @Input() initiallyExpanded: boolean = true;
    @Input() preventCollapse: boolean = true;
    @Output() noTaskPresent: EventEmitter<void>;
    public taskPanelData: Observable<TaskPanelData>;
    public loading$: Observable<boolean>;
    private transitionId: string;
    private subRoute: Subscription | undefined;
    protected subPanelData: Subscription | undefined;
    protected subLoading: Subscription | undefined;

    protected constructor(protected taskViewService: TaskViewService,
                          activatedRoute: ActivatedRoute,
                          protected async: AsyncPipe,
                          @Inject(NAE_BASE_FILTER) protected baseFilter: BaseFilter) {
        super(taskViewService, activatedRoute);
        this.noTaskPresent = new EventEmitter<void>();
        this.taskPanelData = this.taskViewService.tasks$.pipe(
            map<TaskPanelData[], TaskPanelData>(tasks => tasks.find(
                panelData => this.isTaskMatchingFilter(panelData, (baseFilter.filter as SimpleFilter).getRequestBody())))
        ).pipe(
            tap(panelData => {
                if (!!panelData) {
                    panelData.initiallyExpanded = true
                }
            })
        );
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
    }

    get task$(): Observable<TaskPanelData> {
        return this.taskPanelData;
    }

    private isTaskMatchingFilter(panelData: TaskPanelData, taskSearchRequestBody: TaskSearchRequestBody): boolean {
        return panelData.task.stringId === taskSearchRequestBody.stringId || panelData.task.transitionId === taskSearchRequestBody.transitionId;
    }
}
