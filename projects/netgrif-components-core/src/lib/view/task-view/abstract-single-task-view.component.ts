import { Component, OnDestroy } from '@angular/core';
import { AbstractViewWithHeadersComponent } from '../abstract/view-with-headers';
import { Observable, Subscription } from 'rxjs';
import { TaskPanelData } from '../../panel/task-panel-list/task-panel-data/task-panel-data';
import { TaskViewService } from './service/task-view.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AbstractHeaderComponent } from '../../header/abstract-header.component';

@Component({
    selector: 'ncc-abstract-single-task-view',
    template: ''
})
export abstract class AbstractSingleTaskViewComponent extends AbstractViewWithHeadersComponent implements OnDestroy {

    public task$: Observable<TaskPanelData>;
    public loading$: Observable<boolean>;
    private transitionId: string;
    private readonly urlTransitionId = 'transitionId';

    private subRoute: Subscription;

    protected constructor(protected taskViewService: TaskViewService,
                          protected activatedRoute: ActivatedRoute) {
        super(taskViewService);
        this.subRoute = this.activatedRoute.paramMap.subscribe(paramMap => {
            if (!!paramMap && !!paramMap['params'] && !!paramMap['params'][this.urlTransitionId]) {
                this.transitionId = paramMap['params'][this.urlTransitionId];
                this.task$ = this.taskViewService.tasks$.pipe(map<Array<TaskPanelData>, TaskPanelData>(tasks => {
                    return tasks.find(t => t.task.transitionId === this.transitionId);
                }));
            }
        });
        this.loading$ = this.taskViewService.loading$;
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.subRoute.unsubscribe();
    }
}
