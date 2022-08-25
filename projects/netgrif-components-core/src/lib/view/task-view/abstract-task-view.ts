import {Observable} from 'rxjs';
import {Component, OnDestroy} from '@angular/core';
import {TaskPanelData} from '../../panel/task-panel-list/task-panel-data/task-panel-data';
import {TaskViewService} from './service/task-view.service';
import {AbstractViewWithHeadersComponent} from '../abstract/view-with-headers';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ncc-abstract-task-view',
    template: ''
})
export abstract class AbstractTaskViewComponent extends AbstractViewWithHeadersComponent implements OnDestroy {

    public tasks$: Observable<Array<TaskPanelData>>;
    public loading$: Observable<boolean>;

    protected constructor(protected taskViewService: TaskViewService,
                          _activatedRoute?: ActivatedRoute) {
        super(taskViewService, _activatedRoute);
        this.tasks$ = this.taskViewService.tasks$;
        this.loading$ = this.taskViewService.loading$;
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
