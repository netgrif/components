import {Component, EventEmitter,  Input, Output} from '@angular/core';
import {AbstractViewWithHeadersComponent} from '../abstract/view-with-headers';
import {Observable} from 'rxjs';
import {TaskPanelData} from '../../panel/task-panel-list/task-panel-data/task-panel-data';
import {TaskViewService} from './service/task-view.service';
import {ActivatedRoute} from '@angular/router';
import {map, tap} from "rxjs/operators";
import {AssignPolicy} from "../../task-content/model/policy";

@Component({
    selector: 'ncc-abstract-single-task-view',
    template: ''
})
export abstract class AbstractSingleTaskViewComponent extends AbstractViewWithHeadersComponent {

    @Input() initiallyExpanded: boolean = true;
    @Input() preventCollapse: boolean = true;
    @Output() noTaskPresent: EventEmitter<void>;
    public taskPanelData: Observable<TaskPanelData>;
    public loading$: Observable<boolean>;
    protected finishTitle: string | undefined;

    protected constructor(protected taskViewService: TaskViewService,
                          activatedRoute: ActivatedRoute) {
        super(taskViewService, activatedRoute);
        this.noTaskPresent = new EventEmitter<void>();
        this.taskPanelData = this.taskViewService.tasks$.pipe(
            map<TaskPanelData[], TaskPanelData>(tasks => tasks?.length > 0 ? tasks[0] : undefined),
            tap(panelData => {
                if (!!panelData) {
                    panelData.initiallyExpanded = true
                    panelData.task.assignPolicy = AssignPolicy.auto;
                    this.finishTitle = panelData.task.finishTitle;
                }
            })
        );
        this.loading$ = this.taskViewService.loading$;
    }

    get task$(): Observable<TaskPanelData> {
        return this.taskPanelData;
    }
}
